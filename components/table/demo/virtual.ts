import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VtsTableComponent } from '@ui-vts/ng-vts/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface VirtualDataInterface {
  index: number;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'vts-demo-table-virtual',
  template: `
    <button vts-button (click)="scrollToIndex(200)">Scroll To Index 200</button>
    <br />
    <br />
    <vts-table
      #virtualTable
      [vtsBordered]="true"
      [vtsVirtualItemSize]="54"
      [vtsData]="listOfData"
      [vtsVirtualForTrackBy]="trackByIndex"
      [vtsClientPagination]="false"
      [vtsShowPagination]="false"
      [vtsScroll]="{ x: '1200px', y: '240px' }"
    >
      <thead>
        <tr>
          <th vtsLeft>Full Name</th>
          <th vtsLeft>Age</th>
          <th>Index</th>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
          <th>Column 4</th>
          <th>Column 5</th>
          <th>Column 6</th>
          <th>Column 7</th>
          <th>Column 8</th>
          <th vtsRight>Action</th>
        </tr>
      </thead>
      <tbody>
        <ng-template vts-virtual-scroll let-data let-index="index">
          <tr>
            <td vtsLeft>{{ data.name }}</td>
            <td vtsLeft>{{ data.age }}</td>
            <td>{{ data.index }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td vtsRight>
              <a>action</a>
            </td>
          </tr>
        </ng-template>
      </tbody>
    </vts-table>
  `
})
export class VtsDemoTableVirtualComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('virtualTable', { static: false })
  vtsTableComponent?: VtsTableComponent<VirtualDataInterface>;
  private destroy$ = new Subject();
  listOfData: VirtualDataInterface[] = [];

  scrollToIndex(index: number): void {
    this.vtsTableComponent?.cdkVirtualScrollViewport?.scrollToIndex(index);
  }

  trackByIndex(_: number, data: VirtualDataInterface): number {
    return data.index;
  }

  ngOnInit(): void {
    const data = [];
    for (let i = 0; i < 20000; i++) {
      data.push({
        index: i,
        name: `Edward`,
        age: i,
        address: `London`
      });
    }
    this.listOfData = data;
  }

  ngAfterViewInit(): void {
    this.vtsTableComponent?.cdkVirtualScrollViewport?.scrolledIndexChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: number) => {
        console.log('scroll index to', data);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
