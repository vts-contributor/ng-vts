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
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChange,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';

import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

import { VtsTreeView } from './tree';

export interface VtsTreeVirtualNodeData<T> {
  data: T;
  context: CdkTreeNodeOutletContext<T>;
  nodeDef: CdkTreeNodeDef<T>;
}

@Component({
  selector: 'vts-tree-node:not([builtin])',
  exportAs: 'vtsTreeNode',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: CdkTreeNode, useExisting: VtsTreeNodeComponent }],
  template: `
    <vts-tree-node-indents [indents]="indents" *ngIf="indents.length"></vts-tree-node-indents>
    <ng-content select="vts-tree-node-toggle, [vts-tree-node-toggle]"></ng-content>
    <vts-tree-node-toggle
      class="vts-tree-leaf-line-icon"
      *ngIf="indents.length && isLeaf"
      vtsTreeNodeNoopToggle
    >
      <span class="vts-tree-switcher-leaf-line"></span>
    </vts-tree-node-toggle>
    <ng-content select="vts-tree-node-checkbox"></ng-content>
    <ng-content select="vts-tree-node-option"></ng-content>
    <ng-content></ng-content>
  `,
  host: {
    '[class.vts-tree-treenode-switcher-open]': 'isExpanded',
    '[class.vts-tree-treenode-switcher-close]': '!isExpanded'
  }
})
export class VtsTreeNodeComponent<T> extends CdkTreeNode<T> implements OnDestroy, OnInit {
  indents: boolean[] = [];
  disabled = false;
  selected = false;
  isLeaf = false;

  constructor(
    protected elementRef: ElementRef<HTMLElement>,
    protected tree: VtsTreeView<T>,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
    super(elementRef, tree);
    this._elementRef.nativeElement.classList.add('vts-tree-treenode');
  }

  override ngOnInit(): void {
    this.isLeaf = !this.tree.treeControl.isExpandable(this.data);
  }

  disable(): void {
    this.disabled = true;
    this.updateDisabledClass();
  }

  enable(): void {
    this.disabled = false;
    this.updateDisabledClass();
  }

  select(): void {
    this.selected = true;
    this.updateSelectedClass();
  }

  deselect(): void {
    this.selected = false;
    this.updateSelectedClass();
  }

  setIndents(indents: boolean[]): void {
    this.indents = indents;
    this.cdr.markForCheck();
  }

  private updateSelectedClass(): void {
    if (this.selected) {
      this.renderer.addClass(this.elementRef.nativeElement, 'vts-tree-treenode-selected');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'vts-tree-treenode-selected');
    }
  }

  private updateDisabledClass(): void {
    if (this.disabled) {
      this.renderer.addClass(this.elementRef.nativeElement, 'vts-tree-treenode-disabled');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'vts-tree-treenode-disabled');
    }
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
