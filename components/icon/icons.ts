/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { IconDefinition } from '@ui-vts/icons-angular';

const PickerSuffix: IconDefinition = {
  icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H1C0.734784 20 0.48043 19.8946 0.292893 19.7071C0.105357 19.5196 0 19.2652 0 19V3C0 2.73478 0.105357 2.48043 0.292893 2.29289C0.48043 2.10536 0.734784 2 1 2H5V0H7V2H13V0H15V2ZM2 8V18H18V8H2ZM4 10H6V12H4V10ZM9 10H11V12H9V10ZM14 10H16V12H14V10Z" fill="currentColor"/></svg>`,
  name: `suffix`,
  type: 'vts-picker'
};

const Spin: IconDefinition = {
  icon: `
    <?xml version="1.0" encoding="utf-8"?>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(241, 242, 243); display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="84" cy="50" r="10" fill="#f56685">
            <animate attributeName="r" repeatCount="indefinite" dur="0.3571428571428571s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s"></animate>
            <animate attributeName="fill" repeatCount="indefinite" dur="1.4285714285714284s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#f56685;#8f9294;#f56685;#8f9294;#f56685" begin="0s"></animate>
        </circle><circle cx="16" cy="50" r="10" fill="#f56685">
        <animate attributeName="r" repeatCount="indefinite" dur="1.4285714285714284s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
        <animate attributeName="cx" repeatCount="indefinite" dur="1.4285714285714284s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
        </circle><circle cx="50" cy="50" r="10" fill="#8f9294">
        <animate attributeName="r" repeatCount="indefinite" dur="1.4285714285714284s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.3571428571428571s"></animate>
        <animate attributeName="cx" repeatCount="indefinite" dur="1.4285714285714284s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.3571428571428571s"></animate>
        </circle><circle cx="84" cy="50" r="10" fill="#f56685">
        <animate attributeName="r" repeatCount="indefinite" dur="1.4285714285714284s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.7142857142857142s"></animate>
        <animate attributeName="cx" repeatCount="indefinite" dur="1.4285714285714284s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.7142857142857142s"></animate>
        </circle><circle cx="16" cy="50" r="10" fill="#8f9294">
        <animate attributeName="r" repeatCount="indefinite" dur="1.4285714285714284s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.0714285714285714s"></animate>
        <animate attributeName="cx" repeatCount="indefinite" dur="1.4285714285714284s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.0714285714285714s"></animate>
        </circle>
    </svg>
    `,
  name: 'icon',
  type: 'vts-spin'
};

const CodeExpand: IconDefinition = {
  icon: `<svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" > <path d="M23.874 12.452c0.202 -0.436 0.108 -0.971 -0.268 -1.309l-4.807 -4.328c-0.462 -0.416 -1.173 -0.378 -1.589 0.083 -0.416 0.462 -0.378 1.173 0.083 1.589l3.897 3.509 -3.921 3.53c-0.462 0.416 -0.499 1.127 -0.083 1.589 0.416 0.462 1.127 0.499 1.589 0.083l4.807 -4.328a1.12 1.12 0 0 0 0.292 -0.417zM2.811 11.986l3.897 -3.509c0.462 -0.416 0.499 -1.127 0.083 -1.589 -0.416 -0.462 -1.127 -0.499 -1.589 -0.083L0.396 11.133C0.02 11.472 -0.075 12.006 0.128 12.442a1.12 1.12 0 0 0 0.292 0.417l4.807 4.328c0.462 0.416 1.173 0.378 1.589 -0.083 0.416 -0.462 0.378 -1.173 -0.083 -1.589l-3.921 -3.53zm12.411 -8.839c0.584 0.212 0.885 0.858 0.672 1.442L10.219 20.181c-0.213 0.584 -0.858 0.885 -1.442 0.672 -0.584 -0.212 -0.885 -0.858 -0.672 -1.442l5.675 -15.593c0.213 -0.584 0.858 -0.885 1.442 -0.672z" fillRule="evenodd" opacity="0.8" /> </svg>`,
  name: `expand`,
  type: 'demobox'
};

const CodeUnexpand: IconDefinition = {
  icon: `<svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" > <path d="M23.874 12.452c0.202 -0.436 0.108 -0.971 -0.268 -1.309l-4.807 -4.328c-0.462 -0.416 -1.173 -0.378 -1.589 0.083 -0.416 0.462 -0.378 1.173 0.083 1.589l3.897 3.509 -3.921 3.53c-0.462 0.416 -0.499 1.127 -0.083 1.589 0.416 0.462 1.127 0.499 1.589 0.083l4.807 -4.328a1.12 1.12 0 0 0 0.292 -0.417zM2.811 11.986l3.897 -3.509c0.462 -0.416 0.499 -1.127 0.083 -1.589 -0.416 -0.462 -1.127 -0.499 -1.589 -0.083L0.396 11.133C0.02 11.472 -0.075 12.006 0.128 12.442a1.12 1.12 0 0 0 0.292 0.417l4.807 4.328c0.462 0.416 1.173 0.378 1.589 -0.083 0.416 -0.462 0.378 -1.173 -0.083 -1.589l-3.921 -3.53z" fillRule="evenodd" opacity="0.8" > </path> </svg>`,
  name: `unexpand`,
  type: 'demobox'
};

export const VTS_ICONS_USE: IconDefinition[] = [PickerSuffix, Spin, CodeExpand, CodeUnexpand];
