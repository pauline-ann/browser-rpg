// Add behavior for certain kinds of Game Objects, like people
class Person extends GameObject {
    constructor(config) {
        super(config) // run constructor for GameObject as well
        this.movingProgressRemaining = 0 // lock people to grid

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
            if (this.isPlayerControlled && state.arrow) { // detect when arrow is being pressed
                this.startBehavior(state, {
                    type: "walk", // case: awaiting player to provide input
                    direction: state.arrow
                })
            }

            // TODO: add more cases for moving position

            this.updateAnimation(state)
        }
    }

    startBehavior(state, behavior) {
        this.direction = behavior.direction // update character direction to behavior direction
        if (behavior.type === "walk") {
            // stop here if space isn't free
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                return
            }

            // proceed to walk
            state.map.moveWall(this.x, this.y, this.direction) // set wall into playable character's future position
            this.movingProgressRemaining = 16 // reset counter
        }
    }

    // update person sprite's position
    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction]
        this[property] += change
        this.movingProgressRemaining -= 1

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