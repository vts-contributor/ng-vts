import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PropertyType } from '../pro-table.type';

@Component({
  selector: 'table-drawer',
  templateUrl: 'table-drawer.component.html'
})
export class ProtableDrawerComponent implements OnInit, OnChanges {
  constructor(
    // private cdf: ChangeDetectorRef
  ) {}

  @Input() visibleDrawer: boolean = false;
  @Input() data: {[key: string]: any} = {};
  @Input() headers: PropertyType[] = [];

  title: string = "Test drawer";
  formGroup: FormGroup = new FormGroup({
    // id: new FormControl("sdsd")
  });

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  closeDrawer(){
    this.close.emit(false);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.data){
      let form = new FormGroup({});
      let value = {
        ...changes.data.currentValue
      };
      let keys = this.headers.map(h => h.propertyName);
      keys.forEach(k => {
        form.addControl(k, new FormControl(value[k]))
      });
      this.formGroup = form;
    }
  }

  onSave(){
    console.log(this.data);
  }
}
