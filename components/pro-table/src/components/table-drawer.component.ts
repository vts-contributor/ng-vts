import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProtableService } from '../pro-table.service';
import { PropertyType, Request } from '../pro-table.type';

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
  @Input() mode: string = '';
  @Input() data: {[key: string]: any} = {};
  @Input() headers: PropertyType[] = [];
  @Input() saveRequest: Request | undefined;

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
        form.addControl(k, new FormControl(value[k]));
        if (this.mode === 'view') form.get(k)?.disable();
      });
      this.formGroup = form;
    }
  }

  onSave(){
    this.service.saveDataById(this.saveRequest).subscribe(data => {
      console.log(data);
    })
  }
}
