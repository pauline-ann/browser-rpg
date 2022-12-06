class GameObject {
    constructor(config) {
        this.id = null
        this.isMounted = false
        this.x = config.x || 0 // position
        this.y = config.y || 0
        this.direction = config.direction || "down"
        this.sprite = new Sprite({
            gameObject: this, // have access to properties within Sprite
            src: config.src || "/db/images/characters/people/hero.png" // asset or sprite to be used for object
        })

        this.behaviorLoop = config.behaviorLoop || []
        this.behaviorLoopIndex = 0

        this.talking = config.talking || []
        this.retryTimeout = null
    }

    // add wall where there are game objects
    mount(map) {
        this.isMounted = true

        // If we have a behavior, kick off after short delay
        setTimeout(() => {
            this.doBehaviorEvent(map)
        }, 10)
    }

    update() {

    }

    async doBehaviorEvent(map) {

        // don't do anything if there is no behavior loop
        if (this.behaviorLoop.length === 0) {
            return
        }

        // if there is a cutscene, wait a moment then retry behavior event
        if (map.isCutscenePlaying) {

            if (this.retryTimeout) {
                clearTimeout(this.retryTimeout)
            }

            this.retryTimeout = setTimeout(() => {
                this.doBehaviorEvent(map)
            }, 1000)

            return
        }

        // setting up our event with relevant info
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex]
        eventConfig.who = this.id

        // create an event instance out of our next event config
        const eventHandler = new OverworldEvent({ map, event: eventConfig }) // contains code that instructs game object
        await eventHandler.init() // asynchronous function

        // setting the next event to fire
        this.behaviorLoopIndex += 1
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0
        }

        // do it again
        this.doBehaviorEvent(map)
    }
}