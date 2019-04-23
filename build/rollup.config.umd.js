import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'vue-rollup-component',
    file: 'dist/vue-rollup-component.umd.js',
    format: 'umd',
  },
})

export default config
