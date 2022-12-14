/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive } from '@angular/core';

@Directive({
  selector: '[vts-result-icon]',
  exportAs: 'vtsResultIcon'
})
export class VtsResultIconDirective {}

@Directive({
  selector: 'div[vts-result-title]',
  exportAs: 'vtsResultTitle',
  host: {
    class: 'vts-result-title'
  }
})
export class VtsResultTitleDirective {}

@Directive({
  selector: 'div[vts-result-subtitle]',
  exportAs: 'vtsResultSubtitle',
  host: {
    class: 'vts-result-subtitle'
  }
})
export class VtsResultSubtitleDirective {}

@Directive({
  selector: 'div[vts-result-content]',
  exportAs: 'vtsResultContent',
  host: {
    class: 'vts-result-content'
  }
})
export class VtsResultContentDirective {}

@Directive({
  selector: 'div[vts-result-action]',
  exportAs: 'vtsResultAction'
})
export class VtsResultActionDirective {}
