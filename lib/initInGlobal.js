/**
 * Created by wanli on 2017/10/11.
 */
const fs = require('fs-extra');
const shelljs = require('shelljs');
const resolveCwd = require('./resolveCwd');
const toolPkg = require('../package.json');

module.exports = function () {
  const pkgPath = resolveCwd('package.json');

  const pkg = fs.existsSync(pkgPath) ? require(pkgPath) : {};
  pkg.scripts = Object.assign({}, pkg.scripts, {
    build: 'rclib-tools run build',
    'gh-pages': 'rclib-tools run gh-pages',
    start: 'rclib-tools run server',
    pub: 'npm run lint:fix && rclib-tools run pub --babel-runtime',
    'pub-d': 'npm run lint:fix && rclib-tools run publish --babel-runtime',
    lint: 'rclib-tools run lint',
    'lint:fix': 'rclib-tools run lint --fix',
    compile: 'rclib-tools run compile --babel-runtime',
    test: 'jest',
    'update-snapshot': 'jest -u',
    coverage: 'jest --coverage',
    'coverage:upload': 'jest --coverage && cat ./coverage/lcov.info | coveralls',
    prepublishOnly: 'rclib-tools run guard',
    clean: 'rclib-tools run clean',
    init: 'rclib-tools run init',
  });
  pkg.main = './lib/index';
  pkg.module = './es/index';
  pkg.config = Object.assign({ port: 8000 }, pkg.config);
  pkg.devDependencies = Object.assign({}, pkg.devDependencies, {
    'rclib-tools': `^${toolPkg.version}`,
    'pre-commit': '1.x',
    jest: '^21.2.0',
  });
  pkg['pre-commit'] = ['lint'];
  pkg.jest = Object.assign({}, pkg.jest, {
    collectCoverageFrom: [
      'src/**/*',
    ],
    transform: {
      '\\.tsx?$': './node_modules/rclib-tools/scripts/jestPreprocessor.js',
      '\\.jsx?$': './node_modules/rclib-tools/scripts/jestPreprocessor.js',
    },
    moduleNameMapper: {
      '^.+\\.(css|less|scss)$': 'babel-jest',
    },
  });

  pkg['lib-tools-config'] = Object.assign({}, pkg['lib-tools-config'], {
    disable_update: true,
  });

  fs.writeFileSync(resolveCwd('package.json'), JSON.stringify(pkg, null, 2));

  fs.ensureDirSync(resolveCwd('src'));
  fs.ensureDirSync(resolveCwd('assets'));
  fs.ensureDirSync(resolveCwd('examples'));

  shelljs.echo('initialized successfully.');
};
