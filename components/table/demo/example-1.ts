import { Component, OnInit } from '@angular/core';

export function oneOf<T>(values: T[]): T {
  const idx = Math.floor(Math.random() * values.length);
  return values[idx];
}

export const names = [
  'Alisha Wallace',
  'Margaret Barnett',
  'Laurie Ross',
  'Sidney Farmer',
  'Saira Zuniga',
  'Talha Mathews',
  'Zakariya Mckee',
  'Amirah Francis',
  'Jose Pineda',
  'Findlay Spencer',
  'Ned Miller',
  'Emmie Wagner',
  'Allan Hall',
  'Cassandra Watson',
  'Sufyaan Taylor',
  'Rufus Washington',
  'Lorcan Booth',
  'Henry Galvan',
  'Harris Joseph',
  'Constance Hunter',
  'Sahar Payne',
  'Owais Boyd',
  'Ruth Gould',
  'Gabriel Bright',
  'Bernice Roth',
  'Nannie Sawyer',
  'Ismael Wiley',
  'Humza Holder',
  'Lillie Sutherland',
  'Anisa Dean'
];

interface ItemData {
  id: string;
  name: string;
  description: string;
  status: string;
  date: string;
  price: number;
}

@Component({
  selector: 'vts-demo-table-example-1',
  template: `
    <ng-container
      *ngTemplateOutlet="checkedTpl; context: { $implicit: setOfCheckedId.size }"
    ></ng-container>
    <vts-table
      [vtsData]="data"
      [vtsPageSize]="10"
      [(vtsPageIndex)]="pageIndex"
      vtsShowPagination
      vtsShowSizeChanger
      [vtsStripe]="false"
      [vtsBordered]="false"
      [vtsShowTotal]="rangeTemplate"
      #t="vtsTable"
    >
      <thead>
        <tr>
          <th
            [vtsChecked]="checked"
            [vtsIndeterminate]="indeterminate"
            (vtsCheckedChange)="onAllChecked($event)"
            vtsWidth="40px"
          ></th>
          <th vtsWidth="40px" vtsAlign="center">#</th>
          <th vtsShowSort [vtsSortFn]="sortFn('name')">Name</th>
          <th vtsShowSort [vtsSortFn]="sortFn('description')">Description</th>
          <th vtsShowSort [vtsSortFn]="sortFn('status')">Status</th>
          <th vtsShowSort [vtsSortFn]="sortFn('date')">Date</th>
          <th vtsShowSort [vtsSortFn]="sortFn('price')" vtsAlign="right">Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of t.data; index as i">
          <td
            [vtsChecked]="setOfCheckedId.has(item.id)"
            (vtsCheckedChange)="onItemChecked(item.id, $event)"
          ></td>
          <td vtsAlign="center">{{ item.id }}</td>
          <td vtsNoWrap>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>
            <ng-container
              *ngTemplateOutlet="statusTpl; context: { $implicit: item.status }"
            ></ng-container>
          </td>
          <td vtsNoWrap>{{ item.date.toString() }}</td>
          <td vtsAlign="right">{{ item.price | number : '1.0' }}</td>
          <td>
            <vts-space [vtsSize]="8">
              <button *vtsSpaceItem vts-button vtsType="text">
                <i vts-icon vtsType="RemoveRedEyeOutline:mat"></i>
              </button>
              <button
                *vtsSpaceItem
                vts-button
                vtsType="text"
                vts-dropdown
                vtsTrigger="click"
                [vtsDropdownMenu]="menu"
              >
                <i vts-icon vtsType="ThreeDotsVertical:bootstrap"></i>
              </button>
            </vts-space>
          </td>
        </tr>
      </tbody>
    </vts-table>

    <ng-template #rangeTemplate let-range="range" let-total>
      <div class="range-container">{{ range[0] }}-{{ range[1] }} of {{ total }} items</div>
    </ng-template>

    <ng-template #statusTpl let-status>
      <vts-tag *ngIf="status === 'New'" vtsPreset="success">{{ status }}</vts-tag>
      <vts-tag *ngIf="status === 'Draft'">{{ status }}</vts-tag>
      <vts-tag *ngIf="status === 'Danger'" vtsPreset="error">{{ status }}</vts-tag>
      <vts-tag *ngIf="status === 'Warning'" vtsPreset="warning">{{ status }}</vts-tag>
    </ng-template>

    <ng-template #checkedTpl let-count>
      <div class="count-container">
        <span>
          <b>{{ count }}</b>
          items is selected
        </span>
        &nbsp; | &nbsp;
        <button vts-button vtsType="text" class="clear-btn" (click)="onAllChecked(false)">
          <i vts-icon vtsType="Eraser:bootstrap"></i>
          Clear selected
        </button>
      </div>
    </ng-template>
    <vts-dropdown-menu #menu="vtsDropdownMenu">
      <ul vts-menu>
        <li vts-menu-item>
          <i vts-icon vtsType="LockOutline:antd"></i>
          Lock
        </li>
        <li vts-menu-item>
          <i vts-icon vtsType="DeleteOutline:antd"></i>
          Delete
        </li>
      </ul>
    </vts-dropdown-menu>
  `,
  styles: [
    `
      .count-container {
        padding: 12px 16px;
        border: 1px solid #7fb7f2;
        background: #edf6ff;
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }
      .clear-btn {
        color: #0663c7;
      }
      .range-container {
        font-size: 14px;
        color: #73777a;
      }
    `
  ]
})
export class VtsDemoTableExample1Component implements OnInit {
  pageIndex = 1;
  data = this.generateData();
  setOfCheckedId = new Set<string>();
  indeterminate = false;
  checked = false;
  sortFn = (k: string) => (item1: any, item2: any) => item1[k] < item2[k] ? 1 : -1;

  ngOnInit(): void {}

  generateData(): ReadonlyArray<ItemData> {
    const data = [];
    for (let i = 1; i <= 100; i++) {
      data.push({
        id: i.toString(),
        name: oneOf(names),
        description: `${oneOf(
          names
        )} - Lorem Ipsum is simply dummy text of the printing and typesetting industry - ${oneOf(
          names
        )}`,
        status: oneOf(['New', 'Draft', 'Danger', 'Warning']),
        date: '2022/01/01 00:00:00',
        price: Math.round(Math.random() * 500000)
      });
    }
    return data;
  }

  onAllChecked(checked: boolean): void {
    this.data.forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    this.indeterminate =
      !!this.setOfCheckedId.size &&
      this.data.filter(({ id }) => this.setOfCheckedId.has(id)).length != this.data.length;
    this.checked =
      this.data.filter(({ id }) => this.setOfCheckedId.has(id)).length == this.data.length;
  }
}
