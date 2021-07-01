import { HashTag } from "./HashTag"
import '../../main.scss';

export class Entity {
    constructor({hashtags = [], urls = []}) {
        this.hashtags = hashtags.map(tag => new HashTag(tag))
        this.urls = urls
    }

    renderTags = (cb) => (
        <div>
            {this.hashtags.map((t,i) => <button className='tag' key={`et-${i}`} onClick={() => cb(t.text)}>{t.textWithTag}</button>)}
        </div>
    )

    get tags () {
        return this.hashtags.map(t => t.text)
    }
}
