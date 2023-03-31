/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { toNumber } from '@ui-vts/ng-vts/core/util';
import { VtsPaginationI18nInterface } from '@ui-vts/ng-vts/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PaginationItemRenderContext } from './pagination.types';

@Component({
  selector: 'vts-pagination-simple',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #containerTemplate>
      <li
        vts-pagination-item
        [attr.title]="locale.begin"
        [disabled]="isFirstIndex"
        [direction]="dir"
        (click)="begin()"
        type="begin"
        [itemRender]="itemRender"
      ></li>
      <li
        vts-pagination-item
        [attr.title]="locale.prev_page"
        [disabled]="isFirstIndex"
        [direction]="dir"
        (click)="prePage()"
        type="prev"
        [itemRender]="itemRender"
      ></li>
      <li [attr.title]="pageIndex + '/' + lastIndex" class="vts-pagination-simple-pager">
        <input
          [disabled]="disabled"
          [value]="pageIndex"
          (keydown.enter)="jumpToPageViaInput($event)"
          size="3"
        />
        <span class="vts-pagination-slash">/</span>
        {{ lastIndex }}
      </li>
      <li
        vts-pagination-item
        [attr.title]="locale?.next_page"
        [disabled]="isLastIndex"
        [direction]="dir"
        (click)="nextPage()"
        type="next"
        [itemRender]="itemRender"
      ></li>
      <li
        vts-pagination-item
        [attr.title]="locale?.last"
        [disabled]="isLastIndex"
        [direction]="dir"
        (click)="last()"
        type="last"
        [itemRender]="itemRender"
      ></li>
    </ng-template>
  `
})
export class VtsPaginationSimpleComponent implements OnChanges, OnDestroy, OnInit {
  @ViewChild('containerTemplate', { static: true })
  template!: TemplateRef<VtsSafeAny>;
  @Input() itemRender: TemplateRef<PaginationItemRenderContext> | null = null;
  @Input() disabled = false;
  @Input() locale!: VtsPaginationI18nInterface;
  @Input() total = 0;
  @Input() pageIndex = 1;
  @Input() pageSize = 10;
  @Output() readonly pageIndexChange = new EventEmitter<number>();
  lastIndex = 0;
  isFirstIndex = false;
  isLastIndex = false;

  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality
  ) {
    renderer.removeChild(renderer.parentNode(elementRef.nativeElement), elementRef.nativeElement);
  }
  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.updateRtlStyle();
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
    this.updateRtlStyle();
  }

  private updateRtlStyle(): void {
    if (this.dir === 'rtl') {
      this.renderer.addClass(this.elementRef.nativeElement, 'vts-pagination-rtl');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'vts-pagination-rtl');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  jumpToPageViaInput($event: Event): void {
    const target = $event.target as HTMLInputElement;
    const index = toNumber(target.value, this.pageIndex);
    this.onPageIndexChange(index);
    target.value = `${this.pageIndex}`;
  }

  prePage(): void {
    this.onPageIndexChange(this.pageIndex - 1);
  }
  nextPage(): void {
    this.onPageIndexChange(this.pageIndex + 1);
  }
  begin(): void {
    this.onPageIndexChange(1);
  }
  last(): void {
    this.onPageIndexChange(this.lastIndex);
  }

  onPageIndexChange(index: number): void {
    this.pageIndexChange.next(index);
  }

  updateBindingValue(): void {
    this.lastIndex = Math.ceil(this.total / this.pageSize);
    this.isFirstIndex = this.pageIndex === 1;
    this.isLastIndex = this.pageIndex === this.lastIndex;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { pageIndex, total, pageSize } = changes;
    if (pageIndex || total || pageSize) {
      this.updateBindingValue();
    }
  }
}
