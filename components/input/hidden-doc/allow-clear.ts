import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-input-allow-clear',
  template: `
    <vts-input-group [vtsSuffix]="inputClearTpl">
      <input type="text" vts-input [(ngModel)]="inputValue" placeholder="input with clear icon" />
    </vts-input-group>
    <ng-template #inputClearTpl>
      <i
        vts-icon
        class="vts-input-clear-icon"
        vtsType="Close"
        *ngIf="inputValue"
        (click)="inputValue = null"
      ></i>
    </ng-template>
    <br />
    <br />
    <vts-input-group
      [vtsSuffix]="textAreaClearTpl"
      class="vts-input-affix-wrapper-textarea-with-clear-btn"
    >
      <textarea vts-input [(ngModel)]="textValue" placeholder="textarea with clear icon"></textarea>
    </vts-input-group>
    <ng-template #textAreaClearTpl>
      <i
        vts-icon
        class="vts-input-textarea-clear-icon"
        vtsType="Close"
        *ngIf="textValue"
        (click)="textValue = null"
      ></i>
    </ng-template>
  `
})
export class VtsDemoInputAllowClearComponent {
  inputValue: string | null = null;
  textValue: string | null = null;
}
