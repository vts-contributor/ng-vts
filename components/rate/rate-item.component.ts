/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: '[vts-rate-item]',
  exportAs: 'vtsRateItem',
  template: `
    <div
      class="vts-rate-star-second"
      (mouseover)="hoverRate(false); $event.stopPropagation()"
      (click)="clickRate(false)"
    >
      <ng-template [ngTemplateOutlet]="character || defaultCharacter"></ng-template>
    </div>
    <div
      class="vts-rate-star-first"
      (mouseover)="hoverRate(true); $event.stopPropagation()"
      (click)="clickRate(true)"
    >
      <ng-template [ngTemplateOutlet]="character || defaultCharacter"></ng-template>
    </div>

    <ng-template #defaultCharacter>
      <i vts-icon vtsType="star"></i>
    </ng-template>
  `
})
export class VtsRateItemComponent {
  static ngAcceptInputType_allowHalf: BooleanInput;

  @Input() character!: TemplateRef<void>;
  @Input() @InputBoolean() allowHalf: boolean = false;
  @Output() readonly itemHover = new EventEmitter<boolean>();
  @Output() readonly itemClick = new EventEmitter<boolean>();

  hoverRate(isHalf: boolean): void {
    this.itemHover.next(isHalf && this.allowHalf);
  }

  clickRate(isHalf: boolean): void {
    this.itemClick.next(isHalf && this.allowHalf);
  }
}
