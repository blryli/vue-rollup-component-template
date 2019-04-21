<template>
  <div class="vue-col" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "VueCol",
  props: {
    span: Number
  },
  data() {
    return {};
  },
  computed: {
    style() {
      let style = {};

      if (this.gutter) {
        style.paddingLeft = this.gutter / 2 + "px";
        style.paddingRight = style.paddingLeft;
      }

      if(this.span) {
        style.width =  Math.floor((this.span / 24 * 100) * 10000) / 10000 + "%";
      } else {
        style.width = '100%';
      }

      return style;
    },
    gutter() {
      let parent = this.$parent;
      while (parent && parent.$options.name !== "VueRow") {
        parent = parent.$parent;
      }
      return parent ? parent.gutter : 0;
    }
  },
  methods: {}
};
</script>
