import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'

import { version } from './package.json'
const year = new Date().getFullYear()
const banner = `/*\Cable Streams ${version}\n*/`

const minify = () => {
  return terser({
    mangle: true,
    compress: true
  })
}

export default [
  {
    input: 'src/index.ts',
    external: [
      '@hotwired/turbo',
      'cable_ready'
    ],
    output: [
      {
        name: 'CableStreams',
        file: 'dist/index.umd.js',
        format: 'umd',
        banner,
        globals: {
          '@hotwired/turbo': 'Turbo',
          'cable_ready': 'CableReady'
        }
      },
      {
        file: 'dist/index.js',
        format: 'es',
        banner
      }
    ],
    plugins: [
      resolve(),
      typescript(),
      filesize(),
      minify()
    ],
    watch: {
      include: 'src/**'
    }
  }
]
