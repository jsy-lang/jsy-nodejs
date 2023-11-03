import * as module from 'node:module'
export * from './jsy.js'

if (module)
  module.register('@jsy-lang/nodejs/jsy.js', import.meta.url)

