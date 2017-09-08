import {
  getTranslateVals,
  moveElement,
  setStyle
} from './util'

// 触发元素在鼠标左键按下时，鼠标指针样式
const MOUSE_DOWN_STYLE = {
  cursor: '-webkit-grabbing'
}
// 鼠标在触发元素内悬停的指针样式
const MOUSE_OVER_STYLE = {
  cursor: '-webkit-grab'
}

export default {
  bind ($el, binding, vnode) {
    let selector
    // 传入指令的绑定值，可以指定触发元素
    if (binding.value) {
      selector = binding.value
    }
    // 传入指令的参数，可以指定触发元素的 id，其优先级比绑定值值
    if (binding.arg) {
      selector = `#${binding.arg}`
    }
    // 在找不到指定触发元素情况下，触发元素也为绑定元素本身
    const $trigger = $el.querySelector(selector) || $el

    // 开始点的 x、y 坐标
    const startPoint = {
      x: undefined,
      y: undefined,
      translateX: undefined,
      translateY: undefined
    }

    // 鼠标移动时的回调
    const onmove = e => {
      moveElement($el, e, startPoint)
    }

    // 为触发元素绑定一些鼠标事件
    // 鼠标悬停时
    $trigger.addEventListener('mouseover', () => {
      setStyle($trigger, MOUSE_OVER_STYLE)
    })
    // 鼠标左键按下时
    $trigger.addEventListener('mousedown', e => {
      setStyle($trigger, MOUSE_DOWN_STYLE)
      // 记录开始点坐标
      startPoint.x = e.clientX
      startPoint.y = e.clientY
      // 以及开始时，元素的 translate 属性值
      const translate = getTranslateVals($el)
      startPoint.translateX = translate.translateX
      startPoint.translateY = translate.translateY
      // 当鼠标左键按下时，给触发元素绑定鼠标移动事件
      document.addEventListener('mousemove', onmove)
    })
    // 鼠标左键弹起时
    document.addEventListener('mouseup', () => {
      setStyle($trigger, MOUSE_OVER_STYLE)
      // 当鼠标左键弹起时，解绑鼠标移动事件
      document.removeEventListener('mousemove', onmove)
    })
  }
}
