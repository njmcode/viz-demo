
const _hasStorage = ('localStorage' in window)

class Timer {
  static storageKey = 'timer'
  static SECOND = 1000
  static MINUTE = 1000 * 60

  constructor (duration = 0, isPersistent = true) {
    this.isRunning = false
    this.isPersistent = isPersistent
    this._targetTimestamp = 0

    if (isPersistent) {
      this.hydrate(duration)
    } else {
      this.set(duration)
    }
  }

  set (duration = 0) {
    this.duration = duration
    this.timeRemaining = duration
    if (this.isPersistent) this._persist()

    return this.duration
  }

  hydrate (defaultDuration) {
    const storedDuration = _hasStorage ? window.localStorage.getItem(Timer.storageKey) : null
    const newDuration = (storedDuration !== null) ? parseInt(storedDuration) : defaultDuration
    this.set(newDuration)
    return newDuration
  }

  start () {
    this.isRunning = true
    this._targetTimestamp = Date.now() + this.timeRemaining
    this.update()
    return this.timeRemaining
  }

  stop () {
    this.update()
    this.isRunning = false
    return this.timeRemaining
  }

  reset () {
    this.targetTimestamp = Date.now() + this.duration
    this.timeRemaining = this.duration
    this.update()
    return this.timeRemaining
  }

  update () {
    if (this.isRunning) {
      this.timeRemaining = this._targetTimestamp - Date.now()
      if (this.isPersistent) this._persist()
    }
    return this.timeRemaining
  }

  _persist () {
    if (_hasStorage) window.localStorage.setItem(Timer.storageKey, this.timeRemaining)
  }
}

export default Timer
