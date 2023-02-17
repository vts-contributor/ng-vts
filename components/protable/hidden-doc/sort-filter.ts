import { Component } from '@angular/core';
import {
  VtsTableFilterFn,
  VtsTableFilterList,
  VtsTableSortFn,
  VtsTableSortOrder
} from '@ui-vts/ng-vts/table';

interface DataItem {
  name: string;
  age: number;
  address: string;
}

interface ColumnItem {
  name: string;
  sortOrder: VtsTableSortOrder | null;
  sortFn: VtsTableSortFn | null;
  listOfFilter: VtsTableFilterList;
  filterFn: VtsTableFilterFn | null;
  filterMultiple: boolean;
  sortDirections: VtsTableSortOrder[];
}

@Component({
  selector: 'vts-demo-table-sort-filter',
  template: `
    <vts-table #filterTable [vtsData]="listOfData" vtsTableLayout="fixed">
      <thead>
        <tr>
          <th
            *ngFor="let column of listOfColumns"
            [vtsSortOrder]="column.sortOrder"
            [vtsSortFn]="column.sortFn"
            [vtsSortDirections]="column.sortDirections"
            [vtsFilterMultiple]="column.filterMultiple"
            [vtsFilters]="column.listOfFilter"
            [vtsFilterFn]="column.filterFn"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of filterTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.age }}</td>
          <td>{{ data.address }}</td>
        </tr>
      </tbody>
    </vts-table>
  `
})
export class VtsDemoTableSortFilterComponent {
  listOfColumns: ColumnItem[] = [
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim', byDefault: true }
      ],
      filterFn: (list: string[], item: DataItem) =>
        list.some(name => item.name.indexOf(name) !== -1)
    },
    {
      name: 'Age',
      sortOrder: 'descend',
      sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
      sortDirections: ['descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true
    },
    {
      name: 'Address',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: DataItem, b: DataItem) => a.address.length - b.address.length,
      filterMultiple: false,
      listOfFilter: [
        { text: 'London', value: 'London' },
        { text: 'Sidney', value: 'Sidney' }
      ],
      filterFn: (address: string, item: DataItem) => item.address.indexOf(address) !== -1
    }
  ];
  listOfData: DataItem[] = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    }
  ];
}
