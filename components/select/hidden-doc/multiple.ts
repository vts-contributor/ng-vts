import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vts-demo-select-multiple',
  template: `
    <vts-select
      [vtsMaxTagCount]="3"
      [vtsMaxTagPlaceholder]="tagPlaceHolder"
      vtsMode="multiple"
      vtsPlaceHolder="Please select"
      [(ngModel)]="listOfSelectedValue"
    >
      <vts-option
        *ngFor="let item of listOfOption"
        [vtsLabel]="item"
        [vtsValue]="item"
      ></vts-option>
    </vts-select>
    <ng-template #tagPlaceHolder let-selectedList>
      and {{ selectedList.length }} more selected
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
export class VtsDemoSelectMultipleComponent implements OnInit {
  listOfOption: string[] = [];
  listOfSelectedValue = ['a10', 'c12'];

  ngOnInit(): void {
    const children: string[] = [];
    for (let i = 10; i < 36; i++) {
      children.push(`${i.toString(36)}${i}`);
    }
    this.listOfOption = children;
  }
}
