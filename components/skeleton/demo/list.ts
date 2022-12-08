import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-skeleton-list',
  template: `
    <vts-switch [(ngModel)]="loading"></vts-switch>
    <vts-list [vtsDataSource]="listData" [vtsRenderItem]="item" [vtsItemLayout]="'vertical'">
      <ng-template #item let-item>
        <vts-list-item
          [vtsContent]="loading ? ' ' : item.content"
          [vtsActions]="loading ? [] : [starAction, likeAction, msgAction]"
          [vtsExtra]="loading ? null : extra"
        >
          <vts-skeleton [vtsLoading]="loading" [vtsActive]="true" [vtsAvatar]="true">
            <ng-template #starAction>
              <i vts-icon vtsType="star-o" style="margin-right: 8px;"></i>
              156
            </ng-template>
            <ng-template #likeAction>
              <i vts-icon vtsType="like-o" style="margin-right: 8px;"></i>
              156
            </ng-template>
            <ng-template #msgAction>
              <i vts-icon vtsType="message" style="margin-right: 8px;"></i>
              2
            </ng-template>
            <vts-list-item-meta
              [vtsAvatar]="item.avatar"
              [vtsTitle]="vtsTitle"
              [vtsDescription]="item.description"
            >
              <ng-template #vtsTitle>
                <a href="{{ item.href }}">{{ item.title }}</a>
              </ng-template>
            </vts-list-item-meta>
            <ng-template #extra>
              <img
                width="272"
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            </ng-template>
          </vts-skeleton>
        </vts-list-item>
      </ng-template>
    </vts-list>
  `
})
export class VtsDemoSkeletonListComponent {
  loading = true;
  listData = new Array(3).fill({}).map((_i, index) => {
    return {
      href: 'http://ng.ant.design',
      title: `ant design part ${index}`,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources ' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
    };
  });
}
