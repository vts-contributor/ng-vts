import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-table-expand',
  template: `
    <vts-table #vtsTable [vtsData]="listOfData" vtsTableLayout="fixed">
      <thead>
        <tr>
          <th vtsWidth="60px"></th>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <ng-container *ngFor="let data of vtsTable.data">
          <tr>
            <td
              [vtsExpand]="expandSet.has(data.id)"
              (vtsExpandChange)="onExpandChange(data.id, $event)"
            ></td>
            <td>{{ data.name }}</td>
            <td>{{ data.age }}</td>
            <td>{{ data.address }}</td>
          </tr>
          <tr [vtsExpand]="expandSet.has(data.id)">
            <span>{{ data.description }}</span>
          </tr>
        </ng-container>
      </tbody>
    </vts-table>
  `
})
export class VtsDemoTableExpandComponent {
  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
  listOfData = [
    {
      id: 1,
      name: 'John Brown',
      age: 32,
      expand: false,
      address: 'New York No. 1 Lake Park',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
    },
    {
      id: 2,
      name: 'Jim Green',
      age: 42,
      expand: false,
      address: 'London No. 1 Lake Park',
      description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
    },
    {
      id: 3,
      name: 'Joe Black',
      age: 32,
      expand: false,
      address: 'Sidney No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
    }
  ];
}
