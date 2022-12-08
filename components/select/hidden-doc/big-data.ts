import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'vts-demo-select-big-data',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <vts-select
      vtsMode="multiple"
      vtsPlaceHolder="Please select"
      [vtsOptions]="listOfOption"
      [(ngModel)]="listOfSelectedValue"
    ></vts-select>
  `,
  styles: [
    `
      vts-select {
        width: 100%;
      }
    `
  ]
})
export class VtsDemoSelectBigDataComponent implements OnInit {
  listOfOption: Array<{ value: string; label: string }> = [];
  listOfSelectedValue = ['a10', 'c12'];

  ngOnInit(): void {
    const children: string[] = [];
    for (let i = 10; i < 10000; i++) {
      children.push(`${i.toString(36)}${i}`);
    }
    this.listOfOption = children.map(item => {
      return {
        value: item,
        label: item
      };
    });
  }
}
