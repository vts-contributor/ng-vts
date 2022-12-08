/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { warn } from '@ui-vts/ng-vts/core/logger';
import {
  gridResponsiveMap,
  VtsBreakpointEnum,
  VtsBreakpointService
} from '@ui-vts/ng-vts/core/services';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';

import { merge, Subject } from 'rxjs';
import { auditTime, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { VtsDescriptionsItemComponent } from './descriptions-item.component';
import {
  VtsDescriptionsItemRenderProps,
  VtsDescriptionsLayout,
  VtsDescriptionsSize
} from './typings';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'descriptions';
const defaultColumnMap: { [key in VtsBreakpointEnum]: number } = {
  xl: 3,
  lg: 3,
  md: 3,
  sm: 2,
  xs: 1,
  xxs: 1,
  xxxs: 1
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-descriptions',
  exportAs: 'vtsDescriptions',
  preserveWhitespaces: false,
  template: `
    <div *ngIf="vtsTitle || vtsExtra" class="vts-descriptions-header">
      <div *ngIf="vtsTitle" class="vts-descriptions-title">
        <ng-container *vtsStringTemplateOutlet="vtsTitle">
          {{ vtsTitle }}
        </ng-container>
      </div>
      <div *ngIf="vtsExtra" class="vts-descriptions-extra">
        <ng-container *vtsStringTemplateOutlet="vtsExtra">
          {{ vtsExtra }}
        </ng-container>
      </div>
    </div>
    <div class="vts-descriptions-view">
      <table>
        <tbody>
          <ng-container *ngIf="vtsLayout === 'horizontal'">
            <tr class="vts-descriptions-row" *ngFor="let row of itemMatrix; let i = index">
              <ng-container *ngFor="let item of row; let isLast = last">
                <!-- Horizontal & NOT Bordered -->
                <ng-container *ngIf="!vtsBordered">
                  <td class="vts-descriptions-item" [colSpan]="item.span">
                    <div class="vts-descriptions-item-container">
                      <span
                        class="vts-descriptions-item-label"
                        [class.vts-descriptions-item-no-colon]="!vtsColon"
                      >
                        <ng-container *vtsStringTemplateOutlet="item.title">
                          {{ item.title }}
                        </ng-container>
                      </span>
                      <span class="vts-descriptions-item-content">
                        <ng-template [ngTemplateOutlet]="item.content"></ng-template>
                      </span>
                    </div>
                  </td>
                </ng-container>
                <!-- Horizontal & Bordered -->
                <ng-container *ngIf="vtsBordered">
                  <td class="vts-descriptions-item-label" *vtsStringTemplateOutlet="item.title">
                    <ng-container *vtsStringTemplateOutlet="item.title">
                      {{ item.title }}
                    </ng-container>
                  </td>
                  <td class="vts-descriptions-item-content" [colSpan]="item.span * 2 - 1">
                    <ng-template [ngTemplateOutlet]="item.content"></ng-template>
                  </td>
                </ng-container>
              </ng-container>
            </tr>
          </ng-container>

          <ng-container *ngIf="vtsLayout === 'vertical'">
            <!-- Vertical & NOT Bordered -->
            <ng-container *ngIf="!vtsBordered">
              <ng-container *ngFor="let row of itemMatrix; let i = index">
                <tr class="vts-descriptions-row">
                  <ng-container *ngFor="let item of row; let isLast = last">
                    <td class="vts-descriptions-item" [colSpan]="item.span">
                      <div class="vts-descriptions-item-container">
                        <span
                          class="vts-descriptions-item-label"
                          [class.vts-descriptions-item-no-colon]="!vtsColon"
                        >
                          <ng-container *vtsStringTemplateOutlet="item.title">
                            {{ item.title }}
                          </ng-container>
                        </span>
                      </div>
                    </td>
                  </ng-container>
                </tr>
                <tr class="vts-descriptions-row">
                  <ng-container *ngFor="let item of row; let isLast = last">
                    <td class="vts-descriptions-item" [colSpan]="item.span">
                      <div class="vts-descriptions-item-container">
                        <span class="vts-descriptions-item-content">
                          <ng-template [ngTemplateOutlet]="item.content"></ng-template>
                        </span>
                      </div>
                    </td>
                  </ng-container>
                </tr>
              </ng-container>
            </ng-container>
            <!-- Vertical & Bordered -->
            <ng-container *ngIf="vtsBordered">
              <ng-container *ngFor="let row of itemMatrix; let i = index">
                <tr class="vts-descriptions-row">
                  <ng-container *ngFor="let item of row; let isLast = last">
                    <td class="vts-descriptions-item-label" [colSpan]="item.span">
                      <ng-container *vtsStringTemplateOutlet="item.title">
                        {{ item.title }}
                      </ng-container>
                    </td>
                  </ng-container>
                </tr>
                <tr class="vts-descriptions-row">
                  <ng-container *ngFor="let item of row; let isLast = last">
                    <td class="vts-descriptions-item-content" [colSpan]="item.span">
                      <ng-template [ngTemplateOutlet]="item.content"></ng-template>
                    </td>
                  </ng-container>
                </tr>
              </ng-container>
            </ng-container>
          </ng-container>
        </tbody>
      </table>
    </div>
  `,
  host: {
    class: 'vts-descriptions',
    '[class.vts-descriptions-bordered]': 'vtsBordered',
    '[class.vts-descriptions-middle]': 'vtsSize === "middle"',
    '[class.vts-descriptions-small]': 'vtsSize === "small"',
    '[class.vts-descriptions-rtl]': 'dir === "rtl"'
  }
})
export class VtsDescriptionsComponent implements OnChanges, OnDestroy, AfterContentInit, OnInit {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;
  static ngAcceptInputType_vtsBordered: BooleanInput;
  static ngAcceptInputType_vtsColon: BooleanInput;

