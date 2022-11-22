class DirectionInput {
    constructor() {
        // we care about what order the directions were pressed
        this.heldDirections = []

        this.map = {
            "ArrowUp" : "up",
            "KeyW" : "up",
            "ArrowDown" : "down",
            "KeyS" : "down",
            "ArrowLeft" : "left",
            "KeyA" : "left",
            "ArrowRight" : "right",
            "KeyD" : "right"
        }
    }

    // allow external things to easily receive what direction is being currently pressed
    get direction() {
        return this.heldDirections[0]
    }

    init() {
        document.addEventListener("keydown", e => {
            const dir = this.map[e.code] // undefined if key isn't inside this.map
            if (dir && this.heldDirections.indexOf(dir) === -1) { // if direction doesn't exist in array
                this.heldDirections.unshift(dir) // push key to the beginning of array
            }
        })

        document.addEventListener("keyup", e => {
            const dir = this.map[e.code]
            const index = this.heldDirections.indexOf(dir)
            if (index > -1) {
                this.heldDirections.splice(index, 1) // if direction exists in array, remove from array
            }
        })
    }
}