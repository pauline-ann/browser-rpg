class OverworldMap {
  constructor(config) {
    this.overworld = null
    this.gameObjects = config.gameObjects
    this.cutsceneSpaces = config.cutsceneSpaces || {}
    this.walls = config.walls || {}

    this.lowerImage = new Image()
    this.lowerImage.src = config.lowerSrc // contain tiles

    this.upperImage = new Image()
    this.upperImage.src = config.upperSrc // contain things we draw above the characters

    this.isCutscenePlaying = false
  }

  drawLowerImage(ctx, cameraPerson) {
    // this call back is fired and image pixels are copied onto canvas
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    )
  }

  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    )
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction)
    return this.walls[`${x},${y}`] || false // if there is a wall, will evaluate to true
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach(key => {

      let object = this.gameObjects[key]
      object.id = key // "hero", "npcA"

      // TODO: determine if this object should actually mount or not

      // mount object onto map
      object.mount(this)
    })
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true

    // start loop of async events
    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this
      })
      await eventHandler.init()
    }

    this.isCutscenePlaying = false

    // reset npcs to do their idle behavior
    Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
  }

  checkForActionCutscene() {
    const hero = this.gameObjects["hero"] // TODO: make dynamic
    const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction)

    const match = Object.values(this.gameObjects).find(object => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
    })

    if (!this.isCutscenePlaying && match && match.talking.length) {
      this.startCutscene(match.talking[0].events) // TODO: make index dynamic relative to story progress
    }
  }

  checkForFootstepCutscene() {
    const hero = this.gameObjects["hero"]
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`] // look up if hero is on cutscene space
    if (!this.isCutscenePlaying && match) {
      this.startCutscene(match[0].events) // TODO: make index dynamic relative to story progress
    }
  }

  // functions below help with moving characters on screen
  addWall(x, y) {
    this.walls[`${x},${y}`] = true
  }

  removeWall(x, y) {
    delete this.walls[`${x},${y}`]
  }

  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY)
    const { x, y } = utils.nextPosition(wasX, wasY, direction)
    this.addWall(x, y)
  }
}
