
export function eleventy_jsy(eleventyConfig, opt={}) {
  let ver=0, base_url=new URL(opt.dir || '.', `file:///${process.cwd()}/`)
  let jsy_import = src_path => import(new URL(src_path+'?v='+ver, base_url))
  eleventyConfig.on('eleventy.before', ()=>{ ver++ })

  let _inst_cache = new Map()
  let as_res_fn = (fn_res, self) =>
    (...z) => fn_res.call(self, ...z, self)

  let eleventy_jsy = {
    read: false,
    async getData(src_path) {
      let module = await jsy_import(src_path)
      let res = module.data ?? module.default?.data

      if ('function' === typeof res)
        res = res.call(this)
      return res
    },
    async compile(src, src_path) {
      let module = await jsy_import(src_path)
      let res = module.render
        ?? module.default?.render
        ?? module.default

      if ('function' !== typeof res) return res
      return as_res_fn(res, _instanceFor(src_path, this))
    },
  }

  if (opt.only_proto)
    return eleventy_jsy

  let jsy_ext = opt.jsy_ext || '11ty.jsy'
  eleventyConfig.addTemplateFormats(jsy_ext)
  return eleventyConfig.addExtension(jsy_ext, eleventy_jsy)

  function _instanceFor(key, self) {
    let inst = _inst_cache.get(key)

    if (!inst) {
      // bind instance like 11ty's JavaScript engine -- https://github.com/11ty/eleventy/blob/master/src/Engines/JavaScript.js
      _inst_cache.set(key, inst={__proto__: self})

      if (inst.config)
        for (let [k, fn] of Object.entries(inst.config.javascriptFunctions))
          inst[k] = fn.bind(inst)
    }
    return inst
  }
}

