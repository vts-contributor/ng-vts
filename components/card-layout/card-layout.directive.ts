/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Input } from '@angular/core';
import { VtsConfigKey } from "@ui-vts/ng-vts/core/config";
import { BooleanInput } from "@ui-vts/ng-vts/core/types";
import { InputBoolean } from "@ui-vts/ng-vts/core/util";

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'cardLayout';

@Directive({
  selector: '[vts-card-layout]',
  exportAs: 'vtsCardLayout',
  host: {
    '[class.vts-card-layout-basic]': `vtsCardLayout === 'basic'`,
    '[class.vts-card-layout-cover]': `vtsCardLayout === 'cover'`,
    '[class.vts-card-layout-container]': `vtsType === 'container'`,
    '[class.vts-card-layout-avatar]': `vtsType === 'avatar'`,
    '[class.vts-card-layout-align-left]': `vtsAlign === 'left' && vtsType === 'container'`,
    '[class.vts-card-layout-align-center]': `vtsAlign === 'center' && vtsType === 'container'`,
    '[class.vts-card-layout-align-right]': `vtsAlign === 'right' && vtsType === 'container'`,
    '[class.vts-card-layout-cover-rotate]': `vtsCoverRotate && vtsCardLayout === 'cover'`
  }
})
export class VtsCardLayoutDirective {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;
  static ngAcceptInputType_vtsCoverRotate: BooleanInput;

  @Input() vtsCardLayout: 'basic' | 'cover' | null = null;
  @Input() vtsType: 'container' | 'avatar' = 'avatar';
  @Input() vtsAlign: 'left' | 'center' | 'right' | null = null;
  @Input() @InputBoolean() vtsCoverRotate: boolean = false;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-card-layout');
  }
}
