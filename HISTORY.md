### 0.1.13
- fix transform path.
- add script `update-snapshot`
- fix `import (.css|.scss|.less)` caused error in test env.

### 0.1.12
- init will create config when `package.json` not exists.

### 0.1.11
- add jest config
- fix init bug, `postinstall` will be executed after install rclib-tools. (This won't be executed twice unless you remove `disable_update = true`)
- you can add `lib-tools: { disable_update: true }` to package.json to disable above feature

### 0.1.10
- add clean script
- improve doc

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
