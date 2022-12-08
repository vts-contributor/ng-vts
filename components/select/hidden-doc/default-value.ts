import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-select-default-value',
  template: `
    <vts-select
      vtsMode="multiple"
      vtsPlaceHolder="Inserted are removed"
      [(ngModel)]="listOfSelectedValue"
    >
      <vts-option
        *ngFor="let option of listOfOption"
        [vtsLabel]="option"
        [vtsValue]="option"
      ></vts-option>
      <vts-option
        *ngFor="let option of defaultOption"
        [vtsLabel]="option"
        [vtsValue]="option"
        vtsHide
      ></vts-option>
    </vts-select>
    <br />
    <br />
    <vts-select [(ngModel)]="selectedValue">
      <vts-option
        *ngFor="let option of listOfOption"
        [vtsLabel]="option"
        [vtsValue]="option"
      ></vts-option>
      <vts-option vtsLabel="Default Value" vtsValue="Default" vtsHide></vts-option>
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
export class VtsDemoSelectDefaultValueComponent {
  listOfOption = ['Option 01', 'Option 02'];
  listOfSelectedValue = ['Default 01', 'Default 02'];
  defaultOption = [...this.listOfSelectedValue];

  selectedValue = 'Default';
}
