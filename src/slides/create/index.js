import Slide from 'core/Slide'
import template from './template'

class CreateSlide extends Slide {
  constructor () {
    super()
    this.slideName = 'Create context'
    this.template = template
  }
}

export default new CreateSlide()
