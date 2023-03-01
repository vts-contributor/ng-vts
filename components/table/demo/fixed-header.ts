import { Component, OnInit } from '@angular/core';

interface ItemData {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'vts-demo-table-fixed-header',
  template: `
    <vts-table #headerTable [vtsData]="listOfData" [vtsPageSize]="50" [vtsScroll]="{ y: '240px' }">
      <thead>
        <tr>
          <th>Name</th>
          <th vtsWidth="100px">Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of headerTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.age }}</td>
          <td>{{ data.address }}</td>
        </tr>
      </tbody>
    </vts-table>
  `
})
export class VtsDemoTableFixedHeaderComponent implements OnInit {
  listOfData: ItemData[] = [];

  ngOnInit(): void {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`
      });
    }
    this.listOfData = data;
  }
}
