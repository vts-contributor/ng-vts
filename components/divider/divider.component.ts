/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';

import { InputBoolean } from '@ui-vts/ng-vts/core/util';

@Component({
  selector: 'vts-divider',
  exportAs: 'vtsDivider',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span *ngIf="vtsText" class="vts-divider-inner-text">
      <ng-container *vtsStringTemplateOutlet="vtsText">
        {{ vtsText }}
      </ng-container>
    </span>
  `,
  host: {
    '[class.vts-divider-horizontal]': `vtsType === 'horizontal'`,
    '[class.vts-divider-vertical]': `vtsType === 'vertical'`,
    '[class.vts-divider-with-text]': `vtsText`,
    '[class.vts-divider-plain]': `vtsPlain`,
    '[class.vts-divider-with-text-left]': `vtsText && vtsOrientation === 'left'`,
    '[class.vts-divider-with-text-right]': `vtsText && vtsOrientation === 'right'`,
    '[class.vts-divider-with-text-center]': `vtsText && vtsOrientation === 'center'`,
    '[class.vts-divider-dashed]': `vtsDashed`
  }
})
export class VtsDividerComponent {
  static ngAcceptInputType_vtsDashed: BooleanInput;
  static ngAcceptInputType_vtsPlain: BooleanInput;

  @Input() vtsText?: string | TemplateRef<void>;
  @Input() vtsType: 'horizontal' | 'vertical' = 'horizontal';
  @Input() vtsOrientation: 'left' | 'right' | 'center' = 'center';
  @Input() @InputBoolean() vtsDashed = false;
  @Input() @InputBoolean() vtsPlain = false;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-divider');
  }
}
