import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ModalDeleteConfig } from '../pro-table.type';

@Component({
  selector: 'table-delete',
  templateUrl: 'table-delete.component.html'
})
export class VtsTableDeleteComponent implements OnInit {
  constructor() {}

  @Input() isVisibleDelete: boolean = false;
  @Input() config: ModalDeleteConfig | undefined;

  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() submit: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {}

  onCancel(){
    this.cancel.emit();
  }

  onSubmit(){
    this.submit.emit();
  }
}