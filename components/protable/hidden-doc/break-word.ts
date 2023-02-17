import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vts-demo-table-break-word',
  template: `
    <vts-table #fixedTable [vtsData]="listOfData" [vtsScroll]="{ x: '1000px', y: '240px' }">
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
          <th>Column 8</th>
          <th vtsRight>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of fixedTable.data">
          <td vtsLeft>{{ data.name }}</td>
          <td vtsLeft>{{ data.age }}</td>
          <td vtsBreakWord>{{ data.address }}</td>
          <td vtsBreakWord>{{ data.address }}</td>
          <td vtsBreakWord>{{ data.address }}</td>
          <td vtsBreakWord>{{ data.address }}</td>
          <td vtsBreakWord>{{ data.address }}</td>
          <td vtsBreakWord>{{ data.address }}</td>
          <td vtsBreakWord>{{ data.address }}</td>
          <td vtsBreakWord>{{ data.address }}</td>
          <td vtsRight>
            <a>action</a>
          </td>
        </tr>
      </tbody>
    </vts-table>
  `
})
export class VtsDemoTableBreakWordComponent implements OnInit {
  listOfData: Array<{ name: string; age: number; address: string }> = [];

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        name: `Edward King`,
        age: 32,
        address: `LondonLondonLondonLondonLondon`
      });
    }
  }
}
