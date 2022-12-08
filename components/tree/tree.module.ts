/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsHighlightModule } from '@ui-vts/ng-vts/core/highlight';
import { VtsNoAnimationModule } from '@ui-vts/ng-vts/core/no-animation';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';

import { VtsTreeDropIndicatorComponent } from './tree-drop-indicator.component';
import { VtsTreeIndentComponent } from './tree-indent.component';
import { VtsTreeNodeBuiltinCheckboxComponent } from './tree-node-checkbox.component';
import { VtsTreeNodeSwitcherComponent } from './tree-node-switcher.component';
import { VtsTreeNodeTitleComponent } from './tree-node-title.component';
import { VtsTreeNodeBuiltinComponent } from './tree-node.component';
import { VtsTreeComponent } from './tree.component';

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    VtsOutletModule,
    VtsIconModule,
    VtsNoAnimationModule,
    VtsHighlightModule,
    ScrollingModule
  ],
  declarations: [
    VtsTreeComponent,
    VtsTreeNodeBuiltinComponent,
    VtsTreeIndentComponent,
    VtsTreeNodeSwitcherComponent,
    VtsTreeNodeBuiltinCheckboxComponent,
    VtsTreeNodeTitleComponent,
    VtsTreeDropIndicatorComponent
  ],
  exports: [VtsTreeComponent, VtsTreeNodeBuiltinComponent, VtsTreeIndentComponent]
})
export class VtsTreeModule {}
