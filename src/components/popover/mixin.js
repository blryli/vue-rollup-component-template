import {
  getDomClientRect
} from "utils/dom";

function $(params) {
  return document.getElementById(params);
}

export default {
  methods: {
    // 获取参考点ID
    getReferenceId() {
      if (this.placementId) {
        const samePlacementArr = this.placementObj[this.placement].sort(
          this.compare("disabled")
        );
        const index = samePlacementArr.findIndex(
          d => d.id === this.placementId
        );
        if (index !== -1 && samePlacementArr[index - 1])
          return samePlacementArr[index - 1].id; // 取同向的前一个
      }
    },
    compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    },
    // 参考点是否在叛逆列表
    referenceInBetrayet() {
      return this.betraye[this.placement].find(
        d => d === this.getReferenceId()
      );
    },
    // 获取变化后的参考点
    getChangeReference(placement) {
      const last = this.placementObj[placement].find(
        (d, i) => i === this.placementObj[placement].length - 1
      ); // 取反方向的最后一个
      return last ? $(last.id) : this.reference;
    },
    getPlacementAllRect(placement = this.placement) {
      let width = 0;
      let height = 0;
      (this.placementObj[placement] || []).forEach(d => {
        height += getDomClientRect($(d.id)).height + 12;
        width += getDomClientRect($(d.id)).width + 12;
      });
      return {
        width: width,
        height: height
      };
    },
    calculateCoordinate() {
      !this.addedBody && this.popoverAddedBody();
      const popoverRect = getDomClientRect(this.$el);
      let reference = $(this.getReferenceId()) || this.reference;
      const referenceRect = getDomClientRect(reference);
      let referenceRectCount = referenceRect;
      let position = {
        top: 0,
        left: 0
      }

      // 判断是否改变方向与确定最终参考点
      switch (this.placement) {
        case "top":
          if (
            getDomClientRect(this.reference).top -
            this.getPlacementAllRect().height <
            0 &&
            getDomClientRect(this.reference).bottom +
            this.getPlacementAllRect("bottom").height >
            window.innerHeight
          ) {
            this.momentPlacement = "top";
            break;
          }
          if (this.referenceInBetrayet()) {
            this.momentPlacement = "bottom";
          } else {
            if (referenceRect.top - popoverRect.height - 12 < 0) {
              this.momentPlacement = "bottom";
              reference = this.getChangeReference(this.momentPlacement);
              referenceRectCount = getDomClientRect(reference);
            } else {
              this.momentPlacement = "top";
            }
          }
          break;
        case "left":
          if (
            getDomClientRect(this.reference).left -
            this.getPlacementAllRect().width <
            0 &&
            getDomClientRect(this.reference).right +
            this.getPlacementAllRect("right").width >
            window.innerWidth
          ) {
            this.momentPlacement = "left";
            break;
          }
          if (this.referenceInBetrayet()) {
            this.momentPlacement = "right";
          } else {
            if (referenceRect.left - popoverRect.width - 12 < 0) {
              this.momentPlacement = "right";
              reference = this.getChangeReference(this.momentPlacement);
              referenceRectCount = getDomClientRect(reference);
            } else {
              this.momentPlacement = "left";
            }
          }
          break;
        case "right":
          if (
            getDomClientRect(this.reference).left -
            this.getPlacementAllRect("left").width <
            0 &&
            getDomClientRect(this.reference).right +
            this.getPlacementAllRect().width >
            window.innerWidth
          ) {
            this.momentPlacement = "right";
            break;
          }
          if (this.referenceInBetrayet()) {
            this.momentPlacement = "left";
          } else {
            if (
              referenceRect.right + popoverRect.width + 12 >
              window.innerWidth
            ) {
              this.momentPlacement = "left";
              reference = this.getChangeReference(this.momentPlacement);
              referenceRectCount = getDomClientRect(reference);
            } else {
              this.momentPlacement = "right";
            }
          }
          break;
        case "bottom":
          if (
            getDomClientRect(this.reference).top -
            this.getPlacementAllRect("top").height <
            0 &&
            getDomClientRect(this.reference).bottom +
            this.getPlacementAllRect().height >
            window.innerHeight
          ) {
            this.momentPlacement = "bottom";
            break;
          }
          if (this.referenceInBetrayet()) {
            this.momentPlacement = "top";
          } else {
            if (
              referenceRect.bottom + popoverRect.height + 12 >
              window.innerHeight
            ) {
              this.momentPlacement = "top";
              reference = this.getChangeReference(this.momentPlacement);
              referenceRectCount = getDomClientRect(reference);
            } else {
              this.momentPlacement = "bottom";
            }
          }
          break;
        default:
          console.error("Wrong placement prop");
      }
      // 计算节点坐标
      switch (this.momentPlacement) {
        case "top":
          position.left =
            referenceRectCount.left -
            popoverRect.width / 2 +
            referenceRectCount.width / 2;
          position.top = referenceRectCount.top - popoverRect.height - 12;
          break;
        case "left":
          position.left = referenceRectCount.left - popoverRect.width - 12;
          position.top =
            referenceRectCount.top +
            referenceRectCount.height / 2 -
            popoverRect.height / 2;
          break;
        case "right":
          position.left =
            referenceRectCount.left + referenceRectCount.width + 12;
          position.top =
            referenceRectCount.top +
            referenceRectCount.height / 2 -
            popoverRect.height / 2;
          break;
        case "bottom":
          position.left =
            referenceRectCount.left -
            popoverRect.width / 2 +
            referenceRectCount.width / 2;
          position.top =
            referenceRectCount.top + referenceRectCount.height + 12;
          break;
        default:
          console.error("Wrong placement prop");
      }
      this.$el.style.top = position.top + "px";
      this.$el.style.left = position.left + "px";
    }
  }
}
