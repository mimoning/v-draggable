import {
  distance,
  getTranslateVals,
  moveElement,
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
// 原本的样式
const ORIGIN_STYLE = {}
// 额外的 class
let EXTRA_CLASS = ''
// 开始点的坐标及元素的 translate 值
const startPoint = {
  x: undefined,
  y: undefined,
  translateX: undefined,
  translateY: undefined
}
// 原始位置
const originPoint = {
  is: true,
  x: undefined,
  y: undefined,
  style: undefined
}
// 触发元素的选择器
let $selector = ''
// 触发元素
let $trigger = null
// 移动元素
let $el = null

// 一些对外暴露的事件
const $events = {
  onCatch () {},
  onDrag () {},
  onDrop () {}
}

// 鼠标移动
function onMove (event) {
  moveElement($el, event, startPoint)
  $events.onDrag({x: event.clientX, y: event.clientY})
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
  // 记录开始点坐标
  startPoint.x = event.clientX
  startPoint.y = event.clientY
  // 触发 onCatch 事件回调
  $events.onCatch({x: startPoint.x, y: startPoint.y})
  // 记录开始时，绑定元素的 translate 值
  const translate = getTranslateVals($el)
  Object.assign(startPoint, translate)
  // 记录原始位置及样式
  if (originPoint.is) {
    originPoint.is = false
    originPoint.style = Object.assign({}, $el.style)
    originPoint.x = startPoint.x
    originPoint.y = startPoint.y
  }
  // 添加额外的样式或 class
  setStyle($el, EXTRA_STYLE)
  $el.classList.add(EXTRA_CLASS)
  // 为 document 绑定 mousemove 事件
  document.addEventListener('mousemove', onMove)
}

// 鼠标左键在 document 上弹起时
// 要解除 document 上的 mousemove 事件，使元素不在随鼠标移动
// 即，拖动停止
function onDrop (event) {
  // 调用 onDrop 事件回调函数，并传入当前鼠标的位置和距离原始点距离作为参数
  // 且可依靠返回值决定是否返回初始位置
  const curPoint = {
    x: event.clientX,
    y: event.clientY
  }
  const backToOrigin = $events.onDrop(
    curPoint,
    distance(originPoint, curPoint)
  )
  if (backToOrigin) {
    setStyle($el, originPoint.style)
  } else {
    // 如果不用返回初始位置，则仅仅把添加的额外样式或 class 去除
    setStyle($el, ORIGIN_STYLE)
  }
  $el.classList.remove(EXTRA_CLASS)
  // 将鼠标样式还原成小手状
  setStyle($trigger, MOUSE_OVER_STYLE)
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

// 获取额外的样式或 class 及其原本的样式
function getExtraStyleAndClass (value) {
  if (!value || typeof value !== 'object') return
  if (value.draggingStyle) {
    Object.assign(EXTRA_STYLE, value.draggingStyle)
  }
  if (value.draggingClass) {
    EXTRA_CLASS = value.draggingClass
  }
}

// 获取绑定元素的需要修改的原始 style
function getOriginStyle (el) {
  Object.keys(EXTRA_STYLE).forEach(key => {
    ORIGIN_STYLE[key] = el.style[key]
  })
}

// 获取指令绑定的事件回调
function getEventsCallback (value) {
  if (value.onCatch && (typeof value.onCatch === 'function')) {
    $events.onCatch = value.onCatch
  }
  if (value.onDrag && (typeof value.onDrag === 'function')) {
    $events.onDrag = value.onDrag
  }
  if (value.onDrop && (typeof value.onDrop === 'function')) {
    $events.onDrop = value.onDrop
  }
}

// 为触发元素绑定一堆事件
function bindListeners () {
  // 触发拖动元素
  $trigger.addEventListener('mouseover', triggerMouseover)
  // 开始拖动
  $trigger.addEventListener('mousedown', triggerMousedown)
  // 停止拖动
  $trigger.addEventListener('mouseup', onDrop)
}

// 移除所有已绑定事件
function removeListeners () {
  $trigger.removeEventListener('mouseover', triggerMouseover)
  $trigger.removeEventListener('mousedown', triggerMousedown)
  $trigger.removeEventListener('mouseup', onDrop)
  document.removeEventListener('mousemove', onMove)
}

// 当指令绑定到元素上时
function bind (el, binding, vnode) {
  // 获取触发元素
  getTrigger(el, binding)
  // 获取拖动时需要添加的额外样式或 class
  getExtraStyleAndClass(binding.value)
  // 获取绑定元素的原始 style
  getOriginStyle(el)
  // 获取指令绑定的事件回调
  getEventsCallback(binding.value)
  // 处理事件绑定，当 disabled 不为 true 时才绑定事件
  if (!binding.value.disabled) {
    bindListeners()
  }
}
// 指令解除绑定时，需把所有事件移除
function unbind () {
  removeListeners()
}
// 指令更新时
function update (el, binding, vnode) {
  // 如果指令的值中，disabled 指定为 true，则解绑所有已绑定事件
  if (binding.value.disabled) {
    removeListeners()
    setStyle($el, ORIGIN_STYLE)
    setStyle($trigger, {cursor: 'initial'})
  } else {
    bindListeners()
  }
}

export default {
  bind,
  unbind,
  update
}
