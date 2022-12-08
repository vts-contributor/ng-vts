/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NumberInput } from '@ui-vts/ng-vts/core/types';
import { InputNumber } from '@ui-vts/ng-vts/core/util';

import { Subject } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-descriptions-item',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
  exportAs: 'vtsDescriptionsItem',
  preserveWhitespaces: false
})
export class VtsDescriptionsItemComponent implements OnChanges, OnDestroy {
  static ngAcceptInputType_vtsSpan: NumberInput;

  @ViewChild(TemplateRef, { static: true }) content!: TemplateRef<void>;

  @Input() @InputNumber() vtsSpan = 1;
  @Input() vtsTitle: string | TemplateRef<void> = '';

  readonly inputChange$ = new Subject<void>();

  ngOnChanges(): void {
    this.inputChange$.next();
  }

  ngOnDestroy(): void {
    this.inputChange$.complete();
  }
}
