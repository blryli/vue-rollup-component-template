<template>
  <div class="test">{{data}}: vue-test</div>
</template>

<script>
export default {
  name: "VueTest",

  components: {
    VueTest
  },

  inheritAttrs: false,

  props: {
    ...props,

    minItemSize: {
      type: [Number, String],
      required: true
    }
  },

  data() {
    return {
      data: "测试"
    };
  },

  created() {},

  activated() {},

  deactivated() {},

  methods: {}
};
</script>

<style lang="scss" scoped>
.test{
  color: red;
}
</style>

