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
  selector: 'vts-demo-cascader-modal',
  template: `
    <vts-modal
      [(vtsVisible)]="isVisible"
      vtsTitle="Please select"
      (vtsOnCancel)="handleCancel($event)"
      (vtsOnOk)="handleOk($event)"
    >
      <vts-cascader
        [vtsOptions]="vtsOptions"
        [(ngModel)]="values"
        (ngModelChange)="onChanges($event)"
      ></vts-cascader>
    </vts-modal>

    <button vts-button (click)="open()">Open Dialog</button>
  `
})
export class VtsDemoCascaderModalComponent {
  vtsOptions: VtsCascaderOption[] = options;
  values: string[] | null = null;
  isVisible = false;

  onChanges(values: string[]): void {
    console.log(values, this.values);
  }

  open(): void {
    this.isVisible = true;
  }

  handleOk($event: MouseEvent): void {
    console.log('Button ok clicked!', this.values, $event);
    this.isVisible = false;
  }

  handleCancel($event: MouseEvent): void {
    console.log('Button cancel clicked!', $event);
    this.isVisible = false;
  }
}
