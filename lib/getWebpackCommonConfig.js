'use strict';

const path = require('path');
const fs = require('fs');
const resolveCwd = require('./resolveCwd');
const cwd = process.cwd();
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const getBabelCommonConfig = require('./getBabelCommonConfig');
const tsConfig = require('./getTSCommonConfig')();
const constants = require('./constants');
const assign = require('object-assign');
const replaceLib = require('./replaceLib');

delete tsConfig.noExternalResolve;

tsConfig.declaration = false;

function getResolve() {
  const pkg = require(resolveCwd('package.json'));

  const alias = {};
  const resolve = {
    modules: [cwd, 'node_modules'],
    extensions: ['.web.ts', '.web.tsx', '.web.js', '.web.jsx', '.ts', '.tsx', '.js', '.jsx'],
    alias,
  };
  const name = pkg.name;

  // https://github.com/react-component/react-component.github.io/issues/13
  // just for compatibility， we hope to delete /index.js. just use /src/index.js as all entry
  let pkgSrcMain = resolveCwd('index.js');
  if (!fs.existsSync(pkgSrcMain)) {
    pkgSrcMain = resolveCwd('src/index.js');
    if (!fs.existsSync(pkgSrcMain)) {
      console.error('Get webpack.resolve.alias error: no /index.js or /src/index.js exist !!');
    }
  }

  // resolve import { foo } from 'rc-component'
  // to 'rc-component/index.js' or 'rc-component/src/index.js'
  alias[`${name}$`] = pkgSrcMain;

  // resolve import foo from 'rc-component/lib/foo' to 'rc-component/src/foo.js'
  alias[`${name}/lib`] = resolveCwd('./src');
  alias[`${name}/${constants.tsCompiledDir}`] = cwd;

  alias[name] = cwd;
  return resolve;
}


const postcssLoader = {
  loader: 'postcss',
  options: { plugins: require('./postcssConfig') },
};

module.exports = {
  getResolve,
  getResolveLoader() {
    return {
      modules: [
        path.resolve(__dirname, '../node_modules'),
        // npm3 flat module
        path.resolve(__dirname, '../../'),
      ],
      moduleExtensions: ['-loader'],
    };
  },
  getLoaders(c) {
    const commonjs = c || false;
    const babelConfig = getBabelCommonConfig(commonjs);
    if (commonjs === false) {
      babelConfig.plugins.push(replaceLib);
    }
    const babelLoader = {
      loader: 'babel',
      options: babelConfig,
    };
    return [
      assign({
        test: /\.jsx?$/,
        exclude: /node_modules/,
      }, babelLoader),
      {
        test: /\.svg$/,
        loader: 'svg-sprite',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          babelLoader,
          {
            loader: 'ts',
            options: {
              transpileOnly: true,
              compilerOptions: tsConfig,
            },
          }],
      },
      // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        options: {
          limit: 10000,
          minetype: 'application/font-woff',
        },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url',
        options: {
          limit: 10000,
          minetype: 'application/octet-stream',
        },
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
      },
      {
        test: /\.(png|jpg|jpeg|webp)$/i,
        loader: 'file',
      },
    ];
  },
  getCssLoaders(extractCss) {
    let cssLoader = [{
      loader: 'css',
      options: {
        importLoaders: 1,
        sourceMap: true,
      },
    }, postcssLoader];
    let lessLoader = cssLoader.concat([
      {
        loader: 'less',
        options: {
          sourceMap: true,
        },
      },
    ]);
    let scssLoader = cssLoader.concat([
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ]);
    if (extractCss) {
      const withExtractTextPlugin = (loader) => {
        return ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: loader,
        });
      };
      cssLoader = withExtractTextPlugin(cssLoader);
      lessLoader = withExtractTextPlugin(lessLoader);
      scssLoader = withExtractTextPlugin(scssLoader);
    } else {
      const styleLoader = {
        loader: 'style',
      };
      cssLoader.unshift(styleLoader);
      lessLoader.unshift(styleLoader);
      scssLoader.unshift(styleLoader);
    }
    return [
      {
        test: /\.css$/,
        use: cssLoader,
      },
      {
        test: /\.less$/,
        use: lessLoader,
      },
      {
        test: /\.scss$/,
        use: scssLoader,
      },
    ];
  },
};
