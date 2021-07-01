import '../main.scss';
export function Tweet({ tweet, filter }) {
    return (
        <div className={`row tweet-row padded`}>
            <div className={`col _10 padded`}>
                {tweet.user.renderAvatar()}
            </div>
            <div className={`col _90`}>
                <span className='title-font'>
                    <b>{tweet.user.screenName}</b>
                </span>
                <br />
                {tweet.attributes.text}
                &nbsp;
                {tweet.renderLink()}
                {tweet.entities.renderTags(filter)}
            </div>
        </div>
    )
}
