import { dom, lz } from 'core/utils'
import Timer from 'core/Timer'
import template from './template'
import { outOfTime } from './styles.css'

class UI {
  static KEYS = {
    PREV: 37, // left
    NEXT: 39, // right
  }
  static REFRESH_INTERVAL = 200

  constructor (containerEl, timerDuration = 0, playerInstance, analyserInstance) {
    if (!containerEl) {
      throw 'UI: no DOM element found'
    }

    if (!playerInstance) {
      throw 'UI: no instance of SlidePlayer given'
    }

    if (!analyserInstance) {
      throw 'UI: no instance of Analyser given'
    }

    this.containerEl = containerEl
    this.timerDuration = timerDuration
    this.player = playerInstance
    this.analyser = analyserInstance

    this.el = dom(template)
    this.containerEl.appendChild(this.el)
  }

  init () {
    this.initSlideChanger()
    this.initTimer()
    this.initProgressBars()
    this.initSourceSelect()
    this.initKeyBindings()

    this.updateSlideChanger()
    this.updateSlideProgressBar()
    this.update()

    setInterval(() => { this.update() }, Timer.REFRESH_INTERVAL)
  }

  update () {
    const t = this.updateTimer()
    this.updateTimeProgressBar(t)
  }

  /* Slide changer / status */

  initSlideChanger () {
    this.prevBut = this.el.querySelector('[data-dir="prev"]')
    this.nextBut = this.el.querySelector('[data-dir="next"]')
    this.numSpan = this.el.querySelector('[data-slideno]')

    this.prevBut.addEventListener('click', e => {
      this.player.prev()
      this.updateSlideChanger()
      this.updateSlideProgressBar()
    })
    this.nextBut.addEventListener('click', e => {
      this.player.next()
      this.updateSlideChanger()
      this.updateSlideProgressBar()
    })
  }

  updateSlideChanger () {
    const curr = this.player.currentSlideIdx
    const tot = this.player.slides.length
    this.numSpan.textContent = `${curr + 1} / ${tot}`
    this.prevBut.disabled = (curr === 0)
    this.nextBut.disabled = (curr === tot - 1)
  }

  /* Countdown timer */

  initTimer () {
    this.timer = new Timer(this.timerDuration)

    const timerEl = this.el.querySelector('[data-timer]')
    const timerGoBut = timerEl.querySelector('[data-start]')
    const timerResetBut = timerEl.querySelector('[data-reset]')
    this.countEl = timerEl.querySelector('span')

    timerGoBut.addEventListener('click', e => {
      this.timer.start()
    })
    timerResetBut.addEventListener('click', e => {
      this.timer.stop()
      this.timer.set(this.timerDuration)
    })
  }

  updateTimer () {
    let t = this.timer.update()
    if (t <= 0) {
      this.countEl.classList.add(outOfTime)
      t = 0
    }

    const _m = lz(Math.floor(t / Timer.MINUTE))
    const _s = lz(Math.floor((t % Timer.MINUTE) / Timer.SECOND))

    this.countEl.textContent = `${_m}:${_s}`
    return t
  }

  /* Progress bars */

  initProgressBars () {
    this.progBarSlide = this.el.querySelector('[data-prog-slide]')
    this.progBarTime = this.el.querySelector('[data-prog-time]')
  }

  updateSlideProgressBar () {
    const curr = this.player.currentSlideIdx
    const tot = this.player.slides.length
    this.progBarSlide.style.width = `${(curr + 1) / tot * 100 >> 0}%`
  }

  updateTimeProgressBar (t) {
    this.progBarTime.style.width = `${100 - (t / this.timerDuration * 100 >> 0)}%`
  }

  /* Source select */

  initSourceSelect () {
    const sels = this.el.querySelectorAll('[data-sel]')
    for (let i = 0; i < sels.length; i++) {
      sels[i].addEventListener('change', e => {
        this.analyser.setMode(e.srcElement.value)
      })
    }
  }

  /* Keyboard bindings */

  initKeyBindings () {
    window.addEventListener('keyup', e => {
      switch (e.keyCode) {
        case UI.KEYS.PREV:
          this.player.prev()
          this.updateSlideChanger()
          this.updateSlideProgressBar()
          break
        case UI.KEYS.NEXT:
          this.player.next()
          this.updateSlideChanger()
          this.updateSlideProgressBar()
          break
        default:
          break
      }
    })
  }
}

export default UI
