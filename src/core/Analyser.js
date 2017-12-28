import sampleMusic from 'assets/Rain.mp3'

class Analyser {
  static defaultOptions = {
    smoothing: 0.5,
    micMinDec: -80,
    musicMinDec: -100,
    fftSize: 128,
    musicStartTime: 0,
  }
  static MODE_MIC = 'mic'
  static MODE_MUSIC = 'music'

  init (options = {}) {
    this.actx = new (window.AudioContext || window.webkitAudioContext)()
    if (!this.actx) {
      throw 'Analyser: can not create audio context'
      // TODO: show something to the user
    }
    console.info('Analyser: audio context created')

    this.options = {
      ...Analyser.defaultOptions,
      options,
    }

    // Create AnalyserNode
    this.anode = this.actx.createAnalyser()
    this.anode.smoothingTimeConstant = this.options.smoothing
    this.anode.fftSize = this.options.fftSize

    // Create fixed array buffers for data population
    this.bufferLength = this.anode.frequencyBinCount
    this.buffers = {
      freq: new Uint8Array(this.bufferLength),
      time: new Uint8Array(this.bufferLength),
    }
  }

  update () {
    // Populate freq and time data from the AnalyserNode
    this.anode.getByteFrequencyData(this.buffers.freq)
    this.anode.getByteTimeDomainData(this.buffers.time)
  }

  avgFreq () {
    // Get average of current freq buffer
    let sum = 0
    for (let i = 0; i < this.bufferLength; i++) {
      sum += this.buffers.freq[i]
    }
    return sum / this.bufferLength
  }

  setMode (mode) {
    if (mode === Analyser.MODE_MIC) this.connectMic()
    if (mode === Analyser.MODE_MUSIC) this.connectMusic()
  }

  connectMic () {
    // Request user's default audio input
    navigator.mediaDevices.getUserMedia({
      audio: true,
    }).then(device => {
      this.micInput = device

      // Pause and kill the music if it's playing
      if (this.musicEl) this.musicEl.pause()
      if (this.inputNode) this.inputNode.disconnect()

      // Create a stream node for the mic and
      // hook it to the AnalyserNode
      this.inputNode = this.actx.createMediaStreamSource(this.micInput)
      this.inputNode.connect(this.anode)
      this.anode.minDecibels = this.options.micMinDec

      // We don't want the mic going to the speakers
      try {
        this.anode.disconnect(this.actx.destination)
      } catch (e) {
        // Wasn't connected anyway, no biggie
      }
    }).catch(e => {
      // TODO: user denies permission
    })
  }

  connectMusic () {
    if (!this.musicEl) {
      // Create an <audio> tag and source node for the music
      // if this is our first time using it
      this.musicEl = document.createElement('audio')
      this.musicEl.setAttribute('src', sampleMusic)
      this.musicEl.autoplay = true
      this.musicEl.loop = true
      this.musicEl.currentTime = this.options.musicStartTime
      this.musicNode = this.actx.createMediaElementSource(this.musicEl)
    }

    // Mute and disable the mic if it's on
    if (this.micInput) {
      this.micInput.getAudioTracks()[0].enabled = false
    }
    if (this.inputNode) this.inputNode.disconnect()

    // Hook the music node to the AnalyserNode
    // and play sound through the speakers
    this.inputNode = this.musicNode
    this.inputNode.connect(this.anode)
    this.anode.minDecibels = this.options.musicMinDec
    this.anode.connect(this.actx.destination)
  }
}

export default Analyser
