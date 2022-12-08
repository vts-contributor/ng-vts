import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'vts-demo-select-select-users',
  template: `
    <vts-select
      vtsMode="multiple"
      vtsPlaceHolder="Select users"
      vtsAllowClear
      vtsShowSearch
      vtsServerSearch
      [(ngModel)]="selectedUser"
      (vtsOnSearch)="onSearch($event)"
    >
      <ng-container *ngFor="let o of optionList">
        <vts-option *ngIf="!isLoading" [vtsValue]="o" [vtsLabel]="o"></vts-option>
      </ng-container>
      <vts-option *ngIf="isLoading" vtsDisabled vtsCustomContent>
        <i vts-icon vtsType="Sync" class="loading-icon"></i>
        Loading Data...
      </vts-option>
    </vts-select>
  `,
  styles: [
    `
      vts-select {
        width: 100%;
      }

      .loading-icon {
        margin-right: 8px;
      }
    `
  ]
})
export class VtsDemoSelectSelectUsersComponent implements OnInit {
  randomUserUrl = 'https://api.randomuser.me/?results=5';
  searchChange$ = new BehaviorSubject('');
  optionList: string[] = [];
  selectedUser?: string;
  isLoading = false;

  onSearch(value: string): void {
    this.isLoading = true;
    this.searchChange$.next(value);
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // tslint:disable:no-any
    const getRandomNameList = (name: string) =>
      this.http
        .get(`${this.randomUserUrl}`)
        .pipe(map((res: any) => res.results))
        .pipe(
          map((list: any) => {
            return list.map((item: any) => `${item.name.first} ${name}`);
          })
        );
    const optionList$: Observable<string[]> = this.searchChange$
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(switchMap(getRandomNameList));
    optionList$.subscribe(data => {
      this.optionList = data;
      this.isLoading = false;
    });
  }
}
