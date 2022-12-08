import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-input-presuffix',
  template: `
    <vts-input-group [vtsSuffix]="suffixTemplateInfo" [vtsPrefix]="prefixTemplateUser">
      <input type="text" vts-input placeholder="Enter your username" />
    </vts-input-group>
    <ng-template #prefixTemplateUser>
      <i vts-icon vtsType="UserOutline"></i>
    </ng-template>
    <ng-template #suffixTemplateInfo>
      <i vts-icon vts-tooltip vtsTooltipTitle="Extra information" vtsType="info-circle"></i>
    </ng-template>
    <br />
    <br />
    <vts-input-group vtsSuffix="RMB" vtsPrefix="￥">
      <input type="text" vts-input />
    </vts-input-group>
  `
})
export class VtsDemoInputPresuffixComponent {}
