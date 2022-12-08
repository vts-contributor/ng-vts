/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { VtsSelectModeType } from './select.types';

@Component({
  selector: 'vts-option-item',
  template: `
    <div class="vts-select-item-option-content">
      <ng-container *ngIf="!customContent && mode === 'default'">
        {{ label }}
      </ng-container>
      <ng-container *ngIf="!customContent && mode !== 'default'">
        <label
          [ngModel]="selected"
          (vtsCheckedChange)="innerCheckboxClick($event)"
          (click)="$event.stopPropagation()"
          vts-checkbox
        >
          {{ label }}
        </label>
      </ng-container>
      <ng-container *ngIf="customContent">
        <ng-template [ngTemplateOutlet]="template"></ng-template>
      </ng-container>
    </div>
    <div
      *ngIf="showState && selected"
      class="vts-select-item-option-state"
      style="user-select: none"
      unselectable="on"
    >
      <i
        vts-icon
        vtsType="CheckOutline"
        class="vts-select-selected-icon"
        *ngIf="!icon; else icon"
      ></i>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.title]': 'label',
    '[class.vts-select-item-option-grouped]': 'grouped',
    '[class.vts-select-item-option-selected]': 'selected && !disabled',
    '[class.vts-select-item-option-disabled]': 'disabled',
    '[class.vts-select-item-option-active]': 'activated && !disabled',
    '(mouseenter)': 'onHostMouseEnter()',
    '(click)': 'onHostClick()'
  }
})
export class VtsOptionItemComponent implements OnChanges {
  selected = false;
  activated = false;
  @Input() grouped = false;
  @Input() customContent = false;
  @Input() template: TemplateRef<VtsSafeAny> | null = null;
  @Input() disabled = false;
  @Input() showState = false;
  @Input() label: string | null = null;
  @Input() value: VtsSafeAny | null = null;
  @Input() activatedValue: VtsSafeAny | null = null;
  @Input() listOfSelectedValue: VtsSafeAny[] = [];
  @Input() icon: TemplateRef<VtsSafeAny> | null = null;
  @Input() mode: VtsSelectModeType = 'default';
  @Input() vtsCustomCompareFn!: (o1: VtsSafeAny, o2: VtsSafeAny) => boolean;
  @Output() readonly itemClick = new EventEmitter<VtsSafeAny>();
  @Output() readonly itemHover = new EventEmitter<VtsSafeAny>();

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-select-item', 'vts-select-item-option');
  }

  onHostMouseEnter(): void {
    if (!this.disabled) {
      this.itemHover.next(this.value);
    }
  }
  onHostClick(): void {
    if (!this.disabled) {
      this.itemClick.next(this.value);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    const { value, activatedValue, listOfSelectedValue } = changes;
    if (value || listOfSelectedValue) {
      this.selected = this.listOfSelectedValue.some(v => this.vtsCustomCompareFn(v, this.value));
    }
    if (value || activatedValue) {
      this.activated = this.vtsCustomCompareFn(this.activatedValue, this.value);
    }
  }

  innerCheckboxClick(_e: any) {
    this.onHostClick();
  }
}
