import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-table-fixed-columns',
  template: `
    <vts-table #columnTable [vtsData]="listOfData" [vtsScroll]="{ x: '1100px' }">
      <thead>
        <tr>
          <th vtsLeft>Full Name</th>
          <th vtsLeft>Age</th>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
          <th>Column 4</th>
          <th>Column 5</th>
          <th>Column 6</th>
          <th>Column 7</th>
          <th vtsRight>Column 8</th>
          <th vtsRight>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of columnTable.data">
          <td vtsLeft>{{ data.name }}</td>
          <td vtsLeft>{{ data.age }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td>{{ data.address }}</td>
          <td vtsRight>{{ data.address }}</td>
          <td vtsRight>
            <a>action</a>
          </td>
        </tr>
      </tbody>
    </vts-table>
  `
})
export class VtsDemoTableFixedColumnsComponent {
  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 40,
      address: 'London'
    }
  ];
}
