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
      idleDown: [[0, 0]],
    }
    this.currentAnimation = config.currentAnimation || "idleDown"
    this.currentAnimationFrame = 0 // which array within array of animation frames are we displaying

    // Reference the game object (what created sprite)
    this.gameObject = config.gameObject
  }

  // this call back is fired and image pixels are copied onto canvas
  draw(ctx) {
    const x = this.gameObject.x * 16 - 8
    const y = this.gameObject.y * 16 - 18

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)

    // draw sprite only once sprite is loaded
    this.isLoaded &&
      ctx.drawImage(
        this.image,
        0, // left cut
        0, // top cut
        32, // width of cut
        32, // height of cut
        x, // x position of hero
        y, // y position of hero
        32, // scale/size of character on map
        32
      )
  }
}
