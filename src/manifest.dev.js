const packageJSON = require("../package.json");

module.exports = {
  "vendor.js": `vendor.bundle.v${packageJSON.version}.js`,
  "app.js": `app.bundle.v${packageJSON.version}.js`,
  "app.css": `app.bundle.v${packageJSON.version}.css`
};