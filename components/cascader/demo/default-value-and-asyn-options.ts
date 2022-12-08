import { Component, OnInit } from '@angular/core';
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
  selector: 'vts-demo-cascader-default-value-and-asyn-options',
  template: `
    <vts-cascader
      [(ngModel)]="values"
      [vtsOptions]="vtsOptions"
      (ngModelChange)="onChanges($event)"
    ></vts-cascader>
  `
})
export class VtsDemoCascaderDefaultValueAndAsynOptionsComponent implements OnInit {
  vtsOptions: VtsCascaderOption[] | null = null;
  values: string[] = ['zhejiang', 'hangzhou', 'xihu'];

  onChanges(values: string[]): void {
    console.log(values, this.values);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.vtsOptions = options;
    }, 500);
  }
}
