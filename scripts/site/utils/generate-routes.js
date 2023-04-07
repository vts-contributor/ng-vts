const path = require('path');
const fs = require('fs');
const templateRouter = String(fs.readFileSync(path.resolve(__dirname, '../template/router.template.ts')));
const capitalizeFirstLetter = require('./capitalize-first-letter');
const camelCase = require('./camelcase');

function generateLanguageData(itemData, language, reverseMap, key) {
  const subtitle = itemData[language].subtitle || '';
  const title = itemData[language].title;
  const type = itemData[language].type;
  const cover = itemData[language].cover;
  const experimental = itemData[language].experimental;
  const description = itemData[language].description;
  const hidden = itemData[language].hidden;
  const order = itemData[language].order != undefined ? itemData[language].order : 100;
  const content = {
    label: title,
    path: `${experimental ? 'experimental' : 'components'}/${key}/${language}`,
    zh: subtitle,
    experimental: !!experimental,
    hidden: !!hidden,
    cover,
    description,
    order
  };
  if (!reverseMap[type]) {
    reverseMap[type] = { list: [content], language };
  } else {
    reverseMap[type].list.push(content);
  }
}

function generateNav(componentsDocMap) {
  const reverseMap = {};
  let routes = '';

  const filters = [
    "accordion",
    "alert",
    "avatar",
    "breadcrumb",
    "button",
    "card",
    "carousel",
    "chart",
    "checkbox",
    "date-picker",
    "dropdown",
    "grid",
    "icon",
    "inplace",
    "image",
    "inplace",
    "input",
    "layout",
    "menu",
    "panel",
    "pagination",
    "pie-chart",
    "prolayout",
    "radio",
    "result",
    "select",
    "skeleton",
    "slider",
    "space",
    "splitter",
    "table",
    "tag",
    "textarea",
    "time-picker",
    "toast",
    "tooltip",
    "typography",
    "upload"
  ]
  console.log(filters)
  for (const key in componentsDocMap) {
    if (!filters.includes(key))
      continue

    // generateLanguageData(componentsDocMap[key], 'zh', reverseMap, key);
    generateLanguageData(componentsDocMap[key], 'en', reverseMap, key);
    const moduleName = capitalizeFirstLetter(camelCase(key));
    // const experimental = componentsDocMap[key]['zh'].experimental || componentsDocMap[key]['en'].experimental;
    const experimental = componentsDocMap[key]['en'].experimental;
    routes += `  {'path': '${
      experimental ? 'experimental' : 'components'
    }/${key}', 'loadChildren': () => import('./${key}/index.module').then(m => m.VtsDemo${moduleName}Module)}, \n`;
  }
  return { reverseMap, routes };
}

module.exports = function generateRoutes(showCaseTargetPath, componentsDocMap, docsMeta) {
  let intro = [];
  let components = [];

  intro.push({
    path: `installation`,
    label: 'Installation',
    language: 'en',
    order: 0,
    hidden: false,
    description: 'Installation',
    experimental: false
  });

  for (const key in docsMeta) {
    const enMeta = docsMeta[key].en;
    // const zhMeta = docsMeta[key].zh;
    intro.push({
      path: `docs/${key}/en`,
      label: enMeta.title,
      language: 'en',
      order: enMeta.order,
      hidden: !!enMeta.hidden,
      description: enMeta.description,
      experimental: !!enMeta.experimental
    });
    // intro.push({
    //   path: `docs/${key}/zh`,
    //   label: zhMeta.title,
    //   language: 'zh',
    //   order: zhMeta.order,
    //   hidden: !!zhMeta.hidden,
    //   description: zhMeta.description,
    //   experimental: !!zhMeta.experimental
    // });
  }
  intro.sort((pre, next) => pre.order - next.order);
  fs.writeFileSync(path.join(showCaseTargetPath, `intros.json`), JSON.stringify(intro, null, 2));
  const navData = generateNav(componentsDocMap);
  const routes = navData.routes;

  for (const key in navData.reverseMap) {
    components.push({
      name: key,
      language: navData.reverseMap[key].language,
      children: navData.reverseMap[key].list.filter(item => !item.experimental).sort((pre, next) => pre.order - next.order),
      experimentalChildren: navData.reverseMap[key].list.filter(item => item.experimental && !item.hidden),
    });
  }

  // const sortMap = {
  //   General: 0,
  //   通用: 0,
  //   Layout: 1,
  //   布局: 1,
  //   Navigation: 2,
  //   导航: 2,
  //   'Data Entry': 3,
  //   数据录入: 3,
  //   'Data Display': 4,
  //   数据展示: 4,
  //   Feedback: 5,
  //   反馈: 5,
  //   Localization: 6,
  //   Other: 7,
  //   其他: 7
  // };
  // components.sort((pre, next) => {
  //   return sortMap[pre.name] - sortMap[next.name];
  // });

  const fileContent = templateRouter
    .replace(/{{intro}}/g, JSON.stringify(intro, null, 2))
    .replace(/{{components}}/g, JSON.stringify(components, null, 2))
    .replace(/{{routes}}/g, routes);
  fs.writeFileSync(path.join(showCaseTargetPath, `router.ts`), fileContent);
};
