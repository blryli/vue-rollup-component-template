import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'

import fs from 'fs'
import CleanCSS from 'clean-css'

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
]

export default {
  input: 'src/index.js',
  plugins: [
    resolve({
      extensions
    }),
    commonjs(),
    babel({ extensions, include: ['src/**/*'], runtimeHelpers: true }),
    vue({
      css(style) {
        fs.writeFileSync('dist/vue-form-layer.css', new CleanCSS().minify(style).styles)
      },
    })
  ],
  external: [
    'vue',
  ],
}