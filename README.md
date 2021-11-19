# `@jsy-lang/nodejs`

Start with some JSY, say...
```sh
$ cat > demo.jsy << EOF

console.log @
    "Hello JSY world!"
    @{}
        jsy: 'indented'
        wisp: 'inspiration'

EOF
```

The use the `--experimental-loader` feature with `@jsy-lang/nodejs`:

```sh
$ node --loader @jsy-lang/nodejs demo.jsy
Hello JSY world! { jsy: 'indented', wisp: 'inspiration' }
```

Using a `jsy-node` alias:

```sh
$ alias jsy-node="node --loader @jsy-lang/nodejs"
$ jsy-node demo.jsy
Hello JSY world! { jsy: 'indented', wisp: 'inspiration' }
```

Or just straight upgrading NodeJS with JSY superpowers via `NODE_OPTIONS`:

```sh
$ export NODE_OPTIONS="--enable-source-maps --loader @jsy-lang/nodejs"
$ node demo.jsy
Hello JSY world! { jsy: 'indented', wisp: 'inspiration' }
```

## Install

```sh
$ npm install @jsy-lang/nodejs
```

Note that global install does not work with loaders. (e.g. `npm install -g` does not work).
