import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import shebang from 'rollup-plugin-preserve-shebang';

export default defineConfig({
  input: './src/index.ts',
  output: {
    file: './dist/index.js',
    format: 'esm',
  },
  plugins: [typescript(), terser(), shebang()],
});
