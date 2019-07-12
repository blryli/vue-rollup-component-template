import base from './rollup.config.base'
import uglify from 'rollup-plugin-uglify-es'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'VueRollupComponentTemplate',
    file: 'dist/vue-rollup-component-template.min.js',
    format: 'iife'
  },
})

config.plugins.push(uglify())

export default config
