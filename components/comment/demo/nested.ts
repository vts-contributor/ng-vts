import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-comment-nested',
  template: `
    <ng-template #commentTemplateRef let-comment="comment">
      <vts-comment [vtsAuthor]="comment.author">
        <vts-avatar vts-comment-avatar vtsIcon="user" [vtsSrc]="comment.avatar"></vts-avatar>
        <vts-comment-content>
          <p>{{ comment.content }}</p>
        </vts-comment-content>
        <vts-comment-action>Reply to</vts-comment-action>
        <ng-container *ngIf="comment.children && comment.children.length">
          <ng-template ngFor let-child [ngForOf]="comment.children">
            <ng-template
              [ngTemplateOutlet]="commentTemplateRef"
              [ngTemplateOutletContext]="{ comment: child }"
            ></ng-template>
          </ng-template>
        </ng-container>
      </vts-comment>
    </ng-template>

    <ng-template
      [ngTemplateOutlet]="commentTemplateRef"
      [ngTemplateOutletContext]="{ comment: data }"
    ></ng-template>
  `
})
export class VtsDemoCommentNestedComponent {
  data = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources' +
      '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    children: [
      {
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources' +
          '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        children: [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content:
              'We supply a series of design principles, practical patterns and high quality design resources' +
              '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
          },
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content:
              'We supply a series of design principles, practical patterns and high quality design resources' +
              '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
          }
        ]
      }
    ]
  };
}
