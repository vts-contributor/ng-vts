import * as fs from 'fs-extra';
import * as path from 'path';

import { buildConfig } from '../build-config';

const sourcePath = buildConfig.publishDir;
const targetPath = path.join(buildConfig.publishDir, `src`);

export function copyStylesToSrc(): void {
  fs.mkdirsSync(targetPath);
  fs.copySync(path.resolve(sourcePath, `style`), path.resolve(targetPath, `style`));
  fs.copySync(path.resolve(sourcePath, `ng-vts.css`), path.resolve(targetPath, `ng-vts.css`));
  fs.copySync(path.resolve(sourcePath, `ng-vts.min.css`), path.resolve(targetPath, `ng-vts.min.css`));
  fs.outputFileSync(path.resolve(targetPath, `ng-zorro-antd.less`), `@import "../style/entry.less";
@import "../components.less";`);
}
