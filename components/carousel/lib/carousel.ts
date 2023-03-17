import Carousel from './core/core';
import Virtual from './core/modules/virtual/virtual';
import Keyboard from './core/modules/keyboard/keyboard';
import Mousewheel from './core/modules/mousewheel/mousewheel';
import Navigation from './core/modules/navigation/navigation';
import Pagination from './core/modules/pagination/pagination';
import Scrollbar from './core/modules/scrollbar/scrollbar';
import Parallax from './core/modules/parallax/parallax';
import Zoom from './core/modules/zoom/zoom';
import Lazy from './core/modules/lazy/lazy';
import Controller from './core/modules/controller/controller';
import A11y from './core/modules/a11y/a11y';
import History from './core/modules/history/history';
import Hashnavigation from './core/modules/hash-navigation/hash-navigation';
import Autoplay from './core/modules/autoplay/autoplay';
import Thumbs from './core/modules/thumbs/thumbs';
import Freemode from './core/modules/free-mode/free-mode';
import Grid from './core/modules/grid/grid';
import Manipulation from './core/modules/manipulation/manipulation';
import Effectfade from './core/modules/effect-fade/effect-fade';
import Effectcube from './core/modules/effect-cube/effect-cube';
import Effectflip from './core/modules/effect-flip/effect-flip';
// import Effectcoverflow from './core/modules/effect-coverflow/effect-coverflow';
// import Effectcreative from './core/modules/effect-creative/effect-creative';
// import Effectcards from './core/modules/effect-cards/effect-cards';

// Carousel Class
const modules = [
  Virtual,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  Parallax,
  Zoom,
  Lazy,
  Controller,
  A11y,
  History,
  Hashnavigation,
  Autoplay,
  Thumbs,
  Freemode,
  Grid,
  Manipulation,
  Effectfade,
  Effectcube,
  Effectflip
  // Effectcoverflow,
  // Effectcreative,
  // Effectcards
];
Carousel.use(modules);

export default Carousel;
