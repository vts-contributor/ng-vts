import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tag-checkable',
  template: `
    <vts-tag vtsMode="checkable" [vtsChecked]="true" (vtsCheckedChange)="checkChange($event)">
      Tag1
    </vts-tag>
    <vts-tag vtsMode="checkable" [vtsChecked]="true" (vtsCheckedChange)="checkChange($event)">
      Tag2
    </vts-tag>
    <vts-tag vtsMode="checkable" [vtsChecked]="true" (vtsCheckedChange)="checkChange($event)">
      Tag3
    </vts-tag>
  `
})
export class VtsDemoTagCheckableComponent {
  checkChange(e: boolean): void {
    console.log(e);
  }
}
