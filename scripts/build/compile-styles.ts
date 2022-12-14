import * as fs from 'fs-extra';
import * as less from 'less';
import * as path from 'path';
import { buildConfig } from '../build-config';

const LessPluginCleanCSS = require('less-plugin-clean-css');
const NpmImportPlugin = require('less-plugin-npm-import');

async function compileLess(content: string, savePath: string, min: boolean, sub?: boolean, rootPath?: string): Promise<void> {
  // tslint:disable-next-line:no-any
  const plugins: any[] = [];
  const lessOptions: Less.Options = { plugins: plugins, javascriptEnabled: true };

  if (min) {
    plugins.push(new LessPluginCleanCSS({ advanced: true }));
  }

  if (sub) {
    lessOptions.paths = [path.dirname(rootPath as string)];
    lessOptions.filename = rootPath;
    plugins.push(
      new NpmImportPlugin({
        prefix: '~'
      })
    );
  }

  return less
    .render(content, lessOptions)
    .then(({ css }) => {
      return fs.writeFile(savePath, css);
    })
    .catch(err => {
      console.log(err)
      Promise.reject(err)
    });
}

const sourcePath = buildConfig.componentsDir;
const targetPath = buildConfig.publishDir;

export async function compile(): Promise<void | void[]> {
  const componentFolders = fs.readdirSync(targetPath);
  const promiseList = [];

  for (const dir of componentFolders) {
    if (await fs.pathExists(`${sourcePath}/${dir}/style/index.less`)) {
      // Copy style files for each component.
      await fs.copy(`${sourcePath}/${dir}/style`, `${targetPath}/${dir}/style`);

      // Compile less files to CSS and delete the `entry.less` file.
      const buildFilePath = `${sourcePath}/${dir}/style/entry.less`;
      const componentLess = await fs.readFile(buildFilePath, { encoding: 'utf8' });
      if (await fs.pathExists(buildFilePath)) {
        promiseList.push(compileLess(componentLess, path.join(targetPath, dir, 'style', `index.css`), false, true, buildFilePath));
        promiseList.push(compileLess(componentLess, path.join(targetPath, dir, 'style', `index.min.css`), true, true, buildFilePath));
      }
    }
  }



  // Copy concentrated less files.
  // await fs.copy(path.resolve(sourcePath, 'style'), path.resolve(targetPath, 'style'));
  // await fs.writeFile(`${targetPath}/components.less`, await fs.readFile(`${sourcePath}/components.less`));
  // await fs.writeFile(`${targetPath}/ng-vts.less`, await fs.readFile(`${sourcePath}/ng-vts.less`));
  // await fs.writeFile(`${targetPath}/ng-vts.dark.less`, await fs.readFile(`${sourcePath}/ng-vts.dark.less`));
  // await fs.writeFile(`${targetPath}/ng-vts.aliyun.less`, await fs.readFile(`${sourcePath}/ng-vts.aliyun.less`));
  // await fs.writeFile(`${targetPath}/ng-vts.compact.less`, await fs.readFile(`${sourcePath}/ng-vts.compact.less`));

  // Compile concentrated less file to CSS file.
  // const lessContent = `@import "${path.posix.join(targetPath, 'ng-vts.less')}";`;
  // promiseList.push(compileLess(lessContent, path.join(targetPath, 'ng-vts.css'), false));
  // promiseList.push(compileLess(lessContent, path.join(targetPath, 'ng-vts.min.css'), true));

  // Compile the dark theme less file to CSS file.
  // const darkLessContent = `@import "${path.posix.join(targetPath, 'ng-vts.dark.less')}";`;
  // promiseList.push(compileLess(darkLessContent, path.join(targetPath, 'ng-vts.dark.css'), false));
  // promiseList.push(compileLess(darkLessContent, path.join(targetPath, 'ng-vts.dark.min.css'), true));

  // // Compile the compact theme less file to CSS file.
  // const compactLessContent = `@import "${path.posix.join(targetPath, 'ng-vts.compact.less')}";`;
  // promiseList.push(compileLess(compactLessContent, path.join(targetPath, 'ng-vts.compact.css'), false));
  // promiseList.push(compileLess(compactLessContent, path.join(targetPath, 'ng-vts.compact.min.css'), true));

  // // Compile the aliyun theme less file to CSS file.
  // const aliyunLessContent = `@import "${path.posix.join(targetPath, 'ng-vts.aliyun.less')}";`;
  // promiseList.push(compileLess(aliyunLessContent, path.join(targetPath, 'ng-vts.aliyun.css'), false));
  // promiseList.push(compileLess(aliyunLessContent, path.join(targetPath, 'ng-vts.aliyun.min.css'), true));

  // Compile css file that doesn't have component-specific styles.
  // const cssIndexPath = path.join(sourcePath, 'style', 'entry.less');
  // const cssIndex = await fs.readFile(cssIndexPath, { encoding: 'utf8' });
  // promiseList.push(compileLess(cssIndex, path.join(targetPath, 'style', 'index.css'), false, true, cssIndexPath));
  // promiseList.push(compileLess(cssIndex, path.join(targetPath, 'style', 'index.min.css'), true, true, cssIndexPath));
  return Promise.all(promiseList).catch(e => console.log(e));
}
