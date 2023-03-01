import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { PropertyType } from '../pro-table.type';

@Component({
  selector: 'table-drawer',
  templateUrl: 'table-drawer.component.html'
})
export class ProtableDrawerComponent implements OnInit, OnChanges {
  constructor() {}

  @Input() visibleDrawer: boolean = false;
  @Input() data: {[key: string]: any} = {};
  @Input() headers: PropertyType[] = [];

  title: string = "Test drawer"

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  closeDrawer(){
    this.close.emit(false);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }
}
