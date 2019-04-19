<script>
export default {
  name: "RenderSlot",
  componentName: "RenderSlot",
  props: ["slotNode", "referenceBorderColor"],
  render(h) {
    return this.slotNode;
  },
  data() {
    return {
      focusNode: null,
      borderColor: this.referenceBorderColor
    };
  },
  watch: {
    borderColor(val) {
      this.$nextTick(() => {
        if (this.focusNode !== this.$el) {
          this.focusNode.style.borderColor = val || "#dcdfe6";
        } else {
          this.$el.style.borderColor = val || "transparent";
        }
      });
    }
  },
  methods: {
    allChildNodes(node, names) {
      // 1.创建全部节点的数组
      var allCN = [];
      names.find(d => d === node.nodeName) && allCN.push(node)

      // 2.递归获取全部节点
      var getAllChildNodes = function(node, names, allCN) {
        // 获取当前元素所有的子节点nodes
        var nodes = node.childNodes;
        // 获取nodes的子节点
        for (var i = 0; i < nodes.length; i++) {
          var child = nodes[i];
          // 判断是否为指定类型节点
          if (names.find(d => d === child.nodeName)) {
            allCN.push(child);
          }
          getAllChildNodes(child, names, allCN);
        }
      };
      getAllChildNodes(node, names, allCN);
      // 3.返回全部节点的数组
      return allCN;
    },
    update(borderColor) {
      this.borderColor = borderColor;
    }
  },
  mounted() {
    this.$nextTick(() => {
      const focusNodes = this.allChildNodes(this.$el, ["TEXTAREA", "INPUT","SELECT"]);
      if (focusNodes.length === 1) {
        this.focusNode = focusNodes[0];
      } else {
        this.focusNode = this.$el;
        this.focusNode.style.cssText = `border: 1px solid ${this
          .borderColor || "transparent"}`;
      }
    });
  }
};
</script>
