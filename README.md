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
Hello JSY world! { jsy: 'indented', wisp: 'inspiration' }


$ alias jsy-node="node --loader @jsy-lang/nodejs"
$ jsy-node demo.jsy
Hello JSY world! { jsy: 'indented', wisp: 'inspiration' }
```

