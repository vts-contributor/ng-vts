/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { VtsTreeNode, VtsTreeNodeOptions } from '@ui-vts/ng-vts/core/tree';

@Component({
  selector: 'vts-tree-node-switcher',
  template: `
    <ng-container *ngIf="isShowSwitchIcon">
      <ng-container *ngIf="!isLoading; else loadingTemplate">
        <ng-container
          *vtsStringTemplateOutlet="
            vtsExpandedIcon;
            context: { $implicit: context, origin: context.origin }
          "
        >
          <i
            vts-icon
            vtsType="CaretDownFill:bootstrap"
            [class.vts-select-tree-switcher-icon]="vtsSelectMode"
            [class.vts-tree-switcher-icon]="!vtsSelectMode"
          ></i>
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-container *ngIf="vtsShowLine">
      <ng-container *ngIf="!isLoading; else loadingTemplate">
        <ng-container
          *vtsStringTemplateOutlet="
            vtsExpandedIcon;
            context: { $implicit: context, origin: context.origin }
          "
        >
          <i
            *ngIf="isShowLineIcon"
            vts-icon
            [vtsType]="isSwitcherOpen ? 'MinusSquareOutline:antd' : 'PlusSquareOutline:antd'"
            class="vts-tree-switcher-line-icon"
          ></i>
          <i
            *ngIf="!isShowLineIcon"
            vts-icon
            vtsType="FileOutline:antd"
            class="vts-tree-switcher-line-icon"
          ></i>
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-template #loadingTemplate>
      <i vts-icon vtsType="Sync" [vtsSpin]="true" class="vts-tree-switcher-loading-icon"></i>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.vts-select-tree-switcher]': 'vtsSelectMode',
    '[class.vts-select-tree-switcher-noop]': 'vtsSelectMode && isLeaf',
    '[class.vts-select-tree-switcher_open]': 'vtsSelectMode && isSwitcherOpen',
    '[class.vts-select-tree-switcher_close]': 'vtsSelectMode && isSwitcherClose',
    '[class.vts-tree-switcher]': '!vtsSelectMode',
    '[class.vts-tree-switcher-noop]': '!vtsSelectMode && isLeaf',
    '[class.vts-tree-switcher_open]': '!vtsSelectMode && isSwitcherOpen',
    '[class.vts-tree-switcher_close]': '!vtsSelectMode && isSwitcherClose'
  }
})
export class VtsTreeNodeSwitcherComponent {
  @Input() vtsShowExpand?: boolean;
  @Input() vtsShowLine?: boolean;
  @Input() vtsExpandedIcon?: TemplateRef<{
    $implicit: VtsTreeNode;
    origin: VtsTreeNodeOptions;
  }>;
  @Input() vtsSelectMode = false;
  @Input() context!: VtsTreeNode;
  @Input() isLeaf?: boolean;
  @Input() isLoading?: boolean;
  @Input() isExpanded?: boolean;

  get isShowLineIcon(): boolean {
    return !this.isLeaf && !!this.vtsShowLine;
  }

  get isShowSwitchIcon(): boolean {
    return !this.isLeaf && !this.vtsShowLine;
  }

  get isSwitcherOpen(): boolean {
    return !!this.isExpanded && !this.isLeaf;
  }

  get isSwitcherClose(): boolean {
    return !this.isExpanded && !this.isLeaf;
  }
}
