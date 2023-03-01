import { PropertyType } from '@ui-vts/ng-vts/pro-table';
import { Component } from '@angular/core';

interface Item {
  id: string;
  content1: string;
  content2: string;
  content3: string;
  content4: string;
  content5: string;
}

@Component({
  selector: 'vts-demo-pro-table-basic',
  template: `
    <!-- <ng-template #showTotal let-current let-range="range">
      <p>{{ range[0] }}-{{ range[1] }} on total {{ current }}</p>
    </ng-template>
    <vts-table
      #basicTable
      [vtsData]="filteredList"
      [vtsPageSize]="pageSize"
      [vtsPageIndex]="pageIndex"
      [vtsShowTotal]="showTotal"
      vtsShowPagination
      vtsShowSizeChanger
    >
      <thead>
        <tr>
          <th
            [vtsChecked]="checked"
            [vtsIndeterminate]="indeterminate"
            (vtsCheckedChange)="onAllChecked($event)"
          ></th>
          <th vtsWidth="1%" vtsAlign="center">#</th>
          <th>Property 1</th>
          <th>Property 2</th>
          <th vtsAlign="center">3</th>
          <th [vtsSortDirections]="sortDirections" [vtsSortFn]="sortFn">Property 4</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td>
            <input name="filter1" ngModel (ngModelChange)="filter($event, 'content1')" vts-input />
          </td>
          <td>
            <input name="filter2" ngModel (ngModelChange)="filter($event, 'content2')" vts-input />
          </td>
          <td>
            <input name="filter3" ngModel (ngModelChange)="filter($event, 'content3')" vts-input />
          </td>
          <td>
            <input name="filter4" ngModel (ngModelChange)="filter($event, 'content4')" vts-input />
          </td>
          <td></td>
        </tr>
        <tr *ngFor="let data of basicTable.data; index as i">
          <td
            [vtsChecked]="setOfCheckedId.has(data.id)"
            (vtsCheckedChange)="onItemChecked(data.id, $event)"
          ></td>
          <td vtsAlign="center">{{ data.id }}</td>
          <td>{{ data.content1 }}</td>
          <td>{{ data.content2 }}</td>
          <td vtsAlign="center">{{ data.content3 }}</td>
          <td vtsAlign="right">{{ data.content4 }}</td>
          <td>
            <a>Delete</a>
          </td>
        </tr>
      </tbody>
    </vts-table> -->
    <vts-protable-container [listData]="listOfData" [properties]="properties"></vts-protable-container>
  `
})
export class VtsDemoProTableBasicComponent {
  listOfData: Item[] = [
    ...Array.from({ length: 100 }).map((_, i) => {
      return {
        id: `${i + 1}`,
        content1: `Table row ${i + 1}`,
        content2: `Table row ${i + 1}`,
        content3: `Table row ${i + 1} (center)`,
        content4: '0.' + '5'.padStart(Math.round(Math.random() * 7), '0'),
        content5: '0.' + '5'.padStart(Math.round(Math.random() * 7), '0')
      };
    })
  ];

  properties: PropertyType[] = [
    {
      headerTitle: '#',
      propertyName: 'id',
      required: true,
      datatype: 'string'
    },

    {
      headerTitle: 'Prop 1',
      propertyName: 'content1',
      required: true,
      datatype: 'string',
      checked: true
    },
    {
      headerTitle: 'Prop 2',
      propertyName: 'content2',
      required: true,
      datatype: 'string',
      checked: true
    },
    {
      headerTitle: 'Prop 3',
      propertyName: 'content3',
      required: true,
      datatype: 'string',
      checked: true
    },
    {
      headerTitle: 'Prop 4',
      propertyName: 'content4',
      required: true,
      datatype: 'string',
    },
    {
      headerTitle: 'Prop 5',
      propertyName: 'content5',
      required: true,
      datatype: 'string',
    },
  ];


  filteredList = [...this.listOfData];

  pageSize = 10;
  pageIndex = 1;
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<string>();
  noCheckedItems = 0;
  searchTerms: any = {};

  onAllChecked(checked: any): void {
    this.filteredList.forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  onClearAllCheckedItem(event: boolean) {
    if (event) {
      console.log(event);
      this.onAllChecked(!event);
    }
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
    this.noCheckedItems = this.setOfCheckedId.size;
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.filteredList;
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate =
      listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
    this.noCheckedItems = this.setOfCheckedId.size;
  }

  filter(searchKey: string, column: string) {
    this.searchTerms[column] = searchKey;
    this.refreshFilter();
  }

  refreshFilter() {
    this.filteredList = this.listOfData.filter((item: any) => {
      return Object.keys(this.searchTerms).every(k =>
        item[k]
          .toUpperCase()
          .trim()
          .includes(this.searchTerms[k]?.toUpperCase()?.trim() || '')
      );
    });
  }

  sortDirections = ['ascend', 'descend', null];
  sortFn = (item1: any, item2: any) => (item1.content4 < item2.content4 ? 1 : -1);
}