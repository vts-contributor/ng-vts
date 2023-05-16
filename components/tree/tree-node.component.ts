/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChange,
  TemplateRef
} from '@angular/core';
import { VtsNoAnimationDirective } from '@ui-vts/ng-vts/core/no-animation';

import {
  VtsFormatBeforeDropEvent,
  VtsFormatEmitEvent,
  VtsTreeBaseService,
  VtsTreeNode,
  VtsTreeNodeOptions
} from '@ui-vts/ng-vts/core/tree';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vts-tree-node[builtin]',
  exportAs: 'vtsTreeBuiltinNode',
  template: `
    <vts-tree-indent
      [vtsTreeLevel]="vtsTreeNode.level"
      [vtsSelectMode]="vtsSelectMode"
      [vtsIsStart]="isStart"
      [vtsIsEnd]="isEnd"
    ></vts-tree-indent>
    <vts-tree-node-switcher
      *ngIf="vtsShowExpand"
      [vtsShowExpand]="vtsShowExpand"
      [vtsShowLine]="vtsShowLine"
      [vtsExpandedIcon]="vtsExpandedIcon"
      [vtsSelectMode]="vtsSelectMode"
      [context]="vtsTreeNode"
      [isLeaf]="isLeaf"
      [isExpanded]="isExpanded"
      [isLoading]="isLoading"
      [isDisabled]="isDisabled"
      [isDisableExpand]="isDisableExpand"
      (click)="clickExpand($event)"
    ></vts-tree-node-switcher>
    <vts-tree-node-checkbox
      builtin
      *ngIf="vtsCheckable"
      (click)="clickCheckBox($event)"
      (dblclick)="dblClickCheckBox($event)"
      [vtsSelectMode]="vtsSelectMode"
      [isChecked]="isChecked"
      [isHalfChecked]="isHalfChecked"
      [isDisabled]="isDisabled"
      [isDisableCheckbox]="isDisableCheckbox"
    ></vts-tree-node-checkbox>
    <vts-tree-node-title
      [icon]="icon"
      [title]="title"
      [isLoading]="isLoading"
      [isSelected]="isSelected"
      [isDisabled]="isDisabled"
      [isMatched]="isMatched"
      [isExpanded]="isExpanded"
      [isLeaf]="isLeaf"
      [searchValue]="vtsSearchValue"
      [treeTemplate]="vtsTreeTemplate"
      [showIcon]="vtsShowIcon"
      [selectMode]="vtsSelectMode"
      [context]="vtsTreeNode"
      [showIndicator]="showIndicator"
      [dragPosition]="dragPos"
      (contextmenu)="contextMenu($event)"
    ></vts-tree-node-title>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.vts-select-tree-treenode]': `vtsSelectMode`,
    '[class.vts-select-tree-treenode-disabled]': `vtsSelectMode && isDisabled`,
    '[class.vts-select-tree-treenode-switcher-open]': `vtsSelectMode && isSwitcherOpen`,
    '[class.vts-select-tree-treenode-switcher-close]': `vtsSelectMode && isSwitcherClose`,
    '[class.vts-select-tree-treenode-checkbox-checked]': `vtsSelectMode && isChecked`,
    '[class.vts-select-tree-treenode-checkbox-indeterminate]': `vtsSelectMode && isHalfChecked`,
    '[class.vts-select-tree-treenode-selected]': `vtsSelectMode && isSelected`,
    '[class.vts-select-tree-treenode-loading]': `vtsSelectMode && isLoading`,
    '[class.vts-tree-treenode]': `!vtsSelectMode`,
    '[class.vts-tree-treenode-disabled]': `!vtsSelectMode && isDisabled`,
    '[class.vts-tree-treenode-switcher-open]': `!vtsSelectMode && isSwitcherOpen`,
    '[class.vts-tree-treenode-switcher-close]': `!vtsSelectMode && isSwitcherClose`,
    '[class.vts-tree-treenode-checkbox-checked]': `!vtsSelectMode && isChecked`,
    '[class.vts-tree-treenode-checkbox-indeterminate]': `!vtsSelectMode && isHalfChecked`,
    '[class.vts-tree-treenode-selected]': `!vtsSelectMode && isSelected`,
    '[class.vts-tree-treenode-loading]': `!vtsSelectMode && isLoading`,
    '[class.vts-tree-treenode-start]': `isStart?.[vtsTreeNode.level]`,
    '[class.vts-tree-treenode-end]': `isEnd?.[vtsTreeNode.level]`,
    '[class.vts-tree-treenode-end-of-expand]': `vtsTreeNode.level > 1 && isEnd?.[vtsTreeNode.level - 1]`,
    '[attr.tabindex]': 'isDisabled ? null : 0',
    '[style.display]': 'displayStyle',
    '(mousedown)': 'onMousedown($event)',
    '(dblclick)': 'dblClick($event)',
    '(click)': 'clickSelect($event)',

    '[class.draggable]': 'vtsDraggable && !isDisabled',
    '[attr.aria-grabbed]': 'vtsDraggable && !isDisabled',
    '[attr.draggable]': 'vtsDraggable && !isDisabled',
    '[attr.title]': 'title'
  }
})
export class VtsTreeNodeBuiltinComponent implements OnInit, OnChanges, OnDestroy {
  static ngAcceptInputType_vtsShowLine: BooleanInput;
  static ngAcceptInputType_vtsShowExpand: BooleanInput;
  static ngAcceptInputType_vtsCheckable: BooleanInput;
  static ngAcceptInputType_vtsAsyncData: BooleanInput;
  static ngAcceptInputType_vtsHideUnMatched: BooleanInput;
  static ngAcceptInputType_vtsNoAnimation: BooleanInput;
  static ngAcceptInputType_vtsSelectMode: BooleanInput;
  static ngAcceptInputType_vtsShowIcon: BooleanInput;

  /**
   * for global property
   */
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() isLoading: boolean = false;
  @Input() isSelected: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isMatched: boolean = false;
  @Input() isExpanded!: boolean;
  @Input() isLeaf!: boolean;
  @Input() isChecked?: boolean;
  @Input() isHalfChecked?: boolean;
  @Input() isDisableCheckbox?: boolean;
  @Input() isDisableExpand?: boolean;
  @Input() isSelectable?: boolean;
  @Input() canHide?: boolean;
  @Input() isStart: boolean[] = [];
  @Input() isEnd: boolean[] = [];
  @Input() vtsTreeNode!: VtsTreeNode;
  @Input() @InputBoolean() vtsShowLine?: boolean;
  @Input() @InputBoolean() vtsShowExpand?: boolean;
  @Input() @InputBoolean() vtsCheckable?: boolean;
  @Input() @InputBoolean() vtsSelectable?: boolean;
  @Input() @InputBoolean() vtsAsyncData?: boolean;
  @Input() @InputBoolean() vtsHideUnMatched = false;
  @Input() @InputBoolean() vtsNoAnimation = false;
  @Input() @InputBoolean() vtsSelectMode = false;
  @Input() @InputBoolean() vtsShowIcon = false;
  @Input() vtsExpandedIcon?: TemplateRef<{
    $implicit: VtsTreeNode;
    origin: VtsTreeNodeOptions;
  }>;
  @Input() vtsTreeTemplate: TemplateRef<{
    $implicit: VtsTreeNode;
    origin: VtsTreeNodeOptions;
  }> | null = null;
  @Input() vtsBeforeDrop?: (confirm: VtsFormatBeforeDropEvent) => Observable<boolean>;
  @Input() vtsSearchValue = '';
  @Input() vtsDraggable: boolean = false;
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

  /**
   * drag var
   */
  destroy$ = new Subject();
  dragPos = 2;
  dragPosClass: { [key: string]: string } = {
    '0': 'drag-over',
    '1': 'drag-over-gap-bottom',
    '-1': 'drag-over-gap-top',
    '2': 'drag-noop'
  };
  showIndicator = false;
  /**
   * default set
   */
  get displayStyle(): string {
    // to hide unmatched nodes
    return this.vtsSearchValue &&
      this.vtsHideUnMatched &&
      !this.isMatched &&
      !this.isExpanded &&
      this.canHide
      ? 'none'
      : '';
  }

  get isSwitcherOpen(): boolean {
    return this.isExpanded && !this.isLeaf;
  }

  get isSwitcherClose(): boolean {
    return !this.isExpanded && !this.isLeaf;
  }

  onMousedown(event: MouseEvent): void {
    if (this.vtsSelectMode) {
      event.preventDefault();
    }
  }

  /**
   * collapse node
   * @param event
   */
  clickExpand(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.isDisabled || this.isDisableExpand) return;
    if (this.isLeaf) {
      this.clickSelect(event);
      return;
    }
    if (!this.isLoading && !this.isLeaf) {
      // set async state
      if (this.vtsAsyncData && this.vtsTreeNode.children.length === 0 && !this.isExpanded) {
        this.vtsTreeNode.isLoading = true;
      }
      this.vtsTreeNode.setExpanded(!this.isExpanded);
    }
    this.vtsTreeService.setExpandedNodeList(this.vtsTreeNode);
    const eventNext = this.vtsTreeService.formatEvent('expand', this.vtsTreeNode, event);
    this.vtsExpandChange.emit(eventNext);
  }

  /**
   * Double click debounce
   */
  clickSelect(event: MouseEvent): void {
    event.preventDefault();
    if (this.vtsSelectable && this.isSelectable && !this.isDisabled) {
      this.vtsTreeNode.isSelected = !this.vtsTreeNode.isSelected;
      this.vtsTreeService.setSelectedNodeList(this.vtsTreeNode);
    }
    const eventNext = this.vtsTreeService.formatEvent('click', this.vtsTreeNode, event);
    this.vtsClick.emit(eventNext);
  }

  dblClick(event: MouseEvent): void {
    event.preventDefault();
    if (!this.isLeaf) this.clickExpand(event);
    const eventNext = this.vtsTreeService.formatEvent('dblclick', this.vtsTreeNode, event);
    this.vtsDblClick.emit(eventNext);
  }

  contextMenu(event: MouseEvent): void {
    event.preventDefault();
    const eventNext = this.vtsTreeService.formatEvent('contextmenu', this.vtsTreeNode, event);
    this.vtsContextMenu.emit(eventNext);
  }

  /**
   * check node
   * @param event
   */
  clickCheckBox(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    // return if node is disabled
    if (this.isDisabled || this.isDisableCheckbox) {
      return;
    }
    this.vtsTreeNode.isChecked = !this.vtsTreeNode.isChecked;
    this.vtsTreeNode.isHalfChecked = false;
    this.vtsTreeService.setCheckedNodeList(this.vtsTreeNode);
    const eventNext = this.vtsTreeService.formatEvent('check', this.vtsTreeNode, event);
    this.vtsCheckBoxChange.emit(eventNext);
  }

  dblClickCheckBox(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  clearDragClass(): void {
    const dragClass = ['drag-over-gap-top', 'drag-over-gap-bottom', 'drag-over', 'drop-target'];
    dragClass.forEach(e => {
      this.renderer.removeClass(this.elementRef.nativeElement, e);
    });
  }

  /**
   * drag event
   * @param e
   */
  handleDragStart(e: DragEvent): void {
    try {
      // ie throw error
      // firefox-need-it
      e.dataTransfer!.setData('text/plain', this.vtsTreeNode.key!);
      e.dataTransfer!.setDragImage(new Image(), 0, 0);
    } catch (error) {
      // empty
    }
    this.renderer.addClass(this.elementRef.nativeElement, 'dragging');
    this.vtsTreeService.setSelectedNode(this.vtsTreeNode);
    const eventNext = this.vtsTreeService.formatEvent('dragstart', this.vtsTreeNode, e);
    this.vtsOnDragStart.emit(eventNext);
  }

  handleDragEnter(e: DragEvent): void {
    e.preventDefault();
    // reset position
    this.showIndicator = this.vtsTreeNode.key !== this.vtsTreeService.getSelectedNode()?.key;
    this.renderIndicator(2);
    this.ngZone.run(() => {
      const eventNext = this.vtsTreeService.formatEvent('dragenter', this.vtsTreeNode, e);
      this.vtsOnDragEnter.emit(eventNext);
    });
  }

  handleDragOver(e: DragEvent): void {
    e.preventDefault();
    const dropPosition = this.vtsTreeService.calcDropPosition(e);
    if (this.dragPos !== dropPosition) {
      this.clearDragClass();
      this.renderIndicator(dropPosition);
      // leaf node will pass
      if (!(this.dragPos === 0 && this.isLeaf)) {
        this.renderer.addClass(this.elementRef.nativeElement, this.dragPosClass[this.dragPos]);
        this.renderer.addClass(this.elementRef.nativeElement, 'drop-target');
      }
    }
    const eventNext = this.vtsTreeService.formatEvent('dragover', this.vtsTreeNode, e);
    this.vtsOnDragOver.emit(eventNext);
  }

  handleDragLeave(e: DragEvent): void {
    e.preventDefault();
    this.renderIndicator(2);
    this.clearDragClass();
    const eventNext = this.vtsTreeService.formatEvent('dragleave', this.vtsTreeNode, e);
    this.vtsOnDragLeave.emit(eventNext);
  }

  handleDragDrop(e: DragEvent): void {
    this.ngZone.run(() => {
      this.showIndicator = false;
      this.clearDragClass();
      const node = this.vtsTreeService.getSelectedNode();
      if (
        !node ||
        (node && node.key === this.vtsTreeNode.key) ||
        (this.dragPos === 0 && this.isLeaf)
      ) {
        return;
      }
      // pass if node is leafNo
      const dropEvent = this.vtsTreeService.formatEvent('drop', this.vtsTreeNode, e);
      const dragEndEvent = this.vtsTreeService.formatEvent('dragend', this.vtsTreeNode, e);
      if (this.vtsBeforeDrop) {
        this.vtsBeforeDrop({
          dragNode: this.vtsTreeService.getSelectedNode()!,
          node: this.vtsTreeNode,
          pos: this.dragPos
        }).subscribe((canDrop: boolean) => {
          if (canDrop) {
            this.vtsTreeService.dropAndApply(this.vtsTreeNode, this.dragPos);
          }
          this.vtsOnDrop.emit(dropEvent);
          this.vtsOnDragEnd.emit(dragEndEvent);
        });
      } else if (this.vtsTreeNode) {
        this.vtsTreeService.dropAndApply(this.vtsTreeNode, this.dragPos);
        this.vtsOnDrop.emit(dropEvent);
      }
    });
  }

  handleDragEnd(e: DragEvent): void {
    e.preventDefault();
    this.ngZone.run(() => {
      // if user do not custom beforeDrop
      if (!this.vtsBeforeDrop) {
        const eventNext = this.vtsTreeService.formatEvent('dragend', this.vtsTreeNode, e);
        this.vtsOnDragEnd.emit(eventNext);
      }
    });
    this.renderer.removeClass(this.elementRef.nativeElement, 'dragging');
  }

  /**
   * Listening to dragging events.
   */
  handDragEvent(): void {
    this.ngZone.runOutsideAngular(() => {
      if (this.vtsDraggable) {
        const nativeElement = this.elementRef.nativeElement;
        this.destroy$ = new Subject();
        fromEvent<DragEvent>(nativeElement, 'dragstart')
          .pipe(takeUntil(this.destroy$))
          .subscribe((e: DragEvent) => this.handleDragStart(e));
        fromEvent<DragEvent>(nativeElement, 'dragenter')
          .pipe(takeUntil(this.destroy$))
          .subscribe((e: DragEvent) => this.handleDragEnter(e));
        fromEvent<DragEvent>(nativeElement, 'dragover')
          .pipe(takeUntil(this.destroy$))
          .subscribe((e: DragEvent) => this.handleDragOver(e));
        fromEvent<DragEvent>(nativeElement, 'dragleave')
          .pipe(takeUntil(this.destroy$))
          .subscribe((e: DragEvent) => this.handleDragLeave(e));
        fromEvent<DragEvent>(nativeElement, 'drop')
          .pipe(takeUntil(this.destroy$))
          .subscribe((e: DragEvent) => this.handleDragDrop(e));
        fromEvent<DragEvent>(nativeElement, 'dragend')
          .pipe(takeUntil(this.destroy$))
          .subscribe((e: DragEvent) => this.handleDragEnd(e));
      } else {
        this.destroy$.next();
        this.destroy$.complete();
      }
    });
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  constructor(
    public vtsTreeService: VtsTreeBaseService,
    private ngZone: NgZone,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    @Host() @Optional() public noAnimation?: VtsNoAnimationDirective
  ) {}

  ngOnInit(): void {
    this.vtsTreeNode.component = this;
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
    const { vtsDraggable } = changes;
    if (vtsDraggable) {
      this.handDragEvent();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private renderIndicator(dropPosition: number): void {
    this.ngZone.run(() => {
      this.showIndicator = dropPosition !== 2;
      if (
        this.vtsTreeNode.key === this.vtsTreeService.getSelectedNode()?.key ||
        (dropPosition === 0 && this.isLeaf)
      ) {
        return;
      }
      this.dragPos = dropPosition;
      this.cdr.markForCheck();
    });
  }
}
