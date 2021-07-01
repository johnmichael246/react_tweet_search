import { serialize } from '../utils';
import { Tweet } from './entities/Tweet';
import { SEARCH_LIMIT } from './Twitter.conf';

const { REACT_APP_TWITTER_BASE_URL, REACT_APP_TWITTER_API_TOKEN } = process.env

class TwitterService {
    constructor(endpoint = REACT_APP_TWITTER_BASE_URL) {
        this.endpoint = endpoint
    }

    handleError = (err) => {
        if (err.code) {
            throw err
        }
        throw new Error(err instanceof Error ? err : JSON.stringify(err))
    }

    requestOptions = (options, mergeWithDefault = false) => {
        const defaults = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${REACT_APP_TWITTER_API_TOKEN}`
            }
        }
        if (mergeWithDefault) {
            return { ...defaults, ...options }
        }
        return options
    }

    executeRequest = async (options) => {
        let { url, qs, ...rest } = options
        if (Object.keys(qs).length) {
            url = `${url}?${serialize(qs)}`
        }
        try {
            const response = await fetch(url, rest)
            return await response.json()
        } catch(e) {
            throw e
        }
    }

    searchTweets = ({q, ...rest}) => {
        const options = this.requestOptions(
            {
                url: `api/twitter/search/tweets.json`,
                qs: {
                    'count': SEARCH_LIMIT,
                    'result_type': 'popular',
                    q,
                    ...rest
                },
            },
            true);
        return this.executeRequest(options)
        .then(results => {
            if (results.errors) {
                this.handleError(results.errors)
            }
            console.log('results', results)
            const statuses = results.statuses.map(s => new Tweet(s))
            const tags = [].concat.apply([], statuses.map(tweet => tweet.entities.hashtags.map(tag => tag)))
            console.log({...results, statuses, tags })
            return {...results, statuses, tags }
        })
        .catch(e => { throw(e) })
    }
}

export const Twitter = new TwitterService()
