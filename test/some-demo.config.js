
console.log @
  'Hello JSY modeline world!'
  @{}
    jsy: 'indented'
    wisp: 'inspiration'

#IF PLAT_NODEJS
  console.log @ 'IFDEFs work'

// vim: filetype  = jsy
