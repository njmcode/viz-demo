import Slide from 'core/Slide'
import template from './template'

class NodesSlide extends Slide {
  constructor () {
    super()
    this.slideName = 'Nodes'
    this.template = template
  }
}

export default new NodesSlide()
