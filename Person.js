// Add behavior for certain kinds of Game Objects, like people
class Person extends GameObject {
    constructor(config) {
        super(config) // run constructor for GameObject as well

        // Values specific just for people movement
        this.movingProgressRemaining = 32 // lock people to grid

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
    }

    updatePosition() {
        if(this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction]
            this[property] += change
            this.movingProgressRemaining -= 1
        }
    }
}