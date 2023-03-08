import * as fs from 'fs-extra';
import { rollup } from 'rollup';
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { minify } from 'terser';
import * as _ from 'lodash'

const configModules = [
  'virtual',
  'keyboard',
  'mousewheel',
  'navigation',
  'pagination',
  'scrollbar',
  'parallax',
  'zoom',
  'lazy',
  'controller',
  'a11y',
  'history',
  'hash-navigation',
  'autoplay',
  'thumbs',
  'free-mode',
  'grid',
  'manipulation',
  'effect-fade',
  'effect-cube',
  'effect-flip',
  'effect-coverflow',
  'effect-creative',
  'effect-cards',
];

const isProd = true
const outputDir = './components/lib/dist/carousel'
const carouselDir = './components/lib/carousel'
const name = 'carousel-bundle'

async function cleanup() {
  if (fs.existsSync(outputDir))
    fs.removeSync(outputDir)
}

async function buildEntry(modules: {name: string, capitalized: string}[], format: string, browser: boolean = false): Promise<any> {
  const isUMD = format === 'umd';
  const isESM = format === 'esm';
  if (isUMD) browser = true;
  const external = isUMD || browser ? [] : () => true;
  let filename = name;
  if (isESM) filename += `.esm`;
  if (isESM && browser) filename += '.browser';

  fs.copySync(carouselDir, outputDir)

  return rollup({
    input: `${carouselDir}/carousel.js`,
    external,
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
        '//IMPORT_MODULES': modules
          .map((mod) => `import ${mod.capitalized} from './core/modules/${mod.name}/${mod.name}.js';`)
          .join('\n'),
        '//INSTALL_MODULES': modules.map((mod) => `${mod.capitalized}`).join(',\n  '),
        '//EXPORT': isUMD ? 'export default Carousel;' : 'export default Carousel; export { Carousel }',
      }),
      nodeResolve({ mainFields: ['module', 'main', 'jsnext'], rootDir: carouselDir }),
      babel({ babelHelpers: 'bundled' }),
    ],
    onwarn() {},
  })
    .then((bundle) =>
      bundle.write({
        format: format as any,
        name: 'Carousel',
        strict: true,
        sourcemap: false,
        sourcemapFile: `./${outputDir}/${filename}.js.map`,
        file: `./${outputDir}/${filename}.js`,
      }),
    )
    .then(async (bundle) => {
      if (!isProd || !browser) {
        return;
      }
      const result = bundle.output[0];
      const minified = await minify(result.code).catch((err) => {
        console.error(`Terser failed on file ${filename}: ${err.toString()}`);
      });
      await fs.writeFile(`./${outputDir}/${filename}.min.js`, minified?.code);
    })
    .then(() => {
      if (isProd && isESM && browser === false) return buildEntry(modules, format, true);
      return true;
    })
    .catch((err) => {
      console.error('Rollup error:', err.stack);
    });
}

export default async function buildJsBundle() {
  const modules: {name: string, capitalized: string}[] = [];
  configModules.forEach((name) => {
    const capitalized = _.capitalize(_.camelCase(name));
    const jsFilePath = `${carouselDir}/core/modules/${name}/${name}.js`;
    if (fs.existsSync(jsFilePath)) {
      modules.push({ name, capitalized });
    }
  });

  return cleanup().then(() => {
    return Promise.all([
      // buildEntry(modules, 'umd'), 
      buildEntry(modules, 'esm')
    ])
  })
}
