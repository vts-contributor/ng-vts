/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOCUMENT } from '@angular/common';
import { HttpBackend } from '@angular/common/http';
import {
  Inject,
  Injectable,
  InjectionToken,
  Optional,
  RendererFactory2,
  Self
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IconDefinition, IconService } from '@ui-vts/icons-angular';
import { IconConfig, VtsConfigService } from '@ui-vts/ng-vts/core/config';
import { warn } from '@ui-vts/ng-vts/core/logger';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { Subject } from 'rxjs';
import { VTS_ICONS_USE } from './icons';

export interface VtsIconfontOption {
  scriptUrl: string;
}

export const VTS_ICONS = new InjectionToken('vts_icons');
export const VTS_ICON_DEFAULT_TWOTONE_COLOR = new InjectionToken('vts_icon_default_twotone_color');
export const DEFAULT_TWOTONE_COLOR = '#1890ff';

/**
 * It should be a global singleton, otherwise registered icons could not be found.
 */
@Injectable({
  providedIn: 'root'
})
export class VtsIconService extends IconService {
  configUpdated$ = new Subject<void>();

  // private iconfontCache = new Set<string>();

  normalizeSvgElement(svg: SVGElement): void {
    if (!svg.getAttribute('viewBox')) {
      this._renderer.setAttribute(svg, 'viewBox', '0 0 24 24');
    }
    if (!svg.getAttribute('width') || !svg.getAttribute('height')) {
      this._renderer.setAttribute(svg, 'width', '1em');
      this._renderer.setAttribute(svg, 'height', '1em');
    }
    if (!svg.getAttribute('fill')) {
      this._renderer.setAttribute(svg, 'fill', 'currentColor');
    }
  }

  // fetchFromIconfont(opt: VtsIconfontOption): void {
  //   const { scriptUrl } = opt;
  //   if (this._document && !this.iconfontCache.has(scriptUrl)) {
  //     const script = this._renderer.createElement('script');
  //     this._renderer.setAttribute(script, 'src', scriptUrl);
  //     this._renderer.setAttribute(script, 'data-namespace', scriptUrl.replace(/^(https?|http):/g, ''));
  //     this._renderer.appendChild(this._document.body, script);
  //     this.iconfontCache.add(scriptUrl);
  //   }
  // }

  createIconfontIcon(type: string): SVGElement {
    return this._createSVGElementFromString(`<svg><use xlink:href="${type}"></svg>`);
  }

