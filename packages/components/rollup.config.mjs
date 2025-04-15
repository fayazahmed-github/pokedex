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
  external: ['react', 'react-dom', '@mui/material', '@mui/x-data-grid'],
  plugins: [
    nodeResolve({ extensions: ['.ts', '.tsx'] }),
    commonjs(),
    typescript({
      tsconfig: resolve(__dirname, 'tsconfig.json'),
      declaration: true,
      declarationDir: 'dist/types'
    }),
    // packages/components/rollup.config.mjs
babel({
    babelHelpers: 'runtime', // Changed from 'bundled'
    extensions: ['.ts', '.tsx'],
    presets: [
      ['@babel/preset-env', {
        useBuiltIns: 'usage',
        corejs: 3
      }],
      '@babel/preset-typescript',
      ['@babel/preset-react', { runtime: 'automatic' }]
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', {
        regenerator: true,
        useESModules: false
      }]
    ]
  })
  ]
};