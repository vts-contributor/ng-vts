import { Component, OnInit } from '@angular/core';
import { VtsTabPosition } from '@ui-vts/ng-vts/tabs';

@Component({
  selector: 'vts-demo-tabs-slide',
  template: `
    <vts-radio-group [(ngModel)]="vtsTabPosition" style="margin-bottom: 8px;">
      <label vts-radio-button [vtsValue]="'top'">Horizontal</label>
      <label vts-radio-button [vtsValue]="'left'">Vertical</label>
    </vts-radio-group>
    <vts-input-number
      style="float:right;"
      [vtsMin]="0"
      [vtsMax]="29"
      [(ngModel)]="selectedIndex"
    ></vts-input-number>

    <vts-tabset
      style="height:220px;"
      [vtsTabPosition]="vtsTabPosition"
      [(vtsSelectedIndex)]="selectedIndex"
      (vtsSelectChange)="log([$event])"
    >
      <vts-tab
        *ngFor="let tab of tabs"
        [vtsTitle]="tab.name"
        [vtsDisabled]="tab.disabled"
        (vtsSelect)="log(['select', tab])"
        (vtsClick)="log(['click', tab])"
        (vtsContextmenu)="log(['contextmenu', tab])"
        (vtsDeselect)="log(['deselect', tab])"
      >
        {{ tab.content }}
      </vts-tab>
    </vts-tabset>
  `
})
export class VtsDemoTabsSlideComponent implements OnInit {
  tabs: Array<{ name: string; content: string; disabled: boolean }> = [];
  vtsTabPosition: VtsTabPosition = 'top';
  selectedIndex = 0;

  /* tslint:disable-next-line:no-any */
  log(args: any[]): void {
    console.log(args);
  }

  ngOnInit(): void {
    for (let i = 0; i < 30; i++) {
      this.tabs.push({
        name: `Tab ${i}`,
        disabled: i === 28,
        content: `Content of tab ${i}`
      });
    }
  }
}
