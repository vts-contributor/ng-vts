import { Component, OnInit } from '@angular/core';
import { VtsSelectSize } from '@ui-vts/ng-vts/select';

@Component({
  selector: 'vts-demo-select-size',
  template: `
    <vts-radio-group [(ngModel)]="size">
      <label vts-radio-button vtsValue="large"><span>Large</span></label>
      <label vts-radio-button vtsValue="default"><span>Default</span></label>
      <label vts-radio-button vtsValue="small"><span>Small</span></label>
    </vts-radio-group>
    <br />
    <br />
    <vts-select [(ngModel)]="singleValue" [vtsSize]="size">
      <vts-option
        *ngFor="let option of listOfOption"
        [vtsLabel]="option.label"
        [vtsValue]="option.value"
      ></vts-option>
    </vts-select>
    <br />
    <br />
    <vts-select [(ngModel)]="singleValue" [vtsSize]="size" vtsShowSearch>
      <vts-option
        *ngFor="let option of listOfOption"
        [vtsLabel]="option.label"
        [vtsValue]="option.value"
      ></vts-option>
    </vts-select>
    <br />
    <br />
    <vts-select
      [(ngModel)]="multipleValue"
      [vtsSize]="size"
      vtsMode="multiple"
      vtsPlaceHolder="Please select"
    >
      <vts-option
        *ngFor="let option of listOfOption"
        [vtsLabel]="option.label"
        [vtsValue]="option.value"
      ></vts-option>
    </vts-select>
    <br />
    <br />
    <vts-select
      [(ngModel)]="tagValue"
      [vtsSize]="size"
      vtsMode="tags"
      vtsPlaceHolder="Please select"
    >
      <vts-option
        *ngFor="let option of listOfOption"
        [vtsLabel]="option.label"
        [vtsValue]="option.value"
      ></vts-option>
    </vts-select>
  `,
  styles: [
    `
      vts-select {
        width: 100%;
      }
    `
  ]
})
export class VtsDemoSelectSizeComponent implements OnInit {
  listOfOption: Array<{ label: string; value: string }> = [];
  size: VtsSelectSize = 'md';
  singleValue = 'a10';
  multipleValue = ['a10', 'c12'];
  tagValue = ['a10', 'c12', 'tag'];

  ngOnInit(): void {
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }
}
