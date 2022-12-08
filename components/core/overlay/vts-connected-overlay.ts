/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { Directive } from '@angular/core';

@Directive({
  selector: '[cdkConnectedOverlay][vtsConnectedOverlay]',
  exportAs: 'vtsConnectedOverlay'
})
export class VtsConnectedOverlayDirective {
  constructor(private cdkConnectedOverlay: CdkConnectedOverlay) {
    this.cdkConnectedOverlay.backdropClass = 'vts-overlay-transparent-backdrop';
  }
}
