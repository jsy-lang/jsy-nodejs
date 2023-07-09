# `@jsy-lang/nodejs`

JSY from NodeJS using [`--loader @jsy-lang/nodejs`](https://nodejs.org/api/esm.html#loaders)


## Install

```sh
$ npm install @jsy-lang/nodejs @jsy-lang/jsy
```

Note that global install does not work with loaders. (e.g. `npm install -g` does not work).


## Use

Start with some JSY, say...
```sh
$ cat > some-demo.jsy << EOF

console.log @
    'Hello JSY world!'
    @{}
        jsy: 'indented'
        wisp: 'inspiration'

EOF
```

To use the `--loader` feature with `@jsy-lang/nodejs`:

```sh
$ node --loader @jsy-lang/nodejs some-demo.jsy
Hello JSY world! { jsy: 'indented', wisp: 'inspiration' }
```


## Adopt

Using a `jsy-node` alias:

```sh
$ alias jsy-node="node --loader @jsy-lang/nodejs --enable-source-maps "
$ jsy-node some-demo.jsy
Hello JSY world! { jsy: 'indented', wisp: 'inspiration' }
```

Or just straight upgrading NodeJS with JSY superpowers via `NODE_OPTIONS`:

```sh
$ export NODE_OPTIONS="--loader @jsy-lang/nodejs --enable-source-maps "
$ node some-demo.jsy
Hello JSY world! { jsy: 'indented', wisp: 'inspiration' }
```


## License

[BSD-2-Clause License](./LICENSE)

