import * as fs from "fs-extra"
import { join } from "path"
import * as glob from 'glob'
import path = require("path")

const libDir = './components/lib'
const copyItems = [
  '^dist',
  '^index.js',
  '^index.d.ts',
  '^package.json'
]
const outDir = './publish/lib'

export default async function copyExternalLibs() {
  const files = glob.sync(join(libDir, '**', '*'))
  files.forEach(item => {
    const relative = path.relative(libDir, item)
    if (copyItems.some(pattern => new RegExp(pattern).test(relative))) {
      if (fs.statSync(item).isFile())
        fs.copySync(item, join(outDir, relative), {overwrite: true})
    }
  })
}
