// Top level parent component that keeps track of state going on
// Sends state downward to sub components
class Overworld {
    constructor(config) {
        this.element = config.element; // pass in element to overworld to operate on
        this.canvas = this.element.querySelector(".game-canvas"); // reference canvas
        this.ctx = this.canvas.getContext("2d"); // draw to context of canvas, give us access to drawing methods that exist on canvas elements
    }

    init() {
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0) // this call back is fired and image pixels are copied onto canvas
        }
        image.src = "/images/maps/DemoLower.png" // path to image that we want to load
    }
}