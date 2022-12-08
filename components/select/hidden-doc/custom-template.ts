import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-select-custom-template',
  template: `
    <vts-select vtsAllowClear vtsPlaceHolder="Select OS" [vtsCustomTemplate]="defaultTemplate">
      <vts-option vtsLabel="Windows" vtsValue="windows"></vts-option>
      <vts-option vtsLabel="Apple" vtsValue="apple"></vts-option>
      <vts-option vtsLabel="Android" vtsValue="android"></vts-option>
    </vts-select>
    <ng-template #defaultTemplate let-selected>
      <i vts-icon [vtsType]="selected.vtsValue"></i>
      {{ selected.vtsLabel }}
    </ng-template>
    <br />
    <br />
    <vts-select
      vtsAllowClear
      vtsPlaceHolder="Select OS"
      vtsMode="multiple"
      [vtsCustomTemplate]="multipleTemplate"
    >
      <vts-option vtsLabel="Windows" vtsValue="windows"></vts-option>
      <vts-option vtsLabel="Apple" vtsValue="apple"></vts-option>
      <vts-option vtsLabel="Android" vtsValue="android"></vts-option>
    </vts-select>
    <ng-template #multipleTemplate let-selected>
      <div class="vts-select-selection-item-content">
        <i vts-icon [vtsType]="selected.vtsValue"></i>
        {{ selected.vtsLabel }}
      </div>
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
export class VtsDemoSelectCustomTemplateComponent {}
