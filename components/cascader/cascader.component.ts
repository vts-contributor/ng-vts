/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  BACKSPACE,
  DOWN_ARROW,
  ENTER,
  ESCAPE,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW
} from '@angular/cdk/keycodes';
import { CdkConnectedOverlay, ConnectionPositionPair } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Host,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { slideMotion } from '@ui-vts/ng-vts/core/animation';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { VtsNoAnimationDirective } from '@ui-vts/ng-vts/core/no-animation';
import { DEFAULT_CASCADER_POSITIONS } from '@ui-vts/ng-vts/core/overlay';
import { BooleanInput, NgClassType, NgStyleInterface, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { InputBoolean, toArray } from '@ui-vts/ng-vts/core/util';

import { VtsCascaderI18nInterface, VtsI18nService } from '@ui-vts/ng-vts/i18n';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { VtsCascaderOptionComponent } from './cascader-li.component';
import { VtsCascaderService } from './cascader.service';
import {
  VtsCascaderComponentAsSource,
  VtsCascaderExpandTrigger,
  VtsCascaderOption,
  VtsCascaderSearchOption,
  VtsCascaderSize,
  VtsCascaderTriggerType,
  VtsShowSearchOptions
} from './typings';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'cascader';
const defaultDisplayRender = (labels: string[]) => labels.join(' / ');

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-cascader, [vts-cascader]',
  exportAs: 'vtsCascader',
  preserveWhitespaces: false,
  template: `
    <div cdkOverlayOrigin #origin="cdkOverlayOrigin" #trigger>
      <div *ngIf="vtsShowInput">
        <input
          #input
          vts-input
          class="vts-cascader-input"
          [class.vts-cascader-input-disabled]="vtsDisabled"
          [class.vts-cascader-input-lg]="vtsSize === 'lg'"
          [class.vts-cascader-input-sm]="vtsSize === 'sm'"
          [attr.autoComplete]="'off'"
          [attr.placeholder]="showPlaceholder ? vtsPlaceHolder || locale?.placeholder : null"
          [attr.autofocus]="vtsAutoFocus ? 'autofocus' : null"
          [readonly]="!vtsShowSearch"
          [disabled]="vtsDisabled"
          [vtsSize]="vtsSize"
          [(ngModel)]="inputValue"
          (blur)="handleInputBlur()"
          (focus)="handleInputFocus()"
          (change)="$event.stopPropagation()"
        />
        <i
          *ngIf="clearIconVisible"
          vts-icon
          vtsType="Close"
          class="vts-cascader-picker-clear"
          (click)="clearSelection($event)"
        ></i>
        <ng-container *vtsStringTemplateOutlet="vtsSuffixIcon">
          <i
            *ngIf="vtsShowArrow && !isLoading"
            vts-icon
            [vtsType]="$any(vtsSuffixIcon)"
            class="vts-cascader-picker-arrow"
            [class.vts-cascader-picker-arrow-expand]="menuVisible"
          ></i>
        </ng-container>
        <i *ngIf="isLoading" vts-icon vtsType="Sync" class="vts-cascader-picker-arrow"></i>
        <span
          class="vts-cascader-picker-label"
          [class.vts-cascader-picker-show-search]="!!vtsShowSearch"
          [class.vts-cascader-picker-focused]="!!vtsShowSearch && isFocused && !inputValue"
        >
          <ng-container *ngIf="!isLabelRenderTemplate; else labelTemplate">
            {{ labelRenderText }}
          </ng-container>
          <ng-template #labelTemplate>
            <ng-template
              [ngTemplateOutlet]="vtsLabelRender"
              [ngTemplateOutletContext]="labelRenderContext"
            ></ng-template>
          </ng-template>
        </span>
      </div>
      <ng-content></ng-content>
    </div>
    <ng-template
      cdkConnectedOverlay
      vtsConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="vtsBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayTransformOriginOn]="'.vts-cascader-menus'"
      [cdkConnectedOverlayOpen]="menuVisible"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="closeMenu()"
    >
      <div
        #menu
        class="vts-cascader-menus"
        [class.vts-cascader-menu-rtl]="dir === 'rtl'"
        [class.vts-cascader-menus-hidden]="!menuVisible"
        [ngClass]="menuCls"
        [ngStyle]="vtsMenuStyle"
        [@.disabled]="noAnimation?.vtsNoAnimation"
        [vtsNoAnimation]="noAnimation?.vtsNoAnimation"
        [@slideMotion]="'enter'"
        (mouseleave)="onTriggerMouseLeave($event)"
      >
        <ul
          *ngIf="shouldShowEmpty; else hasOptionsTemplate"
          class="vts-cascader-menu"
          [style.width]="dropdownWidthStyle"
          [style.height]="dropdownHeightStyle"
        >
          <li
            class="vts-cascader-menu-item vts-cascader-menu-item-expanded vts-cascader-menu-item-disabled"
          >
            <vts-embed-empty
              [vtsComponentName]="'cascader'"
              [specificContent]="vtsNoResult"
            ></vts-embed-empty>
          </li>
        </ul>
        <ng-template #hasOptionsTemplate>
          <ul
            *ngFor="let options of cascaderService.columns; let i = index"
            class="vts-cascader-menu"
            [ngClass]="menuColumnCls"
            [style.height]="dropdownHeightStyle"
            [style.width]="dropdownWidthStyle"
          >
            <li
              vts-cascader-option
              *ngFor="let option of options"
              [expandIcon]="vtsExpandIcon"
              [columnIndex]="i"
              [vtsLabelProperty]="vtsLabelProperty"
              [optionTemplate]="vtsOptionRender"
              [activated]="isOptionActivated(option, i)"
              [highlightText]="inSearchingMode ? inputValue : ''"
              [option]="option"
              [dir]="dir"
              (mouseenter)="onOptionMouseEnter(option, i, $event)"
              (mouseleave)="onOptionMouseLeave(option, i, $event)"
              (click)="onOptionClick(option, i, $event)"
            ></li>
          </ul>
        </ng-template>
      </div>
    </ng-template>
  `,
  animations: [slideMotion],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VtsCascaderComponent),
      multi: true
    },
    VtsCascaderService
  ],
  host: {
    '[attr.tabIndex]': '"0"',
    '[class.vts-cascader-lg]': 'vtsSize === "lg"',
    '[class.vts-cascader-sm]': 'vtsSize === "sm"',
    '[class.vts-cascader-picker-disabled]': 'vtsDisabled',
    '[class.vts-cascader-picker-open]': 'menuVisible',
    '[class.vts-cascader-picker-with-value]': '!!inputValue',
    '[class.vts-cascader-focused]': 'isFocused',
    '[class.vts-cascader-picker-rtl]': `dir ==='rtl'`
  }
})
export class VtsCascaderComponent
  implements VtsCascaderComponentAsSource, OnInit, OnDestroy, ControlValueAccessor
{
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;
  static ngAcceptInputType_vtsShowInput: BooleanInput;
  static ngAcceptInputType_vtsShowArrow: BooleanInput;
  static ngAcceptInputType_vtsAllowClear: BooleanInput;
  static ngAcceptInputType_vtsAutoFocus: BooleanInput;
  static ngAcceptInputType_vtsChangeOnSelect: BooleanInput;
  static ngAcceptInputType_vtsDisabled: BooleanInput;

  @ViewChild('input', { static: false }) input!: ElementRef;
  @ViewChild('menu', { static: false }) menu!: ElementRef;
  @ViewChild(CdkConnectedOverlay, { static: false })
  overlay!: CdkConnectedOverlay;
  @ViewChildren(VtsCascaderOptionComponent)
  cascaderItems!: QueryList<VtsCascaderOptionComponent>;

  @Input() vtsOptionRender: TemplateRef<{
    $implicit: VtsCascaderOption;
    index: number;
  }> | null = null;
  @Input() @InputBoolean() vtsShowInput = true;
  @Input() @InputBoolean() vtsShowArrow = true;
  @Input() @InputBoolean() vtsAllowClear = true;
  @Input() @InputBoolean() vtsAutoFocus = false;
  @Input() @InputBoolean() vtsChangeOnSelect = false;
  @Input() @InputBoolean() vtsDisabled = false;
  @Input() vtsColumnClassName?: string;
  @Input() vtsExpandTrigger: VtsCascaderExpandTrigger = 'click';
  @Input() vtsValueProperty = 'value';
  @Input() vtsLabelRender: TemplateRef<void> | null = null;
  @Input() vtsLabelProperty = 'label';
  @Input() vtsNoResult?: string | TemplateRef<void>;
  @Input() @WithConfig() vtsSize: VtsCascaderSize = 'md';
  @Input() @WithConfig() vtsBackdrop = false;
  @Input() vtsShowSearch: boolean | VtsShowSearchOptions = false;
  @Input() vtsPlaceHolder: string = '';
  @Input() vtsMenuClassName?: string;
  @Input() vtsMenuStyle: NgStyleInterface | null = null;
  @Input() vtsMouseEnterDelay: number = 150; // ms
  @Input() vtsMouseLeaveDelay: number = 150; // ms
  @Input() vtsTriggerAction: VtsCascaderTriggerType | VtsCascaderTriggerType[] = [
    'click'
  ] as VtsCascaderTriggerType[];
  @Input() vtsChangeOn?: (option: VtsCascaderOption, level: number) => boolean;
  @Input() vtsLoadData?: (node: VtsCascaderOption, index: number) => PromiseLike<VtsSafeAny>;
  // TODO: RTL
  @Input() vtsSuffixIcon: string | TemplateRef<void> = 'down';
  @Input() vtsExpandIcon: string | TemplateRef<void> = '';

  @Input()
  get vtsOptions(): VtsCascaderOption[] | null {
    return this.cascaderService.vtsOptions;
  }

  set vtsOptions(options: VtsCascaderOption[] | null) {
    this.cascaderService.withOptions(options);
  }

  @Output() readonly vtsVisibleChange = new EventEmitter<boolean>();
  @Output() readonly vtsSelectionChange = new EventEmitter<VtsCascaderOption[]>();
  @Output() readonly vtsSelect = new EventEmitter<{
    option: VtsCascaderOption;
    index: number;
  } | null>();
  @Output() readonly vtsClear = new EventEmitter<void>();

  /**
   * If the dropdown should show the empty content.
   * `true` if there's no options.
   */
  shouldShowEmpty: boolean = false;

  el: HTMLElement;
  menuVisible = false;
  isLoading = false;
  labelRenderText?: string;
  labelRenderContext = {};
  onChange = Function.prototype;
  onTouched = Function.prototype;
  positions: ConnectionPositionPair[] = [...DEFAULT_CASCADER_POSITIONS];

  /**
   * Dropdown's with in pixel.
   */
  dropdownWidthStyle?: string;
  dropdownHeightStyle: 'auto' | '' = '';
  isFocused = false;

  locale!: VtsCascaderI18nInterface;
  dir: Direction = 'ltr';

  private destroy$ = new Subject<void>();
  private inputString = '';
  private isOpening = false;
  private delayMenuTimer: number | ReturnType<typeof setTimeout> | null = null;
  private delaySelectTimer: number | ReturnType<typeof setTimeout> | null = null;

  get inSearchingMode(): boolean {
    return this.cascaderService.inSearchingMode;
  }

  set inputValue(inputValue: string) {
    this.inputString = inputValue;
    this.toggleSearchingMode(!!inputValue);
  }

  get inputValue(): string {
    return this.inputString;
  }

  get menuCls(): NgClassType {
    return { [`${this.vtsMenuClassName}`]: !!this.vtsMenuClassName };
  }

  get menuColumnCls(): NgClassType {
    return { [`${this.vtsColumnClassName}`]: !!this.vtsColumnClassName };
  }

  private get hasInput(): boolean {
    return !!this.inputValue;
  }

  private get hasValue(): boolean {
    return this.cascaderService.values && this.cascaderService.values.length > 0;
  }

  get showPlaceholder(): boolean {
    return !(this.hasInput || this.hasValue);
  }

  get clearIconVisible(): boolean {
    return this.vtsAllowClear && !this.vtsDisabled && (this.hasValue || this.hasInput);
  }

  get isLabelRenderTemplate(): boolean {
    return !!this.vtsLabelRender;
  }

  constructor(
    public cascaderService: VtsCascaderService,
    public vtsConfigService: VtsConfigService,
    private cdr: ChangeDetectorRef,
    private i18nService: VtsI18nService,
    elementRef: ElementRef,
    renderer: Renderer2,
    @Optional() private directionality: Directionality,
    @Host() @Optional() public noAnimation?: VtsNoAnimationDirective
  ) {
    this.el = elementRef.nativeElement;
    this.cascaderService.withComponent(this);
    renderer.addClass(elementRef.nativeElement, 'vts-cascader');
    renderer.addClass(elementRef.nativeElement, 'vts-cascader-picker');
  }

  ngOnInit(): void {
    const srv = this.cascaderService;

    srv.$redraw.pipe(takeUntil(this.destroy$)).subscribe(() => {
      // These operations would not mutate data.
      this.checkChildren();
      this.setDisplayLabel();
      this.reposition();
      this.setDropdownStyles();

      this.cdr.markForCheck();
    });

    srv.$loading.pipe(takeUntil(this.destroy$)).subscribe(loading => {
      this.isLoading = loading;
    });

    srv.$optionSelected.pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (!data) {
        this.onChange([]);
        this.vtsSelect.emit(null);
        this.vtsSelectionChange.emit([]);
      } else {
        const { option, index } = data;
        const shouldClose =
          option.isLeaf || (this.vtsChangeOnSelect && this.vtsExpandTrigger === 'hover');
        if (shouldClose) {
          this.delaySetMenuVisible(false);
        }
        this.onChange(this.cascaderService.values);
        this.vtsSelectionChange.emit(this.cascaderService.selectedOptions);
        this.vtsSelect.emit({ option, index });
        this.cdr.markForCheck();
      }
    });

    srv.$quitSearching.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.inputString = '';
      this.dropdownWidthStyle = '';
    });

    this.i18nService.localeChange.pipe(startWith(), takeUntil(this.destroy$)).subscribe(() => {
      this.setLocale();
    });

    this.vtsConfigService
      .getConfigChangeEventForComponent(VTS_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.dir = this.directionality.value;
      srv.$redraw.next();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearDelayMenuTimer();
    this.clearDelaySelectTimer();
  }

  registerOnChange(fn: () => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(value: VtsSafeAny): void {
    this.cascaderService.values = toArray(value);
    this.cascaderService.syncOptions(true);
  }

  delaySetMenuVisible(visible: boolean, delay: number = 100, setOpening: boolean = false): void {
    this.clearDelayMenuTimer();
    if (delay) {
      if (visible && setOpening) {
        this.isOpening = true;
      }
      this.delayMenuTimer = setTimeout(() => {
        this.setMenuVisible(visible);
        this.cdr.detectChanges();
        this.clearDelayMenuTimer();
        if (visible) {
          setTimeout(() => {
            this.isOpening = false;
          }, 100);
        }
      }, delay);
    } else {
      this.setMenuVisible(visible);
    }
  }

  setMenuVisible(visible: boolean): void {
    if (this.vtsDisabled || this.menuVisible === visible) {
      return;
    }
    if (visible) {
      this.cascaderService.syncOptions();
      this.scrollToActivatedOptions();
    }

    if (!visible) {
      this.inputValue = '';
    }

    this.menuVisible = visible;
    this.vtsVisibleChange.emit(visible);
    this.cdr.detectChanges();
  }

  private clearDelayMenuTimer(): void {
    if (this.delayMenuTimer) {
      clearTimeout(this.delayMenuTimer);
      this.delayMenuTimer = null;
    }
  }

  clearSelection(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.labelRenderText = '';
    this.labelRenderContext = {};
    this.inputValue = '';
    this.setMenuVisible(false);
    this.cascaderService.clear();
  }

  getSubmitValue(): VtsSafeAny[] {
    return this.cascaderService.selectedOptions.map(o => this.cascaderService.getOptionValue(o));
  }

  focus(): void {
    if (!this.isFocused) {
      (this.input ? this.input.nativeElement : this.el).focus();
      this.isFocused = true;
    }
  }

  blur(): void {
    if (this.isFocused) {
      (this.input ? this.input.nativeElement : this.el).blur();
      this.isFocused = false;
    }
  }

  handleInputBlur(): void {
    this.menuVisible ? this.focus() : this.blur();
  }

  handleInputFocus(): void {
    this.focus();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;

    if (
      keyCode !== DOWN_ARROW &&
      keyCode !== UP_ARROW &&
      keyCode !== LEFT_ARROW &&
      keyCode !== RIGHT_ARROW &&
      keyCode !== ENTER &&
      keyCode !== BACKSPACE &&
      keyCode !== ESCAPE
    ) {
      return;
    }

    // Press any keys above to reopen menu.
    if (!this.menuVisible && keyCode !== BACKSPACE && keyCode !== ESCAPE) {
      return this.setMenuVisible(true);
    }

    // Make these keys work as default in searching mode.
    if (
      this.inSearchingMode &&
      (keyCode === BACKSPACE || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW)
    ) {
      return;
    }

    // Interact with the component.
    if (this.menuVisible) {
      event.preventDefault();
      if (keyCode === DOWN_ARROW) {
        this.moveUpOrDown(false);
      } else if (keyCode === UP_ARROW) {
        this.moveUpOrDown(true);
      } else if (keyCode === LEFT_ARROW) {
        this.moveLeft();
      } else if (keyCode === RIGHT_ARROW) {
        this.moveRight();
      } else if (keyCode === ENTER) {
        this.onEnter();
      }
    }
  }

  @HostListener('click')
  onTriggerClick(): void {
    if (this.vtsDisabled) {
      return;
    }
    if (this.vtsShowSearch) {
      this.focus();
    }
    if (this.isActionTrigger('click')) {
      this.delaySetMenuVisible(!this.menuVisible, 100);
    }
    this.onTouched();
  }

  @HostListener('mouseenter')
  onTriggerMouseEnter(): void {
    if (this.vtsDisabled || !this.isActionTrigger('hover')) {
      return;
    }

    this.delaySetMenuVisible(true, this.vtsMouseEnterDelay, true);
  }

  @HostListener('mouseleave', ['$event'])
  onTriggerMouseLeave(event: MouseEvent): void {
    if (this.vtsDisabled || !this.menuVisible || this.isOpening || !this.isActionTrigger('hover')) {
      event.preventDefault();
      return;
    }
    const mouseTarget = event.relatedTarget as HTMLElement;
    const hostEl = this.el;
    const menuEl = this.menu && (this.menu.nativeElement as HTMLElement);
    if (hostEl.contains(mouseTarget) || (menuEl && menuEl.contains(mouseTarget))) {
      return;
    }
    this.delaySetMenuVisible(false, this.vtsMouseLeaveDelay);
  }

  onOptionMouseEnter(option: VtsCascaderOption, columnIndex: number, event: Event): void {
    event.preventDefault();
    if (this.vtsExpandTrigger === 'hover') {
      if (!option.isLeaf) {
        this.delaySetOptionActivated(option, columnIndex, false);
      } else {
        this.cascaderService.setOptionDeactivatedSinceColumn(columnIndex);
      }
    }
  }

  onOptionMouseLeave(option: VtsCascaderOption, _columnIndex: number, event: Event): void {
    event.preventDefault();
    if (this.vtsExpandTrigger === 'hover' && !option.isLeaf) {
      this.clearDelaySelectTimer();
    }
  }

  onOptionClick(option: VtsCascaderOption, columnIndex: number, event: Event): void {
    if (event) {
      event.preventDefault();
    }
    if (option && option.disabled) {
      return;
    }
    this.el.focus();
    this.inSearchingMode
      ? this.cascaderService.setSearchOptionSelected(option as VtsCascaderSearchOption)
      : this.cascaderService.setOptionActivated(option, columnIndex, true);
  }

  onClickOutside(event: MouseEvent): void {
    if (!this.el.contains(event.target as Node)) {
      this.closeMenu();
    }
  }

  private isActionTrigger(action: 'click' | 'hover'): boolean {
    return typeof this.vtsTriggerAction === 'string'
      ? this.vtsTriggerAction === action
      : this.vtsTriggerAction.indexOf(action) !== -1;
  }

  private onEnter(): void {
    const columnIndex = Math.max(this.cascaderService.activatedOptions.length - 1, 0);
    const option = this.cascaderService.activatedOptions[columnIndex];
    if (option && !option.disabled) {
      this.inSearchingMode
        ? this.cascaderService.setSearchOptionSelected(option as VtsCascaderSearchOption)
        : this.cascaderService.setOptionActivated(option, columnIndex, true);
    }
  }

  private moveUpOrDown(isUp: boolean): void {
    const columnIndex = Math.max(this.cascaderService.activatedOptions.length - 1, 0);
    const activeOption = this.cascaderService.activatedOptions[columnIndex];
    const options = this.cascaderService.columns[columnIndex] || [];
    const length = options.length;
    let nextIndex = -1;
    if (!activeOption) {
      // Not selected options in this column
      nextIndex = isUp ? length : -1;
    } else {
      nextIndex = options.indexOf(activeOption);
    }

    while (true) {
      nextIndex = isUp ? nextIndex - 1 : nextIndex + 1;
      if (nextIndex < 0 || nextIndex >= length) {
        break;
      }
      const nextOption = options[nextIndex];
      if (!nextOption || nextOption.disabled) {
        continue;
      }
      this.cascaderService.setOptionActivated(nextOption, columnIndex);
      break;
    }
  }

  private moveLeft(): void {
    const options = this.cascaderService.activatedOptions;
    if (options.length) {
      options.pop(); // Remove the last one
    }
  }

  private moveRight(): void {
    const length = this.cascaderService.activatedOptions.length;
    const options = this.cascaderService.columns[length];
    if (options && options.length) {
      const nextOpt = options.find(o => !o.disabled);
      if (nextOpt) {
        this.cascaderService.setOptionActivated(nextOpt, length);
      }
    }
  }

  private clearDelaySelectTimer(): void {
    if (this.delaySelectTimer) {
      clearTimeout(this.delaySelectTimer);
      this.delaySelectTimer = null;
    }
  }

  private delaySetOptionActivated(
    option: VtsCascaderOption,
    columnIndex: number,
    performSelect: boolean
  ): void {
    this.clearDelaySelectTimer();
    this.delaySelectTimer = setTimeout(() => {
      this.cascaderService.setOptionActivated(option, columnIndex, performSelect);
      this.delaySelectTimer = null;
    }, 150);
  }

  private toggleSearchingMode(toSearching: boolean): void {
    if (this.inSearchingMode !== toSearching) {
      this.cascaderService.toggleSearchingMode(toSearching);
    }

    if (this.inSearchingMode) {
      this.cascaderService.prepareSearchOptions(this.inputValue);
    }
  }

  isOptionActivated(option: VtsCascaderOption, index: number): boolean {
    const activeOpt = this.cascaderService.activatedOptions[index];
    return activeOpt === option;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.closeMenu();
    }
    this.vtsDisabled = isDisabled;
  }

  closeMenu(): void {
    this.blur();
    this.clearDelayMenuTimer();
    this.setMenuVisible(false);
  }

  /**
   * Reposition the cascader panel. When a menu opens, the cascader expands
   * and may exceed the boundary of browser's window.
   */
  private reposition(): void {
    if (this.overlay && this.overlay.overlayRef && this.menuVisible) {
      Promise.resolve().then(() => {
        this.overlay.overlayRef.updatePosition();
      });
    }
  }

  /**
   * When a cascader options is changed, a child needs to know that it should re-render.
   */
  private checkChildren(): void {
    if (this.cascaderItems) {
      this.cascaderItems.forEach(item => item.markForCheck());
    }
  }

  private setDisplayLabel(): void {
    const selectedOptions = this.cascaderService.selectedOptions;
    const labels: string[] = selectedOptions.map(o => this.cascaderService.getOptionLabel(o));

    if (this.isLabelRenderTemplate) {
      this.labelRenderContext = { labels, selectedOptions };
    } else {
      this.labelRenderText = defaultDisplayRender.call(this, labels);
    }
  }

  private setDropdownStyles(): void {
    const firstColumn = this.cascaderService.columns[0];

    this.shouldShowEmpty =
      (this.inSearchingMode && (!firstColumn || !firstColumn.length)) || // Should show empty when there's no searching result
      (!(this.vtsOptions && this.vtsOptions.length) && !this.vtsLoadData); // Should show when there's no options and developer does not use vtsLoadData
    this.dropdownHeightStyle = this.shouldShowEmpty ? 'auto' : '';

    if (this.input) {
      this.dropdownWidthStyle =
        this.inSearchingMode || this.shouldShowEmpty
          ? `${this.input.nativeElement.offsetWidth}px`
          : '';
    }
  }

  private setLocale(): void {
    this.locale = this.i18nService.getLocaleData('global');
    this.cdr.markForCheck();
  }

  private scrollToActivatedOptions(): void {
    // scroll only until option menu view is ready
    Promise.resolve().then(() => {
      this.cascaderItems
        .toArray()
        .filter(e => e.activated)
        .forEach(e => {
          e.nativeElement?.scrollIntoView({
            block: 'start',
            inline: 'nearest'
          });
        });
    });
  }
}
