import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'vts-demo-select-scroll-load',
  template: `
    <vts-select
      [(ngModel)]="selectedUser"
      (vtsScrollToBottom)="loadMore()"
      vtsPlaceHolder="Select users"
      vtsAllowClear
      [vtsDropdownRender]="renderTemplate"
    >
      <vts-option *ngFor="let o of optionList" [vtsValue]="o" [vtsLabel]="o"></vts-option>
    </vts-select>
    <ng-template #renderTemplate>
      <vts-spin *ngIf="isLoading"></vts-spin>
    </ng-template>
  `,
  styles: [
    `
      vts-select {
        width: 100%;
      }
    `
  ]
})
export class VtsDemoSelectScrollLoadComponent implements OnInit {
  randomUserUrl = 'https://api.randomuser.me/?results=10';
  optionList: string[] = [];
  selectedUser = null;
  isLoading = false;
  // tslint:disable:no-any
  getRandomNameList: Observable<string[]> = this.http
    .get(`${this.randomUserUrl}`)
    .pipe(map((res: any) => res.results))
    .pipe(
      map((list: any) => {
        return list.map((item: any) => `${item.name.first}`);
      })
    );

  loadMore(): void {
    this.isLoading = true;
    this.getRandomNameList.subscribe(data => {
      this.isLoading = false;
      this.optionList = [...this.optionList, ...data];
    });
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMore();
  }
}
