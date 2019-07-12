<template>
  <div>
    <a
      class="v-list-item"
      v-for="(item, index) in list"
      :key="index"
      :href="item.url"
    >{{item.title}}</a>
  </div>
</template>

<script>
export default {
  name: 'VListItem',
  props: ['list']
}
</script>

<style>
.v-list-item {
  padding: 10px;
  margin: 0 5px;
}
</style>
