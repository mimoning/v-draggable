import {
  getTranslateVals,
  moveElement,
  removeStyle,
  setStyle
} from './utils'

// 触发元素在鼠标左键按下时，鼠标指针样式
const MOUSE_DOWN_STYLE = {
  cursor: '-webkit-grabbing'
}
// 鼠标在触发元素内悬停的指针样式
const MOUSE_OVER_STYLE = {
  cursor: '-webkit-grab'
}
// 额外的样式
const EXTRA_STYLE = {}
// 开始点的坐标及元素的 translate 值
const startPoint = {
  x: undefined,
  y: undefined,
  translateX: undefined,
  translateY: undefined
}
// 触发元素的选择器
let $selector = ''
// 触发元素
let $trigger = null
// 移动元素
let $el = null

// 鼠标移动
function onMove (event) {
  moveElement($el, event, startPoint)
}

// 触发元素的一些事件
// 鼠标移动到触发元素上时，应显示为小手
function triggerMouseover () {
  setStyle($trigger, MOUSE_OVER_STYLE)
}

// 鼠标在触发元素上按下时，应显示为抓取的小手
// 记录开始点坐标及绑定元素的 translate 值
// 给 document 绑定鼠标移动事件，使绑定元素可以随鼠标移动，即拖动效果
function triggerMousedown (event) {
  setStyle($trigger, MOUSE_DOWN_STYLE)
  setStyle($el, EXTRA_STYLE)
  // 记录开始点坐标
  startPoint.x = event.clientX
  startPoint.y = event.clientY
  // 记录开始时，绑定元素的 translate 值
  const translate = getTranslateVals($el)
  startPoint.translateX = translate.translateX
  startPoint.translateY = translate.translateY
  // 为 document 绑定 mousemove 事件
  document.addEventListener('mousemove', onMove)
}

// 鼠标左键在 document 上弹起时
// 要解除 document 上的 mousemove 事件，使元素不在随鼠标移动
// 即，拖动停止
function onDrop () {
  // 将鼠标样式还原成小手状
  setStyle($trigger, MOUSE_OVER_STYLE)
  removeStyle($el, EXTRA_STYLE)
  // 移除 document 上的 mousemove 事件
  document.removeEventListener('mousemove', onMove)
}

// 获取触发元素及其选择器
function getTrigger (el, binding) {
  // 如果绑定值是字符串，可以指定触发元素的选择器，优先级比指令参数低
  if (binding.value && typeof binding.value === 'string') {
    $selector = binding.value
  }
  // 传入指令的参数，可以指定触发元素的 id，其优先级比绑定值高
  if (binding.arg) {
    $selector = `#${binding.arg}`
  }
  // 在找不到指定触发元素情况下，触发元素为绑定元素本身
  $trigger = el.querySelector($selector) || el
  $el = el
}

// 获取额外的样式或 class
function getExtraStyleAndClass (value) {
  if (!value || typeof value !== 'object') return
  Object.keys(value).forEach(key => {
    switch (key) {
      case 'draggingStyle':
        Object.assign(EXTRA_STYLE, value[key])
        break
      default:
    }
  })
}
// 当指令绑定到元素上时
function bind (el, binding, vnode) {
  // 获取触发元素
  getTrigger(el, binding)
  // 获取拖动时需要添加的额外样式或 class
  getExtraStyleAndClass(binding.value)
  // 处理事件绑定
  // 触发拖动元素
  $trigger.addEventListener('mouseover', triggerMouseover)
  // 开始拖动
  $trigger.addEventListener('mousedown', triggerMousedown)
  // 停止拖动
  document.addEventListener('mouseup', onDrop)
}
// 指令解除绑定时，需把所有事件移除
function unbind () {
  $trigger.removeEventListener('mouseover', triggerMouseover)
  $trigger.removeEventListener('mousedown', triggerMousedown)
  document.removeEventListener('mouseup', onDrop)
}

export default {
  bind,
  unbind
}
