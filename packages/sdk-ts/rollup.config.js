import * as fs from "fs";

import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

export default [
  {
    input: "src/zkwasm.ts",
    output: [
      {
        file: "dist/zkwasm.js",
        format: "cjs",
      },
    ],
    plugins: [
      replace({
        'WORKER_STR': JSON.stringify(fs.readFileSync(require.resolve('./src/worker.mjs'), 'utf8')),
        preventAssignment: true,
      }),
      typescript(),
      commonjs(),
    ],
  },
  {
    input: "src/zkwasm.ts",
    output: [
      {
        file: "dist/zkwasm.module.js",
        format: "es",
      },
    ],
    plugins: [typescript(), commonjs(), nodeResolve({ browser: true })],
  },
];
