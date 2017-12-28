import 'sharedStyles/main.css'
import 'prismjs/themes/prism-okaidia.css'

import Analyser from 'core/Analyser'
import SlidePlayer from 'core/SlidePlayer'
import { getIdxFromHash } from 'core/utils'
import UI from 'ui'
import slides from 'slides'

// Analyser
const analyser = new Analyser()
analyser.init()

// Slide player w/URL hash history
const player = new SlidePlayer(
  document.getElementById('app'),
  slides,
  { analyser },
  (idx) => (window.location.hash = idx),
)
player.init(getIdxFromHash())
window.addEventListener('hashchange', e => {
  player.goToSlide(getIdxFromHash())
})

// Slide show UI
const ui = new UI(
  document.querySelector('#controls'),
  1000 * 60 * 10, // 10 mins
  player,
  analyser,
)
ui.init()
