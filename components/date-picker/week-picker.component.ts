/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Host, Optional } from '@angular/core';
import { VtsDatePickerComponent } from './date-picker.component';

@Directive({
  selector: 'vts-week-picker',
  exportAs: 'vtsWeekPicker'
})
// tslint:disable-next-line:directive-class-suffix
export class VtsWeekPickerComponent {
  constructor(@Optional() @Host() public datePicker: VtsDatePickerComponent) {
    this.datePicker.vtsMode = 'week';
  }
}
