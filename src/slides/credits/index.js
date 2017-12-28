import Slide from 'core/Slide'
import template from './template'

class CreditsSlide extends Slide {
  constructor () {
    super()
    this.title = 'End'
    this.template = template
  }

  onEnter (el) {
    this.titleEl = el.querySelector('h2')
  }

  update (t, opts) {
    opts.analyser.update()
  }

  render (t, opts) {
    const avg = opts.analyser.avgFreq()
    const s = 1 + ((avg / 255) * 2)
    this.titleEl.style.setProperty('--scale', s)
  }
}

export default new CreditsSlide()
