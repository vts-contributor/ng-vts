/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { VtsImageDirective } from './image.directive';

@Component({
  selector: 'vts-image-group',
  exportAs: 'vtsImageGroup',
  template: '<ng-content></ng-content>',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VtsImageGroupComponent {
  images: VtsImageDirective[] = [];

  addImage(image: VtsImageDirective): void {
    this.images.push(image);
  }
}
