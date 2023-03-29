import * as fs from 'fs-extra';
import { parallel, series, task, watch } from 'gulp';
import { debounce } from 'lodash';
import { join } from 'path';
import { buildConfig } from '../../build-config';
import { execNodeTask, execTask } from '../util/task-helpers';

const detectPort = require('detect-port');
const siteGenerate = require('../../site/generate-site');
// const colorGenerate = require('../../site/generateColorLess');
// const themeGenerate = require('../../site/generate-theme');

const docsGlob = join(buildConfig.componentsDir, `**/doc/*.+(md|txt)`);
const demoGlob = join(buildConfig.componentsDir, `**/demo/*.+(md|ts)`);
const issueHelperScriptFile = join(buildConfig.scriptsDir, 'release-helper.sh');
const tsconfigFile = join(buildConfig.projectDir, 'site/tsconfig.app.json');

const host = process.env.HOST || null;
const port = process.env.PORT || '4200';
const path = process.env.CONTEXT_PATH

// const CI = process.env.CI;

/**
 * Development app watch task,
 * to ensures the demos and docs have changes are rebuild.
 */
task('watch:site', () => {
  // Globs accepts the Unix-style path separators only
  const globs = [docsGlob, demoGlob].map(p => p.replace(/\\/g, '/'));
  watch(globs).on(
    'change',
    debounce(path => {
      const p = path.replace(/\\/g, '/');
      const execArray = /components\/(.+)\/(doc|demo)/.exec(p);
      if (execArray && execArray[1]) {
        const component = execArray[1];
        console.log(`Reload '${component}'`);
        siteGenerate(component);
      }
    }, 3000)
  );
});

/** Parse demos and docs to site directory. */
task('init:site', done => {
  siteGenerate('init');
  done();
  // colorGenerate().then(themeGenerate).then(done);
});

/** Run `ng serve` */
task('serve:site', done => {
  const command = [
    'serve', 
    '--project=ng-vts-doc',
    ...['--port', port], 
    ...(host ? ['--host', host] : []),
    // ...(path ? ['--base-href', path] : []),
  ];

  detectPort(port).then(() => {
    execNodeTask('@angular/cli', 'ng', command)(done);
  });
});

/** Run `ng build --configuration=production --project=ng-vts-doc --configuration es5` */
task('build:site-doc-es5', done => {
  const command = [
    'build', 
    '--project=ng-vts-doc',
    '--configuration=production',
    '--configuration=es5',
    ...(path ? ['--base-href', path] : [])
  ];
  execNodeTask('@angular/cli', 'ng', command)(done);
}); 

/** Run `ng build --configuration=production --project=ng-vts-doc` */
task('build:site-doc', done => {
  const command = [
    'build', 
    '--project=ng-vts-doc',
    '--configuration=production',
    ...(path ? ['--base-href', path] : [])
  ];
  execNodeTask('@angular/cli', 'ng', command)(done);
}); 

/** Run `ng build --configuration=production --base-href ./ --project=ng-vts-iframe` */
task('build:site-iframe', done => {
  const command = [
    'build', 
    '--project=ng-vts-iframe',
    '--configuration=production'
  ];
  execNodeTask('@angular/cli', 'ng', command)(done);
}); 

/** Replace the library paths to publish/ directory */
task('site:replace-path', () => {
  // tslint:disable-next-line:no-any
  const tsconfig: any = fs.readJSONSync(tsconfigFile);
  tsconfig.compilerOptions.paths['ng-vts'] = ['../publish'];
  tsconfig.compilerOptions.paths['@ui-vts/ng-vts/*'] = ['../publish/*'];
  return fs.writeJSON(tsconfigFile, tsconfig);
});

/** Run release-helper.sh
 * Clone issue-helper builds from github and copy to the output directory.
 */
task('build:site-issue-helper', execTask('bash', [issueHelperScriptFile]));

/** Build all site projects to the output directory. */
task(
  'build:site', series('prerender', 'build:site-iframe', 'build:site-issue-helper')
);

/** Init site directory, and start watch and ng-serve */
task('start:site', series('init:site', parallel('watch:site', 'serve:site')));

/** Task that use source code to build ng-vts-doc project,
 * output not included issue-helper/iframe and prerender.
 */
task('build:simple-site', series('init:site', 'build:site-doc'));

/** Task that use publish code to build ng-vts-doc project,
 * output included issue-helper/iframe and prerender.
 */
task('build:release-site', series('init:site', 'site:replace-path', 'build:site'));


task('build:site-doc-iframe', series('init:site', 'build:site-doc', 'build:site-iframe'));
