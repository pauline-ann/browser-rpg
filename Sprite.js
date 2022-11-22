// Manages everything visual that we see on the screen
class Sprite {
  constructor(config) {
    // Set up the image
    this.image = new Image()
    this.image.src = config.src // path to image that we want to load
    this.image.onload = () => {
      this.isLoaded = true
    }

    //Shadow
    this.shadow = new Image()
    this.useShadow = true // hard code for now, later config.useShadow || false
    if (this.useShadow) {
      this.shadow.src = "/images/characters/shadow.png"
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true
    }

    // Configuring Animations & Initial State
    this.animations = config.animations || {
      // default
      // each animation has a name and a series of frames inside of an array
      // define all walking and standing animations
      "idle-down": [
        [0, 0]
      ],
      "walk-down": [
        [1,0], [0,0], [3,0], [0,0]
      ]
    }
    this.currentAnimation = "walk-down" //config.currentAnimation || "idle-down"
    this.currentAnimationFrame = 0 // which array within array of animation frames are we displaying

    this.animationFrameLimit = config.animationFrameLimit || 16 // how many game loop frames do we want to show ie) cadence\
    this.animationFrameProgress = this.animationFrameLimit

    // Reference the game object (what created sprite)
    this.gameObject = config.gameObject
  }

  // in charge of keeping track of current animation and animation frame
  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame]
  }

  updateAnimationProgress () {
    // downtick frame progress
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1
      return
    }

    // reset counter if no more frame progress
    this.animationFrameProgress = this.animationFrameLimit
    this.currentAnimationFrame += 1

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0
    }
  }

  // this call back is fired and image pixels are copied onto canvas
  draw(ctx) {
    const x = this.gameObject.x - 8
    const y = this.gameObject.y - 18

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)

    const [frameX, frameY] = this.frame

    // draw sprite only once sprite is loaded
    this.isLoaded &&
      ctx.drawImage(
        this.image,
        frameX * 32, // left cut
        frameY * 32, // top cut
        32, // width of cut
        32, // height of cut
        x, // x position of hero
        y, // y position of hero
        32, // scale/size of character on map
        32
      )

      this.updateAnimationProgress()
  }
}
