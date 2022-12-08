/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: '[vts-transfer-search]',
  exportAs: 'vtsTransferSearch',
  preserveWhitespaces: false,
  template: `
    <input
      [(ngModel)]="value"
      (ngModelChange)="_handle()"
      [disabled]="disabled"
      [placeholder]="placeholder"
      class="vts-input vts-transfer-list-search"
      [ngClass]="{ 'vts-input-disabled': disabled }"
    />
    <a
      *ngIf="value && value.length > 0; else def"
      class="vts-transfer-list-search-action"
      (click)="_clear()"
    >
      <i vts-icon vtsType="Close"></i>
    </a>
    <ng-template #def>
      <span class="vts-transfer-list-search-action">
        <i vts-icon vtsType="Search"></i>
      </span>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsTransferSearchComponent implements OnChanges {
  // region: fields

  @Input() placeholder?: string;
  @Input() value?: string;
  @Input() disabled: boolean = false;

  @Output() readonly valueChanged = new EventEmitter<string>();
  @Output() readonly valueClear = new EventEmitter<void>();

  // endregion

  constructor(private cdr: ChangeDetectorRef) {}

  _handle(): void {
    this.valueChanged.emit(this.value);
  }

  _clear(): void {
    if (this.disabled) {
      return;
    }
    this.value = '';
    this.valueClear.emit();
  }

  ngOnChanges(): void {
    this.cdr.detectChanges();
  }
}
