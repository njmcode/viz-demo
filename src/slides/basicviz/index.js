import Slide from 'core/Slide'
import template from './template'

class BasicVizSlide extends Slide {
  static EQ_NUM_BARS = 20
  static CHAT_MAX_SIZE = 200

  constructor () {
    super()
    this.title = 'Basic examples'
    this.template = template
  }

  onEnter (el, opts) {
    // EQ
    this.eqEl = el.querySelector('[data-example="eq"] > div')
    this.eqBarEls = []
    for (let i = 0; i < BasicVizSlide.EQ_NUM_BARS; i++) {
      const barEl = document.createElement('span')
      barEl.style.left = `${(i / BasicVizSlide.EQ_NUM_BARS) * 100 >> 0}%`
      this.eqEl.appendChild(barEl)
      this.eqBarEls.push(barEl)
    }

    // Spec
    this.specEl = el.querySelector('[data-example="spec"] > canvas')
    this.specCtx = this.specEl.getContext('2d')

    // Chat
    this.chatEl = el.querySelector('[data-example="chat"] img')
  }

  update (t, opts) {
    opts.analyser.update()
  }

  render (t, opts) {
    const freqData = opts.analyser.buffers.freq
    const freqAvg = opts.analyser.avgFreq()
    const timeData = opts.analyser.buffers.time
    const dataLen = opts.analyser.bufferLength

    // EQ
    for (let i = 0; i < BasicVizSlide.EQ_NUM_BARS; i++) {
      if (freqData[i] !== undefined) {
        this.eqBarEls[i].style.height = `${(freqData[i] / 255) * 100 >> 0}%`
      }
    }

    // Spec
    const sp = this.specEl.width / dataLen
    const cx = this.specEl.width * 0.5 >> 0
    const cy = this.specEl.height * 0.5 >> 0

    this.specCtx.clearRect(0, 0, this.specEl.width, this.specEl.height)

    this.specCtx.strokeStyle = 'limegreen'
    this.specCtx.lineWidth = 3
    this.specCtx.beginPath()

    let tdSum = 0
    for (let i = 0; i < dataLen; i++) {
      const x = sp * i
      const y = timeData[i] / 255 * this.specEl.height
      if (i === 0) {
        this.specCtx.moveTo(x, y)
      } else {
        this.specCtx.lineTo(x, y)
      }
      tdSum += timeData[i]
    }
    this.specCtx.stroke()

    const exp = (tdSum / dataLen) / 255 * 100
    this.specCtx.fillStyle = 'rgba(255,255,255,0.4)'
    this.specCtx.fillRect(cx - exp, 0, 1, this.specEl.height)
    this.specCtx.fillRect(cx + exp, 0, 1, this.specEl.height)
    this.specCtx.fillRect(0, cy - exp, this.specEl.width, 1)
    this.specCtx.fillRect(0, cy + exp, this.specEl.width, 1)

    // Chat
    const rad = 10 + (freqAvg / 255) * BasicVizSlide.CHAT_MAX_SIZE >> 0
    this.chatEl.style.setProperty('--rad', `${rad}px`)
  }
}

export default new BasicVizSlide()
