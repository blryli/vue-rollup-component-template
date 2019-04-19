<script>
export default {
  name: "VueContent",
  props: ["data"],
  render(h) {
    return h('div', {
      attrs: {
        class: 'vue-layer__content'
      }
    }, [this.data])
  }
};
</script>
