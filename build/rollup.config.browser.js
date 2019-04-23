import base from './rollup.config.base'
// import { uglify } from 'rollup-plugin-uglify'
// import { minify } from 'uglify-es'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'VueRollupComponent',
    file: 'dist/vue-rollup-component.min.js',
    format: 'iife'
  },
})

// config.plugins.push(uglify({}, minify))

export default config
