function init(state, newState) {
    return { ...state, ...newState };
}

function distinctifyTags(arr, arr2) {
    let tags = arr
    if (arr2) {
        tags = tags.concat(arr2)
    }
    return tags.filter((tag, i, source) => source.map(t => t.text).indexOf(tag.text) === i)
}

const reducer = (state, action = {}) => {
    const { payload, type } = action
    switch (type) {
        case 'UPDATE_SEARCH_RESULTS':
            return {
                ...state,
                tweets: payload.tweets,
                searchMeta: payload.searchMeta,
                tags: distinctifyTags(payload.tags),
                maxRecordsLoaded: payload.searchMeta.next_results ? false : true,
                recordsFound: payload.recordsFound,
                filterTag: payload.filterTag,
                isLoading: false
            }
        case 'APPEND_SEARCH_RESULTS':
            return {
                ...state,
                tweets: state.tweets.concat(payload.tweets),
                searchMeta: payload.searchMeta,
                tags: distinctifyTags([...state.tags], payload.tags),
                maxRecordsLoaded: payload.searchMeta.next_results ? false : true,
                recordsFound: payload.recordsFound,
                isLoading: false
            }
        case 'HANDLE_INPUT':
            return {
                ...state,
                search: payload.search
            }
        case 'ADD_OR_TOGGLE_FILTER':
            let filter = payload.tag === state.filterTag ? '' : payload.tag
            return {
                ...state,
                filterTag: filter

            }
        case 'TOGGLE_LOADING':
            return {
                ...state,
                isLoading: payload.isLoading
            }
        case 'UPDATE_FOUND_RECORDS':
            return {
                ...state,
                recordsFound: payload.recordsFound
            }
        case 'RESET':
            return init(state, payload)
        default:
            throw new Error('Not a valid action type')
    }
}

export default reducer
