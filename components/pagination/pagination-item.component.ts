/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { VtsPaginationI18nInterface } from '@ui-vts/ng-vts/i18n';
import { PaginationItemRenderContext, PaginationItemType } from './pagination.types';

@Component({
  selector: 'li[vts-pagination-item]',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #renderItemTemplate let-type let-page="page">
      <ng-container [ngSwitch]="type">
        <a *ngSwitchCase="'page'">{{ page }}</a>
        <button [disabled]="disabled" class="vts-pagination-item-link" *ngSwitchCase="'begin'">
          <ng-container [ngSwitch]="direction">
            <i *ngSwitchCase="'rtl'" vts-icon vtsType="DoubleArrowLeft:radix"></i>
            <i *ngSwitchDefault vts-icon vtsType="DoubleArrowLeft:radix"></i>
          </ng-container>
        </button>
        <button [disabled]="disabled" class="vts-pagination-item-link" *ngSwitchCase="'prev'">
          <ng-container [ngSwitch]="direction">
            <i *ngSwitchCase="'rtl'" vts-icon vtsType="ChevronLeft:radix"></i>
            <i *ngSwitchDefault vts-icon vtsType="ChevronLeft:radix"></i>
          </ng-container>
        </button>
        <button [disabled]="disabled" class="vts-pagination-item-link" *ngSwitchCase="'next'">
          <ng-container [ngSwitch]="direction">
            <i *ngSwitchCase="'rtl'" vts-icon vtsType="ChevronRight:radix"></i>
            <i *ngSwitchDefault vts-icon vtsType="ChevronRight:radix"></i>
          </ng-container>
        </button>
        <button [disabled]="disabled" class="vts-pagination-item-link" *ngSwitchCase="'last'">
          <ng-container [ngSwitch]="direction">
            <i *ngSwitchCase="'rtl'" vts-icon vtsType="DoubleArrowRight:radix"></i>
            <i *ngSwitchDefault vts-icon vtsType="DoubleArrowRight:radix"></i>
          </ng-container>
        </button>
        <ng-container *ngSwitchDefault>
          <a class="vts-pagination-item-link" [ngSwitch]="type">
            <div class="vts-pagination-item-container" *ngSwitchDefault>
              <ng-container [ngSwitch]="type">
                <ng-container *ngSwitchCase="'prev_5'" [ngSwitch]="direction">
                  <i
                    *ngSwitchCase="'rtl'"
                    vts-icon
                    vtsType="DoubleArrowRight:radix"
                    class="vts-pagination-item-link-icon"
                  ></i>
                  <i
                    *ngSwitchDefault
                    vts-icon
                    vtsType="DoubleArrowLeft:radix"
                    class="vts-pagination-item-link-icon"
                  ></i>
                </ng-container>
                <ng-container *ngSwitchCase="'next_5'" [ngSwitch]="direction">
                  <i
                    *ngSwitchCase="'rtl'"
                    vts-icon
                    vtsType="DoubleArrowLeft:radix"
                    class="vts-pagination-item-link-icon"
                  ></i>
                  <i
                    *ngSwitchDefault
                    vts-icon
                    vtsType="DoubleArrowRight:radix"
                    class="vts-pagination-item-link-icon"
                  ></i>
                </ng-container>
              </ng-container>
              <span class="vts-pagination-item-ellipsis">...</span>
            </div>
          </a>
        </ng-container>
      </ng-container>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="itemRender || renderItemTemplate"
      [ngTemplateOutletContext]="{
        $implicit: type,
        page: index
      }"
    ></ng-template>
  `,
  host: {
    '[class.vts-pagination-prev]': `type === 'prev'`,
    '[class.vts-pagination-next]': `type === 'next'`,
    '[class.vts-pagination-begin]': `type === 'begin'`,
    '[class.vts-pagination-last]': `type === 'last'`,
    '[class.vts-pagination-item]': `type === 'page'`,
    '[class.vts-pagination-jump-prev]': `type === 'prev_5'`,
    '[class.vts-pagination-jump-prev-custom-icon]': `type === 'prev_5'`,
    '[class.vts-pagination-jump-next]': `type === 'next_5'`,
    '[class.vts-pagination-jump-next-custom-icon]': `type === 'next_5'`,
    '[class.vts-pagination-disabled]': 'disabled',
    '[class.vts-pagination-item-active]': 'active',
    '[attr.title]': 'title',
    '(click)': 'clickItem()'
  }
})
export class VtsPaginationItemComponent implements OnChanges {
  static ngAcceptInputType_type: PaginationItemType | string | null | undefined;
  static ngAcceptInputType_index: number | null | undefined;

  @Input() active = false;
  @Input() locale!: VtsPaginationI18nInterface;
  @Input() index: number | null = null;
  @Input() disabled = false;
  @Input() direction = 'ltr';
  @Input() type: PaginationItemType | string | null = null;
  @Input() itemRender: TemplateRef<PaginationItemRenderContext> | null = null;
  @Output() readonly diffIndex = new EventEmitter<number>();
  @Output() readonly gotoIndex = new EventEmitter<number>();
  title: string | null = null;
  clickItem(): void {
    if (!this.disabled) {
      if (this.type === 'page' || this.type === 'begin' || this.type === 'last') {
        this.gotoIndex.emit(this.index!);
      } else {
        this.diffIndex.emit(
          (
            {
              next: 1,
              prev: -1,
              prev_5: -5,
              next_5: 5
            } as VtsSafeAny
          )[this.type!]
        );
      }
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    const { locale, index, type } = changes;
    if (locale || index || type) {
      this.title = (
        {
          page: `${this.index}`,
          next: this.locale?.next_page,
          prev: this.locale?.prev_page,
          prev_5: this.locale?.prev_5,
          next_5: this.locale?.next_5,
          begin: this.locale?.begin,
          last: this.locale?.last
        } as VtsSafeAny
      )[this.type!];
    }
  }
}
