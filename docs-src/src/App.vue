<template>
  <div id="app">
    <center>
      <h1>vue-rollup-component</h1>
      <p>下载即可开始组件开发</p>
      <vue-component />
    </center>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      data: 'data'
    }
  },
  methods: {
    
  },
  mounted() {
    
  }
};
</script>

<style>
body {
  margin: 0;
}
#app {
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 10%;
}
</style>

