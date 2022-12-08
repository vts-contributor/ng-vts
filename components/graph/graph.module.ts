/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsNoAnimationModule } from '@ui-vts/ng-vts/core/no-animation';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsSpinModule } from '@ui-vts/ng-vts/spin';

import { VtsGraphDefsComponent } from './graph-defs.component';
import { VtsGraphEdgeComponent } from './graph-edge.component';
import { VtsGraphEdgeDirective } from './graph-edge.directive';
import { VtsGraphGroupNodeDirective } from './graph-group-node.directive';
import { VtsGraphMinimapComponent } from './graph-minimap.component';
import { VtsGraphNodeComponent } from './graph-node.component';
import { VtsGraphNodeDirective } from './graph-node.directive';
import { VtsGraphZoomDirective } from './graph-zoom.directive';
import { VtsGraphComponent } from './graph.component';

const COMPONENTS = [
  VtsGraphComponent,
  VtsGraphMinimapComponent,
  VtsGraphDefsComponent,
  VtsGraphNodeDirective,
  VtsGraphGroupNodeDirective,
  VtsGraphZoomDirective,
  VtsGraphNodeComponent,
  VtsGraphEdgeComponent,
  VtsGraphEdgeDirective
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, VtsIconModule, VtsSpinModule, VtsNoAnimationModule],
  exports: [...COMPONENTS]
})
export class VtsGraphModule {}
