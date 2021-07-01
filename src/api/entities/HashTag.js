export class HashTag {
    constructor(attributes) {
        this.attributes = attributes
    }

    get text() {
        return this.attributes.text
    }

    get textWithTag() {
        return `#${this.text}`
    }
}
