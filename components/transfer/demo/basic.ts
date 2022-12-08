import { Component, OnInit } from '@angular/core';
import { TransferItem } from '@ui-vts/ng-vts/transfer';

@Component({
  selector: 'vts-demo-transfer-basic',
  template: `
    <vts-transfer
      [vtsDataSource]="list"
      [vtsDisabled]="disabled"
      [vtsTitles]="['Source', 'Target']"
      (vtsSelectChange)="select($event)"
      [vtsSelectedKeys]="['0', '2']"
      (vtsChange)="change($event)"
    ></vts-transfer>
    <div style="margin-top: 8px;">
      <vts-switch
        [(ngModel)]="disabled"
        vtsCheckedChildren="disabled"
        vtsUnCheckedChildren="disabled"
      ></vts-switch>
      <div></div>
    </div>
  `
})
export class VtsDemoTransferBasicComponent implements OnInit {
  list: TransferItem[] = [];
  disabled = false;

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        disabled: i % 3 < 1
      });
    }

    [2, 3].forEach(idx => (this.list[idx].direction = 'right'));
  }

  select(ret: {}): void {
    console.log('vtsSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('vtsChange', ret);
  }
}
