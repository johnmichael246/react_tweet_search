import { Entity } from "./Entity"
import { User } from "./User"
import '../../main.scss'

export class Tweet {
    constructor({user, entities, ...rest}) {
        let splitTxt = rest.text.split(' ')
        this.attributes = {...rest, text: splitTxt.slice(0,-1).join(' '), link: splitTxt[splitTxt.length - 1] }
        this.user = new User(user)
        this.entities = new Entity(entities)
    }

    get id() {
        return this.attributes.id
    }

    get createdAt() {
        return this.attributes.created_at
    }

    get link() {
        return this.attributes.link
    }

    renderLink = () => {
        if (!this.link) return ''
        return <a href={this.link} className='link'>{this.link}</a>
    }
}
