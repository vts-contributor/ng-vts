import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-select-hide-selected',
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
        [vtsHide]="!isNotSelected(option)"
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
export class VtsDemoSelectHideSelectedComponent {
  listOfOption = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
  listOfSelectedValue: string[] = [];

  isNotSelected(value: string): boolean {
    return this.listOfSelectedValue.indexOf(value) === -1;
  }
}
