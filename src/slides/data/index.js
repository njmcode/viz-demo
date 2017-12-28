import Slide from 'core/Slide'
import template from './template'

const NUM_ITEMS = 7
const REFRESH_RATE = 400

class DataSlide extends Slide {
  constructor () {
    super()
    this.title = 'Normalization'
    this.template = template
  }

  onEnter (el, opts) {
    this.rawEl = el.querySelector('[data-raw]')
    this.normEl = el.querySelector('[data-norm]')
    this._lt = 0
  }

  render (t, opts) {
    // Viz: raw and normalised data arrays
    if (t - this._lt > REFRESH_RATE) {
      opts.analyser.update()
      const data = opts.analyser.buffers.freq

      let rawStr = '[\n'
      let normStr = '[\n'
      for (let i = 0; i < NUM_ITEMS; i++) {
        rawStr += '  ' + data[i] + ',\n'
        normStr += '  ' + (data[i] / 255).toFixed(4) + ',\n'
      }
      rawStr += '  ...\n]'
      normStr += '  ...\n]'

      this.rawEl.textContent = rawStr
      this.normEl.textContent = normStr

      this._lt = t
    }
  }
}

export default new DataSlide()
