class GameObject {
    constructor(config) {
        this.x = config.x || 0 // position
        this.y = config.y || 0
        // Asset or sprite to be used for object
        this.sprite = new Sprite ({
            gameObject: this, // have access to properties within Sprite
            src: config.src || "/images/characters/people/hero.png"
        })
    }
}