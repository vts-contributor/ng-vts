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
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

@Component({
  selector: 'vts-select-arrow',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <i vts-icon vtsType="Sync" *ngIf="loading; else defaultArrow"></i>
    <ng-template #defaultArrow>
      <ng-container *ngIf="!suffixIcon; else suffixTemplate">
        <i vts-icon vtsType="suffix:vts-select"></i>
      </ng-container>
      <ng-template #suffixTemplate>
        <ng-container *vtsStringTemplateOutlet="suffixIcon; let suffixIcon">
          <i vts-icon [vtsType]="suffixIcon"></i>
        </ng-container>
      </ng-template>
    </ng-template>
  `,
  host: {
    '[class.vts-select-arrow-loading]': 'loading'
  }
})
export class VtsSelectArrowComponent {
  @Input() loading = false;
  @Input() search = false;
  @Input() suffixIcon: TemplateRef<VtsSafeAny> | string | null = null;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-select-arrow');
  }
}
