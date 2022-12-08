import { Component } from '@angular/core';
import { formatDistance } from 'date-fns';

@Component({
  selector: 'vts-demo-comment-basic',
  template: `
    <vts-comment vtsAuthor="Han Solo" [vtsDatetime]="time">
      <vts-avatar
        vts-comment-avatar
        vtsIcon="user"
        vtsSrc="//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      ></vts-avatar>
      <vts-comment-content>
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully
          and efficiently.
        </p>
      </vts-comment-content>
      <vts-comment-action>
        <i vts-tooltip vtsTitle="Like" vts-icon vtsType="like" (click)="like()"></i>
        <span class="count like">{{ likes }}</span>
      </vts-comment-action>
      <vts-comment-action>
        <i vts-tooltip vtsTitle="Dislike" vts-icon vtsType="dislike" (click)="dislike()"></i>
        <span class="count dislike">{{ dislikes }}</span>
      </vts-comment-action>
      <vts-comment-action>Reply to</vts-comment-action>
    </vts-comment>
  `,
  styles: [
    `
      .count {
        padding-left: 8px;
        cursor: auto;
      }
      .vts-comment-rtl .count {
        padding-right: 8px;
        padding-left: 0;
      }
    `
  ]
})
export class VtsDemoCommentBasicComponent {
  likes = 0;
  dislikes = 0;
  time = formatDistance(new Date(), new Date());

  like(): void {
    this.likes = 1;
    this.dislikes = 0;
  }

  dislike(): void {
    this.likes = 0;
    this.dislikes = 1;
  }
}
