// tslint:disable:no-any
import { Component } from '@angular/core';

const options = [
  {
    label: 'Ant Design',
    value: 'antd',
    children: [
      {
        label: 'ng-vts',
        value: 'ng-vts',
        isLeaf: true
      }
    ]
  },
  {
    label: 'Angular',
    value: 'angular',
    children: [
      {
        label: 'CDK',
        value: 'cdk',
        isLeaf: true
      }
    ]
  }
];

@Component({
  selector: 'vts-demo-cascader-custom-template',
  template: `
    <vts-cascader
      [vtsOptionRender]="renderTpl"
      [vtsOptions]="vtsOptions"
      [(ngModel)]="values"
      (ngModelChange)="onChanges($event)"
    ></vts-cascader>
    <ng-template #renderTpl let-option let-index="index">
      {{ index + 1 }}. {{ option.label }}
    </ng-template>
  `
})
export class VtsDemoCascaderCustomTemplateComponent {
  vtsOptions = options;
  values: any[] | null = null;

  onChanges(values: any): void {
    console.log(values, this.values);
  }
}
