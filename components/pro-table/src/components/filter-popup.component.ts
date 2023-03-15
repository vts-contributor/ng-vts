import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
// import { FormControl, FormGroup } from '@angular/forms';
// import { VtsSizeLDSType } from '@ui-vts/ng-vts/core/types';
// import { ProtableService } from '../pro-table.service';
import { PropertyType } from '../pro-table.type';

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
export class VtsProtableFilterPopupComponent implements OnInit, OnChanges {

  @Input() filterGroupConfig: { [key: string]: any }[] | undefined;
  @Input() isVisibleModal: boolean = false;
  @Input() data: { [key: string]: any } = {};
  @Input() headers: PropertyType[] = [];
  @Input() properties: PropertyType[] = [];
  @Input() title: string = "Advanced searching";

  @Output() onSearchByFilter: EventEmitter<VtsSafeAny> = new EventEmitter<VtsSafeAny>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() submit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();


  placeholder = '';
  size: any = 'md';
  listOfOption: Array<{ label: string; value: string }> = [];
  formGroup: FormGroup = new FormGroup({});

  constructor(
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isVisibleModal) {
      console.log(this.isVisibleModal);
    }
  }

  onSave() {
    this.submit.emit(this.formGroup.value);
  }

  closeDrawer() {
    this.cancel.emit(false);
  }

  renderSelectedItems(index: number) {
    let output = "";
    if (typeof this.filterGroupConfig != "undefined") {
      let currentFilter = {
        ...this.filterGroupConfig[index]
      };
      // get label of selected values for current filter
      let selectedLabels = [...currentFilter.filterValues.filter((x: any) => currentFilter.selectedValues.indexOf(x.value) >= 0).map((x: any) => x.label)];
      output = selectedLabels[0];
    }
    return output;
  }
}