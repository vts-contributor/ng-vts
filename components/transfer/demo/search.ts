import { Component, OnInit } from '@angular/core';
import { TransferItem } from '@ui-vts/ng-vts/transfer';

@Component({
  selector: 'vts-demo-transfer-search',
  template: `
    <vts-transfer
      [vtsDataSource]="list"
      [vtsDisabled]="disabled"
      vtsShowSearch
      [vtsCustomFilterFn]="filterOption"
      (vtsSearchChange)="search($event)"
      (vtsSelectChange)="select($event)"
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
export class VtsDemoTransferSearchComponent implements OnInit {
  list: TransferItem[] = [];
  disabled = false;

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction: Math.random() * 2 > 1 ? 'right' : undefined
      });
    }
  }

  // tslint:disable-next-line:no-any
  filterOption(inputValue: string, item: any): boolean {
    return item.description.indexOf(inputValue) > -1;
  }

  search(ret: {}): void {
    console.log('vtsSearchChange', ret);
  }

  select(ret: {}): void {
    console.log('vtsSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('vtsChange', ret);
  }
}
