// tslint:disable:no-any
import { Component, OnInit } from '@angular/core';

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

const otherOptions = [
  {
    value: 'fujian',
    label: 'Fujian',
    children: [
      {
        value: 'xiamen',
        label: 'Xiamen',
        children: [
          {
            value: 'Kulangsu',
            label: 'Kulangsu',
            isLeaf: true
          }
        ]
      }
    ]
  },
  {
    value: 'guangxi',
    label: 'Guangxi',
    children: [
      {
        value: 'guilin',
        label: 'Guilin',
        children: [
          {
            value: 'Lijiang',
            label: 'Li Jiang River',
            isLeaf: true
          }
        ]
      }
    ]
  }
];

@Component({
  selector: 'vts-demo-cascader-basic',
  template: `
    <vts-cascader
      [vtsOptions]="vtsOptions"
      [(ngModel)]="values"
      (ngModelChange)="onChanges($event)"
    ></vts-cascader>
    &nbsp;
    <a href="javascript:;" (click)="changeVtsOptions()" class="change-options">Change Options</a>
  `,
  styles: [
    `
      .change-options {
        display: inline-block;
        font-size: 12px;
        margin-top: 8px;
      }
    `
  ]
})
export class VtsDemoCascaderBasicComponent implements OnInit {
  vtsOptions: any[] | null = null;
  values: any[] | null = null;

  ngOnInit(): void {
    setTimeout(() => {
      this.vtsOptions = options;
    }, 100);
  }

  changeVtsOptions(): void {
    if (this.vtsOptions === options) {
      this.vtsOptions = otherOptions;
    } else {
      this.vtsOptions = options;
    }
  }

  onChanges(values: any): void {
    console.log(values, this.values);
  }
}
