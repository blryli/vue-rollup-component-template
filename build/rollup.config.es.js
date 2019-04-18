import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    name: 'vue-form-layer',
    file: 'dist/vue-form-layer.esm.js',
    format: 'es',
  },
})

export default config
