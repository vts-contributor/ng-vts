import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsCardModule } from '@ui-vts/ng-vts/card';
import { VtsDividerModule } from '@ui-vts/ng-vts/divider';
import { VtsGridModule } from '@ui-vts/ng-vts/grid';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsInputModule } from '@ui-vts/ng-vts/input';
import { VtsTagModule } from '@ui-vts/ng-vts/tag';

import { ShareModule } from '../share/share.module';
import { ComponentsOverviewComponent } from './components-overview.component';

const moduleList = [
  VtsCardModule,
  VtsButtonModule,
  VtsTagModule,
  VtsGridModule,
  VtsDividerModule,
  VtsIconModule,
  VtsInputModule
];

@NgModule({
  imports: [
    ShareModule,
    ...moduleList,
    RouterModule.forChild([{ path: '**', component: ComponentsOverviewComponent }])
  ],
  declarations: [ComponentsOverviewComponent]
})
export class ComponentsOverviewModule {}
