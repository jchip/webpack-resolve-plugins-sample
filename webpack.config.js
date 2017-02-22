const Path = require("path");

class Foo {
  constructor() {
    console.log("Foo");
  }

  apply(compiler) {
    compiler.plugin("after-emit", (compileation, callback) => {
      callback();
    });
  }
}


class Bar {
  constructor() {
    console.log("Bar");
  }

  apply(compiler) {
    compiler.plugin("done", (stats) => {
      console.log("Bar done");
    });

    compiler.plugin("fail", (error) => {
      console.log("Bar fail");
    });
  }
}

// https://github.com/webpack/enhanced-resolve/blob/master/lib/ResolverFactory.js#L177-L182
// https://github.com/webpack/enhanced-resolve/blob/master/lib/ModulesInRootPlugin.js

// modules.forEach(function (item) {
//   if (Array.isArray(item))
//     plugins.push(new ModulesInHierachicDirectoriesPlugin("module", item, "resolve"));
//   else
//     plugins.push(new ModulesInRootPlugin("module", item, "resolve"));
// });

class ResolvePlugin {
  constructor() {
  }

  apply(resolver) {
    resolver.plugin("module", (request, callback) => {
      const obj = Object.assign({}, request, {
        path: Path.join(__dirname, "foo"),
        request: "./" + request.request
      });
      resolver.doResolve("resolve", obj, "looking for modules in " + obj.path, callback, true);
    });
  }
}

module.exports = {
  entry: "./app.js",
  output: {
    path: "build",
    filename: "bundle.js"
  },
  plugins: [
    new Foo(),
    new Bar()
  ],
  module: {
    rules: [
      {
        test: /\.txt?$/,
        use: "text-loader"
      }
    ]
  },
  resolve: {
    modules: [],
    plugins: [
      new ResolvePlugin()
    ]
  },
  resolveLoader: {
    modules: [],
    plugins: [
      new ResolvePlugin()
    ]
  }
};
