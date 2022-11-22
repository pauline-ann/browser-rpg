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

    // update person sprite's position
    update(state) {
        this.updatePosition()

        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) { // detect when arrow is being pressed
            this.direction = state.arrow // update direction
            this.movingProgressRemaining = 16 // reset counter
        }
    }

    updatePosition() {
        if(this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction]
            this[property] += change
            this.movingProgressRemaining -= 1
        }
    }
}