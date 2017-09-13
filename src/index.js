import Vue from 'vue'

// draggable directive
import Draggable from './draggable.directive'

const directives = {
  Draggable
}

Object.keys(directives)
  .forEach(dir => {
    Vue.directive(dir, directives[dir])
  })
