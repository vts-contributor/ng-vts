import { Component } from '@angular/core';

interface DataItem {
  name: string;
  chinese: number;
  math: number;
  english: number;
}

@Component({
  selector: 'vts-demo-table-multiple-sorter',
  template: `
    <vts-table #sortTable [vtsData]="listOfData" vtsTableLayout="fixed">
      <thead>
        <tr>
          <th
            *ngFor="let column of listOfColumn"
            [vtsSortFn]="column.compare"
            [vtsSortPriority]="column.priority"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of sortTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.chinese }}</td>
          <td>{{ data.math }}</td>
          <td>{{ data.english }}</td>
        </tr>
      </tbody>
    </vts-table>
  `
})
export class VtsDemoTableMultipleSorterComponent {
  listOfColumn = [
    {
      title: 'Name',
      compare: null,
      priority: false
    },
    {
      title: 'Chinese Score',
      compare: (a: DataItem, b: DataItem) => a.chinese - b.chinese,
      priority: 3
    },
    {
      title: 'Math Score',
      compare: (a: DataItem, b: DataItem) => a.math - b.math,
      priority: 2
    },
    {
      title: 'English Score',
      compare: (a: DataItem, b: DataItem) => a.english - b.english,
      priority: 1
    }
  ];
  listOfData: DataItem[] = [
    {
      name: 'John Brown',
      chinese: 98,
      math: 60,
      english: 70
    },
    {
      name: 'Jim Green',
      chinese: 98,
      math: 66,
      english: 89
    },
    {
      name: 'Joe Black',
      chinese: 98,
      math: 90,
      english: 70
    },
    {
      name: 'Jim Red',
      chinese: 88,
      math: 99,
      english: 89
    }
  ];
}