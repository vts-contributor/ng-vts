/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';

import { Direction, Directionality } from '@angular/cdk/bidi';
import { BACKSPACE, ESCAPE, TAB } from '@angular/cdk/keycodes';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange
} from '@angular/cdk/overlay';
import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  Host,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  Self,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { slideMotion } from '@ui-vts/ng-vts/core/animation';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { VtsNoAnimationDirective } from '@ui-vts/ng-vts/core/no-animation';
import { reqAnimFrame } from '@ui-vts/ng-vts/core/polyfill';

import {
  VtsFormatEmitEvent,
  VtsTreeBase,
  VtsTreeBaseService,
  VtsTreeHigherOrderServiceToken,
  VtsTreeNode,
  VtsTreeNodeOptions
} from '@ui-vts/ng-vts/core/tree';
import {
  BooleanInput,
  NgStyleInterface,
  OnChangeType,
  OnTouchedType,
  VtsSizeLMSType,
  VtsSizeXLMSType
} from '@ui-vts/ng-vts/core/types';
import { InputBoolean, isNotNil } from '@ui-vts/ng-vts/core/util';
import { VtsSelectSearchComponent } from '@ui-vts/ng-vts/select';
import { VtsTreeComponent } from '@ui-vts/ng-vts/tree';

import { merge, of as observableOf, Subject, Subscription } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { VtsTreeSelectService } from './tree-select.service';

export function higherOrderServiceFactory(injector: Injector): VtsTreeBaseService {
  return injector.get(VtsTreeSelectService);
}

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'treeSelect';
const TREE_SELECT_DEFAULT_CLASS = 'vts-select-dropdown vts-select-tree-dropdown';

