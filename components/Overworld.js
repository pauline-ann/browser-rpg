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
    // TODO: Delta Time - keep track of time passed since last frame and do some math
    const step = () => {
      // clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      // establish camera person
      const cameraPerson = this.map.gameObjects.hero // this can be useful for cut scenes to change camera focus

      // udpate all objects
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          // keep track of things that will change to help objects decide what to do next
          arrow: this.directionInput.direction,
          map: this.map
        })
      })

      // draw lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson)

      // draw Game Objects
      const coordArrayY = Object.values(this.map.gameObjects)
      const sortedArrayY = coordArrayY.sort((a, b) => {
        return a.y - b.y
      })

      // draw objects in lower Y coordinates first
      sortedArrayY.forEach(object => {
        object.sprite.draw(this.ctx, cameraPerson)
      })

      //draw upper layer
      this.map.drawUpperImage(this.ctx, cameraPerson)

      requestAnimationFrame(() => {
        step() // step function calls step() again when a new frame starts. not an app breaking infinite loop - other processes may still run
      })
    }
    step()
  }

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      // Is there someone here to talk to?
      this.map.checkForActionCutscene()
    })
  }

  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", e => {
      if (e.detail.whoId === "hero") {
        // Hero's position has changed
        this.map.checkForFootstepCutscene()
      }
    })
  }

  // function to be used for switching maps
  startMap(mapConfig) {
    // create new instance of OverworldMap, passing over config from specific map, in this case DemoRoom
    this.map = new OverworldMap(mapConfig)

    this.map.overworld = this

    // mount game objects onto map
    this.map.mountObjects()
  }

  init() {

    this.hud = new Hud()
    this.hud.init(document.querySelector(".game-container"))

    this.startMap(window.OverworldMaps.DemoRoom)

    this.bindActionInput()
    this.bindHeroPositionCheck()

    this.directionInput = new DirectionInput()
    this.directionInput.init()

    this.startGameLoop()

    // this.map.startCutscene([
    //   { type: "battle", enemyId: "beth" }
    //   // {type: "changeMap", map: "DemoRoom"}
    //   // {type: "textMessage", text: "This is my very first message!"}
    // ])
  }
}
