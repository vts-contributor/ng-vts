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
  selector: 'vts-demo-cascader-size',
  template: `
    <vts-cascader
      [vtsSize]="'lg'"
      [vtsOptions]="vtsOptions"
      [(ngModel)]="value1"
      (ngModelChange)="onChanges($event)"
    ></vts-cascader>
    <vts-cascader
      [vtsOptions]="vtsOptions"
      [(ngModel)]="value2"
      (ngModelChange)="onChanges($event)"
    ></vts-cascader>
    <vts-cascader
      [vtsSize]="'sm'"
      [vtsOptions]="vtsOptions"
      [(ngModel)]="value3"
      (ngModelChange)="onChanges($event)"
    ></vts-cascader>
  `,
  styles: [
    `
      .vts-cascader-picker {
        width: 300px;
        margin-bottom: 8px;
      }
    `
  ]
})
export class VtsDemoCascaderSizeComponent {
  vtsOptions: VtsCascaderOption[] = options;
  value1: string[] | null = null;
  value2: string[] | null = null;
  value3: string[] | null = null;

  onChanges(values: string[]): void {
    console.log(values);
  }
}
