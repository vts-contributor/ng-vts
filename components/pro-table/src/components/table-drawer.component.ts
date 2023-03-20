import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VtsSizeLDSType } from '@ui-vts/ng-vts/core/types';
import { ProtableService } from '../pro-table.service';
import { DrawerConfig, VtsPropertyType, VtsRequest, StatusConfig, ViewMode } from '../pro-table.type';

@Component({
  selector: 'table-drawer',
  templateUrl: 'table-drawer.component.html',
  styles: [
    `
      .vts-input-number {
        width: 100%
      }

      .vts-drawer-close {
        padding: 12px !important;
      }

      .text-custom {
        font-family: 'Sarabun';
        font-style: normal;
        font-size: 20px;
        color: #000000;
        font-weight: 400;
      }

      .title-custom {
        font-weight: 700;
        line-height: 30px;
      }

      .label-view {
        font-size: 14px;
        line-height: 22px;
        color: #73777A;
      }

      .content-view {
        font-size: 16px;
        line-height: 24px;
        color: #000000;
      }

      .vts-input,
      .vts-input-number,
      .vts-picker {
        border-radius: 6px;
      }
    `
  ]
})
export class ProtableDrawerComponent implements OnInit, OnChanges {
  constructor(
    private service: ProtableService
  ) { }

  /**
   * decide component is open or not
   */
  @Input() open: boolean = false;
  @Input() mode: ViewMode = 'view';
  @Input() data: { [key: string]: any } = {};
  @Input() headers: VtsPropertyType[] = [];
  @Input() saveRequest: VtsRequest | undefined;
  @Input() drawerConfig: DrawerConfig | undefined;
  @Input() listStatus: StatusConfig[] = [];

  /**
   * decide drawer or modal component is open, depends on [open]
   */
  visibleDrawer: boolean = false;
  visibleModal: boolean = false;