  @ContentChildren(VtsDescriptionsItemComponent)
  items!: QueryList<VtsDescriptionsItemComponent>;

  @Input() @InputBoolean() @WithConfig() vtsBordered: boolean = false;
  @Input() vtsLayout: VtsDescriptionsLayout = 'horizontal';
  @Input() @WithConfig() vtsColumn: number | { [key in VtsBreakpointEnum]: number } =
    defaultColumnMap;
  @Input() @WithConfig() vtsSize: VtsDescriptionsSize = 'default';
  @Input() vtsTitle: string | TemplateRef<void> = '';
  @Input() vtsExtra?: string | TemplateRef<void>;
  @Input() @WithConfig() @InputBoolean() vtsColon: boolean = true;

  itemMatrix: VtsDescriptionsItemRenderProps[][] = [];
  realColumn = 3;
  dir: Direction = 'ltr';

  private breakpoint: VtsBreakpointEnum = VtsBreakpointEnum.md;
  private destroy$ = new Subject<void>();

  constructor(
    public vtsConfigService: VtsConfigService,
    private cdr: ChangeDetectorRef,
    private breakpointService: VtsBreakpointService,
    @Optional() private directionality: Directionality
  ) {}
  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.vtsColumn) {
      this.prepareMatrix();
    }
  }

  ngAfterContentInit(): void {
    const contentChange$ = this.items.changes.pipe(startWith(this.items), takeUntil(this.destroy$));

    merge(
      contentChange$,
      contentChange$.pipe(
        switchMap(() => merge(...this.items.map(i => i.inputChange$)).pipe(auditTime(16)))
      ),
      this.breakpointService.subscribe(gridResponsiveMap).pipe(tap(bp => (this.breakpoint = bp)))
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.prepareMatrix();
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Prepare the render matrix according to description items' spans.
   */
  private prepareMatrix(): void {
    if (!this.items) {
      return;
    }

    let currentRow: VtsDescriptionsItemRenderProps[] = [];
    let width = 0;

    const column = (this.realColumn = this.getColumn());
    const items = this.items.toArray();
    const length = items.length;
    const matrix: VtsDescriptionsItemRenderProps[][] = [];
    const flushRow = () => {
      matrix.push(currentRow);
      currentRow = [];
      width = 0;
    };

    for (let i = 0; i < length; i++) {
      const item = items[i];
      const { vtsTitle: title, content, vtsSpan: span } = item;

      width += span;

      // If the last item make the row's length exceeds `vtsColumn`, the last
      // item should take all the space left. This logic is implemented in the template.
      // Warn user about that.
      if (width >= column) {
        if (width > column) {
          warn(`"vtsColumn" is ${column} but we have row length ${width}`);
        }
        currentRow.push({ title, content, span: column - (width - span) });
        flushRow();
      } else if (i === length - 1) {
        currentRow.push({ title, content, span: column - (width - span) });
        flushRow();
      } else {
        currentRow.push({ title, content, span });
      }
    }

    this.itemMatrix = matrix;
  }

  private getColumn(): number {
    if (typeof this.vtsColumn !== 'number') {
      return this.vtsColumn[this.breakpoint];
    }

    return this.vtsColumn;
  }
}
