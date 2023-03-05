import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProtableService } from '../pro-table.service';
import { PropertyType, Request, StatusProTable, ViewMode } from '../pro-table.type';

@Component({
  selector: 'table-drawer',
  templateUrl: 'table-drawer.component.html'
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

  title: string = "Test drawer";
  formGroup: FormGroup = new FormGroup({});
  selectedStatus: {[key: string]: StatusProTable } = {};
  listStatus: StatusProTable[] = ["default", "error", "processing", "success", "warning"];
  entity: {[key: string]: any}  = {};
  displayHeaders: PropertyType[] = [];

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
      let selectedStatus: {[key: string]: StatusProTable } = {};
      let value = {
        ...changes.data.currentValue
      };      
      this.displayHeaders.forEach(header => {
        if(header.datatype == "status"){
          selectedStatus[header.propertyName] = value[header.propertyName]
        }
        else {
          form.addControl(header.propertyName, new FormControl(value[header.propertyName]))
        }
      });
      this.formGroup = form;
      this.selectedStatus = {...selectedStatus};
    }
    if(changes.editRequest || changes.saveRequest){
      
    }
  }

  onChangeStatus(property: string, status: StatusProTable){
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
    console.log(this.entity);

    if(typeof this.saveRequest != "undefined"){
      let {onSuccess, onError} = this.saveRequest;
      this.service.saveDataById(this.saveRequest)
      .subscribe(data => {
        if(onSuccess){
          onSuccess(data);
        }
        this.closeDrawer();
      }, error => {
        if(onError){
          onError(error);
        }
      });
    }    
  }
}
