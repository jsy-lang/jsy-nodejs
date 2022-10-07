
export function eleventy_jsy(cfg, opt={}) {
  let ver=0, base_url=new URL(opt.dir || '.', `file:///${process.cwd()}/`)
  let jsy_import = src_path => import(new URL(src_path+'?v='+ver, base_url))
  cfg.on('eleventy.before', ()=>{ ver++ })

  let eleventy_jsy = {
    read: false,
    async getData(src_path) {
      let module = await jsy_import(src_path)
      return module.data
        ?? module.default?.data
    },
    async compile(src, src_path) {
      let module = await jsy_import(src_path)
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
