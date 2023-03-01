import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { VtsTableQueryParams } from '@ui-vts/ng-vts/table';
import { Observable } from 'rxjs';

interface RandomUser {
  gender: string;
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
}

@Injectable({ providedIn: 'root' })
export class RandomUserService {
  randomUserUrl = 'https://api.randomuser.me/';

  getUsers(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>
  ): Observable<{ results: RandomUser[] }> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('sortOrder', `${sortOrder}`);
    filters.forEach(filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });
    });
    return this.http.get<{ results: RandomUser[] }>(`${this.randomUserUrl}`, {
      params
    });
  }

  constructor(private http: HttpClient) {}
}

@Component({
  selector: 'vts-demo-table-ajax',
  template: `
    <vts-table
      vtsShowSizeChanger
      [vtsData]="listOfRandomUser"
      [vtsClientPagination]="false"
      [vtsLoading]="loading"
      [vtsTotal]="total"
      [vtsPageSize]="pageSize"
      [vtsPageIndex]="pageIndex"
      (vtsQueryParams)="onQueryParamsChange($event)"
    >
      <thead>
        <tr>
          <th vtsColumnKey="name" [vtsSortFn]="true">Name</th>
          <th vtsColumnKey="gender" [vtsFilters]="filterGender" [vtsFilterFn]="true">Gender</th>
          <th vtsColumnKey="email" [vtsSortFn]="true">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of listOfRandomUser">
          <td>{{ data.name.first }} {{ data.name.last }}</td>
          <td>{{ data.gender }}</td>
          <td>{{ data.email }}</td>
        </tr>
      </tbody>
    </vts-table>
  `
})
export class VtsDemoTableAjaxComponent implements OnInit {
  total = 1;
  listOfRandomUser: RandomUser[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  filterGender = [
    { text: 'male', value: 'male' },
    { text: 'female', value: 'female' }
  ];

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>
  ): void {
    this.loading = true;
    this.randomUserService
      .getUsers(pageIndex, pageSize, sortField, sortOrder, filter)
      .subscribe(data => {
        this.loading = false;
        this.total = 200; // mock the total data here
        this.listOfRandomUser = data.results;
      });
  }

  onQueryParamsChange(params: VtsTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  constructor(private randomUserService: RandomUserService) {}

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize, null, null, []);
  }
}
