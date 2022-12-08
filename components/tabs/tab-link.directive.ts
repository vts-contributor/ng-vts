/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Host, Optional, Self, TemplateRef } from '@angular/core';
import { RouterLink, RouterLinkWithHref } from '@angular/router';

import { TabTemplateContext } from './interfaces';

/**
 * Fix https://github.com/angular/angular/issues/8563
 */
@Directive({
  selector: 'ng-template[vtsTabLink]',
  exportAs: 'vtsTabLinkTemplate'
})
export class VtsTabLinkTemplateDirective {
  constructor(@Host() public templateRef: TemplateRef<TabTemplateContext>) {}
}

/**
 * This component is for catching `routerLink` directive.
 */
@Directive({
  selector: 'a[vts-tab-link]',
  exportAs: 'vtsTabLink'
})
export class VtsTabLinkDirective {
  constructor(
    public elementRef: ElementRef<HTMLAnchorElement>,
    @Optional() @Self() public routerLink?: RouterLink,
    @Optional() @Self() public routerLinkWithHref?: RouterLinkWithHref
  ) {}
}
