/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { VtsTreeNode, VtsTreeNodeOptions } from '@ui-vts/ng-vts/core/tree';

@Component({
  selector: 'vts-tree-node-title',
  template: `
    <ng-template
      [ngTemplateOutlet]="treeTemplate"
      [ngTemplateOutletContext]="{
        $implicit: context,
        origin: context.origin
      }"
    ></ng-template>
    <ng-container *ngIf="!treeTemplate">
      <span
        *ngIf="icon && showIcon"
        [class.vts-tree-icon__open]="isSwitcherOpen"
        [class.vts-tree-icon__close]="isSwitcherClose"
        [class.vts-tree-icon_loading]="isLoading"
        [class.vts-select-tree-custom-icon]="selectMode"
        [class.vts-tree-custom-icon]="!selectMode"
      >
        <span
          [class.vts-select-tree-icon__customize]="selectMode"
          [class.vts-tree-icon__customize]="!selectMode"
        >
          <i vts-icon *ngIf="icon" [vtsType]="icon"></i>
        </span>
      </span>
      <span
        class="vts-tree-title"
        [innerHTML]="title | vtsHighlight : matchedValue : 'i' : 'font-highlight'"
      ></span>
      <vts-tree-drop-indicator
        *ngIf="showIndicator"
        [dropPosition]="dragPosition"
        [level]="context.level"
      ></vts-tree-drop-indicator>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.vts-select-tree-node-content-wrapper]': `selectMode`,
    '[class.vts-select-tree-node-content-wrapper-open]': `selectMode && isSwitcherOpen`,
    '[class.vts-select-tree-node-content-wrapper-close]': `selectMode && isSwitcherClose`,
    '[class.vts-select-tree-node-selected]': `selectMode && isSelected`,
    '[class.vts-tree-node-content-wrapper]': `!selectMode`,
    '[class.vts-tree-node-content-wrapper-open]': `!selectMode && isSwitcherOpen`,
    '[class.vts-tree-node-content-wrapper-close]': `!selectMode && isSwitcherClose`,
    '[class.vts-tree-node-selected]': `!selectMode && isSelected`
  }
})
export class VtsTreeNodeTitleComponent implements OnChanges {
  @Input() searchValue!: string;
  @Input() treeTemplate: TemplateRef<{
    $implicit: VtsTreeNode;
    origin: VtsTreeNodeOptions;
  }> | null = null;
  @Input() showIcon!: boolean;
  @Input() selectMode = false;
  @Input() context!: VtsTreeNode;
  @Input() icon!: string;
  @Input() title!: string;
  @Input() isLoading!: boolean;
  @Input() isSelected!: boolean;
  @Input() isDisabled!: boolean;
  @Input() isMatched!: boolean;
  @Input() isExpanded!: boolean;
  @Input() isLeaf!: boolean;
  // Drag indicator
  @Input() showIndicator = true;
  @Input() dragPosition?: number;

  get matchedValue(): string {
    return this.isMatched ? this.searchValue : '';
  }

  get isSwitcherOpen(): boolean {
    return this.isExpanded && !this.isLeaf;
  }

  get isSwitcherClose(): boolean {
    return !this.isExpanded && !this.isLeaf;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { showIndicator, dragPosition } = changes;
    if (showIndicator || dragPosition) {
      this.cdr.markForCheck();
    }
  }
}
