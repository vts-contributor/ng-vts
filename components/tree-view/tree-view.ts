/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkTree } from '@angular/cdk/tree';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { treeAccordionMotion } from '@ui-vts/ng-vts/core/animation';

import { VtsTreeNodeOutletDirective } from './outlet';
import { VtsTreeView } from './tree';

@Component({
  selector: 'vts-tree-view',
  exportAs: 'vtsTreeView',
  template: `
    <div class="vts-tree-list-holder">
      <div
        [@.disabled]="!_afterViewInit || noAnimation?.vtsNoAnimation"
        [@treeAccordionMotion]="_nodeOutlet.viewContainer.length"
        class="vts-tree-list-holder-inner"
      >
        <ng-container vtsTreeNodeOutlet></ng-container>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: CdkTree, useExisting: VtsTreeViewComponent },
    { provide: VtsTreeView, useExisting: VtsTreeViewComponent }
  ],
  host: {
    class: 'vts-tree',
    '[class.vts-tree-rtl]': `dir === 'rtl'`,
    '[class.vts-tree-sm]': 'vtsSize === "sm"',
    '[class.vts-tree-md]': 'vtsSize === "md"',
    '[class.vts-tree-lg]': 'vtsSize === "lg"',
    '[class.vts-tree-show-line]': `vtsShowLine`
  },
  animations: [treeAccordionMotion]
})
export class VtsTreeViewComponent<T, F> extends VtsTreeView<T, F> implements AfterViewInit {
  @ViewChild(VtsTreeNodeOutletDirective, { static: true })
  nodeOutlet!: VtsTreeNodeOutletDirective;
  _afterViewInit = false;
  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this._afterViewInit = true;
      this.changeDetectorRef.markForCheck();
    });
  }
}