@Component({
  selector: 'vts-tree-select',
  exportAs: 'vtsTreeSelect',
  animations: [slideMotion],
  template: `
    <ng-template
      cdkConnectedOverlay
      vtsConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="vtsBackdrop"
      [cdkConnectedOverlayOrigin]="cdkOverlayOrigin"
      [cdkConnectedOverlayOpen]="vtsOpen"
      [cdkConnectedOverlayTransformOriginOn]="'.vts-select-tree-dropdown'"
      [cdkConnectedOverlayMinWidth]="$any(vtsDropdownMatchSelectWidth ? null : triggerWidth)"
      [cdkConnectedOverlayWidth]="$any(vtsDropdownMatchSelectWidth ? triggerWidth : null)"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="closeDropDown()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        [@slideMotion]="'enter'"
        [ngClass]="dropdownClassName"
        [@.disabled]="noAnimation?.vtsNoAnimation"
        [vtsNoAnimation]="noAnimation?.vtsNoAnimation"
        [class.vts-select-dropdown-placement-bottomLeft]="dropDownPosition === 'bottom'"
        [class.vts-select-dropdown-placement-topLeft]="dropDownPosition === 'top'"
        [class.vts-tree-select-dropdown-rtl]="dir === 'rtl'"
        [dir]="dir"
        [ngStyle]="vtsDropdownStyle"
      >
        <vts-tree
          #treeRef
          [hidden]="isNotFound"
          vtsNoAnimation
          vtsSelectMode
          vtsBlockNode
          vtsSelectable
          [vtsData]="vtsNodes"
          [vtsSize]="vtsTreeSize"
          [vtsMultiple]="vtsMultiple"
          [vtsSearchValue]="inputValue"
          [vtsHideUnMatched]="vtsHideUnMatched"
          [vtsShowIcon]="vtsShowIcon"
          [vtsCheckable]="vtsCheckable"
          [vtsAsyncData]="vtsAsyncData"
          [vtsShowExpand]="vtsShowExpand"
          [vtsShowLine]="vtsShowLine"
          [vtsExpandedIcon]="vtsExpandedIcon"
          [vtsExpandAll]="vtsExpandAll"
          [vtsExpandedKeys]="expandedKeys"
          [vtsCheckedKeys]="vtsCheckable ? value : []"
          [vtsSelectedKeys]="!vtsCheckable ? value : []"
          [vtsTreeTemplate]="treeTemplate"
          [vtsCheckStrictly]="vtsCheckStrictly"
          [vtsVirtualItemSize]="vtsVirtualItemSize"
          [vtsVirtualMaxBufferPx]="vtsVirtualMaxBufferPx"
          [vtsVirtualMinBufferPx]="vtsVirtualMinBufferPx"
          [vtsVirtualHeight]="vtsVirtualHeight"
          (vtsExpandChange)="onExpandedKeysChange($event)"
          (vtsClick)="vtsTreeClick.emit($event)"
          (vtsCheckedKeysChange)="updateSelectedNodes()"
          (vtsSelectedKeysChange)="updateSelectedNodes()"
          (vtsCheckBoxChange)="vtsTreeCheckBoxChange.emit($event)"
          (vtsSearchValueChange)="setSearchValues($event)"
        ></vts-tree>
        <span *ngIf="vtsNodes.length === 0 || isNotFound" class="vts-select-not-found">
          <vts-embed-empty
            [vtsComponentName]="'tree-select'"
            [specificContent]="vtsNoResult"
          ></vts-embed-empty>
        </span>
      </div>
    </ng-template>

    <div cdkOverlayOrigin class="vts-select-selector">
      <ng-container *ngIf="isMultiple">
        <vts-select-item
          *ngFor="let node of selectedNodes | slice : 0 : vtsMaxTagCount; trackBy: trackValue"
          [deletable]="true"
          [disabled]="node.isDisabled || vtsDisabled"
          [label]="vtsDisplayWith(node)"
          (delete)="removeSelected(node, true)"
        ></vts-select-item>

        <vts-select-item
          *ngIf="selectedNodes.length > vtsMaxTagCount"
          [contentTemplateOutlet]="vtsMaxTagPlaceholder"
          [contentTemplateOutletContext]="selectedNodes | slice : vtsMaxTagCount"
          [deletable]="false"
          [disabled]="false"
          [label]="'+ ' + (selectedNodes.length - vtsMaxTagCount) + ' ...'"
        ></vts-select-item>
      </ng-container>

      <vts-select-search
        [vtsId]="vtsId"
        [showInput]="vtsShowSearch"
        (keydown)="onKeyDownInput($event)"
        (isComposingChange)="isComposing = $event"
        (valueChange)="setInputValue($event)"
        [value]="inputValue"
        [mirrorSync]="isMultiple"
        [disabled]="vtsDisabled"
        [focusTrigger]="vtsOpen"
      ></vts-select-search>

      <vts-select-placeholder
        *ngIf="vtsPlaceHolder && selectedNodes.length === 0"
        [placeholder]="vtsPlaceHolder"
        [style.display]="placeHolderDisplay"
      ></vts-select-placeholder>

      <vts-select-item
        *ngIf="!isMultiple && selectedNodes.length === 1 && !isComposing && inputValue === ''"
        [deletable]="false"
        [disabled]="false"
        [label]="vtsDisplayWith(selectedNodes[0])"
      ></vts-select-item>

      <vts-select-arrow></vts-select-arrow>

      <vts-select-clear
        *ngIf="vtsAllowClear && !vtsDisabled && selectedNodes.length"
        (clear)="onClearSelection()"
      ></vts-select-clear>

      <vts-select-multiple-count
        *ngIf="isMultiple && !vtsDisabled && !!value?.length"
        [count]="value.length"
      ></vts-select-multiple-count>
    </div>
  `,
  providers: [
    VtsTreeSelectService,
    {
      provide: VtsTreeHigherOrderServiceToken,
      useFactory: higherOrderServiceFactory,
      deps: [[new Self(), Injector]]
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VtsTreeSelectComponent),
      multi: true
    }
  ],
  host: {
    '[class.vts-select-xl]': 'vtsSize==="xl"',
    '[class.vts-select-lg]': 'vtsSize==="lg"',
    '[class.vts-select-md]': 'vtsSize==="md"',
    '[class.vts-select-sm]': 'vtsSize==="sm"',
    '[class.vts-select-rtl]': 'dir==="rtl"',
    '[class.vts-select-disabled]': 'vtsDisabled',
    '[class.vts-select-single]': '!isMultiple',
    '[class.vts-select-show-arrow]': '!isMultiple',
    '[class.vts-select-show-search]': '!isMultiple',
    '[class.vts-select-multiple]': 'isMultiple',
    '[class.vts-select-allow-clear]': 'vtsAllowClear',
    '[class.vts-select-open]': 'vtsOpen',
    '[class.vts-select-focused]': 'vtsOpen || focused',
    '(click)': 'trigger()',
    '(keydown)': 'onKeydown($event)'
  }
})
export class VtsTreeSelectComponent
  extends VtsTreeBase
  implements ControlValueAccessor, OnInit, OnDestroy, OnChanges
{
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;

  static ngAcceptInputType_vtsAllowClear: BooleanInput;
  static ngAcceptInputType_vtsShowExpand: BooleanInput;
  static ngAcceptInputType_vtsShowLine: BooleanInput;
  static ngAcceptInputType_vtsDropdownMatchSelectWidth: BooleanInput;
  static ngAcceptInputType_vtsCheckable: BooleanInput;
  static ngAcceptInputType_vtsHideUnMatched: BooleanInput;
  static ngAcceptInputType_vtsShowIcon: BooleanInput;
  static ngAcceptInputType_vtsShowSearch: BooleanInput;
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsAsyncData: BooleanInput;
  static ngAcceptInputType_vtsMultiple: BooleanInput;
  static ngAcceptInputType_vtsExpandAll: BooleanInput;
  static ngAcceptInputType_vtsCheckStrictly: BooleanInput;

  @Input() vtsId: string | null = null;
  @Input() @InputBoolean() vtsAllowClear: boolean = true;
  @Input() @InputBoolean() vtsShowExpand: boolean = true;
  @Input() @InputBoolean() vtsShowLine: boolean = false;
  @Input()
  @InputBoolean()
  @WithConfig()
  vtsDropdownMatchSelectWidth: boolean = true;
  @Input() @InputBoolean() vtsCheckable: boolean = false;
  @Input() @InputBoolean() @WithConfig() vtsHideUnMatched: boolean = false;
  @Input() @InputBoolean() @WithConfig() vtsShowIcon: boolean = false;
  @Input() @InputBoolean() vtsShowSearch: boolean = false;
  @Input() @InputBoolean() vtsDisabled = false;
  @Input() @InputBoolean() vtsAsyncData = false;
  @Input() @InputBoolean() vtsMultiple = false;
  @Input() @InputBoolean() vtsExpandAll = false;
  @Input() @InputBoolean() vtsCheckStrictly = false;
  @Input() vtsVirtualItemSize = 28;
  @Input() vtsVirtualMaxBufferPx = 500;
  @Input() vtsVirtualMinBufferPx = 28;
  @Input() vtsVirtualHeight: string | null = null;
  @Input() vtsExpandedIcon?: TemplateRef<{
    $implicit: VtsTreeNode;
    origin: VtsTreeNodeOptions;
  }>;
  @Input() vtsNoResult?: string;
  @Input() vtsNodes: Array<VtsTreeNode | VtsTreeNodeOptions> = [];
  @Input() vtsOpen = false;
  @Input() vtsTreeSize: VtsSizeLMSType = 'md';
  @Input() vtsSize: VtsSizeXLMSType = 'md';
  @Input() vtsPlaceHolder = '';
  @Input() vtsDropdownStyle: NgStyleInterface | null = null;
  @Input() vtsDropdownClassName?: string;
  @Input() @WithConfig() vtsBackdrop = false;
  @Input()
  set vtsExpandedKeys(value: string[]) {
    this.expandedKeys = value;
  }
  get vtsExpandedKeys(): string[] {
    return this.expandedKeys;
  }

  @Input() vtsDisplayWith: (node: VtsTreeNode) => string | undefined = (node: VtsTreeNode) =>
    node.title;
  @Input() vtsMaxTagCount!: number;
  @Input() vtsMaxTagPlaceholder: TemplateRef<{
    $implicit: VtsTreeNode[];
  }> | null = null;
  @Output() readonly vtsOpenChange = new EventEmitter<boolean>();
  @Output() readonly vtsCleared = new EventEmitter<void>();
  @Output() readonly vtsRemoved = new EventEmitter<VtsTreeNode>();
  @Output() readonly vtsExpandChange = new EventEmitter<VtsFormatEmitEvent>();
  @Output() readonly vtsTreeClick = new EventEmitter<VtsFormatEmitEvent>();
  @Output()
  readonly vtsTreeCheckBoxChange = new EventEmitter<VtsFormatEmitEvent>();

  @ViewChild(VtsSelectSearchComponent, { static: false })
  vtsSelectSearchComponent!: VtsSelectSearchComponent;
  @ViewChild('treeRef', { static: false }) treeRef!: VtsTreeComponent;
  @ViewChild(CdkOverlayOrigin, { static: true })
  cdkOverlayOrigin!: CdkOverlayOrigin;
  @ViewChild(CdkConnectedOverlay, { static: false })
  cdkConnectedOverlay!: CdkConnectedOverlay;

  @Input() vtsTreeTemplate!: TemplateRef<{
    $implicit: VtsTreeNode;
    origin: VtsTreeNodeOptions;
  }>;
  @ContentChild('vtsTreeTemplate', { static: true })
  vtsTreeTemplateChild!: TemplateRef<{
    $implicit: VtsTreeNode;
    origin: VtsTreeNodeOptions;
  }>;
  get treeTemplate(): TemplateRef<{
    $implicit: VtsTreeNode;
    origin: VtsTreeNodeOptions;
  }> {
    return this.vtsTreeTemplate || this.vtsTreeTemplateChild;
  }

  dropdownClassName = TREE_SELECT_DEFAULT_CLASS;
  triggerWidth?: number;
  isComposing = false;
  isDestroy = true;
  isNotFound = false;
  focused = false;
  inputValue = '';
  dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';
  selectionChangeSubscription!: Subscription;
  focusChangeSubscription!: Subscription;
  selectedNodes: VtsTreeNode[] = [];
  expandedKeys: string[] = [];
  value: string[] = [];
  dir: Direction = 'ltr';

  private destroy$ = new Subject<void>();

  onChange: OnChangeType = _value => {};
  onTouched: OnTouchedType = () => {};

  get placeHolderDisplay(): string {
    return this.inputValue || this.isComposing || this.selectedNodes.length ? 'none' : 'block';
  }

  get isMultiple(): boolean {
    return this.vtsMultiple || this.vtsCheckable;
  }

  constructor(
    vtsTreeService: VtsTreeSelectService,
    public vtsConfigService: VtsConfigService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality,
    private focusMonitor: FocusMonitor,
    @Host() @Optional() public noAnimation?: VtsNoAnimationDirective
  ) {
    super(vtsTreeService);
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-select');
    this.renderer.addClass(this.elementRef.nativeElement, 'vts-select');
    this.renderer.addClass(this.elementRef.nativeElement, 'vts-tree-select');
  }

  ngOnInit(): void {
    this.isDestroy = false;
    this.selectionChangeSubscription = this.subscribeSelectionChange();

    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;

    this.focusChangeSubscription = this.focusMonitor
      .monitor(this.elementRef, true)
      .subscribe(focusOrigin => {
        if (!focusOrigin) {
          this.focused = false;
          this.cdr.markForCheck();
          Promise.resolve().then(() => {
            this.onTouched();
          });
        } else {
          this.focused = true;
          this.cdr.markForCheck();
        }
      });
  }

  ngOnDestroy(): void {
    this.isDestroy = true;
    this.closeDropDown();
    this.selectionChangeSubscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
    this.focusChangeSubscription.unsubscribe();
  }

  isComposingChange(isComposing: boolean): void {
    this.isComposing = isComposing;
  }

  setDisabledState(isDisabled: boolean): void {
    this.vtsDisabled = isDisabled;
    this.closeDropDown();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsNodes, vtsDropdownClassName } = changes;
    if (vtsNodes) {
      this.updateSelectedNodes(true);
    }
    if (vtsDropdownClassName) {
      const className = this.vtsDropdownClassName && this.vtsDropdownClassName.trim();
      this.dropdownClassName = className
        ? `${TREE_SELECT_DEFAULT_CLASS} ${className}`
        : TREE_SELECT_DEFAULT_CLASS;
    }
  }

  writeValue(value: string[] | string): void {
    if (isNotNil(value)) {
      if (this.isMultiple && Array.isArray(value)) {
        this.value = value;
      } else {
        this.value = [value as string];
      }
      this.updateSelectedNodes(true);
    } else {
      this.value = [];
      this.selectedNodes.forEach(node => {
        this.removeSelected(node, false);
      });
      this.selectedNodes = [];
    }
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (_: string[] | string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.vtsDisabled) {
      return;
    }
    switch (event.keyCode) {
      case ESCAPE:
        /**
         * Skip the ESCAPE processing, it will be handled in {@link onOverlayKeyDown}.
         */
        break;
      case TAB:
        this.closeDropDown();
        break;
      default:
        if (!this.vtsOpen) {
          this.openDropdown();
        }
    }
  }

  trigger(): void {
    if (this.vtsDisabled || (!this.vtsDisabled && this.vtsOpen)) {
      this.closeDropDown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown(): void {
    if (!this.vtsDisabled) {
      this.vtsOpen = true;
      this.vtsOpenChange.emit(this.vtsOpen);
      this.updateCdkConnectedOverlayStatus();
      if (this.vtsShowSearch || this.isMultiple) {
        this.focusOnInput();
      }
    }
  }

  closeDropDown(): void {
    this.onTouched();
    this.vtsOpen = false;
    this.inputValue = '';
    this.isNotFound = false;
    this.vtsOpenChange.emit(this.vtsOpen);
    this.cdr.markForCheck();
  }

  onKeyDownInput(e: KeyboardEvent): void {
    const keyCode = e.keyCode;
    const eventTarget = e.target as HTMLInputElement;
    if (this.isMultiple && !eventTarget.value && keyCode === BACKSPACE) {
      e.preventDefault();
      if (this.selectedNodes.length) {
        const removeNode = this.selectedNodes[this.selectedNodes.length - 1];
        this.removeSelected(removeNode);
      }
    }
  }

  onExpandedKeysChange(value: VtsFormatEmitEvent): void {
    this.vtsExpandChange.emit(value);
    this.expandedKeys = [...value.keys!];
  }

  setInputValue(value: string): void {
    this.inputValue = value;
    this.updatePosition();
  }

  removeSelected(node: VtsTreeNode, emit: boolean = true): void {
    node.isSelected = false;
    node.isChecked = false;
    if (this.vtsCheckable) {
      this.vtsTreeService.conduct(node, this.vtsCheckStrictly);
    } else {
      this.vtsTreeService.setSelectedNodeList(node, this.vtsMultiple);
    }

    if (emit) {
      this.vtsRemoved.emit(node);
    }
  }

  focusOnInput(): void {
    if (this.vtsSelectSearchComponent) {
      this.vtsSelectSearchComponent.focus();
    }
  }

  subscribeSelectionChange(): Subscription {
    return merge(
      this.vtsTreeClick.pipe(
        tap((event: VtsFormatEmitEvent) => {
          const node = event.node!;
          if (this.vtsCheckable && !node.isDisabled && !node.isDisableCheckbox) {
            node.isChecked = !node.isChecked;
            node.isHalfChecked = false;
            if (!this.vtsCheckStrictly) {
              this.vtsTreeService.conduct(node);
            }
          }
          if (this.vtsCheckable) {
            node.isSelected = false;
          }
        }),
        filter((event: VtsFormatEmitEvent) => {
          const node = event.node!;
          return this.vtsCheckable
            ? !node.isDisabled && !node.isDisableCheckbox
            : !node.isDisabled && node.isSelectable;
        })
      ),
      this.vtsCheckable ? this.vtsTreeCheckBoxChange : observableOf(),
      this.vtsCleared,
      this.vtsRemoved
    ).subscribe(() => {
      this.updateSelectedNodes();
      const value = this.selectedNodes.map(node => node.key!);
      this.value = [...value];
      if (this.vtsShowSearch || this.isMultiple) {
        this.inputValue = '';
        this.isNotFound = false;
      }
      if (this.isMultiple) {
        this.onChange(value);
        this.focusOnInput();
        this.updatePosition();
      } else {
        this.closeDropDown();
        this.onChange(value.length ? value[0] : null);
      }
    });
  }

  updateSelectedNodes(init: boolean = false): void {
    if (init) {
      const nodes = this.coerceTreeNodes(this.vtsNodes);
      this.vtsTreeService.isMultiple = this.isMultiple;
      this.vtsTreeService.isCheckStrictly = this.vtsCheckStrictly;
      this.vtsTreeService.initTree(nodes);
      if (this.vtsCheckable) {
        this.vtsTreeService.conductCheck(this.value, this.vtsCheckStrictly);
      } else {
        this.vtsTreeService.conductSelectedKeys(this.value, this.isMultiple);
      }
    }

    this.selectedNodes = [
      ...(this.vtsCheckable ? this.getCheckedNodeList() : this.getSelectedNodeList())
    ];
  }

  updatePosition(): void {
    reqAnimFrame(() => {
      this.cdkConnectedOverlay?.overlayRef?.updatePosition();
    });
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.dropDownPosition = position.connectionPair.originY;
  }

  onClearSelection(): void {
    this.selectedNodes.forEach(node => {
      this.removeSelected(node, false);
    });
    this.vtsCleared.emit();
  }

  onClickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropDown();
    }
  }

  setSearchValues($event: VtsFormatEmitEvent): void {
    Promise.resolve().then(() => {
      this.isNotFound =
        (this.vtsShowSearch || this.isMultiple) &&
        !!this.inputValue &&
        $event.matchedKeys!.length === 0;
    });
  }

  updateCdkConnectedOverlayStatus(): void {
    this.triggerWidth =
      this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
  }

  trackValue(_index: number, option: VtsTreeNode): string {
    return option.key!;
  }
}
