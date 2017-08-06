var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.{{#if_eq scriptlang "jscript"}}js{{/if_eq}}{{#if_eq scriptlang "tscript"}}ts{{/if_eq}}'
  },
  output: {
    path: config.build.assetsRoot,
    filename: {{#if_eq scriptlang "jscript"}}'[name].js'{{/if_eq}}{{#if_eq scriptlang "tscript"}}'./dist/bundle.js'{{/if_eq}},
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'{{#if_eq scriptlang "tscript"}}, '.ts'{{/if_eq}}],
    alias: {
      {{#if_eq build "standalone"}}
      'vue$': 'vue/dist/vue.esm.js',
      {{/if_eq}}
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {{#lint}}
      {
        test: /\.({{#if_eq scriptlang "jscript"}}js{{/if_eq}}{{#if_eq scriptlang "tscript"}}ts{{/if_eq}}|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {{/lint}}
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {{#if_eq scriptlang "jscript"}}
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {{/if_eq}}
      {{#if_eq scriptlang "tscript"}}
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [resolve('src')],
        options: {
          appendTsSuffixTo: ['\\.vue$']
        }
      },
      {{/if_eq}}
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
