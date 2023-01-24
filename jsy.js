//import { jsy_transpile_srcmap } from '@jsy-lang/jsy'
import { jsy_transpile_srcmap } from 'jsy-transpile'
export { eleventy_jsy } from './eleventy_jsy.js'

export { jsy_transpile_srcmap }

const jsy_options = { sourcemap: 'inline', as_rec: false }

export async function load(url, context, nextLoad) {
  if (! /\.jsy$/.test(new URL(url).pathname))
    return nextLoad(url, context, nextLoad)

  let format = 'module' // use module format to load raw source
  let {source: raw_jsy} = await nextLoad(url, { ...context, format })
  raw_jsy = raw_jsy.toString('utf-8')

  let source = jsy_transpile_srcmap(raw_jsy, url, jsy_options)
  return { format, source }
}


export async function resolve(specifier, context, nextResolve) {
  // as .jsy are local real files, we don't need a custom resolver
  return nextResolve(specifier, context)
}
