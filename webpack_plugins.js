const fs = require("fs");
const path = require("path");
const vendors = require("./vendors.json");
const packageJSON = require("./package.json");

/**
 * génère un manifest au format json
 * @param {object} options - configuration du plugin
 * @param {Array.<string>} options.extensionToIgnore - tableau des extension à ne pas inclure dans le manifest
 * @param {string} [options.filePath] - emplacement du manifest
 * @param {string} [options.fileName] - nom du manifest
 */
function manifestPlugin (options = {extensionToIgnore: ["map.js"]}) {
  return function () {
    this.plugin("done", function (stats) {
      const ignore = new RegExp(`${options.extensionToIgnore.join("|")}$`);
      let manifest = {};
      debugger;
      stats.compilation.chunks.forEach((chunk) => {
        chunk.files.forEach((file) => {
          let extension = file.split(".").pop() || "";
          if (options.extensionToIgnore.length > 0 && !ignore.test(file)) {
            manifest[`${chunk.name}.${extension}`] = file;
          }
        });
      });
      fs.writeFileSync(path.resolve(options.filePath || stats.compilation.chunkTemplate.outputOptions.path, options.fileName || "manifest.json"), JSON.stringify(manifest));
    });
  }
}

/**
 * renvoie les dépendances à mettre dans le bundle vendors
 * Il est possible de forcer l'exclusion ou inclusion de dépendance dans le fichier vendors.json
 * @return {Array.<string>}
 */
function getVendors () {
  const dependencies = Object.keys(packageJSON.dependencies)
    .filter(dependency => (vendors.exclude||[]).indexOf(dependency) === -1);
  return dependencies.concat((vendors.include||[])
    .filter(dependency => dependencies.indexOf(dependency) === -1));
}

module.exports = {
  manifestPlugin,
  getVendors
};