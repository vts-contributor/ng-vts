import { Component, OnInit } from '@angular/core';
import { TransferChange, TransferItem, TransferSelectChange } from '@ui-vts/ng-vts/transfer';

@Component({
  selector: 'vts-demo-transfer-table-transfer',
  template: `
    <vts-transfer
      [vtsDataSource]="list"
      [vtsDisabled]="disabled"
      [vtsShowSearch]="showSearch"
      [vtsShowSelectAll]="false"
      [vtsRenderList]="[renderList, renderList]"
      (vtsSelectChange)="select($event)"
      (vtsChange)="change($event)"
    >
      <ng-template
        #renderList
        let-items
        let-direction="direction"
        let-stat="stat"
        let-disabled="disabled"
        let-onItemSelectAll="onItemSelectAll"
        let-onItemSelect="onItemSelect"
      >
        <vts-table #t [vtsData]="items" vtsSize="small">
          <thead>
            <tr>
              <th
                [vtsDisabled]="disabled"
                [vtsChecked]="stat.checkAll"
                [vtsIndeterminate]="stat.checkHalf"
                (vtsCheckedChange)="onItemSelectAll($event)"
              ></th>
              <th>Name</th>
              <th *ngIf="direction === 'left'">Tag</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let data of t.data" (click)="onItemSelect(data)">
              <td
                [vtsChecked]="data.checked"
                [vtsDisabled]="disabled || data.disabled"
                (vtsCheckedChange)="onItemSelect(data)"
              ></td>
              <td>{{ data.title }}</td>
              <td *ngIf="direction === 'left'">
                <vts-tag>{{ data.tag }}</vts-tag>
              </td>
              <td>{{ data.description }}</td>
            </tr>
          </tbody>
        </vts-table>
      </ng-template>
    </vts-transfer>
    <div style="margin-top: 8px;">
      <vts-switch
        [(ngModel)]="disabled"
        vtsCheckedChildren="disabled"
        vtsUnCheckedChildren="disabled"
      ></vts-switch>
      <vts-switch
        [(ngModel)]="showSearch"
        vtsCheckedChildren="showSearch"
        vtsUnCheckedChildren="showSearch"
      ></vts-switch>
    </div>
  `
})
export class VtsDemoTransferTableTransferComponent implements OnInit {
  list: TransferItem[] = [];
  disabled = false;
  showSearch = false;

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 4 === 0,
        tag: ['cat', 'dog', 'bird'][i % 3],
        checked: false
      });
    }

    [2, 3].forEach(idx => (this.list[idx].direction = 'right'));
  }

  select(ret: TransferSelectChange): void {
    console.log('vtsSelectChange', ret);
  }

  change(ret: TransferChange): void {
    console.log('vtsChange', ret);
    const listKeys = ret.list.map(l => l.key);
    const hasOwnKey = (e: TransferItem) => e.hasOwnProperty('key');
    this.list = this.list.map(e => {
      if (listKeys.includes(e.key) && hasOwnKey(e)) {
        if (ret.to === 'left') {
          delete e.hide;
        } else if (ret.to === 'right') {
          e.hide = false;
        }
      }
      return e;
    });
  }
}
