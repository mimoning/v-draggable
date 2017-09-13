import Draggable from './draggable.directive'

export default {
  install: function (Vue, options) {
    Vue.directive('draggable', Draggable)
  }
}
