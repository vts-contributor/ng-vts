// tslint:disable:no-import-side-effect
import { series, task } from 'gulp';
import './tasks/clean';
import './tasks/unit-test';
import './tasks/universal';
import './tasks/library';
import './tasks/site';

task(
  'build:library',
  series(
    'library:build-components',
    'library:copy-resources',
  )
)

task('start:dev', series(
  'clean',
  'start:site'
));
