import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    name: 'vue-rollup-component',
    file: 'dist/vue-rollup-component.esm.js',
    format: 'es',
  },
})

export default config
