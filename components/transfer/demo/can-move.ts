import { Component, OnInit } from '@angular/core';
import { TransferCanMove, TransferItem } from '@ui-vts/ng-vts/transfer';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'vts-demo-transfer-can-move',
  template: `
    <vts-transfer
      [vtsDataSource]="list"
      [vtsCanMove]="canMove"
      (vtsSelectChange)="select($event)"
      (vtsChange)="change($event)"
    ></vts-transfer>
  `
})
export class VtsDemoTransferCanMoveComponent implements OnInit {
  list: TransferItem[] = [];

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

  canMove(arg: TransferCanMove): Observable<TransferItem[]> {
    if (arg.direction === 'right' && arg.list.length > 0) {
      arg.list.splice(0, 1);
    }
    // or
    // if (arg.direction === 'right' && arg.list.length > 0) delete arg.list[0];
    return of(arg.list).pipe(delay(1000));
  }

  select(ret: {}): void {
    console.log('vtsSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('vtsChange', ret);
  }
}
