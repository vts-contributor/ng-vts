/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { DOWN_ARROW, ENTER, ESCAPE, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { slideMotion } from '@ui-vts/ng-vts/core/animation';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { VtsNoAnimationDirective } from '@ui-vts/ng-vts/core/no-animation';
import { reqAnimFrame } from '@ui-vts/ng-vts/core/polyfill';
import {
  BooleanInput,
  VtsSafeAny,
  OnChangeType,
  OnTouchedType,
  VtsSizeXLMSType
} from '@ui-vts/ng-vts/core/types';
import { InputBoolean, isNotNil } from '@ui-vts/ng-vts/core/util';
import { BehaviorSubject, combineLatest, merge, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { VtsOptionGroupComponent } from './option-group.component';
import { VtsOptionComponent } from './option.component';
import { VtsSelectTopControlComponent } from './select-top-control.component';
import {
  VtsFilterOptionType,
  VtsSelectItemInterface,
  VtsSelectModeType,
  VtsSelectOptionInterface
} from './select.types';

const defaultFilterOption: VtsFilterOptionType = (
  searchValue: string,
  item: VtsSelectItemInterface
): boolean => {
  if (item && item.vtsLabel) {
    return item.vtsLabel.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
  } else {
    return false;
  }
};

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'select';

@Component({
  selector: 'vts-select',
  exportAs: 'vtsSelect',
  preserveWhitespaces: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VtsSelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [slideMotion],
  template: `
    <vts-select-top-control
      cdkOverlayOrigin
      #origin="cdkOverlayOrigin"
      [vtsId]="vtsId"
      [open]="vtsOpen"
      [disabled]="vtsDisabled"
      [mode]="vtsMode"
      [@.disabled]="noAnimation?.vtsNoAnimation"
      [vtsNoAnimation]="noAnimation?.vtsNoAnimation"
      [maxTagPlaceholder]="vtsMaxTagPlaceholder"
      [removeIcon]="vtsRemoveIcon"
      [placeHolder]="vtsPlaceHolder"
      [maxTagCount]="vtsMaxTagCount"
      [customTemplate]="vtsCustomTemplate"
      [tokenSeparators]="vtsTokenSeparators"
      [showSearch]="vtsShowSearch"
      [autofocus]="vtsAutoFocus"
      [listOfTopItem]="listOfTopItem"
      (inputValueChange)="onInputValueChange($event)"
      (tokenize)="onTokenSeparate($event)"
      (deleteItem)="onItemDelete($event)"
      (keydown)="onKeyDown($event)"
    ></vts-select-top-control>
    <vts-select-arrow
      [loading]="vtsLoading"
      [search]="vtsOpen && vtsShowSearch"
      [suffixIcon]="vtsSuffixIcon"
    ></vts-select-arrow>
    <vts-select-clear
      *ngIf="vtsAllowClear && !vtsDisabled && listOfValue.length"
      [clearIcon]="vtsClearIcon"
      (clear)="onClearSelection()"
    ></vts-select-clear>
    <vts-select-multiple-count
      *ngIf="vtsMode !== 'default' && !vtsDisabled && !!listOfValue?.length"
      [count]="listOfValue.length"
    ></vts-select-multiple-count>
    <ng-template
      cdkConnectedOverlay
      vtsConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="vtsBackdrop"
      [cdkConnectedOverlayMinWidth]="$any(vtsDropdownMatchSelectWidth ? null : triggerWidth)"
      [cdkConnectedOverlayWidth]="$any(vtsDropdownMatchSelectWidth ? triggerWidth : null)"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayTransformOriginOn]="'.vts-select-dropdown'"
      [cdkConnectedOverlayPanelClass]="vtsDropdownClassName!"
      [cdkConnectedOverlayOpen]="vtsOpen"
      (overlayKeydown)="onOverlayKeyDown($event)"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="setOpenState(false)"
      (positionChange)="onPositionChange($event)"
    >
      <vts-option-container
        [ngStyle]="vtsDropdownStyle"
        [itemSize]="vtsOptionHeightPx"
        [maxItemLength]="vtsOptionOverflowSize"
        [matchWidth]="vtsDropdownMatchSelectWidth"
        [class.vts-select-dropdown-placement-bottomLeft]="dropDownPosition === 'bottom'"
        [class.vts-select-dropdown-placement-topLeft]="dropDownPosition === 'top'"
        [class.vts-select-dropdown-xl]="vtsSize === 'xl'"
        [class.vts-select-dropdown-lg]="vtsSize === 'lg'"
        [class.vts-select-dropdown-md]="vtsSize === 'md'"
        [class.vts-select-dropdown-sm]="vtsSize === 'sm'"
        [class.vts-select-dropdown-single]="vtsMode === 'default'"
        [class.vts-select-dropdown-multiple]="vtsMode !== 'default'"
        [@slideMotion]="'enter'"
        [@.disabled]="noAnimation?.vtsNoAnimation"
        [vtsNoAnimation]="noAnimation?.vtsNoAnimation"
        [listOfContainerItem]="listOfContainerItem"
        [menuItemSelectedIcon]="vtsMenuItemSelectedIcon"
        [notFoundContent]="vtsNoResult"
        [activatedValue]="activatedValue"
        [listOfSelectedValue]="listOfValue"
        [dropdownRender]="vtsDropdownRender"
        [vtsCustomCompareFn]="vtsCustomCompareFn"
        [mode]="vtsMode"
        (keydown)="onKeyDown($event)"
        (itemClick)="onItemClick($event)"
        (scrollToBottom)="vtsScrollToBottom.emit()"
      ></vts-option-container>
    </ng-template>
  `,
  host: {
    '[class.vts-select-xl]': 'vtsSize === "xl"',
    '[class.vts-select-lg]': 'vtsSize === "lg"',
    '[class.vts-select-md]': 'vtsSize === "md"',
    '[class.vts-select-sm]': 'vtsSize === "sm"',
    '[class.vts-select-show-arrow]': `vtsShowArrow`,
    '[class.vts-select-disabled]': 'vtsDisabled',
    '[class.vts-select-show-search]': `vtsShowSearch && !vtsDisabled`,
    '[class.vts-select-allow-clear]': 'vtsAllowClear',
    '[class.vts-select-borderless]': 'vtsBorderless',
    '[class.vts-select-open]': 'vtsOpen',
    '[class.vts-select-focused]': 'vtsOpen || focused',
    '[class.vts-select-single]': `vtsMode === 'default'`,
    '[class.vts-select-multiple]': `vtsMode !== 'default'`,
    '[class.vts-select-rtl]': `dir === 'rtl'`,
    '(click)': 'onHostClick()'
  }
})
export class VtsSelectComponent
  implements ControlValueAccessor, OnInit, OnDestroy, AfterContentInit, OnChanges
{
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;

  static ngAcceptInputType_vtsAllowClear: BooleanInput;
  static ngAcceptInputType_vtsBorderless: BooleanInput;
  static ngAcceptInputType_vtsShowSearch: BooleanInput;
  static ngAcceptInputType_vtsLoading: BooleanInput;
  static ngAcceptInputType_vtsAutoFocus: BooleanInput;
  static ngAcceptInputType_vtsAutoClearSearchValue: BooleanInput;
  static ngAcceptInputType_vtsServerSearch: BooleanInput;
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsOpen: BooleanInput;

  @Input() vtsId: string | null = null;
  @Input() vtsSize: VtsSizeXLMSType = 'md';
  @Input() vtsOptionOverflowSize = 8;
  @Input() vtsDropdownClassName: string | null = null;
  @Input() vtsDropdownMatchSelectWidth = true;
  @Input() vtsDropdownStyle: { [key: string]: string } | null = null;
  @Input() vtsNoResult: string | TemplateRef<VtsSafeAny> | undefined = undefined;
  @Input() vtsPlaceHolder: string | TemplateRef<VtsSafeAny> | null = null;
  @Input() vtsMaxTagCount = Infinity;
  @Input() vtsDropdownRender: TemplateRef<VtsSafeAny> | null = null;
  @Input() vtsCustomTemplate: TemplateRef<{
    $implicit: VtsSelectItemInterface;
  }> | null = null;
  @Input()
  @WithConfig<TemplateRef<VtsSafeAny> | string | null>()
  vtsSuffixIcon: TemplateRef<VtsSafeAny> | string | null = null;
  @Input() vtsClearIcon: TemplateRef<VtsSafeAny> | null = null;
  @Input() vtsRemoveIcon: TemplateRef<VtsSafeAny> | null = null;
  @Input() vtsMenuItemSelectedIcon: TemplateRef<VtsSafeAny> | null = null;
  @Input() vtsTokenSeparators: string[] = [];
  @Input() vtsMaxTagPlaceholder: TemplateRef<{
    $implicit: VtsSafeAny[];
  }> | null = null;
  @Input() vtsMaxMultipleCount = Infinity;
  @Input() vtsMode: VtsSelectModeType = 'default';
  @Input() vtsCustomFilterFn: VtsFilterOptionType = defaultFilterOption;
  @Input() vtsCustomCompareFn: (o1: VtsSafeAny, o2: VtsSafeAny) => boolean = (
    o1: VtsSafeAny,
    o2: VtsSafeAny
  ) => o1 === o2;
  @Input() @InputBoolean() vtsAllowClear = true;
  @Input() @WithConfig<boolean>() @InputBoolean() vtsBorderless = false;
  @Input() @InputBoolean() vtsShowSearch = false;
  @Input() @InputBoolean() vtsLoading = false;
  @Input() @InputBoolean() vtsAutoFocus = false;
  @Input() @InputBoolean() vtsAutoClearSearchValue = true;
  @Input() @InputBoolean() vtsServerSearch = false;
  @Input() @InputBoolean() vtsDisabled = false;
  @Input() @InputBoolean() vtsOpen = false;
  @Input() @WithConfig<boolean>() @InputBoolean() vtsBackdrop = false;
  @Input() vtsOptions: VtsSelectOptionInterface[] = [];

  @Input()
  set vtsShowArrow(value: boolean) {
    this._vtsShowArrow = value;
  }
  get vtsShowArrow(): boolean {
    return this._vtsShowArrow === undefined ? this.vtsMode === 'default' : this._vtsShowArrow;
  }

  get vtsOptionHeightPx() {
    switch (this.vtsSize) {
      case 'xl':
        return 48;
      case 'lg':
        return 40;
      case 'md':
        return 36;
      case 'sm':
        return 32;
    }
  }

  @Output() readonly vtsOnSearch = new EventEmitter<string>();
  @Output() readonly vtsScrollToBottom = new EventEmitter<void>();
  @Output() readonly vtsOpenChange = new EventEmitter<boolean>();
  @Output() readonly vtsBlur = new EventEmitter<void>();
  @Output() readonly vtsFocus = new EventEmitter<void>();
  @ViewChild(CdkOverlayOrigin, { static: true, read: ElementRef })
  originElement!: ElementRef;
  @ViewChild(CdkConnectedOverlay, { static: true })
  cdkConnectedOverlay!: CdkConnectedOverlay;
  @ViewChild(VtsSelectTopControlComponent, { static: true })
  vtsSelectTopControlComponent!: VtsSelectTopControlComponent;
  @ContentChildren(VtsOptionComponent, { descendants: true })
  listOfVtsOptionComponent!: QueryList<VtsOptionComponent>;
  @ContentChildren(VtsOptionGroupComponent, { descendants: true })
  listOfVtsOptionGroupComponent!: QueryList<VtsOptionGroupComponent>;
  @ViewChild(VtsOptionGroupComponent, { static: true, read: ElementRef })
  vtsOptionGroupComponentElement!: ElementRef;
  @ViewChild(VtsSelectTopControlComponent, { static: true, read: ElementRef })
  vtsSelectTopControlComponentElement!: ElementRef;
  private listOfValue$ = new BehaviorSubject<VtsSafeAny[]>([]);
  private listOfTemplateItem$ = new BehaviorSubject<VtsSelectItemInterface[]>([]);
  private listOfTagAndTemplateItem: VtsSelectItemInterface[] = [];
  private searchValue: string = '';
  private isReactiveDriven = false;
  private value: VtsSafeAny | VtsSafeAny[];
  private destroy$ = new Subject();
  private _vtsShowArrow: boolean | undefined;
  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';
  triggerWidth: number | null = null;
  listOfContainerItem: VtsSelectItemInterface[] = [];
  listOfTopItem: VtsSelectItemInterface[] = [];
  activatedValue: VtsSafeAny | null = null;
  listOfValue: VtsSafeAny[] = [];
  focused = false;
  dir: Direction = 'ltr';

  generateTagItem(value: string): VtsSelectItemInterface {
    return {
      vtsValue: value,
      vtsLabel: value,
      type: 'item'
    };
  }

  onItemClick(value: VtsSafeAny): void {
    this.activatedValue = value;
    if (this.vtsMode === 'default') {
      if (this.listOfValue.length === 0 || !this.vtsCustomCompareFn(this.listOfValue[0], value)) {
        this.updateListOfValue([value]);
      }
      this.setOpenState(false);
    } else {
      const targetIndex = this.listOfValue.findIndex(o => this.vtsCustomCompareFn(o, value));
      if (targetIndex !== -1) {
        const listOfValueAfterRemoved = this.listOfValue.filter((_, i) => i !== targetIndex);
        this.updateListOfValue(listOfValueAfterRemoved);
      } else if (this.listOfValue.length < this.vtsMaxMultipleCount) {
        const listOfValueAfterAdded = [...this.listOfValue, value];
        this.updateListOfValue(listOfValueAfterAdded);
      }
      this.focus();
      if (this.vtsAutoClearSearchValue) {
        this.clearInput();
      }
    }
  }

  onItemDelete(item: VtsSelectItemInterface): void {
    const listOfSelectedValue = this.listOfValue.filter(
      v => !this.vtsCustomCompareFn(v, item.vtsValue)
    );
    this.updateListOfValue(listOfSelectedValue);
    this.clearInput();
  }

  onHostClick(): void {
    if ((this.vtsOpen && this.vtsShowSearch) || this.vtsDisabled) {
      return;
    }

    this.setOpenState(!this.vtsOpen);
  }

  updateListOfContainerItem(): void {
    let listOfContainerItem = this.listOfTagAndTemplateItem
      .filter(item => !item.vtsHide)
      .filter(item => {
        if (!this.vtsServerSearch && this.searchValue) {
          return this.vtsCustomFilterFn(this.searchValue, item);
        } else {
          return true;
        }
      });
    if (this.vtsMode === 'tags' && this.searchValue) {
      const matchedItem = this.listOfTagAndTemplateItem.find(
        item => item.vtsLabel === this.searchValue
      );
      if (!matchedItem) {
        const tagItem = this.generateTagItem(this.searchValue);
        listOfContainerItem = [tagItem, ...listOfContainerItem];
        this.activatedValue = tagItem.vtsValue;
      } else {
        this.activatedValue = matchedItem.vtsValue;
      }
    }
    const activatedItem =
      listOfContainerItem.find(item =>
        this.vtsCustomCompareFn(item.vtsValue, this.listOfValue[0])
      ) || listOfContainerItem[0];
    this.activatedValue = (activatedItem && activatedItem.vtsValue) || null;
    let listOfGroupLabel: Array<string | TemplateRef<VtsSafeAny> | null> = [];
    if (this.isReactiveDriven) {
      listOfGroupLabel = [
        ...new Set(this.vtsOptions.filter(o => o.groupLabel).map(o => o.groupLabel!))
      ];
    } else {
      if (this.listOfVtsOptionGroupComponent) {
        listOfGroupLabel = this.listOfVtsOptionGroupComponent.map(o => o.vtsLabel);
      }
    }
    /** insert group item **/
    listOfGroupLabel.forEach(label => {
      const index = listOfContainerItem.findIndex(item => label === item.groupLabel);
      if (index > -1) {
        const groupItem = {
          groupLabel: label,
          type: 'group',
          key: label
        } as VtsSelectItemInterface;
        listOfContainerItem.splice(index, 0, groupItem);
      }
    });
    this.listOfContainerItem = [...listOfContainerItem];
    this.updateCdkConnectedOverlayPositions();
  }

  clearInput(): void {
    this.vtsSelectTopControlComponent.clearInputValue();
  }

  updateListOfValue(listOfValue: VtsSafeAny[]): void {
    console.log(listOfValue);
    const covertListToModel = (
      list: VtsSafeAny[],
      mode: VtsSelectModeType
    ): VtsSafeAny[] | VtsSafeAny => {
      if (mode === 'default') {
        if (list.length > 0) {
          return list[0];
        } else {
          return null;
        }
      } else {
        return list;
      }
    };
    const model = covertListToModel(listOfValue, this.vtsMode);
    if (this.value !== model) {
      this.listOfValue = listOfValue;
      this.listOfValue$.next(listOfValue);
      this.value = model;
      this.onChange(this.value);
    }
  }

  onTokenSeparate(listOfLabel: string[]): void {
    const listOfMatchedValue = this.listOfTagAndTemplateItem
      .filter(item => listOfLabel.findIndex(label => label === item.vtsLabel) !== -1)
      .map(item => item.vtsValue)
      .filter(item => this.listOfValue.findIndex(v => this.vtsCustomCompareFn(v, item)) === -1);
    if (this.vtsMode === 'multiple') {
      this.updateListOfValue([...this.listOfValue, ...listOfMatchedValue]);
    } else if (this.vtsMode === 'tags') {
      const listOfUnMatchedLabel = listOfLabel.filter(
        label => this.listOfTagAndTemplateItem.findIndex(item => item.vtsLabel === label) === -1
      );
      this.updateListOfValue([...this.listOfValue, ...listOfMatchedValue, ...listOfUnMatchedLabel]);
    }
    this.clearInput();
  }

  onOverlayKeyDown(e: KeyboardEvent): void {
    if (e.keyCode === ESCAPE) {
      this.setOpenState(false);
    }
  }

  onKeyDown(e: KeyboardEvent): void {
    if (this.vtsDisabled) {
      return;
    }
    const listOfFilteredOptionNotDisabled = this.listOfContainerItem
      .filter(item => item.type === 'item')
      .filter(item => !item.vtsDisabled);
    const activatedIndex = listOfFilteredOptionNotDisabled.findIndex(item =>
      this.vtsCustomCompareFn(item.vtsValue, this.activatedValue)
    );
    switch (e.keyCode) {
      case UP_ARROW:
        e.preventDefault();
        if (this.vtsOpen) {
          const preIndex =
            activatedIndex > 0 ? activatedIndex - 1 : listOfFilteredOptionNotDisabled.length - 1;
          this.activatedValue = listOfFilteredOptionNotDisabled[preIndex].vtsValue;
        }
        break;
      case DOWN_ARROW:
        e.preventDefault();
        if (this.vtsOpen) {
          const nextIndex =
            activatedIndex < listOfFilteredOptionNotDisabled.length - 1 ? activatedIndex + 1 : 0;
          this.activatedValue = listOfFilteredOptionNotDisabled[nextIndex].vtsValue;
        } else {
          this.setOpenState(true);
        }
        break;
      case ENTER:
        e.preventDefault();
        if (this.vtsOpen) {
          if (isNotNil(this.activatedValue)) {
            this.onItemClick(this.activatedValue);
          }
        } else {
          this.setOpenState(true);
        }
        break;
      case SPACE:
        if (!this.vtsOpen) {
          this.setOpenState(true);
          e.preventDefault();
        }
        break;
      case TAB:
        this.setOpenState(false);
        break;
      case ESCAPE:
        /**
         * Skip the ESCAPE processing, it will be handled in {@link onOverlayKeyDown}.
         */
        break;
      default:
        if (!this.vtsOpen) {
          this.setOpenState(true);
        }
    }
  }

  setOpenState(value: boolean): void {
    if (this.vtsOpen !== value) {
      this.vtsOpen = value;
      this.vtsOpenChange.emit(value);
      this.onOpenChange();
      this.cdr.markForCheck();
    }
  }

  onOpenChange(): void {
    this.updateCdkConnectedOverlayStatus();
    this.clearInput();
  }

  onInputValueChange(value: string): void {
    this.searchValue = value;
    this.updateListOfContainerItem();
    this.vtsOnSearch.emit(value);
    this.updateCdkConnectedOverlayPositions();
  }

  onClearSelection(): void {
    this.updateListOfValue([]);
  }

  onClickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.setOpenState(false);
    }
  }

  focus(): void {
    this.vtsSelectTopControlComponent.focus();
  }

  blur(): void {
    this.vtsSelectTopControlComponent.blur();
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.dropDownPosition = position.connectionPair.originY;
  }

  updateCdkConnectedOverlayStatus(): void {
    if (this.platform.isBrowser && this.originElement.nativeElement) {
      reqAnimFrame(() => {
        this.triggerWidth = this.originElement.nativeElement.getBoundingClientRect().width;
        this.cdr.markForCheck();
      });
    }
  }

  updateCdkConnectedOverlayPositions(): void {
    reqAnimFrame(() => {
      this.cdkConnectedOverlay?.overlayRef?.updatePosition();
    });
  }

  constructor(
    public vtsConfigService: VtsConfigService,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    private platform: Platform,
    private focusMonitor: FocusMonitor,
    @Optional() private directionality: Directionality,
    @Host() @Optional() public noAnimation?: VtsNoAnimationDirective
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-select');
  }

  writeValue(modelValue: VtsSafeAny | VtsSafeAny[]): void {
    /** https://github.com/angular/angular/issues/14988 **/
    if (this.value !== modelValue) {
      this.value = modelValue;
      const covertModelToList = (
        model: VtsSafeAny[] | VtsSafeAny,
        mode: VtsSelectModeType
      ): VtsSafeAny[] => {
        if (model === null || model === undefined) {
          return [];
        } else if (mode === 'default') {
          return [model];
        } else {
          return model;
        }
      };
      const listOfValue = covertModelToList(modelValue, this.vtsMode);
      this.listOfValue = listOfValue;
      this.listOfValue$.next(listOfValue);
      this.cdr.markForCheck();
    }
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.vtsDisabled = disabled;
    if (disabled) {
      this.setOpenState(false);
    }
    this.cdr.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsOpen, vtsDisabled, vtsOptions } = changes;
    if (vtsOpen) {
      this.onOpenChange();
    }
    if (vtsDisabled && this.vtsDisabled) {
      this.setOpenState(false);
    }
    if (vtsOptions) {
      this.isReactiveDriven = true;
      const listOfOptions = this.vtsOptions || [];
      const listOfTransformedItem = listOfOptions.map(item => {
        return {
          template: item.label instanceof TemplateRef ? item.label : null,
          vtsLabel: typeof item.label === 'string' ? item.label : null,
          vtsValue: item.value,
          vtsDisabled: item.disabled || false,
          vtsHide: item.hide || false,
          vtsCustomContent: item.label instanceof TemplateRef,
          groupLabel: item.groupLabel || null,
          type: 'item',
          key: item.value
        };
      });
      this.listOfTemplateItem$.next(listOfTransformedItem);
    }
  }

  ngOnInit(): void {
    this.focusMonitor
      .monitor(this.elementRef, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe(focusOrigin => {
        if (!focusOrigin) {
          this.focused = false;
          this.cdr.markForCheck();
          this.vtsBlur.emit();
          Promise.resolve().then(() => {
            this.onTouched();
          });
        } else {
          this.focused = true;
          this.cdr.markForCheck();
          this.vtsFocus.emit();
        }
      });
    combineLatest([this.listOfValue$, this.listOfTemplateItem$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([listOfSelectedValue, listOfTemplateItem]) => {
        const listOfTagItem = listOfSelectedValue
          .filter(() => this.vtsMode === 'tags')
          .filter(
            value =>
              listOfTemplateItem.findIndex(o => this.vtsCustomCompareFn(o.vtsValue, value)) === -1
          )
          .map(
            value =>
              this.listOfTopItem.find(o => this.vtsCustomCompareFn(o.vtsValue, value)) ||
              this.generateTagItem(value)
          );
        this.listOfTagAndTemplateItem = [...listOfTemplateItem, ...listOfTagItem];
        this.listOfTopItem = this.listOfValue
          .map(
            v =>
              [...this.listOfTagAndTemplateItem, ...this.listOfTopItem].find(item =>
                this.vtsCustomCompareFn(v, item.vtsValue)
              )!
          )
          .filter(item => !!item);
        this.updateListOfContainerItem();
      });

    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.vtsConfigService
      .getConfigChangeEventForComponent('select')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });

    this.dir = this.directionality.value;
  }

  ngAfterContentInit(): void {
    if (!this.isReactiveDriven) {
      merge(this.listOfVtsOptionGroupComponent.changes, this.listOfVtsOptionComponent.changes)
        .pipe(
          startWith(true),
          switchMap(() =>
            merge(
              ...[
                this.listOfVtsOptionComponent.changes,
                this.listOfVtsOptionGroupComponent.changes,
                ...this.listOfVtsOptionComponent.map(option => option.changes),
                ...this.listOfVtsOptionGroupComponent.map(option => option.changes)
              ]
            ).pipe(startWith(true))
          ),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          const listOfOptionInterface = this.listOfVtsOptionComponent.toArray().map(item => {
            const {
              template,
              vtsLabel,
              vtsValue,
              vtsDisabled,
              vtsHide,
              vtsCustomContent,
              groupLabel
            } = item;
            return {
              template,
              vtsLabel,
              vtsValue,
              vtsDisabled,
              vtsHide,
              vtsCustomContent,
              groupLabel,
              type: 'item',
              key: vtsValue
            };
          });
          this.listOfTemplateItem$.next(listOfOptionInterface);
          this.cdr.markForCheck();
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
