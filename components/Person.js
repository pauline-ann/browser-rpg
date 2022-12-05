// Add behavior for certain kinds of Game Objects, like people
class Person extends GameObject {
    constructor(config) {
        super(config) // run constructor for GameObject as well
        this.movingProgressRemaining = 0 // lock people to grid
        this.isStanding = false
        this.intentPosition = null // [x,y]

        this.isPlayerControlled = config.isPlayerControlled || false

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition()
        } else {
            // TODO: add more cases for moving position

            // case: awaiting player to provide input
            if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) { // detect when arrow is being pressed
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }

            this.updateAnimation(state)
        }
    }

    startBehavior(state, behavior) {
        // update character direction to behavior direction
        this.direction = behavior.direction

        if (behavior.type === "walk") {
            // stop here if space isn't free
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {

                if (behavior.retry) {
                    setTimeout(() => {
                        this.startBehavior(state, behavior)
                    }, 10)
                }

                return
            }

            // proceed to walk
            this.movingProgressRemaining = 16 // reset counter

            // add next position to intent
            const intentPosition = utils.nextPosition(this.x, this.y, this.direction)
            this.intentPosition = [
                intentPosition.x,
                intentPosition.y
            ]

            this.updateAnimation(state)
        }

        if (behavior.type === "stand") {
            this.isStanding = true
            setTimeout(() => {
                utils.emitEvent("PersonStandingComplete", {
                    whoId: this.id
                })
                this.isStanding = false
            }, behavior.time)
        }
    }

    // update person sprite's position
    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction]
        this[property] += change
        this.movingProgressRemaining -= 1

        if (this.movingProgressRemaining === 0) {
            // remove position from intent
            this.intentPosition = null

            // movement is finished
            utils.emitEvent("PersonWalkingComplete", {
                whoId: this.id
            })
        }
    }

    // update person sprite's animation
    updateAnimation() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction)
            return
        }
        this.sprite.setAnimation("idle-" + this.direction)
    }
}