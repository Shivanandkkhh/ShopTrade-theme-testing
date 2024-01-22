const glob = require('glob');
const path = require('path'); //get absolute paths
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //extract css from js imports
const WebpackShellPluginNext = require('webpack-shell-plugin-next'); //execute shell commands
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts'); //remove unwanted js created while compiling scss
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const stats = mode === 'development' ? 'errors-only' : { children: false }; //hide or show warning
require('dotenv').config();
const storeUrl = process.env.STORE_URL;
const themeId = process.env.THEME_ID;

const scssEntryPoint = glob.sync('./scss/sections/**.scss').reduce((acc, path) => {
  const entry = path.replace(/^.*[\\\/]/, '').replace('.scss', '');
  acc[entry] = path;
  return acc;
}, {});

const jsEntryPoints = glob.sync('./js/sections/**/**.js').reduce((acc, path) => {
  const entry = path.replace(/^.*[\\\/]/, '').replace('.js', '');
  acc[entry] = path;
  return acc;
}, {});

module.exports = {
  mode,
  stats,
  entry: {
    ...scssEntryPoint,
    ...jsEntryPoints
  }, //webpack supports multiple entry as an object  {chunkname: entrypath}
  resolve: {
    alias: {
      StyleComponents: path.resolve(__dirname, 'scss/components'),
      Token: path.resolve(__dirname, 'scss/designTokens/index.scss'),
      breakpoints: path.resolve(__dirname, 'scss/components/breakpoints.scss'),
      JsComponents: path.resolve(__dirname, 'js/components'),
      SvelteComponents: path.resolve(__dirname, 'js/components/svelte'),
      svelte: path.resolve('node_modules', 'svelte/src/runtime')
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
    conditionNames: ['svelte', 'browser', 'import']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(sc|sa)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require("sass")
            }
          }
        ]
      },
      {
        test: /\.(html|svelte)$/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            compilerOptions: {
              customElement: true
            }
          }
        }
      },
      {
        // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
      }
    ]
  },
  output: {
    clean: false,
    filename: './[name].js',
    path: path.resolve(__dirname, 'assets'),
    chunkFilename: './[name].js?[chunkhash]' //added chunkhash for dynamically created chunk, else browser wont know if file has been changed and will show cached version.
  },

  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: './[name].css'
    })
  ],

};

//treeshake and watch on development
if (mode === 'development') {
  module.exports.devtool = false;
  module.exports.plugins.push(
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: ['echo Webpack build in progress...🛠']
      },
      onBuildEnd: {
        scripts: ['echo Build Complete 📦',`shopify theme dev --poll --theme-editor-sync -s ${storeUrl} -t ${themeId}`],
        parallel: true //this is required to make webpack watch run in background.
      }
    })
  );
  module.exports.optimization = {
    usedExports: true, //check for ununsed exports for treeshaking within file
    splitChunks: {
      usedExports: true, //check for ununsed exports for treeshaking within chunk
      cacheGroups: {
        default: false, //override default
        Vendors: {  //create a seperate chunk for vendor
          test: /[\\/]node_modules[\\/]/, //required both / & \ to support cross platform between unix and windows
          name: 'vendors',//only create chunk for dependencies
          chunks :'all', //create chunk for all sync , async and cjs modules
          type: /javascript/,
          enforce: true // ignores minSize: 2000, minChunks: 1,priority: 0,
        },
        common: { //create a common chunk
          chunks: "all", //create chunk for all sync , async and cjs modules
          minChunks: 2, //minimum import for creating chunk
          name: 'shared',
          priority: -20, //-ve value denotes that it will be in lowest priority
          minSize: 0,//minimum size that required for creating a chunk, we would not want just few lines of code getting chunked together, so minimum size set to 1kb
          type: /javascript/
        }
      },
    }
  }
}

if(mode == "production") {
  module.exports.optimization = {
    usedExports: true, //check for ununsed exports for treeshaking within file
    splitChunks: {
      chunks :'all',//create chunk for all sync , async and cjs modules
      usedExports: true, //check for ununsed exports for treeshaking within chunk
      cacheGroups: {
        default: false, //override default
        Vendors: {  //create a seperate chunk for vendor
          test: /[\\/]node_modules[\\/]/, //required both / & \ to support cross platform between unix and windows
          name: 'vendors',//only create chunk for dependencies
          type: /javascript/,
          enforce: true // ignores minSize: 2000, minChunks: 1,priority: 0,
        },
        common: { //create a common chunk
          chunks: "all", //create chunk for all sync , async and cjs modules
          minChunks: 2, //minimum import for creating chunk
          name: 'shared',
          priority: -20, //-ve value denotes that it will be in lowest priority
          minSize: 0,//minimum size that required for creating a chunk, we would not want just few lines of code getting chunked together, so minimum size set to 1kb
          type: /javascript/
        }
      },
    }
  }
}