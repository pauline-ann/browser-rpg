class GameObject {
    constructor(config) {
        this.isMounted = false
        this.x = config.x || 0 // position
        this.y = config.y || 0
        this.direction = config.direction || "down"
        this.sprite = new Sprite({
            gameObject: this, // have access to properties within Sprite
            src: config.src || "/images/characters/people/hero.png" // asset or sprite to be used for object
        })
    }

    // add wall where there are game objects
    mount(map) {
        this.isMounted = true
        map.addWall(this.x, this.y)
    }

    update() {

    }
}