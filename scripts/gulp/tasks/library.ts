import { dest, src, task } from 'gulp';
import { join } from 'path';
import { buildConfig } from '../../build-config';
import { compile as compileLess } from '../../build/compile-styles';
import { generateLessVars } from '../../build/generate-less-vars';
import { copyStylesToSrc } from '../../build/migration-styles';
import { execNodeTask } from '../util/task-helpers';

/** Run `ng build ng-vts-lib --configuration=production` */
task('library:build-components', execNodeTask('@angular/cli', 'ng', ['build', 'ng-vts-lib']));

/** Run `ng build ng-vts-lib` */
task('library:ivy-prebuild', execNodeTask('@angular/cli', 'ng', ['build', 'ng-vts-lib']));

// Compile less to the public directory.
task('library:compile-less', done => {
  compileLess().then(() => {
    copyStylesToSrc();
    done();
  });
});

// Compile less to the public directory.
task('library:generate-less-vars', done => {
  generateLessVars();
  done();
});

// Copies README.md file to the public directory.
task('library:copy-resources', () => {
  return src([join(buildConfig.componentsDir)]).pipe(dest(join(buildConfig.publishDir)));
});

// Copies files without ngcc to lib folder.
task('library:copy-libs', () => {
  return src([join(buildConfig.publishDir, '**/*')]).pipe(dest(join(buildConfig.libDir)));
});