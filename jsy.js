import { jsy_transpile_srcmap } from '@jsy-lang/jsy'
export { eleventy_jsy } from './eleventy_jsy.js'

const jsy_options = { sourcemap: 'inline', as_rec: false }

async function load_jsy(url, context, nextLoad) {
  if (! /\.jsy$/.test(new URL(url).pathname))
    return nextLoad(url, context, nextLoad)

  let format = 'module' // use module format to load raw source
  let {source: raw_jsy} = await nextLoad(url, { ...context, format })
  raw_jsy = raw_jsy.toString('utf-8')

  let source = jsy_transpile_srcmap(raw_jsy, url, jsy_options)
  return { format, source }
}

export {load_jsy, load_jsy as load}
