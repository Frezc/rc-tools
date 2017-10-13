# rclib-tools

fork from rc-tools

## Different with rc-tools
- support sass
- add scripts `init`, `pub-d` and `clean`
- remove scripts `publish` and add `prepublishOnly`
- add babel plugins `babel-plugin-lodash`, `babel-plugin-transform-decorators-legacy`
- change some eslint rules
- replace ext `less` and `scss` to `css` at compile

## Usage

```
Initial

npm i -g rclib-tools
cd work directory
rclib-tools init -y
npm install
```

```
Project

$ rc-tools run lint: run lint by https://github.com/airbnb/javascript
$ rc-tools run pub: compile and npm publish
$ rc-tools run watch --out-dir=/xx: watch and compile to /xx, default to lib
$ rc-tools run build: build examples
$ rc-tools run gh-pages: push example to gh-pages
$ rc-tools run start: start dev server
```


package.json demo

```js
({
  config: {
    entry:{}, // webpack entry for build dist umd
    port: 8000, // dev server port
    output:{}, // webpack output for build dist umd
  }
})
```
