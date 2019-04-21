import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import sass from 'rollup-plugin-sass'
import vue from 'rollup-plugin-vue'

export default {
  input: 'src/index.js',
  plugins: [
    resolve({ extensions: ['.vue'] }),
    commonjs(),
    sass({
      output: 'dist/vue-form-layer.css'
    }),
    vue({ css: false }),
    babel({
      "plugins": [
        [
          "module-resolver",
          {
            "root": ["src/"],
          }
        ]
      ]
    }),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
  ],
  watch: {
    include: 'src/**',
  },
  external: ['vue'],
}