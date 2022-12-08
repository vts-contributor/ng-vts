import { Component } from '@angular/core';
import { VtsCascaderOption } from '@ui-vts/ng-vts/cascader';

const provinces = [
  {
    value: 'zhejiang',
    label: 'Zhejiang'
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu'
  }
];

const cities: {
  [key: string]: Array<{ value: string; label: string; isLeaf?: boolean }>;
} = {
  zhejiang: [
    {
      value: 'hangzhou',
      label: 'Hangzhou'
    },
    {
      value: 'ningbo',
      label: 'Ningbo',
      isLeaf: true
    }
  ],
  jiangsu: [
    {
      value: 'nanjing',
      label: 'Nanjing'
    }
  ]
};

const scenicspots: {
  [key: string]: Array<{ value: string; label: string; isLeaf?: boolean }>;
} = {
  hangzhou: [
    {
      value: 'xihu',
      label: 'West Lake',
      isLeaf: true
    }
  ],
  nanjing: [
    {
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
      isLeaf: true
    }
  ]
};

@Component({
  selector: 'vts-demo-cascader-default-value-and-lazyload',
  template: `
    <vts-cascader
      [(ngModel)]="values"
      [vtsLoadData]="loadData"
      (ngModelChange)="onChanges($event)"
    ></vts-cascader>
  `
})
export class VtsDemoCascaderDefaultValueAndLazyloadComponent {
  values: string[] = ['zhejiang', 'hangzhou', 'xihu'];

  onChanges(values: string[]): void {
    console.log(values, this.values);
  }

  /** load data async execute by `vtsLoadData` method */
  loadData(node: VtsCascaderOption, index: number): PromiseLike<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (index < 0) {
          // if index less than 0 it is root node
          node.children = provinces;
        } else if (index === 0) {
          node.children = cities[node.value];
        } else {
          node.children = scenicspots[node.value];
        }
        resolve();
      }, 1000);
    });
  }
}
