const path = require('path');
const fs = require('fs-extra');
const PrismAngular = require('./angular-language-marked');

module.exports = function generateDemoCodeFiles(content, sitePath) {
  const demoMap = content.demoMap;
  for (const key in demoMap) {
    const highlightCode = PrismAngular.highlight(demoMap[key].ts, Prism.languages['angular']);
    const rawCode = demoMap[key].ts;
    const targetPath = path.join(sitePath, 'doc/assets/codes', `${content.name}-demo-${key}.json`);

    const highlightJs = demoMap[key].js ? PrismAngular.highlight(demoMap[key].js, Prism.languages['javascript']) : null; 

    fs.ensureFileSync(targetPath);
    fs.writeJSONSync(targetPath, {
      highlightCode,
      rawCode,
      highlightJs
    }, {

    })
  }
};
