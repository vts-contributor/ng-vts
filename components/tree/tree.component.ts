/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Direction, Directionality } from '@angular/cdk/bidi';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  forwardRef,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChange,
  SkipSelf,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { treeAccordionMotion } from '@ui-vts/ng-vts/core/animation';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { VtsNoAnimationDirective } from '@ui-vts/ng-vts/core/no-animation';
import {
  flattenTreeData,
  VtsFormatBeforeDropEvent,
  VtsFormatEmitEvent,
  VtsTreeBase,
  VtsTreeBaseService,
  VtsTreeHigherOrderServiceToken,
  VtsTreeNode,
  VtsTreeNodeKey,
  VtsTreeNodeOptions
} from '@ui-vts/ng-vts/core/tree';
import { BooleanInput, VtsSafeAny, VtsSizeLMSType } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsTreeService } from './tree.service';

export function VtsTreeServiceFactory(
  higherOrderService: VtsTreeBaseService,
  treeService: VtsTreeService
): VtsTreeBaseService {
  return higherOrderService ? higherOrderService : treeService;
}

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'tree';

const SIZE: { [k in VtsSizeLMSType]: number } = {
  sm: 32,
  md: 40,
  lg: 48
};
const DEFAULT_SIZE = SIZE.md;

@Component({
  selector: 'vts-tree',
  exportAs: 'vtsTree',
  animations: [treeAccordionMotion],
  template: `
    <div role="tree">
      <input [ngStyle]="HIDDEN_STYLE" />
    </div>
    <div class="vts-tree-list" [class.vts-select-tree-list]="vtsSelectMode">
      <div>
        <cdk-virtual-scroll-viewport
          *ngIf="vtsVirtualHeight"
          [class.vts-select-tree-list-holder-inner]="vtsSelectMode"
          [class.vts-tree-list-holder-inner]="!vtsSelectMode"
          [itemSize]="vtsVirtualItemSize"
          [minBufferPx]="vtsVirtualMinBufferPx"
          [maxBufferPx]="vtsVirtualMaxBufferPx"
          [style.height]="vtsVirtualHeight"
        >
          <ng-container *cdkVirtualFor="let node of vtsFlattenNodes; trackBy: trackByFlattenNode">
            <ng-template
              [ngTemplateOutlet]="nodeTemplate"
              [ngTemplateOutletContext]="{ $implicit: node }"
            ></ng-template>
          </ng-container>
        </cdk-virtual-scroll-viewport>

        <div
          *ngIf="!vtsVirtualHeight"
          [class.vts-select-tree-list-holder-inner]="vtsSelectMode"
          [class.vts-tree-list-holder-inner]="!vtsSelectMode"
          [@.disabled]="beforeInit || noAnimation?.vtsNoAnimation"
          [vtsNoAnimation]="noAnimation?.vtsNoAnimation"
          [@treeAccordionMotion]="vtsFlattenNodes.length"
        >
          <ng-container *ngFor="let node of vtsFlattenNodes; trackBy: trackByFlattenNode">
            <ng-template
              [ngTemplateOutlet]="nodeTemplate"
              [ngTemplateOutletContext]="{ $implicit: node }"
            ></ng-template>
          </ng-container>
        </div>
      </div>
    </div>
    <ng-template #nodeTemplate let-treeNode>
      <vts-tree-node
        builtin
        [icon]="treeNode.icon"
        [title]="treeNode.title"
        [isLoading]="treeNode.isLoading"
        [isSelected]="treeNode.isSelected"
        [isDisabled]="treeNode.isDisabled"
        [isMatched]="treeNode.isMatched"
        [isExpanded]="treeNode.isExpanded"
        [isLeaf]="treeNode.isLeaf"
        [isStart]="treeNode.isStart"
        [isEnd]="treeNode.isEnd"
        [isChecked]="treeNode.isChecked"
        [isHalfChecked]="treeNode.isHalfChecked"
        [isDisableCheckbox]="treeNode.isDisableCheckbox"
        [isDisableExpand]="treeNode.isDisableExpand"
        [isSelectable]="treeNode.isSelectable"
        [canHide]="treeNode.canHide"
        [vtsTreeNode]="treeNode"
        [vtsSelectMode]="vtsSelectMode"
        [vtsShowLine]="vtsShowLine"
        [vtsExpandedIcon]="vtsExpandedIcon"
        [vtsDraggable]="vtsDraggable"
        [vtsCheckable]="vtsCheckable"
        [vtsSelectable]="vtsSelectable"
        [vtsShowExpand]="vtsShowExpand"
        [vtsAsyncData]="vtsAsyncData"
        [vtsSearchValue]="vtsSearchValue"
        [vtsHideUnMatched]="vtsHideUnMatched"
        [vtsBeforeDrop]="vtsBeforeDrop"
        [vtsShowIcon]="vtsShowIcon"
        [vtsTreeTemplate]="vtsTreeTemplate || vtsTreeTemplateChild"
        (vtsExpandChange)="eventTriggerChanged($event)"
        (vtsClick)="eventTriggerChanged($event)"
        (vtsDblClick)="eventTriggerChanged($event)"
        (vtsContextMenu)="eventTriggerChanged($event)"
        (vtsCheckBoxChange)="eventTriggerChanged($event)"
        (vtsOnDragStart)="eventTriggerChanged($event)"
        (vtsOnDragEnter)="eventTriggerChanged($event)"
        (vtsOnDragOver)="eventTriggerChanged($event)"
        (vtsOnDragLeave)="eventTriggerChanged($event)"
        (vtsOnDragEnd)="eventTriggerChanged($event)"
        (vtsOnDrop)="eventTriggerChanged($event)"
      ></vts-tree-node>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    VtsTreeService,
    {
      provide: VtsTreeBaseService,
      useFactory: VtsTreeServiceFactory,
      deps: [[new SkipSelf(), new Optional(), VtsTreeHigherOrderServiceToken], VtsTreeService]
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VtsTreeComponent),
      multi: true
    }
  ],
  host: {
    '[class.vts-select-tree]': `vtsSelectMode`,
    '[class.vts-select-tree-show-line]': `vtsSelectMode && vtsShowLine`,
    '[class.vts-select-tree-icon-hide]': `vtsSelectMode && !vtsShowIcon`,
    '[class.vts-select-tree-block-node]': `vtsSelectMode && vtsBlockNode`,
    '[class.vts-tree]': `!vtsSelectMode`,
    '[class.vts-tree-rtl]': `dir === 'rtl'`,
    '[class.vts-tree-show-line]': `!vtsSelectMode && vtsShowLine`,
    '[class.vts-tree-icon-hide]': `!vtsSelectMode && !vtsShowIcon`,
    '[class.vts-tree-block-node]': `!vtsSelectMode && vtsBlockNode`,
    '[class.draggable-tree]': `vtsDraggable`,
    '[class.vts-tree-sm]': '!vtsSelectMode && vtsSize === "sm"',
    '[class.vts-tree-md]': '!vtsSelectMode && vtsSize === "md"',
    '[class.vts-tree-lg]': '!vtsSelectMode && vtsSize === "lg"',
    '[class.vts-select-tree-sm]': 'vtsSelectMode && vtsSize === "sm"',
    '[class.vts-select-tree-md]': 'vtsSelectMode && vtsSize === "md"',
    '[class.vts-select-tree-lg]': 'vtsSelectMode && vtsSize === "lg"'
  }
})
export class VtsTreeComponent
  extends VtsTreeBase
  implements OnInit, OnDestroy, ControlValueAccessor, OnChanges, AfterViewInit
{
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;

  static ngAcceptInputType_vtsShowIcon: BooleanInput;
  static ngAcceptInputType_vtsHideUnMatched: BooleanInput;
  static ngAcceptInputType_vtsExpandAll: BooleanInput;
  static ngAcceptInputType_vtsSelectMode: BooleanInput;
  static ngAcceptInputType_vtsCheckStrictly: BooleanInput;
  static ngAcceptInputType_vtsShowExpand: BooleanInput;
  static ngAcceptInputType_vtsShowLine: BooleanInput;
  static ngAcceptInputType_vtsCheckable: BooleanInput;
  static ngAcceptInputType_vtsSelectable: BooleanInput;
  static ngAcceptInputType_vtsAsyncData: BooleanInput;
  static ngAcceptInputType_vtsDraggable: BooleanInput;
  static ngAcceptInputType_vtsMultiple: BooleanInput;

  @Input() @InputBoolean() @WithConfig() vtsShowIcon: boolean = true;
  @Input() @InputBoolean() @WithConfig() vtsHideUnMatched: boolean = false;
  @Input() @InputBoolean() vtsExpandAll = false;
  @Input() @InputBoolean() vtsSelectMode = false;
  @Input() @InputBoolean() vtsCheckStrictly = false;
  @Input() @InputBoolean() vtsShowExpand: boolean = true;
  @Input() @InputBoolean() vtsShowLine = false;
  @Input() @InputBoolean() vtsCheckable = false;
  @Input() @InputBoolean() vtsSelectable = false;
  @Input() @InputBoolean() vtsAsyncData = false;
  @Input() @InputBoolean() vtsDraggable: boolean = false;
  @Input() @InputBoolean() vtsMultiple = false;
  @Input() @WithConfig() vtsSize: VtsSizeLMSType = 'md';
  @Input() vtsExpandedIcon?: TemplateRef<{
    $implicit: VtsTreeNode;
    origin: VtsTreeNodeOptions;
  }>;
  @Input() vtsVirtualItemSize = DEFAULT_SIZE;
  @Input() vtsVirtualMaxBufferPx = DEFAULT_SIZE * 10;
  @Input() vtsVirtualMinBufferPx = DEFAULT_SIZE * 5;
  @Input() vtsVirtualHeight: string | null = null;
  @Input() vtsTreeTemplate?: TemplateRef<{
    $implicit: VtsTreeNode;
    origin: VtsTreeNodeOptions;
  }>;
  @Input() vtsBeforeDrop?: (confirm: VtsFormatBeforeDropEvent) => Observable<boolean>;
  @Input() vtsData: VtsTreeNodeOptions[] | VtsTreeNode[] = [];
  @Input() vtsExpandedKeys: VtsTreeNodeKey[] = [];
  @Input() vtsSelectedKeys: VtsTreeNodeKey[] = [];
  @Input() vtsCheckedKeys: VtsTreeNodeKey[] = [];
  @Input() vtsSearchValue: string = '';
  @Input() vtsSearchFunc?: (node: VtsTreeNodeOptions) => boolean;
  @ContentChild('vtsTreeTemplate', { static: true })
  vtsTreeTemplateChild!: TemplateRef<{
    $implicit: VtsTreeNode;
    origin: VtsTreeNodeOptions;
  }>;
  @ViewChild(CdkVirtualScrollViewport, { read: CdkVirtualScrollViewport })
  cdkVirtualScrollViewport!: CdkVirtualScrollViewport;
  vtsFlattenNodes: VtsTreeNode[] = [];
  beforeInit = true;
  dir: Direction = 'ltr';

  @Output() readonly vtsExpandedKeysChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() readonly vtsSelectedKeysChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() readonly vtsCheckedKeysChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output()
  readonly vtsSearchValueChange = new EventEmitter<VtsFormatEmitEvent>();
  @Output() readonly vtsClick = new EventEmitter<VtsFormatEmitEvent>();
  @Output() readonly vtsDblClick = new EventEmitter<VtsFormatEmitEvent>();
  @Output() readonly vtsContextMenu = new EventEmitter<VtsFormatEmitEvent>();
  @Output() readonly vtsCheckBoxChange = new EventEmitter<VtsFormatEmitEvent>();
  @Output() readonly vtsExpandChange = new EventEmitter<VtsFormatEmitEvent>();
  @Output() readonly vtsOnDragStart = new EventEmitter<VtsFormatEmitEvent>();
  @Output() readonly vtsOnDragEnter = new EventEmitter<VtsFormatEmitEvent>();
  @Output() readonly vtsOnDragOver = new EventEmitter<VtsFormatEmitEvent>();
  @Output() readonly vtsOnDragLeave = new EventEmitter<VtsFormatEmitEvent>();
  @Output() readonly vtsOnDrop = new EventEmitter<VtsFormatEmitEvent>();
  @Output() readonly vtsOnDragEnd = new EventEmitter<VtsFormatEmitEvent>();

  HIDDEN_STYLE = {
    width: 0,
    height: 0,
    display: 'flex',
    overflow: 'hidden',
    opacity: 0,
    border: 0,
    padding: 0,
    margin: 0
  };

  destroy$ = new Subject();

  onChange: (value: VtsTreeNode[]) => void = () => null;
  onTouched: () => void = () => null;

  writeValue(value: VtsTreeNode[]): void {
    this.handleVtsData(value);
  }

  registerOnChange(fn: (_: VtsTreeNode[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Render all properties of vtsTree
   * @param changes: all changes from @Input
   */
  renderTreeProperties(changes: { [propertyName: string]: SimpleChange }): void {
    let useDefaultExpandedKeys = false;
    let expandAll = false;
    const {
      vtsSize,
      vtsData,
      vtsExpandedKeys,
      vtsSelectedKeys,
      vtsCheckedKeys,
      vtsCheckStrictly,
      vtsExpandAll,
      vtsMultiple,
      vtsSearchValue
    } = changes;

    if (vtsSize) {
      const size = SIZE[vtsSize.currentValue as VtsSizeLMSType];
      this.vtsVirtualItemSize = size;
      this.vtsVirtualMinBufferPx = size * 5;
      this.vtsVirtualMaxBufferPx = size * 10;
    }

    if (vtsExpandAll) {
      useDefaultExpandedKeys = true;
      expandAll = this.vtsExpandAll;
    }

    if (vtsMultiple) {
      this.vtsTreeService.isMultiple = this.vtsMultiple;
    }

    if (vtsCheckStrictly) {
      this.vtsTreeService.isCheckStrictly = this.vtsCheckStrictly;
    }

    if (vtsData) {
      this.handleVtsData(this.vtsData);
    }

    if (vtsCheckedKeys) {
      this.handleCheckedKeys(this.vtsCheckedKeys);
    }

    if (vtsCheckStrictly) {
      this.handleCheckedKeys(null);
    }

    if (vtsExpandedKeys || vtsExpandAll) {
      useDefaultExpandedKeys = true;
      this.handleExpandedKeys(expandAll || this.vtsExpandedKeys);
    }

    if (vtsSelectedKeys) {
      this.handleSelectedKeys(this.vtsSelectedKeys, this.vtsMultiple);
    }

    if (vtsSearchValue) {
      if (!(vtsSearchValue.firstChange && !this.vtsSearchValue)) {
        useDefaultExpandedKeys = false;
        this.handleSearchValue(vtsSearchValue.currentValue, this.vtsSearchFunc);
        this.vtsSearchValueChange.emit(this.vtsTreeService.formatEvent('search', null, null));
      }
    }

    // flatten data
    const currentExpandedKeys = this.getExpandedNodeList().map(v => v.key);
    const newExpandedKeys = useDefaultExpandedKeys
      ? expandAll || this.vtsExpandedKeys
      : currentExpandedKeys;
    this.handleFlattenNodes(this.vtsTreeService.rootNodes, newExpandedKeys);
  }

  trackByFlattenNode(_: number, node: VtsTreeNode): string {
    return node.key;
  }
  // Deal with properties
  /**
   * vtsData
   * @param value
   */
  handleVtsData(value: VtsSafeAny[]): void {
    if (Array.isArray(value)) {
      const data = this.coerceTreeNodes(value);
      this.vtsTreeService.initTree(data);
    }
  }

  handleFlattenNodes(data: VtsTreeNode[], expandKeys: VtsTreeNodeKey[] | true = []): void {
    this.vtsTreeService.flattenTreeData(data, expandKeys);
  }

  handleCheckedKeys(keys: VtsTreeNodeKey[] | null): void {
    this.vtsTreeService.conductCheck(keys, this.vtsCheckStrictly);
  }

  handleExpandedKeys(keys: VtsTreeNodeKey[] | true = []): void {
    this.vtsTreeService.conductExpandedKeys(keys);
  }

  handleSelectedKeys(keys: VtsTreeNodeKey[], isMulti: boolean): void {
    this.vtsTreeService.conductSelectedKeys(keys, isMulti);
  }

  handleSearchValue(value: string, searchFunc?: (node: VtsTreeNodeOptions) => boolean): void {
    const dataList = flattenTreeData(this.vtsTreeService.rootNodes, true).map(v => v.data);
    const checkIfMatched = (node: VtsTreeNode): boolean => {
      if (searchFunc) {
        return searchFunc(node.origin);
      }
      return !value || !node.title.toLowerCase().includes(value.toLowerCase()) ? false : true;
    };
    dataList.forEach(v => {
      v.isMatched = checkIfMatched(v);
      v.canHide = !v.isMatched;
      if (!v.isMatched) {
        v.setExpanded(false);
        this.vtsTreeService.setExpandedNodeList(v);
      } else {
        // expand
        this.vtsTreeService.expandNodeAllParentBySearch(v);
      }
      this.vtsTreeService.setMatchedNodeList(v);
    });
  }

  /**
   * Handle emit event
   * @param event
   * handle each event
   */
  eventTriggerChanged(event: VtsFormatEmitEvent): void {
    const node = event.node!;
    switch (event.eventName) {
      case 'expand':
        this.renderTree();
        this.vtsExpandChange.emit(event);
        break;
      case 'click':
        this.vtsClick.emit(event);
        break;
      case 'dblclick':
        this.vtsDblClick.emit(event);
        break;
      case 'contextmenu':
        this.vtsContextMenu.emit(event);
        break;
      case 'check':
        // Render checked state with nodes' property `isChecked`
        this.vtsTreeService.setCheckedNodeList(node);
        if (!this.vtsCheckStrictly) {
          this.vtsTreeService.conduct(node);
        }
        // Cause check method will rerender list, so we need recover it and next the new event to user
        const eventNext = this.vtsTreeService.formatEvent('check', node, event.event!);
        this.vtsCheckBoxChange.emit(eventNext);
        break;
      case 'dragstart':
        // if node is expanded
        if (node.isExpanded) {
          node.setExpanded(!node.isExpanded);
          this.renderTree();
        }
        this.vtsOnDragStart.emit(event);
        break;
      case 'dragenter':
        const selectedNode = this.vtsTreeService.getSelectedNode();
        if (selectedNode && selectedNode.key !== node.key && !node.isExpanded && !node.isLeaf) {
          node.setExpanded(true);
          this.renderTree();
        }
        this.vtsOnDragEnter.emit(event);
        break;
      case 'dragover':
        this.vtsOnDragOver.emit(event);
        break;
      case 'dragleave':
        this.vtsOnDragLeave.emit(event);
        break;
      case 'dragend':
        this.vtsOnDragEnd.emit(event);
        break;
      case 'drop':
        this.renderTree();
        this.vtsOnDrop.emit(event);
        break;
    }
  }

  /**
   * Click expand icon
   */
  renderTree(): void {
    this.handleFlattenNodes(
      this.vtsTreeService.rootNodes,
      this.getExpandedNodeList().map(v => v.key)
    );
    this.cdr.markForCheck();
  }
  // Handle emit event end

  constructor(
    vtsTreeService: VtsTreeBaseService,
    public vtsConfigService: VtsConfigService,
    private cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality,
    @Host() @Optional() public noAnimation?: VtsNoAnimationDirective
  ) {
    super(vtsTreeService);
  }

  ngOnInit(): void {
    this.vtsTreeService.flattenNodes$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.vtsFlattenNodes = data;
      this.cdr.markForCheck();
    });

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
    this.renderTreeProperties(changes);
  }

  ngAfterViewInit(): void {
    this.beforeInit = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
