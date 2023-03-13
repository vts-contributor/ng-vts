const path = require('path');
const fs = require('fs');
const capitalizeFirstLetter = require('./capitalize-first-letter');
const camelCase = require('./camelcase');

module.exports = function (showCaseComponentPath, result) {
  if (result.pageDemo) {
    const pageDemoComponent = generatePageDemoComponent(result);
    // fs.writeFileSync(path.join(showCaseComponentPath, `zh.page.component.ts`), pageDemoComponent.zh);
    fs.writeFileSync(path.join(showCaseComponentPath, `en.page.component.ts`), pageDemoComponent.en);
  }
  const demoTemplate = generateTemplate(result);
  // fs.writeFileSync(path.join(showCaseComponentPath, `zh.html`), demoTemplate.zh);
  fs.writeFileSync(path.join(showCaseComponentPath, `en.html`), demoTemplate.en);
  const demoComponent = generateDemoComponent(result);
  // fs.writeFileSync(path.join(showCaseComponentPath, `zh.component.ts`), demoComponent.zh);
  fs.writeFileSync(path.join(showCaseComponentPath, `en.component.ts`), demoComponent.en);
  const demoModule = generateDemoModule(result);
  fs.writeFileSync(path.join(showCaseComponentPath, `index.module.ts`), demoModule);
};

function generateDemoModule(content) {
  const demoModuleTemplate = String(fs.readFileSync(path.resolve(__dirname, '../template/demo-module.template.ts')));
  const component = content.name;
  const demoMap = content.demoMap;
  let imports = '';
  let declarations = '';
  let entryComponents = [];
  for (const key in demoMap) {
    const declareComponents = [`VtsDemo${componentName(component)}${componentName(key)}Component`];
    const entries = retrieveEntryComponents(demoMap[key] && demoMap[key].ts);
    entryComponents.push(...entries);
    declareComponents.push(...entries);
    imports += `import { ${declareComponents.join(', ')} } from './${key}';\n`;
    declarations += `\t\t${declareComponents.join(',\n\t')},\n`;
  }
  // imports += `import { VtsDemo${componentName(component)}ZhComponent } from './zh.component';\n`;
  imports += `import { VtsDemo${componentName(component)}EnComponent } from './en.component';\n`;
  // declarations += `\t\tVtsDemo${componentName(component)}ZhComponent,\n`;
  declarations += `\t\tVtsDemo${componentName(component)}EnComponent,\n`;
  if (content.pageDemo) {
    // imports += `import { VtsPageDemo${componentName(component)}ZhComponent } from './zh.page.component';\n`;
    imports += `import { VtsPageDemo${componentName(component)}EnComponent } from './en.page.component';\n`;
    // declarations += `\t\tVtsPageDemo${componentName(component)}ZhComponent,\n`;
    declarations += `\t\tVtsPageDemo${componentName(component)}EnComponent,\n`;
  }
  return demoModuleTemplate
    .replace(/{{imports}}/g, imports)
    .replace(/{{declarations}}/g, declarations)
    .replace(/{{component}}/g, componentName(component))
    .replace(/{{lowerComponent}}/g, componentName(component).toLowerCase())
    .replace(/{{entryComponents}}/g, entryComponents.join(',\n'));
}

function componentName(component) {
  return camelCase(capitalizeFirstLetter(component));
}

function generateComponentName(component, language) {
  return `VtsDemo${componentName(component)}${capitalizeFirstLetter(language)}Component`;
}

function generatePageDemoComponent(content) {
  const component = content.name;
  // let zhOutput = content.pageDemo.zhCode;
  let enOutput = content.pageDemo.enCode;
  // zhOutput = zhOutput
  //   .replace(`VtsPageDemo${componentName(component)}Component`, `VtsPageDemo${componentName(component)}ZhComponent`)
  //   .replace(`vts-page-demo-${component}`, `vts-page-demo-${component}-zh`);
  enOutput = enOutput
    .replace(`VtsPageDemo${componentName(component)}Component`, `VtsPageDemo${componentName(component)}EnComponent`)
    .replace(`vts-page-demo-${component}`, `vts-page-demo-${component}-en`);
  return {
    en: enOutput,
    // zh: zhOutput
  };
}

function generateDemoComponent(content) {
  const demoComponentTemplate = String(fs.readFileSync(path.resolve(__dirname, '../template/demo-component.template.ts')));
  const component = content.name;

  let output = demoComponentTemplate;
  output = output.replace(/{{component}}/g, component);

  // let zhOutput = output;
  let enOutput = output;

  enOutput = enOutput.replace(/{{componentName}}/g, generateComponentName(component, 'en'));
  enOutput = enOutput.replace(/{{language}}/g, 'en');
  // zhOutput = zhOutput.replace(/{{componentName}}/g, generateComponentName(component, 'zh'));
  // zhOutput = zhOutput.replace(/{{language}}/g, 'zh');

  return {
    en: enOutput,
    // zh: zhOutput
  };
}

