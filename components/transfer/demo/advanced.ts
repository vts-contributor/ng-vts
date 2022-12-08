import { Component, OnInit } from '@angular/core';
import { VtsMessageService } from '@ui-vts/ng-vts/message';
import { TransferItem } from '@ui-vts/ng-vts/transfer';

@Component({
  selector: 'vts-demo-transfer-advanced',
  template: `
    <vts-transfer
      [vtsDataSource]="list"
      vtsShowSearch
      [vtsOperations]="['to right', 'to left']"
      [vtsListStyle]="{ 'width.px': 250, 'height.px': 300 }"
      [vtsRender]="render"
      [vtsFooter]="footer"
      (vtsSelectChange)="select($event)"
      (vtsChange)="change($event)"
    >
      <ng-template #render let-item>{{ item.title }}-{{ item.description }}</ng-template>
      <ng-template #footer let-direction>
        <button
          vts-button
          (click)="reload(direction)"
          [vtsSize]="'sm'"
          style="float: right; margin: 5px;"
        >
          reload
        </button>
      </ng-template>
    </vts-transfer>
  `
})
export class VtsDemoTransferAdvancedComponent implements OnInit {
  list: TransferItem[] = [];

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const ret: TransferItem[] = [];
    for (let i = 0; i < 20; i++) {
      ret.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction: Math.random() * 2 > 1 ? 'right' : undefined
      });
    }
    this.list = ret;
  }

  reload(direction: string): void {
    this.getData();
    this.msg.success(`your clicked ${direction}!`);
  }

  select(ret: {}): void {
    console.log('vtsSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('vtsChange', ret);
  }

  constructor(public msg: VtsMessageService) {}
}
