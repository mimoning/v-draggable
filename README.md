# vue-draggable

Code in [src](./src).

> A vue directive to let your components drag and drop ~

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

## Usage

### In template

You can use the *v-draggable* very easily in your vue application.

```html
<div v-draggable:triggerId="{...options} or 'triggerSelector'">
  <div id="triggerId">This is the trigger</div>
</div>
```

### Directive Arguments

| Arguments | Default | Options | Required | Introduction |
|-----------|---------|---------|----------|--------------|
| arg | - | - | no | The id of trigger element in binding element. If no this argument, the trigger element will be the binding element. This argument has a higher priority than the next argument. |
| value | - | `string` / `object` | no | When `string`, it's the selector of trigger element, If the selector is no matches, the trigger element will be the binding element too; When `object`, look at [options](#Options). |

| 指令参数 | 默认值 | 可选项 | 必填 | 简介 |
|---------|-------|-------|-----|------|
| arg | - | - | 否 | 触发元素的 id。如果不指定，则触发元素是绑定元素本身。优先级比字符串形式的 value 高 |
| value | - | `字符串` / `对象` | 否 | 当其是字符串，则指定了触发元素的选择器，如果此选择器没有匹配的元素，则触发元素是绑定元素本身；当其实对象，请看[配置项](#Options) |

### Options
| Name | Default | Options | Required | Introduction |
|------|---------|---------|----------|--------------|
| draggingStyle | - | - | no | You can change the style attribute of the binding element by this option. |
| draggingClass | - | - | no | You can add one class name in the classList of the binding element by this option. |
| onDrop | - | - | no | The callback when you release the trigger. It has two arguments. First argument is the current mouse point, the second is the distance between the origin point add the current point. |
| onDrag | - | - | no | The callback when you are dragging the element. There is just one argument in this callback that is the current mouse point. |
| onCatch | - | - | no | The callback when you are mousedown add ready to drag the element. It has only one argument that is the current mouse point. |
| disabled | false | - | no | If true, you can't drag the element any more |

| 名称 | 默认值 | 可选项 | 必填 | 简介 |
|-----|-------|--------|-----|-----|
| draggingStyle | - | - | 否 | 定义了拖拽时绑定元素额外添加的样式 |
| draggingClass | - | - | 否 | 定义了拖拽时绑定元素额外添加的类名 |
| onDrop | - | - | 否 | 当一次拖拽完成时的事件回调。接收两个参数，第一个参数是当前鼠标的位置，第二个参数是当前拖动距离原始位置的距离 |
| onDrag | - | - | 否 | 拖动时的事件回调。接收一个参数，即当前鼠标的位置 |
| onCatch | - | - | 否 | 按下鼠标准备开始拖动时的事件回调。接收一个参数，即当前鼠标的位置 |
| disabled | false | - | 否 | 当为 true 时，无法再拖动元素 |
