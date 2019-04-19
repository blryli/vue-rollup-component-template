import Form from './components/form';
import FormLine from './components/form-line';
import FormItem from './components/form-item';
import Popover from './components/popover';
import Col from './components/col';
import Content from './components/content';
import VueText from './components/text';
import Layer from './components/layer';
import RenderSlot from './components/render-slot';

export {
  Form,
  FormLine,
  FormItem,
  Popover,
  Col,
  Content,
  VueText,
  Layer,
  RenderSlot,
}

const components = [
  Form,
  FormLine,
  FormItem,
  Popover,
  Col,
  Content,
  VueText,
  Layer,
  RenderSlot,
];

const plugin = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}
