// 给元素设定样式
function setStyle (el, style) {
  const styles = Object.keys(style)
  styles.forEach(key => {
    el.style[key] = style[key]
  })
  return () => {
    styles.forEach(key => {
      el.style[key] = ''
    })
  }
}

// 获取元素的 translate 属性值
function getTranslateVals (el) {
  const reg = /translate\((.*?)\)/
  const translateVals = el.style.transform
  // 如果没有 translate 值的话，则
  if (translateVals && translateVals.match(reg)) {
    const vals = translateVals.match(reg)[1].replace(/px/g, '').split(',')
    return {
      translateX: parseFloat(vals[0]),
      translateY: parseFloat(vals[1])
    }
  }
  return {
    translateX: 0,
    translateY: 0
  }
}

// 移动元素
function moveElement (el, event, start) {
  // 鼠标移动距离
  const distanceX = event.clientX - start.x
  const distanceY = event.clientY - start.y
  // 实际的 translate 值
  const translateX = distanceX + start.translateX
  const translateY = distanceY + start.translateY
  // 修改元素的 transform 属性
  const translateReg = /translate\(.*?\)/
  const originTransform = el.style.transform
  // 如果 transform 属性中有 traslate 的值，则替换
  if (originTransform && originTransform.match(translateReg)) {
    setStyle(el, {
      transform: originTransform.replace(translateReg,
        `translate(${translateX}px, ${translateY}px)`)
    })
  } else { // 如果没有，则直接接上 translate 的值
    setStyle(el, {
      transform: originTransform
        ? `${originTransform} translate(${translateX}px, ${translateY}px)`
        : `translate(${translateX}px, ${translateY}px)`
    })
  }
}

export {
  getTranslateVals,
  moveElement,
  setStyle
}
