import { dom } from './utils'

const FRAME_TIME = 1000 / 60

class SlidePlayer {
  constructor (appEl, slides, opts = {}, onSlideChange = () => {}) {
    if (!appEl) {
      throw 'SlidePlayer: no DOM element found'
    }

    if (!slides || !(slides instanceof Array) || !slides.length) {
      throw 'SlidePlayer: no slides found'
    }

    this.appEl = appEl
    this.slides = slides
    this.opts = opts
    this.onSlideChange = onSlideChange

    this._lt = Date.now()
    this.frame = this.frame.bind(this)
  }

  init (idx = 0) {
    this.goToSlide(idx)
    this.frame()
  }

  frame () {
    requestAnimationFrame(this.frame)
    const ct = Date.now()

    if (ct - this._lt > FRAME_TIME) {
      this.update(ct)
      this.render(ct)
      this._lt = ct
    }
  }

  update (t) {
    this.currentSlide.update(t, this.opts)
  }

  render (t) {
    this.currentSlide.render(t, this.opts)
  }

  goToSlide (idx) {
    if (idx < 0 || idx > this.slides.length - 1) return false

    if (this.currentSlide) this.currentSlide.onExit(this.opts)

    this.currentSlide = this.slides[idx]
    this.currentSlideIdx = idx

    const newDom = dom(this.currentSlide.template)
    this.appEl.innerHTML = ''
    this.appEl.appendChild(newDom)

    this.onSlideChange(idx, newDom)

    this.currentSlide.onEnter(newDom, this.opts)

    return this.currentSlide
  }

  prev () {
    if (this.currentSlideIdx === 0) return false

    this.goToSlide(this.currentSlideIdx - 1)
    return this.currentSlideIdx
  }

  next () {
    if (this.currentSlideIdx === this.slides.length - 1) return false

    this.goToSlide(this.currentSlideIdx + 1)
    return this.currentSlideIdx
  }
}

export default SlidePlayer
