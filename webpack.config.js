const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const PostCssInlineSvg = require('postcss-inline-svg');
const PostCssSvgo = require('postcss-svgo');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const autoprefixerConfig = { browsers: ['last 5 versions', 'ie 11'] };
const postCssConfig = [autoprefixer(autoprefixerConfig), PostCssInlineSvg, PostCssSvgo];

const lessOptions = { sourceMap: isDevelopment };

module.exports = {
  entry: {
    // vendor: ['./src/vendor/index.js'],
    common: ['./src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: '/',
    //   filename: isDevelopment ? '[name].js' : '[name]-[chunkhash:10].js'
    filename: 'js/[name].js',
  },
  externals: {
    jquery: 'jQuery',
    $: 'jQuery',
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      'jquery-ui': 'jquery-ui/ui/widgets',
      'jquery-ui-css': 'jquery-ui/../../themes/base',
      '@': path.resolve(__dirname, './src'),
    },
    symlinks: false,
  },
  watch: isDevelopment,
  devtool: isDevelopment ? 'inline-source-map' : false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://organic-zone.demo.onlinebees.ru',
        logLevel: 'debug',
        changeOrigin: true,
      },
    },
    contentBase: path.join(__dirname, 'src/static/'),
    noInfo: isDevelopment,
    overlay: {
      warnings: true,
      errors: true,
    },
    quiet: true,
  },
  module: {
    rules: [{
      test: /\.js$/,
      // exclude: /node_modules/,
      loaders: [
        'babel-loader',
        {
          loader: 'eslint-loader',
          options: {
            emitError: true,
            failOnWarning: !isDevelopment,
            failOnError: true,
          },
        }],
    },

    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          less: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader',
              options: lessOptions,
            }, {
              loader: 'less-loader',
              options: lessOptions,
            }],
            fallback: 'vue-style-loader', // <- это внутренняя часть vue-loader, поэтому нет необходимости его устанавливать через NPM
          }),
        },
        postcss: postCssConfig,
        // other vue-loader options go here
      },
    },

    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: 'css-loader',
        fallback: 'style-loader',
      }),
    },

    {
      test: /\.(html)$/,
      use: {
        loader: 'html-loader', // https://github.com/webpack-contrib/html-loader
        options: {
          // attrs: [':data-src'],
          interpolate: true, // добавляет возможность вставлять в аттрибуты
          // элементов картинки через ES6 string interpolation синтаксис
        },
      },
    },

    {
      test: /\.(png|jpe?g|gif|webp)$/,
      loaders: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img/',
        },
      },
      'img-loader',
      ],

    },

    {
      test: /\.(svg)$/,
      include: [
        path.resolve(__dirname, './src/common.blocks'),
      ],
      loaders: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img/',
        },
      },
      'img-loader',
      ],

    },

    {
      test: /\.(svg|eot|ttf|woff|woff2)$/,
      exclude: [
        path.resolve(__dirname, './src/assets/svg'),
        path.resolve(__dirname, './src/common.blocks'),
      ],
      loaders: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
        },
      }],
    },

    {
      test: /\.svg$/,
      include: [
        path.resolve(__dirname, './src/assets/svg/multicolor'),
      ],
      loaders: [{
        loader: 'svg-sprite-loader',
      },
      {
        loader: 'svgo-loader',
      }],
    },

    {
      test: /\.svg$/,
      include: [
        path.resolve(__dirname, './src/assets/svg/monocolor'),
      ],
      loaders: [{
        loader: 'svg-sprite-loader',
      },
      {
        loader: 'svgo-loader',
        options: {
          plugins: [
            { removeUselessStrokeAndFill: true },
            { removeAttrs: { attrs: '(fill|id|fill-opacity)' } },
            { removeStyleElement: true },
          ],
        },
      }],
    },

    {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: lessOptions,
        }, {
          loader: 'less-loader',
          options: lessOptions,
        }, {
          loader: 'postcss-loader',
          options: {
            plugins() {
              return postCssConfig;
            },
          },
        }],
        fallback: 'style-loader',
      }),
    }],
  },
  plugins: [
    new CleanWebpackPlugin(['public'], {
      root: __dirname,
      verbose: true,
      dry: false,
    }),
    new webpack.NoEmitOnErrorsPlugin(), // otherwise error still gives a file
    new ExtractTextPlugin('css/[name].css'),
    new FriendlyErrorsWebpackPlugin(),
    new WebpackBuildNotifierPlugin({
      suppressSuccess: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: !isDevelopment,
    }),
    new CopyWebpackPlugin([
      { from: 'src/static' },
    ], {
      ignore: [
        '*.md',
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
      // chunksSortMode: 'manual',
      // chunks: ['vendor', 'common'],
    }),
    // для добавления отдельной html страницы нужно подключить новый HtmlWebpackPlugin
    new HtmlWebpackPlugin({
      template: 'src/product-page.html',
      filename: 'product-page.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/catalog-page.html',
      filename: 'catalog-page.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/catalog-page-1.html',
      filename: 'catalog-page-1.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/catalog-page-2.html',
      filename: 'catalog-page-2.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/category-page.html',
      filename: 'category-page.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/basket-page.html',
      filename: 'basket-page.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/order-page.html',
      filename: 'order-page.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/account-page.html',
      filename: 'account-page.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/order-history-page.html',
      filename: 'order-history-page.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/favorites-page.html',
      filename: 'favorites-page.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/delivery-page.html',
      filename: 'delivery-page.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/payment-page.html',
      filename: 'payment-page.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/refund-page.html',
      filename: 'refund-page.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/blog-page.html',
      filename: 'blog-page.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/blog-item-page.html',
      filename: 'blog-item-page.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/promotions-page.html',
      filename: 'promotions-page.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/promotions-item-page.html',
      filename: 'promotions-item-page.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/contacts-page.html',
      filename: 'contacts-page.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/about-page.html',
      filename: 'about-page.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/cooperation-page.html',
      filename: 'cooperation-page.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/not-found-page.html',
      filename: 'not-found-page.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/search-result-page.html',
      filename: 'search-result-page.html',
      minify: {
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
      },
    }),
  ],
};

if (!isDevelopment) {
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: false,
    },
  }));
  module.exports.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: "'production'",
    },
  }));
}
