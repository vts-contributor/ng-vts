/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction } from '@angular/cdk/bidi';

export class VtsImagePreviewOptions {
  vtsKeyboard?: boolean = true;
  vtsNoAnimation?: boolean = false;
  vtsMaskClosable?: boolean = true;
  vtsCloseOnNavigation?: boolean = true;
  vtsZIndex?: number;
  vtsZoom?: number;
  vtsRotate?: number;
  vtsDirection?: Direction;
}

export interface VtsImage {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
}
