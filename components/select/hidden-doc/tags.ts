import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vts-demo-select-tags',
  template: `
    <vts-select vtsMode="tags" vtsPlaceHolder="Tag Mode" [(ngModel)]="listOfTagOptions">
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
export class VtsDemoSelectTagsComponent implements OnInit {
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];

  ngOnInit(): void {
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }
}
