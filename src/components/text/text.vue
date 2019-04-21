<template>
  <vue-content class="vue-text-content" :class="'vue-text__'+placement" v-show="!disabled" ref="vueTextContent" :style="{color: effect}" :data="data"></vue-content>
</template>

<script>
import VueContent from 'components/content'
export default {
  name: "VueText",
  components: {VueContent},
  props: {
    referenceId: String,
    data: [String, Object, Array],
    disabled: Boolean,
    effect: String,
    placement: {
      type: String,
      default: "bottom"
    }
  },
  data() {
    return {
      reference: null
    };
  },
  methods: {
    calculateCoordinate() {
      if (!this.$el) return;
      switch (this.placement) {
        case "top":
          this.$el.style.top = -this.$el.offsetHeight - 3 + "px";
          break;
        case "right":
          this.$el.style.width = this.$el.offsetWidth + "px";
          this.$el.style.left = this.reference.offsetWidth + 3 + "px";
          break;
        case "bottom":
          break;
        case "left":
          this.$el.style.width = this.$el.offsetWidth + "px";
          this.$el.style.left = -this.$el.offsetWidth - 3 + "px";
          break;
        default:
          console.error("placement 必须是 top/right/bottom/left");
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.reference = document.getElementById(this.referenceId);
      this.calculateCoordinate();
    });
  }
};
</script>
