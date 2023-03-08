// tslint:disable:no-import-side-effect
import { series, task } from 'gulp';
import './tasks/clean';
import './tasks/schematic';
import './tasks/unit-test';
import './tasks/universal';
import './tasks/library';
import './tasks/site';

task(
  'build:library',
  series(
    'library:build-externals',
    'library:build-components',
    'library:copy-resources',
    'library:copy-externals'
  )
)

task('start:dev', series(
  'clean',
  'library:build-externals',
  'start:site'
));
