import '../../components/Tweet.scss'
export class User {
    constructor(attrs) {
        this.attrs = attrs
    }

    get screenName() {
        return `@${this.attrs.screen_name}`
    }

    get profileImageUrl()  {
        return this.attrs.profile_image_url
    }

    renderAvatar = () =>  (this.profileImageUrl && <img src={this.profileImageUrl} className={'avatar'} alt={`Avatar for ${this.screenName}`}></img>) || '' 
}
