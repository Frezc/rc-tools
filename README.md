# rclib-tools

fork from rc-tools

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

## History

### 0.1.9
- add lint check before publish
- default config.port won't replace user's config.port.

### 0.1.8
- merge with rc-tools 7.0.1
- replace less and scss to css when compile

### 0.1.7
- add prepublishOnly hook

### 0.1.6
- re-add rclib-tools to dependency
- change some eslint rules
- add pre-commit to pkg

### 0.1.5
- add support to decorator

### 0.1.4
- rename publish command by pub-d

### 0.1.3
- remove dependency when init and update-self in pub 

### 0.1.2
- support babel-plugin-lodash

### 0.1.1
- rename bin 

### 0.1.0
- support init.

### 0.0.1
- fork from rc-tools & support sass compile.
