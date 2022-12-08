import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-select-search-box',
  template: `
    <vts-select
      vtsShowSearch
      vtsServerSearch
      vtsPlaceHolder="input search text"
      [(ngModel)]="selectedValue"
      [vtsShowArrow]="false"
      [vtsCustomFilterFn]="vtsCustomFilterFn"
      (vtsOnSearch)="search($event)"
    >
      <vts-option
        *ngFor="let o of listOfOption"
        [vtsLabel]="o.text"
        [vtsValue]="o.value"
      ></vts-option>
    </vts-select>
  `,
  styles: [
    `
      vts-select {
        width: 200px;
      }
    `
  ]
})
export class VtsDemoSelectSearchBoxComponent {
  selectedValue = null;
  listOfOption: Array<{ value: string; text: string }> = [];
  vtsCustomFilterFn = () => true;

  constructor(private httpClient: HttpClient) {}

  search(value: string): void {
    this.httpClient
      .jsonp<{ result: Array<[string, string]> }>(
        `https://suggest.taobao.com/sug?code=utf-8&q=${value}`,
        'callback'
      )
      .subscribe(data => {
        const listOfOption: Array<{ value: string; text: string }> = [];
        data.result.forEach(item => {
          listOfOption.push({
            value: item[0],
            text: item[0]
          });
        });
        this.listOfOption = listOfOption;
      });
  }
}
