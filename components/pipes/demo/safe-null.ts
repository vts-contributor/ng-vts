import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pipes-safe-null',
  template: `
    <vts-table #basicTable [vtsData]="listOfData">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of basicTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.age }}</td>
          <td>{{ data.address | vtsSafeNull : '-' }}</td>
        </tr>
      </tbody>
    </vts-table>
  `
})
export class VtsDemoPipesSafeNullComponent {
  listOfData = [
    {
      name: 'John Brown',
      age: 32
    },
    {
      name: 'Jim Green',
      age: 42
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
}
