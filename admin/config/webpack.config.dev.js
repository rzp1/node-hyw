

const fs = require('fs');
const path = require('path');
const resolve = require('resolve');
const webpack = require('webpack');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const getClientEnvironment = require('./env');
const paths = require('./paths');
const ManifestPlugin = require('webpack-manifest-plugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin-alt');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');


// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
// Webpack使用“公共路径”来确定应用程序是从哪里提供服务的。
//在发展过程中，我们始终坚持从基层做起。这使得配置更容易。
const publicPath = '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.

//“publicUrl”与“publicPath”类似，但我们会提供给我们的app
//作为索引中的%PUBLIC_URL%。html”和“process.env。在JavaScript PUBLIC_URL”。
//省略后面的斜杠%PUBLIC_PATH%/xyz看起来比%PUBLIC_PATH%xyz好。
const publicUrl = '';
// Get environment variables to inject into our app.
// 让环境变量注入我们的应用程序。
const env = getClientEnvironment(publicUrl);

// Check if TypeScript is setup
const useTypeScript = fs.existsSync(paths.appTsConfig); // 查看目录是否存在判断是否使用typescript

// style files regexes
//样式文件正则表达式
const cssRegex = /\.(css|less)$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// common function to get style loaders
//获取样式加载器的通用函数
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
      },
    },
    {
      loader: require.resolve('less-loader'), // compiles Less to CSS
      options: {
        modifyVars: {
          'primary-color': '#16A085',
          'link-color': '#16A085',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true,
      },
    },
  ];
  if (preProcessor) {
    loaders.push(require.resolve(preProcessor));
  }
  return loaders;
};

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
//这是开发配置。
//它专注于开发人员体验和快速重建。
//生产配置是不同的，位于一个单独的文件中。
module.exports = {
  mode: 'development',
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebook/create-react-app/issues/343
  //如果您希望在DevTools中看到编译后的输出，那么您可能希望使用“eval”。
  //参见https://github.com/facebook/cre-反应物-app/issues/343中的讨论
  devtool: 'cheap-module-source-map',
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  //这些是我们应用程序的“入口点”。
  //这意味着它们将是JS包中包含的“根”导入。
  entry: [
    // Include an alternative client for WebpackDevServer. A client's job is to
    // connect to WebpackDevServer by a socket and get notified about changes.
    // When you save a file, the client will either apply hot updates (in case
    // of CSS changes), or refresh the page (in case of JS changes). When you
    // make a syntax error, this client will display a syntax error overlay.
    // Note: instead of the default WebpackDevServer client, we use a custom one
    // to bring better experience for Create React App users. You can replace
    // the line below with these two lines if you prefer the stock client:
    // require.resolve('webpack-dev-server/client') + '?/',
    // require.resolve('webpack/hot/dev-server'),
    //包含WebpackDevServer的另一个客户机。客户的工作是

  //通过套接字连接到WebpackDevServer，并获得更改通知。

  //保存文件时，客户端要么应用热更新(以防万一)

  // 或刷新页面(如果JS发生变化)。当你

  //如果出现语法错误，该客户端将显示一个语法错误叠加。

  //注意:我们使用的是自定义客户端，而不是默认的WebpackDevServer客户端

  //为Create React App用户带来更好的体验。你可以换

  //如果您更喜欢股票客户端，可以使用下面这两行代码:

   // require.resolve('webpack-dev-server/client') + '?/',
  // require.resolve('webpack/hot/dev-server'),

    require.resolve('react-dev-utils/webpackHotDevClient'),
    // Finally, this is your app's code:
    paths.appIndexJs, // src 中的入口文件 index.js
    // We include the app code last so that if there is a runtime error during
    // initialization, it doesn't blow up the WebpackDevServer client, and
    // changing JS code would still trigger a refresh.
    //我们最后添加了app代码，如果在运行时出现错误

    //初始化，它不会炸毁WebpackDevServer客户端，并且

    //改变JS代码仍然会触发刷新。
  ],
  output: {
    // Add /* filename */ comments to generated require()s in the output.
    //将/*文件名*/注释添加到输出中生成的require()s中。
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    //这不会生成一个真正的文件。它只是虚拟路径

    //由WebpackDevServer在开发中提供服务。这是JS包

    //包含所有入口点和Webpack运行时的代码。
    filename: 'static/js/bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    //如果你使用代码分割，还有额外的JS块文件。
    chunkFilename: 'static/js/[name].chunk.js',
    // This is the URL that app is served from. We use "/" in development.
    //这是应用程序的URL地址。我们在开发中使用“/”。
    publicPath: publicPath,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    //指向原始磁盘位置的sourcemap条目(在Windows上的格式为URL)
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  // 优化
  optimization: {
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    //自动分割供应商和公有物
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    // Keep the runtime chunk seperated to enable long term caching
    //将运行时块分开，以启用长期缓存
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true,
  },
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    //这允许您设置Webpack应该在何处查找模块的回退。

    //我们将这些路径放在第二位，因为我们希望' node_modules '能够'获胜'

    //如果有冲突的话。这与节点解析机制匹配。
    // https://github.com/facebook/create-react-app/issues/253
    modules: ['node_modules'].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      //它肯定存在，因为我们在env.js中进行了调整
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebook/create-react-app/issues/290
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    //这些是节点生态系统支持的合理默认值。

    //我们还将JSX作为支持的通用组件文件名扩展名

    //有些工具，虽然我们不建议使用，但请参阅:


    //“web”扩展前缀得到了更好的支持

    //用于React Native Web。
    extensions: paths.moduleFileExtensions
      .map(ext => `.${ext}`)
      .filter(ext => useTypeScript || !ext.includes('ts')),
    alias: { // 别名
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
      '@': path.join(__dirname, '../src'),
    },
    plugins: [
      // Adds support for installing with Plug'n'Play, leading to faster installs and adding
      // guards against forgotten dependencies and such.
      //增加了对即插即用安装的支持，使安装和添加速度更快
      //防止忘记依赖关系等。
      PnpWebpackPlugin,
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      //阻止用户从src/(或node_modules/)外部导入文件。

      //这通常会引起混淆，因为我们只在src/ with babel中处理文件。

      //为了解决这个问题，我们禁止您从src/中导入文件——如果您愿意的话，

      //请将这些文件链接到您的node_modules中/并让模块解析发挥作用。

      //确保源文件已编译，因为它们不会以任何方式处理。
      // 自己的理解：禁止在paths.appSrc（src）中使用未引入paths.appPackageJson（package.json）的插件
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  resolveLoader: {
    plugins: [
      // Also related to Plug'n'Play, but this time it tells Webpack to load its loaders
      // from the current package.
      //也与即插即用有关，但这次它告诉Webpack加载它的加载器
      //从当前包。
      PnpWebpackPlugin.moduleLoader(module),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      // 禁用要求。确保它不是标准语言特性。
      { parser: { requireEnsure: false } },

      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      //首先，运行绒头。
      //在Babel处理JS之前这样做很重要。
      {
        test: /\.(js|mjs|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: require.resolve('react-dev-utils/eslintFormatter'),
              eslintPath: require.resolve('eslint'),
              
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        //“one of”将遍历所有后续加载器，直到其中一个加载器

        //符合要求。当没有加载器匹配它将下降

        //回到加载器列表末尾的“文件”加载器。
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          //“url”加载器的工作原理类似于“文件”加载器，只是它嵌入了资产

          //小于指定的字节限制，作为数据url，以避免请求。

          //缺少“测试”等同于匹配。
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // Process application JS with Babel.
          // The preset includes JSX, Flow, and some ESnext features.
          //用Babel处理应用程序JS。

          //预设包括JSX、Flow和一些ESnext特性。
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
              ),
              
              plugins: [
                [
                  require.resolve('babel-plugin-named-asset-import'),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
                      },
                    },
                  },
                ],
              ],
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              //这是webpack“Babel -loader”的一个特性(不是Babel本身)。

              //它支持在./node_modules/.cache/babel-loader/中缓存结果

              //目录，以便更快地重新构建。
              cacheDirectory: true,
              // Don't waste time on Gzipping the cache
              //不要把时间浪费在缓存的Gzipping上
              cacheCompression: false,
            },
          },
          // Process any JS outside of the app with Babel.
          // Unlike the application JS, we only compile the standard ES features.
          //用Babel处理app外部的任何JS。

          //与应用程序JS不同，我们只编译标准的ES特性。
          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [
                  require.resolve('babel-preset-react-app/dependencies'),
                  { helpers: true },
                ],
              ],
              cacheDirectory: true,
              // Don't waste time on Gzipping the cache
              cacheCompression: false,
              
              // If an error happens in a package, it's possible to be
              // because it was compiled. Thus, we don't want the browser
              // debugger to show the original code. Instead, the code
              // being evaluated would be much more helpful.
              //如果包中发生错误，则有可能发生错误

              //因为它是编译的。因此，我们不想要浏览器

              // 调试器显示原始代码。相反,代码

              //接受评估会更有帮助。
              sourceMaps: false,
            },
          },
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use a plugin to extract that CSS to a file, but
          // in development "style" loader enables hot editing of CSS.
          // By default we support CSS Modules with the extension .module.css
          //“postcss”加载程序将autoprefixer应用于我们的CSS。

          //“css”加载器解析css中的路径，并将资产添加为依赖项。

          //“style”loader将CSS转换成JS模块，注入
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
            }),
          },
          // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
          // using the extension .module.css
          {
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent,
            }),
          },
          // Opt-in support for SASS (using .scss or .sass extensions).
          // Chains the sass-loader with the css-loader and the style-loader
          // to immediately apply all styles to the DOM.
          // By default we support SASS Modules with the
          // extensions .module.scss or .module.sass
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: getStyleLoaders({ importLoaders: 2 }, 'sass-loader'),
          },
          // Adds support for CSS Modules, but using SASS
          // using the extension .module.scss or .module.sass
          {
            test: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent,
              },
              'sass-loader'
            ),
          },
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          //“文件”加载程序确保WebpackDevServer提供这些资产。

          //当你“导入”一个资产时，你会得到它的(虚拟)文件名。

          //在生产中，它们将被复制到“build”文件夹中。

          //这个加载器不使用“test”，所以它会捕获所有模块

          //从其他装载机上掉下来。
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      // ** STOP ** Are you adding a new loader?
      // Make sure to add the new loader(s) before the "file" loader.
    ],
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    //生成一个“索引”。文件与<脚本>注入。
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    //在index.html中提供一些环境变量。
    //公共URL在索引中可用%PUBLIC_URL%。html,例如:
    //在开发中，这将是一个空字符串。
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    // This gives some necessary context to module not found errors, such as
    // the requesting resource.
    //这为模块未找到的错误提供了一些必要的上下文，例如

    //请求资源。
    new ModuleNotFoundPlugin(paths.appPath),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
    //使得JS代码可以使用一些环境变量，例如:

    //如果(process.env。NODE_ENV === 'development'){…}。见“。/ js”。
    new webpack.DefinePlugin(env.stringified),
    // This is necessary to emit hot updates (currently CSS only):
    //这是必要的发出热更新(目前仅CSS):
    new webpack.HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    //如果您在路径中键入了错误的套管，那么Watcher将无法正常工作

    //当你尝试这样做时，一个插件会打印一个错误。
    // See https://github.com/facebook/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    //如果你需要一个丢失的模块，然后“npm安装”它，你仍然有

    //重新启动开发服务器，以便Webpack发现它。这个插件

    //使发现自动化，这样您就不必重新启动。
    // See https://github.com/facebook/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    //时刻。js是一个非常流行的库，它捆绑了大量的语言环境文件

    //默认情况下，由于Webpack如何解释其代码。这是一个实用的

    //要求用户选择导入特定地区的解决方案。
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    //生成一个清单文件，其中包含所有资产文件名的映射

    //到相应的输出文件中，这样工具就可以在不需要的情况下拾取它

    //必须解析“index.html”。
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: publicPath,
    }),
    // TypeScript type checking
    useTypeScript &&
      new ForkTsCheckerWebpackPlugin({
        typescript: resolve.sync('typescript', {
          basedir: paths.appNodeModules,
        }),
        async: false,
        checkSyntacticErrors: true,
        tsconfig: paths.appTsConfig,
        compilerOptions: {
          module: 'esnext',
          moduleResolution: 'node',
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: 'preserve',
        },
        reportFiles: [
          '**',
          '!**/*.json',
          '!**/__tests__/**',
          '!**/?(*.)(spec|test).*',
          '!src/setupProxy.js',
          '!src/setupTests.*',
        ],
        watch: paths.appSrc,
        silent: true,
        formatter: typescriptFormatter,
      }),
  ].filter(Boolean),

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  //有些库导入节点模块，但在浏览器中不使用它们。

  //告诉Webpack为它们提供空模拟，以便导入它们。
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  // Turn off performance processing because we utilize
  // our own hints via the FileSizeReporter
  //关闭性能处理，因为我们使用

  //我们自己的提示，通过FileSizeReporter
  performance: false,
};
