/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
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
import { BooleanInput, VtsSizeXLMSType } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { merge, Subject } from 'rxjs';
import { map, mergeMap, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { VtsInputDirective } from './input.directive';

@Directive({
  selector: `vts-input-group[vtsSuffix], vts-input-group[vtsPrefix]`
})
export class VtsInputGroupWhitSuffixOrPrefixDirective {
  constructor(public elementRef: ElementRef) {}
}

@Component({
  selector: 'vts-input-group',
  exportAs: 'vtsInputGroup',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="vts-input-wrapper vts-input-group" *ngIf="isAddOn; else noAddOnTemplate">
      <span
        *ngIf="vtsAddOnBefore || vtsAddOnBeforeIcon"
        vts-input-group-slot
        type="addon"
        [icon]="vtsAddOnBeforeIcon"
        [template]="vtsAddOnBefore"
      ></span>
      <span
        *ngIf="isAffix; else contentTemplate"
        class="vts-input-affix-wrapper"
        [class.vts-input-affix-wrapper-sm]="vtsSize == 'sm'"
        [class.vts-input-affix-wrapper-md]="vtsSize == 'md'"
        [class.vts-input-affix-wrapper-lg]="vtsSize == 'lg'"
        [class.vts-input-affix-wrapper-xl]="vtsSize == 'xl'"
      >
        <ng-template [ngTemplateOutlet]="affixTemplate"></ng-template>
      </span>
      <span
        *ngIf="vtsAddOnAfter || vtsAddOnAfterIcon"
        vts-input-group-slot
        type="addon"
        [icon]="vtsAddOnAfterIcon"
        [template]="vtsAddOnAfter"
      ></span>
    </span>
    <ng-template #noAddOnTemplate>
      <ng-template [ngIf]="isAffix" [ngIfElse]="contentTemplate">
        <ng-template [ngTemplateOutlet]="affixTemplate"></ng-template>
      </ng-template>
    </ng-template>
    <ng-template #affixTemplate>
      <span
        *ngIf="vtsPrefix || vtsPrefixIcon"
        vts-input-group-slot
        type="prefix"
        [icon]="vtsPrefixIcon"
        [template]="vtsPrefix"
      ></span>
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
      <span
        *ngIf="vtsSuffix || vtsSuffixIcon"
        vts-input-group-slot
        type="suffix"
        [icon]="vtsSuffixIcon"
        [template]="vtsSuffix"
      ></span>
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
  host: {
    '[class.vts-input-group-compact]': `vtsCompact`,
    '[class.vts-input-search-enter-button]': `vtsSearch`,
    '[class.vts-input-search]': `vtsSearch`,
    '[class.vts-input-search-rtl]': `dir === 'rtl'`,
    '[class.vts-input-search-sm]': `vtsSearch && vtsSize == 'sm'`,
    '[class.vts-input-search-md]': `vtsSearch && vtsSize == 'md'`,
    '[class.vts-input-search-lg]': `vtsSearch && vtsSize == 'lg'`,
    '[class.vts-input-search-xl]': `vtsSearch && vtsSize == 'xl'`,
    '[class.vts-input-group-wrapper]': `isAddOn`,
    '[class.vts-input-group-wrapper-rtl]': `dir === 'rtl'`,
    '[class.vts-input-group-wrapper-sm]': `isAddOn && vtsSize == 'sm'`,
    '[class.vts-input-group-wrapper-md]': `isAddOn && vtsSize == 'md'`,
    '[class.vts-input-group-wrapper-lg]': `isAddOn && vtsSize == 'lg'`,
    '[class.vts-input-group-wrapper-xl]': `isAddOn && vtsSize == 'xl'`,
    '[class.vts-input-affix-wrapper]': `isAffix && !isAddOn`,
    '[class.vts-input-affix-wrapper-rtl]': `dir === 'rtl'`,
    '[class.vts-input-affix-wrapper-focused]': `isAffix && focused`,
    '[class.vts-input-affix-wrapper-disabled]': `isAffix && disabled`,
    '[class.vts-input-affix-wrapper-sm]': `isAffix && !isAddOn && vtsSize == 'sm'`,
    '[class.vts-input-affix-wrapper-md]': `isAffix && !isAddOn && vtsSize == 'md'`,
    '[class.vts-input-affix-wrapper-lg]': `isAffix && !isAddOn && vtsSize == 'lg'`,
    '[class.vts-input-affix-wrapper-xl]': `isAffix && !isAddOn && vtsSize == 'xl'`,
    '[class.vts-input-group]': `!isAffix && !isAddOn`,
    '[class.vts-input-group-rtl]': `dir === 'rtl'`,
    '[class.vts-input-group-sm]': `!isAffix && !isAddOn && vtsSize == 'sm'`,
    '[class.vts-input-group-md]': `!isAffix && !isAddOn && vtsSize == 'md'`,
    '[class.vts-input-group-lg]': `!isAffix && !isAddOn && vtsSize == 'lg'`,
    '[class.vts-input-group-xl]': `!isAffix && !isAddOn && vtsSize == 'xl'`
  }
})
export class VtsInputGroupComponent implements AfterContentInit, OnChanges, OnInit, OnDestroy {
  static ngAcceptInputType_vtsSearch: BooleanInput;
  static ngAcceptInputType_vtsCompact: BooleanInput;

  @ContentChildren(VtsInputDirective)
  listOfVtsInputDirective!: QueryList<VtsInputDirective>;
  @Input() vtsAddOnBeforeIcon?: string | null = null;
  @Input() vtsAddOnAfterIcon?: string | null = null;
  @Input() vtsPrefixIcon?: string | null = null;
  @Input() vtsSuffixIcon?: string | null = null;
  @Input() vtsAddOnBefore?: string | TemplateRef<void>;
  @Input() vtsAddOnAfter?: string | TemplateRef<void>;
  @Input() vtsPrefix?: string | TemplateRef<void>;
  @Input() vtsSuffix?: string | TemplateRef<void>;
  @Input() vtsSize: VtsSizeXLMSType = 'md';
  @Input() @InputBoolean() vtsSearch = false;
  @Input() @InputBoolean() vtsCompact = false;
  isAffix = false;
  isAddOn = false;
  focused = false;
  disabled = false;
  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();

  constructor(
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality
  ) {}

  updateChildrenInputSize(): void {
    if (this.listOfVtsInputDirective) {
      this.listOfVtsInputDirective.forEach(item => (item.vtsSize = this.vtsSize));
    }
  }

  ngOnInit(): void {
    this.focusMonitor
      .monitor(this.elementRef, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe(focusOrigin => {
        this.focused = !!focusOrigin;
        this.cdr.markForCheck();
      });

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  ngAfterContentInit(): void {
    this.updateChildrenInputSize();
    const listOfInputChange$ = this.listOfVtsInputDirective.changes.pipe(
      startWith(this.listOfVtsInputDirective)
    );
    listOfInputChange$
      .pipe(
        switchMap(list => {
          return merge(
            ...[listOfInputChange$, ...list.map((input: VtsInputDirective) => input.disabled$)]
          );
        }),
        mergeMap(() => listOfInputChange$),
        map(list => list.some((input: VtsInputDirective) => input.disabled)),
        takeUntil(this.destroy$)
      )
      .subscribe(disabled => {
        this.disabled = disabled;
        this.cdr.markForCheck();
      });
  }
  ngOnChanges(changes: SimpleChanges): void {
    const {
      vtsSize,
      vtsSuffix,
      vtsPrefix,
      vtsPrefixIcon,
      vtsSuffixIcon,
      vtsAddOnAfter,
      vtsAddOnBefore,
      vtsAddOnAfterIcon,
      vtsAddOnBeforeIcon
    } = changes;
    if (vtsSize) {
      this.updateChildrenInputSize();
    }
    if (vtsSuffix || vtsPrefix || vtsPrefixIcon || vtsSuffixIcon) {
      this.isAffix = !!(
        this.vtsSuffix ||
        this.vtsPrefix ||
        this.vtsPrefixIcon ||
        this.vtsSuffixIcon
      );
    }
    if (vtsAddOnAfter || vtsAddOnBefore || vtsAddOnAfterIcon || vtsAddOnBeforeIcon) {
      this.isAddOn = !!(
        this.vtsAddOnAfter ||
        this.vtsAddOnBefore ||
        this.vtsAddOnAfterIcon ||
        this.vtsAddOnBeforeIcon
      );
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
