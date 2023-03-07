import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProtableService } from '../pro-table.service';
import { DrawerConfig, PropertyType, Request, StatusConfig, ViewMode } from '../pro-table.type';

@Component({
  selector: 'table-drawer',
  templateUrl: 'table-drawer.component.html',
  styles: [
    `
      .vts-input-number {
        width: 100%
      }
    `
  ]
})
export class ProtableDrawerComponent implements OnInit, OnChanges {
  constructor(
    private service: ProtableService
  ) {}

  @Input() visibleDrawer: boolean = false;
  @Input() mode: ViewMode = 'view';
  @Input() data: {[key: string]: any} = {};
  @Input() headers: PropertyType[] = [];
  @Input() saveRequest: Request | undefined;
  @Input() drawerConfig: DrawerConfig | undefined;
  @Input() listStatus: StatusConfig[] = [];


  formGroup: FormGroup = new FormGroup({});
  selectedStatus: {[key: string]: string | number } = {};
  entity: {[key: string]: any}  = {};
  displayHeaders: PropertyType[] = [];
  title: string = "Test drawer";

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  closeDrawer(){
    this.close.emit(false);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.headers){
      this.displayHeaders = [...changes.headers.currentValue.filter((h: PropertyType) => h.headerTitle)];
    }
    if(changes.data){
      let form = new FormGroup({});
      let selectedStatus: {[key: string]: string } = {};
      let value = {
        ...changes.data.currentValue
      };      
      this.displayHeaders.forEach(header => {
        if(header.datatype == "status"){
          selectedStatus[header.propertyName] = value[header.propertyName]
        }
        else {
          form.addControl(header.propertyName, new FormControl(value[header.propertyName]));
          if (this.mode === 'view') form.get(header.propertyName)?.disable();
        }
      });
      this.formGroup = form;
      this.selectedStatus = {...selectedStatus};

      if(typeof this.drawerConfig != "undefined"){
        this.setTitle(this.drawerConfig);
      }
    }
    if(changes.drawerConfig){
      if(typeof changes.drawerConfig.currentValue != "undefined"){
        console.log('changes.drawerConfig.currentValue:',changes.drawerConfig.currentValue);
        this.setTitle(changes.drawerConfig.currentValue);
      }
    }
  }

  setTitle(config: DrawerConfig){
    let modeTitle: string = "";
    let entityDetailOnTitle: string = "";
    switch(this.mode){
      case "create": {
        modeTitle = "Thêm mới";
        entityDetailOnTitle = "";
        break;
      }
      case "edit": {
        modeTitle = "Chỉnh sửa";
        entityDetailOnTitle = config.showTitleBasedOnProp ? this.data[config.showTitleBasedOnProp]: "";
        break;
      }
      default: {
        modeTitle = "Xem chi tiết";
        entityDetailOnTitle = config.showTitleBasedOnProp ? this.data[config.showTitleBasedOnProp]: "";
        break;
      }
    }
    this.title = `${modeTitle} ${config.entityName} ${entityDetailOnTitle}`;
  }

  onChangeStatus(property: string, status: string | number){
    let currentStatus = {...this.selectedStatus};
    currentStatus[property] = status;
    this.selectedStatus = {...currentStatus};
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

  onSave(){
    // merge old data with new changes
    this.entity = {
      ...this.data,
      ...this.selectedStatus,
      ...this.formGroup.value
    }
    // console.log(this.entity);

    if(typeof this.saveRequest != "undefined"){
      let {onSuccess, onError} = this.saveRequest;      
      this.service.saveDataById(this.saveRequest)
      .subscribe(data => {
        if(onSuccess){
          onSuccess(data);
        }
        if(typeof this.drawerConfig != "undefined"){
          let {onSave} = this.drawerConfig;
          if(onSave){
            onSave(data);
          }
        }
        this.closeDrawer();
      }, error => {
        if(onError){
          onError(error);
        }
      });
    }    
  }

  getSelectedStatus(value: string){
    let selectedObjStatus: StatusConfig = this.listStatus.filter(s => s.value == value)[0];
    if(selectedObjStatus){
      return selectedObjStatus;
    }
    else return null;
  }
}
