import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VtsFormModule } from '@ui-vts/ng-vts/form';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsGridModule } from '@ui-vts/ng-vts/grid';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsInputModule } from '@ui-vts/ng-vts/input';
import { VtsSelectModule } from '@ui-vts/ng-vts/select';
import { VtsSpaceModule } from '@ui-vts/ng-vts/space';
import { VtsDatePickerModule } from '@ui-vts/ng-vts/date-picker';
import { VtsTimePickerModule } from '@ui-vts/ng-vts/time-picker';
import { VtsSliderModule } from '@ui-vts/ng-vts/slider';
import { VtsUploadModule } from '@ui-vts/ng-vts/upload';
import { VtsChartModule } from '@ui-vts/ng-vts/chart';
import { VtsTableModule } from '@ui-vts/ng-vts/table';

import { ShareModule } from '../share/share.module';
import { InstallationComponent } from './installation.component';

const moduleList = [
  VtsGridModule,
  VtsIconModule,
  VtsButtonModule,
  VtsFormModule,
  VtsInputModule,
  VtsSelectModule,
  VtsSpaceModule,
  VtsDatePickerModule,
  VtsTimePickerModule,
  VtsSliderModule,
  VtsUploadModule,
  VtsChartModule,
  VtsTableModule
];

@NgModule({
  imports: [
    ShareModule,
    ...moduleList,
    RouterModule.forChild([{ path: '**', component: InstallationComponent }])
  ],
  declarations: [InstallationComponent]
})
export class InstallationModule {}
