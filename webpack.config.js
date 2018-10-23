const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * 环境变量
 * @type {String}
 */
const ENV = process.env.NODE_ENV;
const CLIENT = process.env.CLIENT || 'default';
const API = process.env.API || ENV;

const setPath = url => path.resolve(__dirname, url);

/**
 * 配置（公共部分）
 * @type {Object}
 */
let config = {
  /**
   * 入口文件设置
   * @type {Object}
   */
  entry: {
    main: ['./src/index.js']
  },

  /**
   * 自动引入后缀名 & 解析别名规则
   * @type {Object}
   */
  resolve: {
    alias: {
      '@assets': setPath('src/assets'),
      '@config': setPath('src/configs'),
      '@lib': setPath('src/libs'),
      '@page': setPath('src/components/pages'),
      '@module': setPath('src/components/modules'),
      '@partial': setPath('src/components/partials'),
      '@model': setPath('src/models')
    },
    extensions: ['.ts', '.vue', '.js', '.styl', '.css']
  },

  /**
   * loader 规则
   * @type {Object}
   */
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: file =>
          /node_modules/.test(file) && !/\.vue\.js\.ts/.test(file),
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          hotReload: ENV === 'development'
        }
      },
      {
        test: /\.(styl(us)?|css)$/,
        include: [setPath('src')],
        use: [
          ENV === 'development'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'stylus-loader',
            options: {
              import: [setPath(`src/assets/styles/themes/${CLIENT}/var`)]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        include: setPath('src'),
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:5].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        include: setPath('src'),
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:5].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        include: setPath('src'),
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:5].[ext]'
        }
      }
    ]
  },

  /**
   * 插件列表
   * @type {Array}
   */
  plugins: [
    // vue loader 必用
    new VueLoaderPlugin(),

    // 模块串联优化
    new webpack.optimize.ModuleConcatenationPlugin(),

    // 全局环境变量定义
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(ENV),
      __API__: JSON.stringify(API),
      __VER__: JSON.stringify(require('./package.json').version),
      __CLIENT__: JSON.stringify(CLIENT)
    }),

    // html 文件
    new HtmlWebpackPlugin({
      // favicon: './src/assets/img/favicon.png',
      template: './index.html',
      filename: './index.html',
      inject: true
    }),

    new MiniCssExtractPlugin({
      filename:
        ENV === 'development'
          ? 'css/[name].css'
          : 'css/[name].[chunkhash:5].css'
    })
  ],

  /**
   * 优化配置
   */
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 3
        }
      }
    }
  }
};

/**
 * 开发环境配置
 */
if (ENV === 'development') {
  config.mode = ENV;
  config.devtool = 'eval-source-map';
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.devServer = {
    clientLogLevel: 'warning',
    hot: true,
    compress: true,
    host: '0.0.0.0',
    port: '8080',
    open: false,
    stats: {
      assets: true,
      performance: true,
      timings: true,
      builtAt: false,
      children: false,
      chunks: false,
      hash: false,
      entrypoints: false,
      modules: false,
      cached: false,
      cachedAssets: false
    }
  };
}

/**
 * 发布配置
 */
if (ENV === 'production') {
  config.output = {
    filename: 'script/[name].[chunkhash:5].js',
    path: setPath('dist'),
    publicPath: '/'
  };
  config.plugins.push(
    new CompressionPlugin({
      cache: true,
      threshold: 10240
    })
  );
  config.optimization.minimizer = [
    // 优化 js
    new UglifyJsPlugin({
      exclude: /\.min\.js$/,
      cache: true,
      sourceMap: false,
      parallel: true,
      extractComments: false,
      uglifyOptions: {
        compress: {
          unused: true,
          warnings: false,
          drop_console: true
        },
        output: {
          comments: false
        }
      }
    }),
    // 优化 css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessorOptions: {
        safe: true,
        autoprefixer: { disable: true },
        mergeLonghand: false,
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    })
  ];
}

module.exports = config;
