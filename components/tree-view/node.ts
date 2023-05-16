/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkTreeNode, CdkTreeNodeDef, CdkTreeNodeOutletContext } from '@angular/cdk/tree';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';

import { BooleanInput, VtsSafeAny } from '@ui-vts/ng-vts/core/types';

import { VtsTreeView } from './tree';
import { VtsNodeBase } from './node-base';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { getNextSibling, getParent, getPrevSibling } from './utils';
import { VtsDestroyService } from '@ui-vts/ng-vts/core/services';
import { takeUntil } from 'rxjs/operators';

export interface VtsTreeVirtualNodeData<T> {
  data: T;
  context: CdkTreeNodeOutletContext<T>;
  nodeDef: CdkTreeNodeDef<T>;
}

@Component({
  selector: 'vts-tree-node:not([builtin])',
  exportAs: 'vtsTreeNode',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: CdkTreeNode, useExisting: VtsTreeNodeComponent },
    { provide: VtsNodeBase, useExisting: VtsTreeNodeComponent },
    VtsDestroyService
  ],
  template: `
    <vts-tree-node-indents [indents]="indents" *ngIf="indents.length"></vts-tree-node-indents>
    <ng-content select="vts-tree-node-toggle, [vts-tree-node-toggle]"></ng-content>

    <ng-content select="vts-tree-node-checkbox"></ng-content>
    <ng-content select="vts-tree-node-option"></ng-content>
    <ng-content></ng-content>
  `,
  host: {
    '[class.vts-tree-treenode-switcher-open]': 'isExpanded',
    '[class.vts-tree-treenode-switcher-close]': '!isExpanded',
    '[class.vts-tree-treenode-disabled]': 'vtsDisabled',
    '[class.vts-tree-treenode-selected]': 'vtsSelected',
    '[class.vts-tree-treenode-start]': `isFirst`,
    '[class.vts-tree-treenode-end]': `isLast`,
    '[class.vts-tree-treenode-end-of-expand]': `isEndOfExpand`,
    '(click)': 'onClick($event)'
  }
})
export class VtsTreeNodeComponent<T, F> extends CdkTreeNode<T> implements OnDestroy, OnInit {
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsSelected: BooleanInput;

  @Input() @InputBoolean() vtsDisabled: boolean = false;
  @Input() @InputBoolean() vtsSelected: boolean = false;
  @Output() readonly vtsClick = new EventEmitter<MouseEvent>();

  indents: boolean[] = [];
  isLeaf = false;
  isFirst = false;
  isLast = false;
  isEndOfExpand = false;

  constructor(
    protected elementRef: ElementRef<HTMLElement>,
    protected tree: VtsTreeView<T, F>,
    private cdr: ChangeDetectorRef,
    private vtsDestroyService: VtsDestroyService
  ) {
    super(elementRef, tree);
    this._elementRef.nativeElement.classList.add('vts-tree-treenode');
  }

  override ngOnInit(): void {
    this.renderChanged();
    this.tree._reRenderNodes.pipe(takeUntil(this.vtsDestroyService)).subscribe(() => {
      this.renderChanged();
    });
  }

  onClick(e: MouseEvent): void {
    if (!this.vtsDisabled) {
      this.vtsClick.emit(e);
    }
  }

  disable(): void {
    this.vtsDisabled = true;
  }

  enable(): void {
    this.vtsDisabled = false;
  }

  select(): void {
    this.vtsSelected = true;
  }

  deselect(): void {
    this.vtsSelected = false;
  }

  private getIndents() {
    const getLevel = this.tree.treeControl.getLevel;
    const nodes = this.tree.treeControl.dataNodes;
    let parent = getParent(nodes, this.data, getLevel);
    let isEnds: boolean[] = [];
    while (parent) {
      isEnds.push(!getNextSibling(nodes, parent, getLevel));
      parent = getParent(nodes, parent, getLevel);
    }
    return isEnds.reverse().map((_, i) => (i + 1 > isEnds.length - 1 ? false : isEnds[i + 1]));
  }

  buildIndents() {
    if (this.tree.vtsShowLine) this.indents = this.getIndents();
    else this.indents = [];
  }

  renderChanged() {
    const getLevel = this.tree.treeControl.getLevel;
    const nodes = this.tree.treeControl.dataNodes;
    const parent = getParent(nodes, this.data, getLevel);
    this.isFirst = !getPrevSibling(nodes, this.data, getLevel);
    this.isLast = !getNextSibling(nodes, this.data, getLevel);
    this.isLeaf = !this.tree.treeControl.isExpandable(this.data);
    this.isEndOfExpand = parent
      ? this.level > 1 && !getNextSibling(nodes, parent, getLevel)
      : false;
    this.buildIndents();
    this.cdr.markForCheck();
  }
}

@Directive({
  selector: '[vtsTreeNodeDef]',
  providers: [{ provide: CdkTreeNodeDef, useExisting: VtsTreeNodeDefDirective }]
})
export class VtsTreeNodeDefDirective<T> extends CdkTreeNodeDef<T> {
  @Input('vtsTreeNodeDefWhen') override when!: (index: number, nodeData: T) => boolean;
}

@Directive({
  selector: '[vtsTreeVirtualScrollNodeOutlet]'
})
export class VtsTreeVirtualScrollNodeOutletDirective<T> implements OnChanges {
  private _viewRef: EmbeddedViewRef<VtsSafeAny> | null = null;
  @Input() data!: VtsTreeVirtualNodeData<T>;

  constructor(private _viewContainerRef: ViewContainerRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const recreateView = this.shouldRecreateView(changes);
    if (recreateView) {
      const viewContainerRef = this._viewContainerRef;

      if (this._viewRef) {
        viewContainerRef.remove(viewContainerRef.indexOf(this._viewRef));
      }

      this._viewRef = this.data
        ? viewContainerRef.createEmbeddedView(this.data.nodeDef.template, this.data.context)
        : null;

      if (CdkTreeNode.mostRecentTreeNode && this._viewRef) {
        CdkTreeNode.mostRecentTreeNode.data = this.data.data;
      }
    } else if (this._viewRef && this.data.context) {
      this.updateExistingContext(this.data.context);
    }
  }

  private shouldRecreateView(changes: SimpleChanges): boolean {
    const ctxChange = changes.data;
    return !!changes.data || (ctxChange && this.hasContextShapeChanged(ctxChange));
  }

  private hasContextShapeChanged(ctxChange: SimpleChange): boolean {
    const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
    const currCtxKeys = Object.keys(ctxChange.currentValue || {});

    if (prevCtxKeys.length === currCtxKeys.length) {
      for (const propName of currCtxKeys) {
        if (prevCtxKeys.indexOf(propName) === -1) {
          return true;
        }
      }
      return false;
    }
    return true;
  }

  private updateExistingContext(ctx: VtsSafeAny): void {
    for (const propName of Object.keys(ctx)) {
      this._viewRef!.context[propName] = (this.data.context as VtsSafeAny)[propName];
    }
  }
}
