import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vts-demo-table-ellipsis',
  template: `
    <vts-table #fixedTable [vtsData]="listOfData" vtsTableLayout="fixed">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Age</th>
          <th>Column 1</th>
          <th>Column 2</th>
          <th vtsEllipsis>Column ColumnColumn 3</th>
          <th>Column 4</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of fixedTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.age }}</td>
          <td vtsEllipsis>{{ data.address }}</td>
          <td vtsEllipsis>{{ data.address }}</td>
          <td vtsEllipsis>{{ data.address }}</td>
          <td vtsEllipsis>{{ data.address }}</td>
        </tr>
      </tbody>
    </vts-table>
  `
})
export class VtsDemoTableEllipsisComponent implements OnInit {
  listOfData: Array<{ name: string; age: number; address: string }> = [];

  ngOnInit(): void {
    for (let i = 0; i < 3; i++) {
      this.listOfData.push({
        name: `Edward King`,
        age: 32,
        address: `LondonLondonLondonLondonLondon`
      });
    }
  }
}
