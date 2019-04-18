import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'vue-form-layer',
    file: 'dist/vue-form-layer.umd.js',
    format: 'umd',
  },
})

export default config
