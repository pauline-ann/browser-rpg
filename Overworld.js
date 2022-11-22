// Top level parent component that keeps track of state going on
// Sends state downward to sub components
class Overworld {
  constructor(config) {
    this.element = config.element // pass in element to  overworld to operate on
    this.canvas = this.element.querySelector(".game-canvas") // reference canvas
    this.ctx = this.canvas.getContext("2d") // draw to context of canvas, give us access to drawing methods that exist on canvas elements
    this.map = null
  }

  startGameLoop() {
    // todo: Delta Time - keep track of time passed since last frame and do some math
    const step = () => {
      //Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      // Draw lower layer
      this.map.drawLowerImage(this.ctx)

      //Draw Game Objects
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          // keep track of things that will change to help objects decide what to do next
          arrow: this.directionInput.direction
        })
        object.sprite.draw(this.ctx)
      })

      // Draw upper layer
      this.map.drawUpperImage(this.ctx)

      requestAnimationFrame(() => {
        step() // step function calls step() again when a new frame starts. not an app breaking infinite loop - other processes may still run
      })
    }
    step()
  }

  init() {
    // create new instance of OverworldMap, passing over config from specific map, in this case DemoRoom
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom)

    this.directionInput = new DirectionInput()
    this.directionInput.init()

    this.startGameLoop()
  }
}
