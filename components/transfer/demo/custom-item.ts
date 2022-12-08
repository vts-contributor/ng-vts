import { Component, OnInit } from '@angular/core';
import { VtsMessageService } from '@ui-vts/ng-vts/message';
import { TransferItem } from '@ui-vts/ng-vts/transfer';

@Component({
  selector: 'vts-demo-transfer-custom-item',
  template: `
    <vts-transfer
      [vtsDataSource]="list"
      [vtsListStyle]="{ 'width.px': 300, 'height.px': 300 }"
      [vtsRender]="render"
      (vtsSelectChange)="select($event)"
      (vtsChange)="change($event)"
    >
      <ng-template #render let-item>
        <i vts-icon vtsType="{{ item.icon }}"></i>
        {{ item.title }}
      </ng-template>
    </vts-transfer>
  `
})
export class VtsDemoTransferCustomItemComponent implements OnInit {
  list: Array<TransferItem & { description: string; icon: string }> = [];

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const ret: Array<TransferItem & { description: string; icon: string }> = [];
    for (let i = 0; i < 20; i++) {
      ret.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction: Math.random() * 2 > 1 ? 'right' : undefined,
        icon: `frown-o`
      });
    }
    this.list = ret;
  }

  select(ret: {}): void {
    console.log('vtsSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('vtsChange', ret);
  }

  constructor(public msg: VtsMessageService) {}
}
