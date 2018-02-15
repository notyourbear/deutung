const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const uglify = require('rollup-plugin-uglify')
const replace = require('rollup-plugin-replace')
const progress = require('rollup-plugin-progress')
const builtins = require('rollup-plugin-node-builtins')
const globals = require('rollup-plugin-node-globals')
const filesize = require('rollup-plugin-filesize')

export default {
  input: 'dev/generator/generator.js',
  output: {
    file: 'index.js',
    format: 'umd',
    name: 'Deutung',
    globals: {
      pluralize: '$',
      seedrandom: '$',
      'fs-jetpack': '$'
    }
  },
  plugins: [
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    progress(),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      preferBuiltins: false,
      modulesOnly: true
    }),
    commonjs(),
    builtins(),
    globals(),
    (process.env.NODE_ENV === 'production' && uglify()),
    filesize()
  ]
};