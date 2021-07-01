import '../main.scss';
export function HashTags({tags, filter}) {
    return (
        <div id='hashtagsContainer' className={`card shadow padded mobile`}>
            <h4 className={`title-font clear`}>Filter by hashtag</h4>
            {tags.map((t, i)=> <button className={`tag`} key={`hash-list-${i}`} onClick={() => filter(t.text)}>{t.textWithTag}</button>)}
        </div>
    )
}
