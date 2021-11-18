# `@jsy-lang/nodejs`

```sh
$ cat > demo.jsy << EOF

console.log @
    "Hello JSY world!"
    @{}
        jsy: 'indented'
        wisp: 'inspiration'

EOF

$ node --loader @jsy-lang/nodejs demo.jsy
```

