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
  selector: 'vts-demo-cascader-hover',
  template: `
    <vts-cascader
      [vtsExpandTrigger]="'hover'"
      [vtsOptions]="vtsOptions"
      [(ngModel)]="values"
      (ngModelChange)="onChanges($event)"
    ></vts-cascader>
  `
})
export class VtsDemoCascaderHoverComponent {
  vtsOptions: VtsCascaderOption[] = options;
  values: string[] | null = null;

  onChanges(values: string[]): void {
    console.log(values, this.values);
  }
}
