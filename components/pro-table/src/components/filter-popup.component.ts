import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { VtsPropertyType } from '../pro-table.type';

@Component({
  selector: 'filter-drawer',
  templateUrl: 'filter-popup.component.html',
  styles: [
    `
      .vts-input-number {
        width: 100%
      }

      .text-format {
        background: #FFFFFF;
        font-family: 'Sarabun';
        font-style: normal;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
      }

      .filter-label {
        border: 1px solid #FFFFFF;
        font-weight: 700;
      }
    `
  ]
})
export class VtsProtableFilterPopupComponent implements OnInit {

  @Input() filterGroupConfig: { [key: string]: any }[] | undefined;
  @Input() isVisibleModal: boolean = false;
  @Input() data: { [key: string]: any } = {};
  @Input() headers: VtsPropertyType[] = [];
  @Input() properties: VtsPropertyType[] = [];
  @Input() title: string = "Advanced searching";

  @Output() onSearchByFilter: EventEmitter<VtsSafeAny> = new EventEmitter<VtsSafeAny>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() submit: EventEmitter<VtsSafeAny> = new EventEmitter<VtsSafeAny>();


  placeholder = '';
  size: any = 'md';
  formGroup: FormGroup = new FormGroup({});

  constructor(
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSearch() {
    this.submit.emit(this.formGroup.value);
  }

  closeSearchPopup() {
    this.cancel.emit(false);
  }

  initForm() {
    let form = new FormGroup({});
    if (this.filterGroupConfig) {
      this.filterGroupConfig.forEach(filter => {
        if (filter.filterText) {
          form.addControl(filter.filterText, new FormControl([]));
        }
      });
    }
    this.formGroup = form;
  }

}