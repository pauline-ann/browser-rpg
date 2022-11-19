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

        const x = 5;
        const y = 6;

        const shadow = new Image();
        shadow.onload = () => {
            this.ctx.drawImage(
                shadow,
                0, // left cut
                0, // top cut
                32, // width of cut
                32, // height of cut
                x * 16 - 8, // x position of hero
                y * 16 - 18, // y position of hero
                32, // scale/size of character on map
                32, 
            )
        }
        shadow.src = "/images/characters/shadow.png"

        const hero = new Image();
        hero.onload = () => {
            this.ctx.drawImage(
                hero,
                0, // left cut
                0, // top cut
                32, // width of cut
                32, // height of cut
                x * 16 - 8, // x position of hero
                y * 16 - 18, // y position of hero
                32, // scale/size of character on map
                32, 
            )
        }
        hero.src = "/images/characters/people/hero.png"
    }
}