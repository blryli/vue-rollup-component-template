import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    name: 'vue-rollup-component-template',
    file: 'dist/vue-rollup-component-template.esm.js',
    format: 'es',
  },
})

export default config
