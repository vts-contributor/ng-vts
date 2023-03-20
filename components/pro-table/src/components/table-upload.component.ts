import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { VtsUploadChangeParam } from '@ui-vts/ng-vts/upload';
import { VtsModalUploadConfig } from '../pro-table.type';

@Component({
  selector: 'table-upload',
  templateUrl: 'table-upload.component.html'
})
export class VtsTableUploadComponent implements OnInit {
  constructor() { }

  @Input() isVisibleUpload: boolean = false;
  @Input() config: VtsModalUploadConfig | undefined;

  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() submit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() change: EventEmitter<VtsUploadChangeParam> = new EventEmitter<VtsUploadChangeParam>();

  ngOnInit() { }

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    this.submit.emit();
  }

  onChange(evt: VtsUploadChangeParam) {
    this.change.emit(evt);
  }

  getMaxFileSizeInText() {
    let text = "và dung lượng không quá ";
    if (this.config && this.config.maxFileSizeInKB) {
      let maxSize: number = this.config.maxFileSizeInKB;
      if (maxSize < 1024) {
        return `${text} ${maxSize}KB`
      }
      else if (maxSize >= 1024 && maxSize < 1024 * 1024) {
        return `${text} ${maxSize / 1024}MB`
      }
      else return `${text} ${maxSize / (1024 * 1024)}GB`
    }
    else return '';
  }
}
