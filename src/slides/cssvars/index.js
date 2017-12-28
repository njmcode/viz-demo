import Slide from 'core/Slide'
import template from './template'

class CSSSlide extends Slide {
  constructor () {
    super()
    this.slideName = 'CSS Variables'
    this.template = template
  }
}

export default new CSSSlide()
