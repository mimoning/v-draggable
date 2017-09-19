import {
  distance,
  getTranslateVals,
  moveElement,
  setStyle
} from '@/utils'

// 测试 setStyle
describe('SetStyle', () => {
  const test = document.createElement('div')
  it('Set position', () => {
    setStyle(test, {
      position: 'absolute'
    })
    expect(test.style.position).equal('absolute')
  })
})

// 测试 getTranslatesVals
describe('GetTranslateVals', () => {
  let test
  beforeEach(() => {
    test = document.createElement('div')
  })
  // 正常值的获取
  it('Get div translate values', () => {
    test.style.transform = 'translate(10px, 20px) rotate(120deg)'
    const translates = getTranslateVals(test)
    expect(translates.translateX).equal(10)
    expect(translates.translateY).equal(20)
  })
  // 当目标没有 transform 属性时
  it('Get translate values from div without transform attributes', () => {
    const translates = getTranslateVals(test)
    expect(translates.translateX).equal(0)
    expect(translates.translateY).equal(0)
  })
  // 当目标有 transform 属性但没有 translate 值时
  it('Get translate values from div with transform attributes but without translate values', () => {
    test.style.transform = 'rotate(120deg)'
    const translates = getTranslateVals(test)
    expect(translates.translateX).equal(0)
    expect(translates.translateY).equal(0)
  })
})

// 测试 moveElement
describe('MoveElement', () => {
  // 模拟事件
  const event = {
    clientX: 100,
    clientY: 200
  }
  // 模拟开始点的值
  const startPoint = {
    x: 10,
    y: 20,
    translateX: 0,
    translateY: 100
  }
  // 创建元素
  let test
  beforeEach(() => {
    test = document.createElement('div')
  })
  // 移动没有 transform 属性的元素
  it('Move the element without transform attributes', () => {
    moveElement(test, event, startPoint)
    expect(test.style.transform)
      .equal('translate(90px, 280px)')
  })
  // 移动有 transform 属性的元素
  it('Mouve the element with transform attributes', () => {
    test.style.transform = 'translate(20px, 30px) rotate(200deg)'
    moveElement(test, event, startPoint)
    expect(test.style.transform)
      .equal('translate(90px, 280px) rotate(200deg)')
  })
  // 移动有 transform 属性但没有 translate 值的元素
  it('Move the element with transform attributes but without translate values', () => {
    test.style.transform = 'rotate(120deg)'
    moveElement(test, event, startPoint)
    expect(test.style.transform)
      .equal('rotate(120deg) translate(90px, 280px)')
  })
})

// 测试 distance
describe('Calculate Distance', () => {
  const a = { x: 2, y: 4 }
  const b = { x: 5, y: 8 }
  // 正常计算距离
  it('Normal Distance', () => {
    expect(distance(a, b))
      .eql({
        dX: 3,
        dY: 4,
        d: 5
      })
  })
})
