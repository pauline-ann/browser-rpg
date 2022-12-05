class OverworldMap {
  constructor(config) {
    this.overworld = null
    this.gameObjects = {} // live objects
    this.configObjects = config.configObjects // configuration for game object instances

    this.cutsceneSpaces = config.cutsceneSpaces || {}
    this.walls = config.walls || {}

    this.lowerImage = new Image()
    this.lowerImage.src = config.lowerSrc // contain tiles

    this.upperImage = new Image()
    this.upperImage.src = config.upperSrc // contain things we draw above the characters

    this.isCutscenePlaying = false
    this.isPaused = false
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
    Object.keys(this.configObjects).forEach(key => {

      let object = this.configObjects[key]
      object.id = key // "hero", "npcA"

      let instance
      if (object.type === "Person") {
        instance = new Person(object)
      }
      if (object.type === "PizzaStone") {
        instance = new PizzaStone(object)
      }
      this.gameObjects[key] = instance
      this.gameObjects[key].id = key

      // mount object onto map
      instance.mount(this)
    })
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true

    // start loop of async overworld events
    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this
      })
      const result = await eventHandler.init()
      if (result === "LOST_BATTLE") {
        break
      }
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

    // if there is no current cutscene and there is an object we can talk to...
    if (!this.isCutscenePlaying && match && match.talking.length) {

      const relevantScenario = match.talking.find(scenario => {
        // returns true if every condition within every() is met,
        // ie) if required flags have been marked true inside of player state
        return (scenario.required || []).every(storyFlags => {
          return playerState.storyFlags[storyFlags]
        })
      })

      // start relevant scenario if the required story flags are met
      relevantScenario && this.startCutscene(relevantScenario.events)
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
