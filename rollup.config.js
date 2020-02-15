import inject from 'rollup-plugin-inject'
import typescript2 from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

require('fs').unlink('dist/index.d.ts', (err) => {});

const getConfig = polyfill => {
  const config = {
    input: 'src/index.ts',
    output: [],
    plugins: [typescript2({
      typescript:require('typescript'),
    }),terser()],
    external: ['vue', '@vue/composition-api']
  }

  if (polyfill) {
    config.output = [
      {
        file: 'polyfilled.js',
        format: 'cjs'
      }
    ]
    config.external.push('resize-observer-polyfill')
    config.plugins.push(
      inject({
        ResizeObserver: 'resize-observer-polyfill'
      })
    )
  } else {
    config.output = [
      {
        file: 'dist/bundle.cjs.js',
        format: 'cjs'
      },
      {
        file: 'dist/bundle.esm.js',
        format: 'esm'
      }
    ]
  }

  return config
}

export default [getConfig(), getConfig(true)]
