import { Component } from '@angular/core';
import { formatDistance } from 'date-fns';

@Component({
  selector: 'vts-demo-comment-editor',
  template: `
    <vts-list
      *ngIf="data.length"
      [vtsDataSource]="data"
      [vtsRenderItem]="item"
      [vtsItemLayout]="'horizontal'"
    >
      <ng-template #item let-item>
        <vts-comment [vtsAuthor]="item.author" [vtsDatetime]="item.displayTime">
          <vts-avatar vts-comment-avatar vtsIcon="user" [vtsSrc]="item.avatar"></vts-avatar>
          <vts-comment-content>
            <p>{{ item.content }}</p>
          </vts-comment-content>
        </vts-comment>
      </ng-template>
    </vts-list>
    <vts-comment>
      <vts-avatar vts-comment-avatar vtsIcon="user" [vtsSrc]="user.avatar"></vts-avatar>
      <vts-comment-content>
        <vts-form-item>
          <textarea [(ngModel)]="inputValue" vts-input rows="4"></textarea>
        </vts-form-item>
        <vts-form-item>
          <button
            vts-button
            vtsType="primary"
            [vtsLoading]="submitting"
            [disabled]="!inputValue"
            (click)="handleSubmit()"
          >
            Add Comment
          </button>
        </vts-form-item>
      </vts-comment-content>
    </vts-comment>
  `
})
export class VtsDemoCommentEditorComponent {
  // tslint:disable-next-line:no-any
  data: any[] = [];
  submitting = false;
  user = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };
  inputValue = '';

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.data = [
        ...this.data,
        {
          ...this.user,
          content,
          datetime: new Date(),
          displayTime: formatDistance(new Date(), new Date())
        }
      ].map(e => {
        return {
          ...e,
          displayTime: formatDistance(new Date(), e.datetime)
        };
      });
    }, 800);
  }
}
