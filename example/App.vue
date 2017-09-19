<template>
  <div id="app">
    <div class="cube" style="color: green" v-draggable:trigger="{
      draggingStyle: {
        color: 'red'
      },
      draggingClass: 'mimo',
      onDrop,
      onDrag,
      onCatch,
      disabled
    }">
      <div id="trigger">Trigger</div>
      <div class="test-trigger">Trigger2</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    onDrop (a, dis) {
      console.log(a, dis)
      if (a.x > 300) {
        return true
      }
      return false
    },
    onDrag (p) {
      console.log('dragging')
      console.log(p)
      if (p.x > 500) {
        this.disabled = true
      }
    },
    onCatch (p) {
      console.log('catched')
      console.log(p)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.cube {
  width: 100px;
  height: 100px;
  background: #ddd;
  border-radius: 6px;
}
#trigger {
  display: inline-block;
  margin-top: 10px;
  box-shadow: 0 0 6px 0px rgba(0,0,0,0.8)
}
.test-trigger {
  display: inline-block;
  margin-top: 10px;
  box-shadow: 0 0 6px 0px rgba(255,0,0,0.8)
}
</style>
