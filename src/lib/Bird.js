export default class Bird {
  constructor() {
    this.x = 80
    this.y = 250
    this.width = 40
    this.height = 30
    this.alive = true
    this.gravity = 0
    this.velocity = 0.3
    this.jump = -6
  }

  fly() {
    this.gravity = this.jump
  }

  update() {
    this.gravity += this.velocity
    this.y += this.gravity
  }

  isDead(height, pipes) {
    // console.log(height + ' ' + this.y + this.height)
    if (this.y >= height || this.y + this.height <= 0) {
      return true
    }

    for (let i in pipes) {
      if (!(
        this.x > pipes[i].x + pipes[i].width ||
        this.x + this.width < pipes[i].x ||
        this.y > pipes[i].y + pipes[i].height ||
        this.y + this.height < pipes[i].y
      )) {
        return true
      }
    }
  }
}