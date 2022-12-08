import { Component } from '@angular/core';
import { addDays, formatDistance } from 'date-fns';

@Component({
  selector: 'vts-demo-comment-list',
  template: `
    <vts-list [vtsDataSource]="data" [vtsRenderItem]="item" [vtsItemLayout]="'horizontal'">
      <ng-template #item let-item>
        <vts-comment [vtsAuthor]="item.author" [vtsDatetime]="item.datetime">
          <vts-avatar vts-comment-avatar vtsIcon="user" [vtsSrc]="item.avatar"></vts-avatar>
          <vts-comment-content>
            <p>{{ item.content }}</p>
          </vts-comment-content>
          <vts-comment-action>Reply to</vts-comment-action>
        </vts-comment>
      </ng-template>
    </vts-list>
  `
})
export class VtsDemoCommentListComponent {
  data = [
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: formatDistance(new Date(), addDays(new Date(), 1))
    },
    {
      author: 'Han Solo',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      datetime: formatDistance(new Date(), addDays(new Date(), 2))
    }
  ];
}
