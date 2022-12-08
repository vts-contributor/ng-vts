/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'vts-auto-optgroup',
  exportAs: 'vtsAutoOptgroup',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="vts-select-item vts-select-item-group">
      <ng-container *vtsStringTemplateOutlet="vtsLabel">
        {{ vtsLabel }}
      </ng-container>
    </div>
    <ng-content select="vts-auto-option"></ng-content>
  `
})
export class VtsAutocompleteOptgroupComponent {
  @Input() vtsLabel?: string | TemplateRef<void>;

  constructor() {}
}
