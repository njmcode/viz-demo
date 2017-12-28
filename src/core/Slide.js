
class Slide {
  constructor () {
    this.slideName = 'Slide'
    this.template = ``
  }

  onEnter (el) {
    return false
  }

  update (t) {
    return false
  }

  render (t) {
    return false
  }

  onExit (t) {
    return false
  }
}

export default Slide
