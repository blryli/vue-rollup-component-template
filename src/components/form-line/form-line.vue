<script>
import { offset, scroll, generateId } from "utils/util";
import VueFormItem from "components/form-item";
import VueLayer from "components/layer";
import VueCol from "components/col";
import RenderSlot from "components/render-slot";
export default {
  name: "VueFormLine",
  components: {
    VueFormItem,
    VueLayer,
    VueCol,
    RenderSlot
  },
  props: {
    cols: {
      type: Array,
      default: () => []
    },
    label: String,
    required: Boolean,
    span: {
      type: Number,
      default: 24
    },
    labelWidth: String
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
    // 间距
    itemGutter() {
      return this.form.itemGutter / 2;
    },
    // 响应式
    isResponse() {
      return this.form.isResponse;
    }
  },
  render(h) {
    // 获取节点
    let slotNodes = this.$slots.default.filter(
      (d, i) => this.$slots.default[i].tag
    );
    let nodes = []; // form-line 实际插入的节点
    let abreastSlotNodes = []; // form-item 内并排节点
    // form-line 节点处理
    (slotNodes || []).forEach((slotNode, index) => {
      let remainSpace = 24;
      let remainNodeNum = slotNodes.length;
      (this.cols || []).forEach(d => {
        if (d.span) {
          remainSpace -= d.span;
          remainNodeNum--;
        }
      });
      let span, label, labelWidth, prop, required, value;
      if (this.cols && this.cols.length && this.cols[index]) {
        span = this.cols[index].span || remainSpace / remainNodeNum;
        label = this.cols[index].label || "";
        labelWidth =
          this.cols[index].labelWidth ||
          this.labelWidth ||
          this.form.labelWidth ||
          "80px";
        prop = this.cols[index].prop || "";
        required = this.cols[index].required || false;
      } else {
        span = remainSpace / remainNodeNum;
      }
      this.isResponse && (span = 24);

      const layerRow = this.form.initLayer.find(d => d.prop === prop);
      const hasColor =
        layerRow && (layerRow.layer || []).find(l => l.referenceBorderColor);
      const referenceBorderColor = hasColor && hasColor.referenceBorderColor;
      slotNode = h("render-slot", {
        attrs: {
          slotNode: slotNode,
          referenceBorderColor: referenceBorderColor
        }
      });

      // 图层分发到 slotNode
      layerRow &&
        (slotNode = h(
          "vue-layer",
          {
            attrs: {
              layer: layerRow.layer,
              prop: layerRow.prop
            }
          },
          [slotNode]
        ));

      // slotNode 分发
      if (!this.label) {
        // 基本布局
        nodes.push(
          h(
            "vue-col",
            {
              attrs: {
                span: span,
              },
              style: {
                padding: `0 ${this.itemGutter}px`
              }
            },
            [
              h(
                "vue-form-item",
                {
                  attrs: {
                    label: label,
                    labelWidth: labelWidth,
                    required: required
                  }
                },
                [slotNode]
              )
            ]
          )
        );
      } else {
        // 并列布局
        abreastSlotNodes.push([
          h(
            "vue-col",
            {
              attrs: {
                span: span,
              },
              class: { "form-line--abreast": true }
            },
            [slotNode]
          )
        ]);
      }
    });
    // 并列布局添加节点
    if (this.label) {
      nodes.push(
        h(
          "vue-form-item",
          {
            attrs: {
              label: this.label,
              labelWidth: this.labelWidth || "80px",
              required: this.required,
            },
            style: { padding: `0 ${this.itemGutter}px` }
          },
          [abreastSlotNodes]
        )
      );
    }
    let span = this.isResponse ? 24 : this.span;
    return h(
      "vue-col",
      {
        attrs: {
          span: span,
        },
        class: { "form-line--abreast": true }
      },
      [h("div", { class: { "vue-form-line": true } }, [nodes])]
    );
  }
};
</script>
