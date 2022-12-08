// tslint:disable:no-any
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { VtsMessageService } from '@ui-vts/ng-vts/message';

const count = 5;
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

@Component({
  selector: 'vts-demo-list-loadmore',
  template: `
    <vts-list class="demo-loadmore-list" [vtsLoading]="initLoading">
      <vts-list-item *ngFor="let item of list">
        <ng-container *ngIf="!item.loading">
          <vts-list-item-meta
            vtsAvatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            vtsDescription="Ant Design, a design language for background applications, is refined by Ant UED Team"
          >
            <vts-list-item-meta-title>
              <a href="https://ng.ant.design">{{ item.name.last }}</a>
            </vts-list-item-meta-title>
          </vts-list-item-meta>
          content
          <ul vts-list-item-actions>
            <vts-list-item-action>
              <a (click)="edit(item)">edit</a>
            </vts-list-item-action>
            <vts-list-item-action>
              <a (click)="edit(item)">more</a>
            </vts-list-item-action>
          </ul>
        </ng-container>
        <vts-skeleton
          *ngIf="item.loading"
          [vtsAvatar]="true"
          [vtsActive]="true"
          [vtsTitle]="false"
          [vtsLoading]="true"
        ></vts-skeleton>
      </vts-list-item>
      <div class="loadmore" vts-list-load-more>
        <button vts-button *ngIf="!loadingMore" (click)="onLoadMore()">loading more</button>
      </div>
    </vts-list>
  `,
  styles: [
    `
      .demo-loadmore-list {
        min-height: 350px;
      }
      .loadmore {
        text-align: center;
        margin-top: 12px;
        height: 32px;
        line-height: 32px;
      }
    `
  ]
})
export class VtsDemoListLoadmoreComponent implements OnInit {
  initLoading = true; // bug
  loadingMore = false;
  data: any[] = [];
  list: Array<{ loading: boolean; name: any }> = [];

  constructor(private http: HttpClient, private msg: VtsMessageService) {}

  ngOnInit(): void {
    this.getData((res: any) => {
      this.data = res.results;
      this.list = res.results;
      this.initLoading = false;
    });
  }

  getData(callback: (res: any) => void): void {
    this.http.get(fakeDataUrl).subscribe((res: any) => callback(res));
  }

  onLoadMore(): void {
    this.loadingMore = true;
    this.list = this.data.concat(
      [...Array(count)].fill({}).map(() => ({ loading: true, name: {} }))
    );
    this.http.get(fakeDataUrl).subscribe((res: any) => {
      this.data = this.data.concat(res.results);
      this.list = [...this.data];
      this.loadingMore = false;
    });
  }

  edit(item: any): void {
    this.msg.success(item.email);
  }
}
