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
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

@Component({
  selector: 'vts-select-item',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container
      *vtsStringTemplateOutlet="
        contentTemplateOutlet;
        context: { $implicit: contentTemplateOutletContext }
      "
    >
      <div class="vts-select-selection-item-content" *ngIf="deletable; else labelTemplate">
        {{ label }}
      </div>
      <ng-template #labelTemplate>{{ label }}</ng-template>
    </ng-container>
    <span
      *ngIf="deletable && !disabled"
      class="vts-select-selection-item-remove"
      (click)="onDelete($event)"
    >
      <i vts-icon vtsType="Close" *ngIf="!removeIcon; else removeIcon"></i>
    </span>
  `,
  host: {
    '[attr.title]': 'label',
    '[class.vts-select-selection-item-disabled]': 'disabled'
  }
})
export class VtsSelectItemComponent {
  @Input() disabled = false;
  @Input() label: string | null | undefined = null;
  @Input() deletable = false;
  @Input() removeIcon: TemplateRef<VtsSafeAny> | null = null;
  @Input() contentTemplateOutletContext: VtsSafeAny | null = null;
  @Input() contentTemplateOutlet: string | TemplateRef<VtsSafeAny> | null = null;
  @Output() readonly delete = new EventEmitter<MouseEvent>();

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-select-selection-item');
  }

  onDelete(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    if (!this.disabled) {
      this.delete.next(e);
    }
  }
}
