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
      this.ctx.drawImage(image, 0, 0); // this call back is fired and image pixels are copied onto canvas
    };
    image.src = "/images/maps/DemoLower.png"; // path to image that we want to load

    // Place some Game Objects!
    const hero = new GameObject({
      x: 6,
      y: 6,
    });

    const npc1 = new GameObject({
      x: 7,
      y: 9,
      src: "/images/characters/people/npc1.png",
    });

    setTimeout(() => {
      hero.sprite.draw(this.ctx);
      npc1.sprite.draw(this.ctx);
    }, 200);
  }
}
