var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: {{#if_eq scriptlang "tscript"}}Object.assign({{/if_eq}}utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  {{#if_eq scriptlang "tscript"}}utils.tsLoader()),{{/if_eq}}
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }{{#if_eq scriptlang "tscript"}},
  esModule: true{{/if_eq}}
}