function generateTemplate(result) {
  const generateTitle = require('./generate.title');
  const innerMap = generateExample(result);
  const titleMap = {
    // zh: generateTitle(result.docZh.meta, result.docZh.path),
    en: generateTitle(result.docEn.meta, result.docEn.path)
  };
  const name = result.name;
  const hasPageDemo = !!result.pageDemo;
  return {
    // zh: wrapperAll(
    //   generateToc('zh-CN', result.name, result.demoMap),
    //   wrapperHeader(titleMap.zh, result.docZh.whenToUse, 'zh', innerMap.zh, hasPageDemo, name) + wrapperAPI(result.docZh.api)
    // ),
    en: wrapperAll(
      generateToc('en-US', result.name, result.demoMap, !!result.docEn.api),
      wrapperHeader(titleMap.en, result.docEn.whenToUse, 'en', innerMap.en, hasPageDemo, name) + wrapperAPI(result.docEn.api)
    )
  };
}

function wrapperAPI(content) {
  const clone = content.replace(/<tbody>/g, '<tbody class="vts-table-tbody">')
                       .replace(/<thead>/g, '<thead class="vts-table-thead">')
                       .replace(/<td>/g, '<td class="vts-table-cell">')
                       .replace(/<th>/g, '<th class="vts-table-cell">')
                       .replace(/<tr>/g, '<tr class="vts-table-row">')
  return `<section class="markdown api-container" ngNonBindable>
    <div class="vts-table vts-table-bordered">
      <div class="vts-table-container" style="border:none !important;">
        <div class="vts-table-content">
          ${clone}
        </div>
      </div>
    </div>
  </section>`;
}

function wrapperHeader(title, whenToUse, language, example, hasPageDemo, name) {
  if (example) {
    return `<section class="markdown">
	${title}
	<section class="markdown" ngNonBindable>
		${whenToUse}
	</section>
	${hasPageDemo ? `<section class="page-demo"><vts-page-demo-${name}-${language}></vts-page-demo-${name}-${language}></section>` : ''}
	${name == 'icon' ? '' : `<h2>
		<span>${language === 'zh' ? 'Examples' : 'Examples'}</span>
	</h2>`}
</section>${example}`;
  } else {
    return `<section class="markdown">
	${title}
	<section class="markdown">
		${whenToUse}
	</section></section>`;
  }
}

function wrapperAll(toc, content) {
  return `<article>${toc}${content}</article>`;
}

function generateToc(language, name, demoMap, hasApi) {
  let linkArray = [];
  for (const key in demoMap) {
    linkArray.push({
      content: `<vts-link vtsHref="#components-${name}-demo-${key}" vtsTitle="${demoMap[key].meta.title[language]}"></vts-link>`,
      order: demoMap[key].meta.order
    });
  }
  linkArray.sort((pre, next) => pre.order - next.order);
  if (hasApi)
    linkArray.push({ content: `<vts-link vtsHref="#api" vtsTitle="API"></vts-link>` });
  const links = linkArray.map(link => link.content).join('');
  return `
    <vts-affix [vtsOffsetTop]="87" class="toc-affix">
        <vts-anchor [vtsOffsetTop]="87" [vtsAffix]="false" vtsShowInkInFixed (vtsClick)="goLink($event)">
            ${links}
        </vts-anchor>
    </vts-affix>
  `;
}

function generateExample(result) {
  const demoMap = result.demoMap;
  // const isZhUnion = result.docZh.meta.cols;
  const isEnUnion = result.docEn.meta.cols;
  const templateSplit = String(fs.readFileSync(path.resolve(__dirname, '../template/example-split.template.html')));
  const templateUnion = String(fs.readFileSync(path.resolve(__dirname, '../template/example-union.template.html')));
  let demoList = [];
  for (const key in demoMap) {
    demoList.push(Object.assign({ name: key }, demoMap[key]));
  }
  demoList.sort((pre, next) => pre.meta.order - next.meta.order);
  let firstZhPart = '';
  let secondZhPart = '';
  let firstEnPart = '';
  let secondEnPart = '';
  let enPart = '';
  // let zhPart = '';
  demoList.forEach((item, index) => {
    enPart += item.enCode;
    // zhPart += item.zhCode;
    if (index % 2 === 0) {
      // firstZhPart += item.zhCode;
      firstEnPart += item.enCode;
    } else {
      // secondZhPart += item.zhCode;
      secondEnPart += item.enCode;
    }
  });
  return {
    // zh: isZhUnion
    //   ? templateUnion.replace(/{{content}}/g, zhPart)
    //   : templateSplit.replace(/{{first}}/g, firstZhPart).replace(/{{second}}/g, secondZhPart),
    en: isEnUnion
      ? templateUnion.replace(/{{content}}/g, enPart)
      : templateSplit.replace(/{{first}}/g, firstEnPart).replace(/{{second}}/g, secondEnPart)
  };
}

function retrieveEntryComponents(plainCode) {
  const matches = (plainCode + '').match(/^\/\*\s*?declarations:\s*([^\n]+?)\*\//) || [];
  if (matches[1]) {
    return matches[1]
      .split(',')
      .map(className => className.trim())
      .filter((value, index, self) => value && self.indexOf(value) === index);
  }
  return [];
}
