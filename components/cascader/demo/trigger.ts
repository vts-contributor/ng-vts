import { Component } from '@angular/core';
import { VtsCascaderOption } from '@ui-vts/ng-vts/cascader';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
            isLeaf: true
          }
        ]
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
        isLeaf: true
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            isLeaf: true
          }
        ]
      }
    ]
  }
];

@Component({
  selector: 'vts-demo-cascader-trigger',
  template: `
    {{ text }}
    <vts-cascader
      [vtsShowInput]="false"
      [vtsOptions]="vtsOptions"
      [(ngModel)]="values"
      (ngModelChange)="onChanges($event)"
      (vtsSelectionChange)="onSelectionChange($event)"
    >
      <a href="javascript: void(0)">Change city</a>
    </vts-cascader>
  `
})
export class VtsDemoCascaderTriggerComponent {
  vtsOptions: VtsCascaderOption[] = options;
  values: string[] | null = null;
  text = 'Unselect';

  onChanges(values: string[]): void {
    console.log(values, this.values);
  }

  onSelectionChange(selectedOptions: VtsCascaderOption[]): void {
    this.text = selectedOptions.map(o => o.label).join(', ');
  }
}
