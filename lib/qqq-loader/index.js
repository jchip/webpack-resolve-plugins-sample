const Fs = require("fs");

module.exports = function (content) {
  this.cacheable && this.cacheable();

  if (!this.emitFile) {
    throw new Error("emitFile is required from module system");
  }

  return `module.exports = "from qqq loader";`;
}
module.exports.raw = true;
