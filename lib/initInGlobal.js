/**
 * Created by wanli on 2017/10/11.
 */
const fs = require('fs-extra');
const shelljs = require('shelljs');
const resolveCwd = require('./resolveCwd');
const toolPkg = require('../package.json');

const argv = require('minimist')(process.argv.slice(2));

module.exports = function () {
  if (!fs.existsSync(resolveCwd('package.json'))) {
    shelljs.exec(argv.y ? 'npm init -y' : 'npm init');
  }

  const pkg = require(resolveCwd('package.json'));
  pkg.scripts = Object.assign({}, pkg.scripts, {
    build: 'rclib-tools run build',
    'gh-pages': 'rclib-tools run gh-pages',
    start: 'rclib-tools run server',
    pub: 'rclib-tools run pub',
    publish: 'rclib-tools run publish',
    lint: 'rclib-tools run lint',
    'lint:fix': 'rclib-tools run lint --fix',
    compile: 'rclib-tools run compile --babel-runtime',
    test: 'jest',
    coverage: 'jest --coverage && cat ./coverage/lcov.info | coveralls',
  });
  pkg.main = './lib/index';
  pkg.module = './es/index';
  pkg.config = Object.assign({}, pkg.config, { port: 8000 });
  // pkg.devDependencies = Object.assign({}, pkg.devDependencies, {
  //   'rclib-tools': toolPkg.version,
  // });

  fs.writeFileSync(resolveCwd('package.json'), JSON.stringify(pkg, null, 2));

  fs.ensureDirSync(resolveCwd('src'));
  fs.ensureDirSync(resolveCwd('assets'));
  fs.ensureDirSync(resolveCwd('examples'));

  shelljs.echo('initialized successfully. please run npm install.');
};
