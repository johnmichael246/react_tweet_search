import { Tweet } from "./Tweet";
import '../main.scss'
import './TweetList.scss'

const TweetList = function({ tweets, loadItems, loadMoreRecords, isLoading, filter }) {
    const renderLoadMore = (tweets = []) => {
        return (tweets.length && loadMoreRecords && <button className='button-as-link' onClick={loadItems} disabled={isLoading}><b> Load more </b></button>) || ''
    }

    return (
        <div className={`row shadow card mobile`}>
            <div className={'col'}>
                {tweets.map((tweet, i) => <Tweet key={`tweet-${i}`} tweet={tweet} filter={filter}></Tweet>)}
                <p className='centered'>
                    {renderLoadMore(tweets)}
                </p>
            </div>
        </div>
    )
}

export default TweetList