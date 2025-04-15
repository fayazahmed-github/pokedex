import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  input: resolve(__dirname, 'src/index.ts'),
  output: [
    {
      file: resolve(__dirname, 'dist/cjs/index.js'),
      format: 'cjs',
      sourcemap: true
    },
    {
      file: resolve(__dirname, 'dist/esm/index.js'),
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    nodeResolve({ extensions: ['.ts'] }),
    commonjs(),
    typescript({
      tsconfig: resolve(__dirname, 'tsconfig.json'),
      declaration: true,
      declarationDir: 'dist/types'
    }),
    babel({
      babelHelpers: 'bundled',
      presets: [
        '@babel/preset-env',
        '@babel/preset-typescript'
      ]
    })
  ]
};