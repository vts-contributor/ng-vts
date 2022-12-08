import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-input-addon',
  template: `
    <div>
      <vts-input-group vtsAddOnBefore="Http://" vtsAddOnAfter=".com">
        <input type="text" vts-input [(ngModel)]="inputValue" />
      </vts-input-group>
    </div>
    <div>
      <vts-input-group [vtsAddOnBefore]="addOnBeforeTemplate" [vtsAddOnAfter]="addOnAfterTemplate">
        <input type="text" vts-input [(ngModel)]="inputValue" />
      </vts-input-group>
      <ng-template #addOnBeforeTemplate>
        <vts-select [ngModel]="'Http://'">
          <vts-option vtsLabel="Http://" vtsValue="Http://"></vts-option>
          <vts-option vtsLabel="Https://" vtsValue="Https://"></vts-option>
        </vts-select>
      </ng-template>
      <ng-template #addOnAfterTemplate>
        <vts-select [ngModel]="'.com'">
          <vts-option vtsLabel=".com" vtsValue=".com"></vts-option>
          <vts-option vtsLabel=".jp" vtsValue=".jp"></vts-option>
          <vts-option vtsLabel=".cn" vtsValue=".cn"></vts-option>
          <vts-option vtsLabel=".org" vtsValue=".org"></vts-option>
        </vts-select>
      </ng-template>
    </div>
    <div>
      <vts-input-group vtsAddOnAfterIcon="Setting">
        <input type="text" vts-input [(ngModel)]="inputValue" />
      </vts-input-group>
    </div>
  `,
  styles: [
    `
      div {
        margin-bottom: 16px;
      }
    `
  ]
})
export class VtsDemoInputAddonComponent {
  inputValue: string = 'my site';
}
