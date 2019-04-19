<template>
  <div class="vue-form-item" :class="{'is-required': required}" :style="{marginBottom: rowledge, '--lineHeight': lineHeight}">
    <label class="vue-form-item__label" :style="{flex: `0 0 ${labelWidth}`}" v-if="label">{{label}}</label>
    <div ref="formItemContent" class="vue-form-item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "VueFormItem",
  props: {
    label: String,
    labelWidth: String,
    required: Boolean
  },
  data() {
    return {};
  },
  computed: {
    form() {
      let parent = this.$parent;
      let parentName = parent.$options.name;
      while (parentName !== "VueForm") {
        parent = parent.$parent;
        parentName = parent.$options.name;
      }
      return parent;
    },
    lineHeight() {
      return this.form.lineHeight;
    },
    // 行距
    rowledge() {
      return this.form.rowledge;
    }
  }
};
</script>
