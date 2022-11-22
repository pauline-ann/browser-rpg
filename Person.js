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
        this.updatePosition()
        this.updateAnimation(state)

        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) { // detect when arrow is being pressed
            this.direction = state.arrow // update direction
            this.movingProgressRemaining = 16 // reset counter
        }
    }

    // update person sprite's position
    updatePosition() {
        if(this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction]
            this[property] += change
            this.movingProgressRemaining -= 1
        }
    }

    // update person sprite's animation
    updateAnimation(state) {
        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow){ // made it to next space and no arrow pressed
            this.sprite.setAnimation("idle-"+this.direction)
            return
        }

        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction)
        }
    }
}