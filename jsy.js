import * as module from 'node:module'
import { jsy_transpile_srcmap } from '@jsy-lang/jsy'
export { eleventy_jsy } from './eleventy_jsy.js'

const rx_jsy_paths = /\.jsy$/
const rx_jsy_modeline_paths = /\.js$|\.cjs$|\.mjs$|.ts$/

const jsy_options = {
  defines: {PLAT_NODEJS: true},
  sourcemap: 'inline', as_rec: false,
}

async function load_jsy(url, context, nextLoad) {
  let {pathname} = new URL(url)
  let as_jsy = rx_jsy_paths.test(pathname)

  // if known JSY, use module format to load raw source
  if (as_jsy) context = { ...context, format: 'module' }

  let result = await nextLoad(url, context)

  if (as_jsy || _has_jsy_modeline(pathname, result)) {
    let raw_jsy = result.source.toString('utf-8')
    result.source = jsy_transpile_srcmap(raw_jsy, url, jsy_options)
  }

  return result
}

const rx_modeline_jsy_filetype = /^\/\/[^\n]*(\b(?:filetype|ft|mode)\b\s*=\s*jsy\b)/m
function _has_jsy_modeline(pathname, result) {
  if (rx_jsy_modeline_paths.test(pathname))
    return rx_modeline_jsy_filetype.test(
      result.source.toString('utf-8'))

  return false
}

export {load_jsy, load_jsy as load}
