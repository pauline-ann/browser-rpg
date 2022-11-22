class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects

    this.lowerImage = new Image()
    this.lowerImage.src = config.lowerSrc // contain tiles

    this.upperImage = new Image()
    this.upperImage.src = config.upperSrc // contain things we draw above the characters
  }

  drawLowerImage(ctx) {
    ctx.drawImage(this.lowerImage, 0, 0) // this call back is fired and image pixels are copied onto canvas
  }

  drawUpperImage(ctx) {
    ctx.drawImage(this.upperImage, 0, 0)
  }
}

// object containing all the different maps within game
window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: "/images/maps/DemoLower.png", // path to image that we want to load
    upperSrc: "/images/maps/DemoUpper.png",
    gameObjects: {
      hero: new GameObject({
        x: 5,
        y: 6,
      }),
      npc1: new GameObject({
        x: 7,
        y: 9,
        src: "/images/characters/people/npc1.png",
      }),
    },
  },
  Kitchen: {
    lowerSrc: "/images/maps/KitchenLower.png",
    upperSrc: "/images/maps/KitchenUpper.png",
    gameObjects: {
      hero: new GameObject({
        x: 3,
        y: 5,
      }),
      npcA: new GameObject({
        x: 9,
        y: 6,
        src: "/images/characters/people/npc2.png",
      }),
      npcB: new GameObject({
        x: 10,
        y: 8,
        src: "/images/characters/people/npc3.png",
      }),
    },
  },
}
