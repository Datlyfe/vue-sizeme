import fs from "fs";
import inject from 'rollup-plugin-inject'
import typescript2 from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

fs.unlink('dist/index.d.ts', err => {})

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    typescript2({
      typescript: require('typescript'),
      useTsconfigDeclarationDir: true
    }),
    terser(),
    inject({
      ResizeObserver: 'resize-observer-polyfill'
    })
  ],
  external: ['vue', '@vue/composition-api', 'resize-observer-polyfill']
}
