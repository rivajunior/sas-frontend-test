const StylelintPlugin = require('stylelint-webpack-plugin')
// const PurgecssPlugin = require('purgecss-webpack-plugin')
// const glob = require('glob-all')
// const path = require('path')

const plugins = [new StylelintPlugin()]

// if (process.env.NODE_ENV === 'production') {
//   plugins.push(
//     new PurgecssPlugin({
//       paths: glob.sync([
//         path.join(__dirname, 'public/index.html'),
//         path.join(__dirname, 'src/**/*.vue'),
//         path.join(__dirname, 'src/**/*.js')
//       ])
//     })
//   )
// }

module.exports = {
  configureWebpack: {
    // Merged into the final Webpack config
    plugins
  },
  css: {
    loaderOptions: {
      // by default the `sass` option will apply to both syntaxes
      // because `scss` syntax is also processed by sass-loader underlyingly
      // but when configuring the `data` option
      // `scss` syntax requires an semicolon at the end of a statement, while `sass` syntax requires none
      // in that case, we can target the `scss` syntax separately using the `scss` option
      scss: {
        prependData: `
            @import '~@/variables';
            @import '~bootstrap/scss/functions';
            @import '~bootstrap/scss/variables';
            @import '~bootstrap/scss/mixins';
        `
      }
    }
  }
}
