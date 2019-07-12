<template>
  <div class="v-list">
    <slot/>
    <div class="v-list-date">
      <div class="v-list-date-label">当前时间：</div>
      <div class="v-list-date-text">{{date}}</div>
    </div>
  </div>
</template>

<script>
import { formatDate } from 'utils/util';

export default {
  name: 'VList',
  data() {
    return {
      date: formatDate(new Date())
    }
  }
}
</script>

<style>
/* css */
.v-list {
  width: 300px;
  margin: 0 auto;
}
</style>

<style lang="scss">
/* scss */
.v-list-date {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  .v-list-date-label{
    font-size: 12px;
    color: #999;
  }
  .v-list-date-text{
    font-size: 12px;
    color: #666;
  }
}
</style>

<style scoped>
/* scoped */
.v-list-1 {
  background-color: #333;
}
</style>

