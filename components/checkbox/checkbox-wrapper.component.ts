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
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { VtsCheckboxComponent } from './checkbox.component';

@Component({
  selector: 'vts-checkbox-wrapper',
  exportAs: 'vtsCheckboxWrapper',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>
  `
})
export class VtsCheckboxWrapperComponent {
  @Output() readonly vtsOnChange = new EventEmitter<VtsSafeAny[]>();
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  private checkboxList: VtsCheckboxComponent[] = [];
  @Input() @InputBoolean() vtsDisabled = false;

  addCheckbox(value: VtsCheckboxComponent): void {
    value.vtsDisabled = this.vtsDisabled || value.vtsDisabled;
    this.checkboxList.push(value);
  }

  removeCheckbox(value: VtsCheckboxComponent): void {
    this.checkboxList.splice(this.checkboxList.indexOf(value), 1);
  }

  onChange(): void {
    const listOfCheckedValue = this.checkboxList
      .filter(item => item.vtsChecked)
      .map(item => item.vtsValue);
    this.vtsOnChange.emit(listOfCheckedValue);
  }

  constructor(renderer: Renderer2, elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, 'vts-checkbox-group');
  }
}
