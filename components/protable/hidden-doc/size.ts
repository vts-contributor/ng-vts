import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-table-size',
  template: `
    <h4>Middle size table</h4>
    <vts-table #middleTable vtsSize="middle" [vtsData]="data">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of middleTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.age }}</td>
          <td>{{ data.address }}</td>
        </tr>
      </tbody>
    </vts-table>
    <h4>Small size table</h4>
    <vts-table #smallTable vtsSize="small" [vtsData]="data">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of smallTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.age }}</td>
          <td>{{ data.address }}</td>
        </tr>
      </tbody>
    </vts-table>
  `,
  styles: [
    `
      h4 {
        margin-bottom: 16px;
      }
    `
  ]
})
export class VtsDemoTableSizeComponent {
  data = [
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
    }
  ];
}
