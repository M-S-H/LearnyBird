export default class Pipe {
  constructor(x, y, height) {
    this.x = x
    this.y = y
    this.width = 50
    this.height = height
    this.speed = 3
  }

  update() {
    this.x -= this.speed
  }

  isOut() {
    if (this.x + this.width < 0) {
      return true
    } else {
      return false
    }
  }
}