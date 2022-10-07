export function eleventy_jsy(cfg, opt={}) {
  let ver = 0
  cfg.on('eleventy.before', ()=>{ ver++ })

  const eleventy_jsy = {
    read: false,
    async getData(src_path) {
      let module = await import(src_path+'?v='+ver)
      return module.data
        ?? module.default?.data
    },
    async compile(src, src_path) {
      let module = await import(src_path+'?v='+ver)
      return module.render
        ?? module.default?.render
        ?? module.default
    },
  }

  if (opt.only_proto)
    return eleventy_jsy

  let jsy_ext = opt.jsy_ext || '11ty.jsy'
  cfg.addTemplateFormats(jsy_ext)
  return cfg.addExtension(jsy_ext, eleventy_jsy)
}
