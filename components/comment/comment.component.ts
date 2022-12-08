/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { Direction, Directionality } from '@angular/cdk/bidi';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsCommentActionComponent as CommentAction } from './comment-cells';

@Component({
  selector: 'vts-comment',
  exportAs: 'vtsComment',
  template: `
    <div class="vts-comment-inner">
      <div class="vts-comment-avatar">
        <ng-content select="vts-avatar[vts-comment-avatar]"></ng-content>
      </div>
      <div class="vts-comment-content">
        <div class="vts-comment-content-author">
          <span *ngIf="vtsAuthor" class="vts-comment-content-author-name">
            <ng-container *vtsStringTemplateOutlet="vtsAuthor">
              {{ vtsAuthor }}
            </ng-container>
          </span>
          <span *ngIf="vtsDatetime" class="vts-comment-content-author-time">
            <ng-container *vtsStringTemplateOutlet="vtsDatetime">
              {{ vtsDatetime }}
            </ng-container>
          </span>
        </div>
        <ng-content select="vts-comment-content"></ng-content>
        <ul class="vts-comment-actions" *ngIf="actions?.length">
          <li *ngFor="let action of actions">
            <span>
              <ng-template [vtsCommentActionHost]="action.content"></ng-template>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="vts-comment-nested">
      <ng-content></ng-content>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.vts-comment]': `true`,
    '[class.vts-comment-rtl]': `dir === "rtl"`
  }
})
export class VtsCommentComponent implements OnDestroy, OnInit {
  @Input() vtsAuthor?: string | TemplateRef<void>;
  @Input() vtsDatetime?: string | TemplateRef<void>;
  dir: Direction = 'ltr';

  private destroy$ = new Subject<void>();

  @ContentChildren(CommentAction) actions!: QueryList<CommentAction>;
  constructor(private cdr: ChangeDetectorRef, @Optional() private directionality: Directionality) {}

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
