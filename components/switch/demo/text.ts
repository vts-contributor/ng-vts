import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-switch-text',
  template: `
    <vts-switch [ngModel]="true" vtsCheckedChildren="开" vtsUnCheckedChildren="关"></vts-switch>
    <br />
    <br />
    <vts-switch [ngModel]="false" vtsCheckedChildren="1" vtsUnCheckedChildren="0"></vts-switch>
    <br />
    <br />
    <vts-switch
      [ngModel]="true"
      [vtsCheckedChildren]="checkedTemplate"
      [vtsUnCheckedChildren]="unCheckedTemplate"
    ></vts-switch>
    <ng-template #checkedTemplate><i vts-icon vtsType="check"></i></ng-template>
    <ng-template #unCheckedTemplate>
      <i vts-icon vtsType="Close"></i>
    </ng-template>
  `
})
export class VtsDemoSwitchTextComponent {}
