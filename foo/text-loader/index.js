const Fs = require("fs");

module.exports = function (content) {
  this.cacheable && this.cacheable();

  if (!this.emitFile) {
    throw new Error("emitFile is required from module system");
  }

  const text = content.toString().split("\n").map((x) => `"${x.trim()}"`).join("+");

  return `module.exports = ${text};`;
}
module.exports.raw = true;
