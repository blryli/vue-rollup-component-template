<template>
  <div id="app">
    <h1>vue-rollup-component-template</h1>
    <p>轻松进行组件开发、发布、展示</p>
    <v-list>
      <v-list-item :list="list"></v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      list: [
        {
          title: '文档',
          url: 'https://github.com/blryli/vue-rollup-component-template'
        },
        {
          title: 'github',
          url: 'https://github.com/blryli'
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
