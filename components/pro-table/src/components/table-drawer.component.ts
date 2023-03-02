import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProtableService } from '../pro-table.service';
import { PropertyType, Request, StatusProTable } from '../pro-table.type';

@Component({
  selector: 'table-drawer',
  templateUrl: 'table-drawer.component.html'
})
export class ProtableDrawerComponent implements OnInit, OnChanges {
  constructor(
    // private cdf: ChangeDetectorRef
    private service: ProtableService
  ) {}

  @Input() visibleDrawer: boolean = false;
  @Input() data: {[key: string]: any} = {};
  @Input() headers: PropertyType[] = [];
  @Input() saveRequest: Request | undefined;

  title: string = "Test drawer";
  formGroup: FormGroup = new FormGroup({});
  selectedStatus: {[key: string]: StatusProTable } = {};
  listStatus: StatusProTable[] = ["default", "error", "processing", "success", "warning"];
  entity: {[key: string]: any}  = {};

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  closeDrawer(){
    this.close.emit(false);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.data){
      let form = new FormGroup({});
      let selectedStatus: {[key: string]: StatusProTable } = {};
      let value = {
        ...changes.data.currentValue
      };      
      this.headers.forEach(header => {
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
  }

  onChangeStatus(property: string, status: StatusProTable){
    let currentStatus = {...this.selectedStatus};
    currentStatus[property] = status;
    this.selectedStatus = {...currentStatus};
  }

  onSave(){
    this.entity = {
      ...this.selectedStatus,
      ...this.formGroup.value
    }
    console.log(this.entity);
    this.service.saveDataById(this.saveRequest).subscribe(data => {
      console.log(data);
    })
  }
}
