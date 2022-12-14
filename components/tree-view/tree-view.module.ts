/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VtsNoAnimationModule } from '@ui-vts/ng-vts/core/no-animation';

import { VtsTreeNodeCheckboxComponent } from './checkbox';
import { VtsTreeNodeIndentLineDirective, VtsTreeNodeIndentsComponent } from './indent';
import {
  VtsTreeNodeComponent,
  VtsTreeNodeDefDirective,
  VtsTreeVirtualScrollNodeOutletDirective
} from './node';
import { VtsTreeNodeOptionComponent } from './option';
import { VtsTreeNodeOutletDirective } from './outlet';
import { VtsTreeNodePaddingDirective } from './padding';
import {
  VtsTreeNodeNoopToggleDirective,
  VtsTreeNodeToggleActiveIconDirective,
  VtsTreeNodeToggleDirective,
  VtsTreeNodeToggleRotateIconDirective
} from './toggle';
import { VtsTreeView } from './tree';
import { VtsTreeViewComponent } from './tree-view';
import { VtsTreeVirtualScrollViewComponent } from './tree-virtual-scroll-view';

const treeWithControlComponents = [
  VtsTreeView,
  VtsTreeNodeOutletDirective,
  VtsTreeViewComponent,
  VtsTreeNodeDefDirective,
  VtsTreeNodeComponent,
  VtsTreeNodeToggleDirective,
  VtsTreeNodePaddingDirective,
  VtsTreeNodeToggleRotateIconDirective,
  VtsTreeNodeToggleActiveIconDirective,
  VtsTreeNodeOptionComponent,
  VtsTreeNodeNoopToggleDirective,
  VtsTreeNodeCheckboxComponent,
  VtsTreeNodeIndentsComponent,
  VtsTreeVirtualScrollViewComponent,
  VtsTreeVirtualScrollNodeOutletDirective,
  VtsTreeNodeIndentLineDirective
];

@NgModule({
  imports: [BidiModule, CommonModule, VtsNoAnimationModule, ScrollingModule],
  declarations: [treeWithControlComponents],
  exports: [treeWithControlComponents]
})
export class VtsTreeViewModule {}
