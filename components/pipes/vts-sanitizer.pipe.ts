/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeStyle,
  SafeUrl
} from '@angular/platform-browser';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

type DomSanitizerType = 'html' | 'style' | 'url' | 'resourceUrl';

@Pipe({
  name: 'vtsSanitizer'
})
export class VtsSanitizerPipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}
  transform(value: VtsSafeAny, type: 'html'): SafeHtml;
  transform(value: VtsSafeAny, type: 'style'): SafeStyle;
  transform(value: VtsSafeAny, type: 'url'): SafeUrl;
  transform(value: VtsSafeAny, type: 'resourceUrl'): SafeResourceUrl;
  transform(
    value: VtsSafeAny,
    type: DomSanitizerType = 'html'
  ): SafeHtml | SafeStyle | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Invalid safe type specified`);
    }
  }
}
