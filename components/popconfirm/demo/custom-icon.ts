import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-popconfirm-custom-icon',
  template: `
    <a vts-popconfirm vtsPopconfirmTitle="Are you sure?" [vtsIcon]="iconTpl">Delete</a>
    <ng-template #iconTpl>
      <i vts-icon vtsType="question-circle-o" style="color: red;"></i>
    </ng-template>
  `
})
export class VtsDemoPopconfirmCustomIconComponent {}