  constructor(
    rendererFactory: RendererFactory2,
    sanitizer: DomSanitizer,
    protected vtsConfigService: VtsConfigService,
    @Optional() handler: HttpBackend,
    @Optional() @Inject(DOCUMENT) _document: VtsSafeAny,
    @Optional() @Inject(VTS_ICONS) icons?: IconDefinition[]
  ) {
    super(rendererFactory, handler, _document, sanitizer);

    this.onConfigChange();
    this.addIcon(...VTS_ICONS_USE, ...(icons || []));

    const vtsPickerSuffix = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H1C0.734784 20 0.48043 19.8946 0.292893 19.7071C0.105357 19.5196 0 19.2652 0 19V3C0 2.73478 0.105357 2.48043 0.292893 2.29289C0.48043 2.10536 0.734784 2 1 2H5V0H7V2H13V0H15V2ZM2 8V18H18V8H2ZM4 10H6V12H4V10ZM9 10H11V12H9V10ZM14 10H16V12H14V10Z" fill="currentColor"/></svg>`;
    this.addIconLiteral('vts-picker:suffix', vtsPickerSuffix);
    const vtsSelectSuffix = `<svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.73167 0H0.268334C0.0444793 0 -0.0805157 0.236354 0.0581151 0.397711L3.78978 4.72481C3.89659 4.84867 4.10227 4.84867 4.21022 4.72481L7.94188 0.397711C8.08052 0.236354 7.95552 0 7.73167 0Z" fill="#73777A"/></svg>`;
    this.addIconLiteral('vts-select:suffix', vtsSelectSuffix);
    const vtsSpin = `
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
    </svg>`;
    this.addIconLiteral('vts-spin:icon', vtsSpin);
    const vtsCodeExpand = `<svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" > <path d="M23.874 12.452c0.202 -0.436 0.108 -0.971 -0.268 -1.309l-4.807 -4.328c-0.462 -0.416 -1.173 -0.378 -1.589 0.083 -0.416 0.462 -0.378 1.173 0.083 1.589l3.897 3.509 -3.921 3.53c-0.462 0.416 -0.499 1.127 -0.083 1.589 0.416 0.462 1.127 0.499 1.589 0.083l4.807 -4.328a1.12 1.12 0 0 0 0.292 -0.417zM2.811 11.986l3.897 -3.509c0.462 -0.416 0.499 -1.127 0.083 -1.589 -0.416 -0.462 -1.127 -0.499 -1.589 -0.083L0.396 11.133C0.02 11.472 -0.075 12.006 0.128 12.442a1.12 1.12 0 0 0 0.292 0.417l4.807 4.328c0.462 0.416 1.173 0.378 1.589 -0.083 0.416 -0.462 0.378 -1.173 -0.083 -1.589l-3.921 -3.53zm12.411 -8.839c0.584 0.212 0.885 0.858 0.672 1.442L10.219 20.181c-0.213 0.584 -0.858 0.885 -1.442 0.672 -0.584 -0.212 -0.885 -0.858 -0.672 -1.442l5.675 -15.593c0.213 -0.584 0.858 -0.885 1.442 -0.672z" fillRule="evenodd" opacity="0.8" /> </svg>`;
    this.addIconLiteral('code:expand', vtsCodeExpand);
    const vtsCodeUnexpand = `<svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" > <path d="M23.874 12.452c0.202 -0.436 0.108 -0.971 -0.268 -1.309l-4.807 -4.328c-0.462 -0.416 -1.173 -0.378 -1.589 0.083 -0.416 0.462 -0.378 1.173 0.083 1.589l3.897 3.509 -3.921 3.53c-0.462 0.416 -0.499 1.127 -0.083 1.589 0.416 0.462 1.127 0.499 1.589 0.083l4.807 -4.328a1.12 1.12 0 0 0 0.292 -0.417zM2.811 11.986l3.897 -3.509c0.462 -0.416 0.499 -1.127 0.083 -1.589 -0.416 -0.462 -1.127 -0.499 -1.589 -0.083L0.396 11.133C0.02 11.472 -0.075 12.006 0.128 12.442a1.12 1.12 0 0 0 0.292 0.417l4.807 4.328c0.462 0.416 1.173 0.378 1.589 -0.083 0.416 -0.462 0.378 -1.173 -0.083 -1.589l-3.921 -3.53z" fillRule="evenodd" opacity="0.8" > </path> </svg>`;
    this.addIconLiteral('code:unexpand', vtsCodeUnexpand);

    // this.configDefaultTwotoneColor();
    this.configDefaultTheme();
  }

  private onConfigChange(): void {
    this.vtsConfigService.getConfigChangeEventForComponent('icon').subscribe(() => {
      this.configDefaultTwotoneColor();
      this.configDefaultTheme();
      this.configUpdated$.next();
    });
  }

  private configDefaultTheme(): void {
    const iconConfig = this.getConfig();
    this.defaultTheme = iconConfig.vtsTheme || 'all';
  }

  private configDefaultTwotoneColor(): void {
    const iconConfig = this.getConfig();
    const defaultTwotoneColor = iconConfig.vtsTwotoneColor || DEFAULT_TWOTONE_COLOR;

    let primaryColor = DEFAULT_TWOTONE_COLOR;

    if (defaultTwotoneColor) {
      if (defaultTwotoneColor.startsWith('#')) {
        primaryColor = defaultTwotoneColor;
      } else {
        warn('Twotone color must be a hex color!');
      }
    }

    this.twoToneColor = { primaryColor, secondaryColor: primaryColor };
  }

  private getConfig(): IconConfig {
    return this.vtsConfigService.getConfigForComponent('icon') || {};
  }
}

export const VTS_ICONS_PATCH = new InjectionToken('vts_icons_patch');

@Injectable()
export class VtsIconPatchService {
  patched = false;

  constructor(
    @Self() @Inject(VTS_ICONS_PATCH) private extraIcons: IconDefinition[],
    private rootIconService: VtsIconService
  ) {}

  doPatch(): void {
    if (this.patched) {
      return;
    }

    this.extraIcons.forEach(iconDefinition => this.rootIconService.addIcon(iconDefinition));
    this.patched = true;
  }
}
