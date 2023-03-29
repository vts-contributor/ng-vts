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
import { VtsConfigService } from '@ui-vts/ng-vts/core/config';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { Subject } from 'rxjs';
import { VTS_ICONS_USE } from './icons';

export interface VtsIconfontOption {
  scriptUrl: string;
}

export const VTS_ICONS = new InjectionToken('vts_icons');

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
    this.addIcon(...VTS_ICONS_USE, ...(icons || []));
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
