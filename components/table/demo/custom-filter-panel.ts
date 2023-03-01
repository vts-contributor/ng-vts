import { Component } from '@angular/core';

interface DataItem {
  name: string;
  age: number;
  address: string;
}
@Component({
  selector: 'vts-demo-table-custom-filter-panel',
  template: `
    <vts-table #vtsTable [vtsData]="listOfDisplayData" vtsTableLayout="fixed">
      <thead>
        <tr>
          <th vtsCustomFilter>
            Name
            <vts-filter-trigger
              [(vtsVisible)]="visible"
              [vtsActive]="searchValue.length > 0"
              [vtsDropdownMenu]="menu"
            >
              <i vts-icon vtsType="Search"></i>
            </vts-filter-trigger>
          </th>
          <th>Age</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of vtsTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.age }}</td>
          <td>{{ data.address }}</td>
        </tr>
      </tbody>
    </vts-table>
    <vts-dropdown-menu #menu="vtsDropdownMenu">
      <div class="vts-table-filter-dropdown">
        <div class="search-box">
          <input type="text" vts-input placeholder="Search name" [(ngModel)]="searchValue" />
          <button
            vts-button
            vtsSize="sm"
            vtsType="primary"
            (click)="search()"
            class="search-button"
          >
            Search
          </button>
          <button vts-button vtsSize="sm" (click)="reset()">Reset</button>
        </div>
      </div>
    </vts-dropdown-menu>
  `,
  styles: [
    `
      .search-box {
        padding: 8px;
      }

      .search-box input {
        width: 188px;
        margin-bottom: 8px;
        display: block;
      }

      .search-box button {
        width: 90px;
      }

      .search-button {
        margin-right: 8px;
      }
    `
  ]
})
export class VtsDemoTableCustomFilterPanelComponent {
  searchValue = '';
  visible = false;
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
  listOfDisplayData = [...this.listOfData];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter(
      (item: DataItem) => item.name.indexOf(this.searchValue) !== -1
    );
  }
}
