const utils = {
    withGrid(n) {
        return n * 16
    },
    asGridCoord(x, y) {
        return `${x * 16},${y * 16}`
    },
    nextPosition(initialX, initialY, direction) {
        let x = initialX
        let y = initialY
        const size = 16
        if (direction === "left") {
            x -= size
        } else if (direction === "right") {
            x += size
        } else if (direction === "up") {
            y -= size
        } else if (direction === "down") {
            y += size
        }
        return { x, y }
    },
    oppositeDirection(direction) {
        switch (direction) {
            case "left":
                return "right"
            case "right":
                return "left"
            case "up":
                return "down"
            default:
                return "up"
        }
    },
    // resolve promise after a bit of time has passed (ms)
    wait(ms) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, ms)
        })
    },
    emitEvent(name, detail) {
        const event = new CustomEvent(name, {
            detail
        })
        document.dispatchEvent(event)
    },
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    },
    // probability n; 0 < n < 1
    // returns T or F
    probability(n) {
        return !!n && Math.random() <= n
    },
    generateUniqueId() {
        return Date.now() + Math.floor(Math.random() * 99999)
    },
    randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}