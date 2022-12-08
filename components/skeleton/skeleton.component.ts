/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { toCssPixel } from '@ui-vts/ng-vts/core/util';
import {
  VtsSkeletonAvatar,
  VtsSkeletonAvatarShape,
  VtsSkeletonAvatarSize,
  VtsSkeletonParagraph,
  VtsSkeletonTitle
} from './skeleton.type';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-skeleton',
  exportAs: 'vtsSkeleton',
  host: {
    '[class.vts-skeleton-with-avatar]': '!!vtsAvatar',
    '[class.vts-skeleton-active]': 'vtsActive',
    '[class.vts-skeleton-round]': '!!vtsRound'
  },
  template: `
    <ng-container *ngIf="vtsLoading">
      <div class="vts-skeleton-header" *ngIf="!!vtsAvatar">
        <vts-skeleton-element
          vtsType="avatar"
          [vtsSize]="avatar.size || 'default'"
          [vtsShape]="avatar.shape || 'circle'"
        ></vts-skeleton-element>
      </div>
      <div class="vts-skeleton-content">
        <h3
          *ngIf="!!vtsTitle"
          class="vts-skeleton-title"
          [style.width]="toCSSUnit(title.width)"
        ></h3>
        <ul *ngIf="!!vtsParagraph" class="vts-skeleton-paragraph">
          <li
            *ngFor="let row of rowsList; let i = index"
            [style.width]="toCSSUnit(widthList[i])"
          ></li>
        </ul>
      </div>
    </ng-container>
    <ng-container *ngIf="!vtsLoading">
      <ng-content></ng-content>
    </ng-container>
  `
})
export class VtsSkeletonComponent implements OnInit, OnChanges {
  @Input() vtsActive = false;
  @Input() vtsLoading = true;
  @Input() vtsRound = false;
  @Input() vtsTitle: VtsSkeletonTitle | boolean = true;
  @Input() vtsAvatar: VtsSkeletonAvatar | boolean = false;
  @Input() vtsParagraph: VtsSkeletonParagraph | boolean = true;

  title!: VtsSkeletonTitle;
  avatar!: VtsSkeletonAvatar;
  paragraph!: VtsSkeletonParagraph;
  rowsList: number[] = [];
  widthList: Array<number | string> = [];

  constructor(private cdr: ChangeDetectorRef, renderer: Renderer2, elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, 'vts-skeleton');
  }

  toCSSUnit(value: number | string = ''): string {
    return toCssPixel(value);
  }

  private getTitleProps(): VtsSkeletonTitle {
    const hasAvatar: boolean = !!this.vtsAvatar;
    const hasParagraph: boolean = !!this.vtsParagraph;
    let width = '';
    if (!hasAvatar && hasParagraph) {
      width = '38%';
    } else if (hasAvatar && hasParagraph) {
      width = '50%';
    }
    return { width, ...this.getProps(this.vtsTitle) };
  }

  private getAvatarProps(): VtsSkeletonAvatar {
    const shape: VtsSkeletonAvatarShape =
      !!this.vtsTitle && !this.vtsParagraph ? 'square' : 'circle';
    const size: VtsSkeletonAvatarSize = 'large';
    return { shape, size, ...this.getProps(this.vtsAvatar) };
  }

  private getParagraphProps(): VtsSkeletonParagraph {
    const hasAvatar: boolean = !!this.vtsAvatar;
    const hasTitle: boolean = !!this.vtsTitle;
    const basicProps: VtsSkeletonParagraph = {};
    // Width
    if (!hasAvatar || !hasTitle) {
      basicProps.width = '61%';
    }
    // Rows
    if (!hasAvatar && hasTitle) {
      basicProps.rows = 3;
    } else {
      basicProps.rows = 2;
    }
    return { ...basicProps, ...this.getProps(this.vtsParagraph) };
  }

  private getProps<T>(prop: T | boolean | undefined): T | {} {
    return prop && typeof prop === 'object' ? prop : {};
  }

  private getWidthList(): Array<number | string> {
    const { width, rows } = this.paragraph;
    let widthList: Array<string | number> = [];
    if (width && Array.isArray(width)) {
      widthList = width;
    } else if (width && !Array.isArray(width)) {
      widthList = [];
      widthList[rows! - 1] = width;
    }
    return widthList;
  }

  private updateProps(): void {
    this.title = this.getTitleProps();
    this.avatar = this.getAvatarProps();
    this.paragraph = this.getParagraphProps();
    this.rowsList = [...Array(this.paragraph.rows)];
    this.widthList = this.getWidthList();
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.updateProps();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.vtsTitle || changes.vtsAvatar || changes.vtsParagraph) {
      this.updateProps();
    }
  }
}
