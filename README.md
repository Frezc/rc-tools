# rclib-tools

fork from rc-tools

## Different with rc-tools
- support sass
- add scripts `init`, `pub-d` and `clean`
- remove scripts `publish` and add `prepublishOnly`
- add babel plugins `babel-plugin-lodash`, `babel-plugin-transform-decorators-legacy`
- change some eslint rules
- replace ext `less` and `scss` to `css` at compile
- init and update after install.(you can add `lib-tools: { disable_update: true }` to package.json to disable this feature)

## Usage

```
Initial

mkdir myProject
cd myProject
npm init
npm i -D rclib-tools
```

## Scripts

- init: init or update package.json
- lint: run lint by https://github.com/airbnb/javascript
- pub-d: compile and npm publish
- pub: do `pub-d`, `gh-pages` and `git tag` 
- watch --out-dir=/xx: watch and compile to /xx, default to lib
- build: build examples
- gh-pages: push example to gh-pages
- start: start dev server
- test: jest
- update-snapshot: jest -u
- coverage: jest --coverage
- clean: remove built files

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
