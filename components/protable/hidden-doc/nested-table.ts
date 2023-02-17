import { Component, OnInit } from '@angular/core';

interface ParentItemData {
  key: number;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number | string;
  creator: string;
  createdAt: string;
  expand: boolean;
}

interface ChildrenItemData {
  key: number;
  name: string;
  date: string;
  upgradeNum: string;
}

@Component({
  selector: 'vts-demo-table-nested-table',
  template: `
    <vts-table #nestedTable [vtsData]="listOfParentData" [vtsPageSize]="10">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Platform</th>
          <th>Version</th>
          <th>Upgraded</th>
          <th>Creator</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <ng-template ngFor let-data [ngForOf]="nestedTable.data">
          <tr>
            <td [(vtsExpand)]="data.expand"></td>
            <td>{{ data.name }}</td>
            <td>{{ data.platform }}</td>
            <td>{{ data.version }}</td>
            <td>{{ data.upgradeNum }}</td>
            <td>{{ data.creator }}</td>
            <td>{{ data.createdAt }}</td>
            <td>
              <a>Publish</a>
            </td>
          </tr>
          <tr [vtsExpand]="data.expand">
            <vts-table
              #innerTable
              [vtsData]="listOfChildrenData"
              vtsSize="middle"
              [vtsShowPagination]="false"
            >
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Upgrade Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let data of innerTable.data">
                  <td>{{ data.date }}</td>
                  <td>{{ data.name }}</td>
                  <td>
                    <vts-badge [vtsStatus]="'success'" [vtsText]="'Finished'"></vts-badge>
                  </td>
                  <td>{{ data.upgradeNum }}</td>
                  <td>
                    <span class="table-operation">
                      <a vts-dropdown class="operation" [vtsDropdownMenu]="menu">
                        Pause
                        <i vts-icon vtsType="ArrowMiniDown"></i>
                      </a>
                      <vts-dropdown-menu #menu="vtsDropdownMenu">
                        <ul vts-menu>
                          <li vts-menu-item>
                            <a>Action 1</a>
                          </li>
                          <li vts-menu-item>
                            <a>Action 2</a>
                          </li>
                        </ul>
                      </vts-dropdown-menu>
                      <vts-divider vtsType="vertical"></vts-divider>
                      <a class="operation">Stop</a>
                      <vts-divider vtsType="vertical"></vts-divider>
                      <a>More</a>
                    </span>
                  </td>
                </tr>
              </tbody>
            </vts-table>
          </tr>
        </ng-template>
      </tbody>
    </vts-table>
  `
})
export class VtsDemoTableNestedTableComponent implements OnInit {
  listOfParentData: ParentItemData[] = [];
  listOfChildrenData: ChildrenItemData[] = [];

  ngOnInit(): void {
    for (let i = 0; i < 3; ++i) {
      this.listOfParentData.push({
        key: i,
        name: 'Screem',
        platform: 'iOS',
        version: '10.3.4.5654',
        upgradeNum: 500,
        creator: 'Jack',
        createdAt: '2014-12-24 23:12:00',
        expand: false
      });
    }
    for (let i = 0; i < 3; ++i) {
      this.listOfChildrenData.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56'
      });
    }
  }
}
