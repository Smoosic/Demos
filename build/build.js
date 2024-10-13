const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const BUILD_DIR = __dirname;
const BASE_DIR = path.join(BUILD_DIR, '..');
const args = process.argv.slice(2);
var command = args[0] ?? 'monolith';
console.log(`command is ${command}`);
const webpack = require('webpack');
const webpackConfig = {
  mode: 'development',
  entry: path.join(BASE_DIR, 'index.ts'),
  output: {
    path: BUILD_DIR,
    filename: 'demo.js',
    library: 'demo',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  devtool: 'source-map',  
  stats: {
    assets: true,
    modules: true,
    loggingDebug: true,
    colors: true,
    reasons: true,
    usedExports: true
  },
  module: {      
      rules: [ {
      test: /(\.ts?$|\.js?$)/,
      include: { or: [
        path.resolve(BASE_DIR, 'src')
      ]},
      exclude: [/node_modules/],
      use: [
        {
        loader: 'ts-loader',
        options: {
          configFile: "tsconfig.json"
        }
      }
       ]
    }]
  }
};
if (command === 'types') {
  console.log('using types file');
  webpackConfig.module.rules[0].use[0].options = {
    configFile: 'tsconfig-types.json'
  };
}
const compiler = webpack(webpackConfig);
compiler.run((err, stats) => {
  if (err) {
    console.warn(err);
  }
  console.log(stats.toString({
    colors: true
  }));
  console.log(new Date().toUTCString());
});
/* require('child_process').exec('node ./node_modules/webpack-cli/bin/cli.js', (error, stdout, stderr) => {
  console.log(`${stdout}`);
  console.log(new Date().toUTCString());
});  */