  formGroup: FormGroup = new FormGroup({});
  selectedStatus: { [key: string]: string | number } = {};
  entity: { [key: string]: any } = {};
  displayHeaders: VtsPropertyType[] = [];
  title: string = "Test drawer";
  datePickerSize: VtsSizeLDSType = 'md';

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() modeChanger: EventEmitter<ViewMode> = new EventEmitter<ViewMode>();
  @Output() createAnotherData: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() changeItemStatus: EventEmitter<string | number> = new EventEmitter<string | number>();
  @Output() deleteItem: EventEmitter<string | number> = new EventEmitter<string | number>();

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    let { headers, data, drawerConfig, open, mode } = changes;
    if (headers) {
      this.displayHeaders = [...headers.currentValue.filter((h: VtsPropertyType) => h.headerTitle)];
    }
    if (mode) {
      if (typeof this.drawerConfig != "undefined" && this.mode != 'create-another') this.setTitle(this.drawerConfig);
    }
    if (data) {
      this.initForm();
      if (typeof this.drawerConfig != "undefined") {
        this.setTitle(this.drawerConfig);
      }
    }
    if (drawerConfig) {
      if (typeof drawerConfig.currentValue != "undefined") {
        this.setTitle(drawerConfig.currentValue);
      }
    }
    if (open && open.currentValue) {
      // if both changes on the same time, use the updated value
      if (drawerConfig) {
        switch (drawerConfig.currentValue.openWith) {
          case "modal": {
            this.visibleDrawer = false;
            this.visibleModal = true;
            break;
          }
          default: {
            this.visibleDrawer = true;
            this.visibleModal = false;
            break;
          }
        }
      }
      else {
        if (typeof this.drawerConfig != 'undefined') {
          switch (this.drawerConfig.openWith) {
            case "modal": {
              this.visibleDrawer = false;
              this.visibleModal = true;
              break;
            }
            default: {
              this.visibleDrawer = true;
              this.visibleModal = false;
              break;
            }
          }
        }
      }
    }
    else if (mode) {
      if (typeof this.drawerConfig != "undefined" && this.mode != 'create-another') this.setTitle(this.drawerConfig);
      if (this.mode == 'create-another') this.initForm();
    }
    else {
      this.visibleDrawer = false;
      this.visibleModal = false;
    }
  }

  closeDrawer() {
    this.close.emit(false);
  }

  initForm() {
    let form = new FormGroup({});
      let selectedStatus: { [key: string]: string } = {};
      let value = {
        ...this.data
      };
      this.displayHeaders.forEach(header => {
        if (header.datatype == "status") {
          selectedStatus[header.propertyName] = value[header.propertyName]
        }
        else {
          form.addControl(header.propertyName, new FormControl(value[header.propertyName]));
          if (header.required) form.controls[header.propertyName].setValidators([Validators.required]);
        }
      });
      this.formGroup = form;
      this.selectedStatus = { ...selectedStatus };
  }

  setTitle(config: DrawerConfig) {
    let modeTitle: string = "";
    let entityDetailOnTitle: string = "";
    switch (this.mode) {
      case "create": {
        modeTitle = "Thêm mới";
        entityDetailOnTitle = "";
        break;
      }
      case "edit": {
        modeTitle = "Chỉnh sửa";
        entityDetailOnTitle = config.showTitleBasedOnProp ? this.data[config.showTitleBasedOnProp] : "";
        break;
      }
      default: {
        modeTitle = "Xem chi tiết";
        entityDetailOnTitle = config.showTitleBasedOnProp ? this.data[config.showTitleBasedOnProp] : "";
        break;
      }
    }
    this.title = `${modeTitle} ${config.entityName} ${entityDetailOnTitle}`;
  }

  onChangeStatus(property: string, status: string | number) {
    let currentStatus = { ...this.selectedStatus };
    currentStatus[property] = status;
    this.selectedStatus = { ...currentStatus };
  }

  formatNumber(value: number): string {
    const stringValue = `${value}`;
    const list = stringValue.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  }

  onSave() {
    let newDateObj = this.transformDateDatatype();
    // merge old data with new changes
    this.entity = {
      ...this.data,
      ...this.selectedStatus,
      ...this.formGroup.value,
      ...newDateObj
    }

    if (typeof this.saveRequest != "undefined") {
      let { onSuccess, onError } = this.saveRequest;
      this.service.saveDataById(this.saveRequest)
        .subscribe(data => {
          if (onSuccess) {
            onSuccess(data);
          }
          if (typeof this.drawerConfig != "undefined") {
            let { onSave } = this.drawerConfig;
            if (onSave) {
              onSave(data);
            }
          }
          if (this.mode == 'create') this.closeDrawer();
        }, error => {
          if (onError) {
            onError(error);
          }
        });
    }
  }

  getSelectedStatus(value: string) {
    let selectedObjStatus: StatusConfig = this.listStatus.filter(s => s.value == value)[0];
    if (selectedObjStatus) {
      return selectedObjStatus;
    }
    else return null;
  }

  /**
   * transform formGroup value of date type properties to Date
   * @returns new object has every field with type of date having value of Date object
   */
  transformDateDatatype() {
    let dateTypeProperties: VtsPropertyType[] = this.displayHeaders.filter(head => head.datatype == 'date');
    let output: { [key: string]: Date } = {};
    dateTypeProperties.forEach(pro => {
      output[pro.propertyName] = new Date(this.formGroup.get(pro.propertyName)?.value);
    });
    return output;
  }

  onChangeToEdit() {
    this.mode = 'edit';
    this.modeChanger.emit(this.mode);
  }

  onCreateAnother() {
    this.mode = 'create-another';
    this.onSave();
    this.modeChanger.emit(this.mode);
  }

  onDeleteItem() {
    this.deleteItem.emit(this.data.id);
  }

  onChangeStatusItem() {
    this.changeItemStatus.emit(this.data.id);
  }
}
