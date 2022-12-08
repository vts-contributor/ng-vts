import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-table-bordered',
  template: `
    <vts-table #borderedTable vtsBordered vtsFooter="Footer" vtsTitle="Header" [vtsData]="dataSet">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of borderedTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.age }}</td>
          <td>{{ data.address }}</td>
        </tr>
      </tbody>
    </vts-table>

    <vts-table
      #outBordered
      vtsOuterBordered
      vtsFooter="Footer"
      vtsTitle="Header"
      [vtsData]="dataSet"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of outBordered.data">
          <td>{{ data.name }}</td>
          <td>{{ data.age }}</td>
          <td>{{ data.address }}</td>
        </tr>
      </tbody>
    </vts-table>
  `
})
export class VtsDemoTableBorderedComponent {
  dataSet = [
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
