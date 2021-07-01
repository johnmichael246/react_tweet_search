import {
    useCallback,
    useReducer
} from 'react'
import { Twitter } from '../api/Twitter';
import debounce from 'lodash.debounce';
import TweetList from '../components/TweetList';
import { HashTags } from '../components/HashTags';
import reducer from './reducer'
import './TwitterSearch.scss'
import '../main.scss'

const initialState = {
    tweets: [],
    tags: [],
    searchMeta: {},
    maxRecordsLoaded: false,
    filterTag: '',
    search: '',
    isLoading: false,
    recordsFound: null
}

export default function TwitterSearch() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const debouncedSearch = useCallback(
        debounce(
            nextValue => {
                if (nextValue && nextValue.trim()) {
                    return search({ q: nextValue })
                } else if (!nextValue && state.recordsFound !== null) {
                    dispatch({type: 'UPDATE_FOUND_RECORDS', payload: { recordsFound: null }})
                }
            }, 1500)
        , [state.recordsFound]);

    const handleInputChange = event => {
        const { value: nextValue } = event.target;
        dispatch({ type: 'HANDLE_INPUT', payload: {search: nextValue} });
        debouncedSearch(nextValue);
    };

    const getFilteredTweets = (tweets, filterTag = '') => {
        if (!filterTag) return tweets
        return tweets.filter(tweet => tweet.entities.tags.includes(filterTag))
    }

    const search = async (params, action = 'UPDATE') => {
        try {
            dispatch({type: 'TOGGLE_LOADING', payload: { isLoading: true } })
            const response = await Twitter.searchTweets(params)
            const { statuses:tweets, search_metadata: searchMeta = {}, tags } = response
            const payload = {
                tweets,
                searchMeta,
                tags,
                isLoading: false,
                recordsFound: tweets.length ? true : false
            }
            if (action === 'UPDATE') {
                payload.filterTag = ''
            }
            dispatch({
                type: `${action}_SEARCH_RESULTS`, payload
            })
        } catch (e) {
            dispatch({type: 'TOGGLE_LOADING', payload: { isLoading: false } })
            console.log('#search.Error', e.message)
        }
    }

    const loadItems = () => {
        if (state.searchMeta) {
            const params = new URLSearchParams(state.searchMeta.next_results)
            const payload = [...params.entries()].reduce((obj, [k, v]) => {
                obj[k] = v
                return obj
            }, {})
            return search(payload, 'APPEND')
        } else {
            return search(state.search)
        }
    }

    const handleFilterSelection = useCallback((tag) => dispatch({ type: 'ADD_OR_TOGGLE_FILTER', payload: { tag } }), [state.tags, state.filterTag])

    const renderNoRecordsFound = useCallback(() => {
        if (!state.tweets.length && state.recordsFound === false) {
            return (
                <div className='content'>
                    No records found for "{state.search}"
                </div>
            )
        }
        return ''
    }, [state.tweets, state.recordsFound])

    return (
        <div id='twitterSearch' className='container'>
            <h4 className='title title-font header'>Tweet Feed</h4>
            <div className='searchbar'>
                <div className="search-wrapper card">
                    <input
                        placeholder="Search by keyword"
                        value={state.searchValue}
                        onChange={handleInputChange}
                        type='text'
                        className="search"
                    />
                    <span className="searchicon"></span>
                </div>
            </div>
            <div className='tags'>
                <HashTags tags={state.tags} filter={handleFilterSelection}></HashTags>
            </div>
            {
                state.tweets.length ? (
                    <div className='content'>
                        <TweetList
                            tweets={getFilteredTweets(state.tweets, state.filterTag)}
                            loadItems={loadItems}
                            loadMoreRecords={!state.maxRecordsLoaded}
                            isLoading={state.isLoading}
                            filter={handleFilterSelection}>
                        </TweetList>
                    </div>
                ) : ''
            }
            {renderNoRecordsFound()}
        </div>
    )
}
