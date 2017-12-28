import Slide from 'core/Slide'
import template from './template'

class TitleSlide extends Slide {
  constructor () {
    super()
    this.slideName = 'Title'
    this.template = template
  }

  onEnter (el, opts) {
    this.dataLen = opts.analyser.bufferLength

    this.titleEl = el.querySelector('h1')

    this.c = el.querySelector('canvas')
    this.c.height = 255
    this.c.width = this.dataLen

    this.ctx = this.c.getContext('2d')
    this.ctx.fillStyle = '#33ff99'
  }

  update (t, opts) {
    opts.analyser.update()
  }

  render (t, opts) {
    // Viz: title shadow sizes
    const avg = opts.analyser.avgFreq() / 255
    const fuzz = 10 + avg * 60 >> 0
    this.titleEl.style.setProperty('--exp-r', `${fuzz}px`)
    this.titleEl.style.setProperty('--exp-l', `-${fuzz}px`)

    // Viz: bg pixel waveform
    const td = opts.analyser.buffers.time
    this.ctx.clearRect(0, 0, this.c.width, this.c.height)
    for (let i = 0; i < this.dataLen; i++) {
      this.ctx.fillRect(i, td[i], 1, 1)
    }
  }
}

export default new TitleSlide()
