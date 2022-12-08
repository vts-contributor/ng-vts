import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-list-basic',
  template: `
    <div style="margin-bottom: 8px;">
      <button vts-button (click)="change()">Switch Data</button>
    </div>
    <vts-list vtsItemLayout="horizontal" [vtsLoading]="loading">
      <vts-list-item *ngFor="let item of data">
        <vts-list-item-meta
          vtsAvatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          vtsDescription="Ant Design, a design language for background applications, is refined by Ant UED Team"
        >
          <vts-list-item-meta-title>
            <a href="https://ng.ant.design">{{ item.title }}</a>
          </vts-list-item-meta-title>
        </vts-list-item-meta>
      </vts-list-item>
      <vts-list-empty *ngIf="data.length === 0"></vts-list-empty>
    </vts-list>
  `
})
export class VtsDemoListBasicComponent {
  loading = false;
  data = [
    {
      title: 'Ant Design Title 1'
    },
    {
      title: 'Ant Design Title 2'
    },
    {
      title: 'Ant Design Title 3'
    },
    {
      title: 'Ant Design Title 4'
    }
  ];

  change(): void {
    this.loading = true;
    if (this.data.length > 0) {
      setTimeout(() => {
        this.data = [];
        this.loading = false;
      }, 1000);
    } else {
      setTimeout(() => {
        this.data = [
          {
            title: 'Ant Design Title 1'
          },
          {
            title: 'Ant Design Title 2'
          },
          {
            title: 'Ant Design Title 3'
          },
          {
            title: 'Ant Design Title 4'
          }
        ];
        this.loading = false;
      }, 1000);
    }
  }
}
