import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'vue-rollup-component-template',
    file: 'dist/vue-rollup-component-template.umd.js',
    format: 'umd'
  },
})

export default config
