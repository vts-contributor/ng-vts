/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkTreeNodePadding } from '@angular/cdk/tree';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[vtsTreeNodePadding]',
  providers: [{ provide: CdkTreeNodePadding, useExisting: VtsTreeNodePaddingDirective }]
})
export class VtsTreeNodePaddingDirective<T> extends CdkTreeNodePadding<T> {
  _indent = 24;

  @Input('vtsTreeNodePadding')
  get level(): number {
    return this._level;
  }
  set level(value: number) {
    this._setLevelInput(value);
  }

  @Input('vtsTreeNodePaddingIndent')
  get indent(): number | string {
    return this._indent;
  }
  set indent(indent: number | string) {
    this._setIndentInput(indent);
  }
}
