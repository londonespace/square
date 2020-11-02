const fs = require('fs');

function bundleJSON() {
  let jsonFiles = fs.readdirSync('app/pug/json/');
  let jsonData = {};

  for (file of jsonFiles) {
    if (!file.includes('.json')) continue;

    let fileData = JSON.parse(fs.readFileSync(`app/pug/json/${file}`));
    Object.assign(jsonData, fileData);
  }

  return jsonData;
}

module.exports.bundleJSON = bundleJSON;