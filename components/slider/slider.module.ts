/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { BidiModule } from '@angular/cdk/bidi';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VtsToolTipModule } from '@ui-vts/ng-vts/tooltip';

import { VtsSliderHandleComponent } from './handle.component';
import { VtsSliderMarksComponent } from './marks.component';
import { VtsSliderComponent } from './slider.component';
import { VtsSliderStepComponent } from './step.component';
import { VtsSliderTrackComponent } from './track.component';

@NgModule({
  exports: [
    VtsSliderComponent,
    VtsSliderTrackComponent,
    VtsSliderHandleComponent,
    VtsSliderStepComponent,
    VtsSliderMarksComponent
  ],
  declarations: [
    VtsSliderComponent,
    VtsSliderTrackComponent,
    VtsSliderHandleComponent,
    VtsSliderStepComponent,
    VtsSliderMarksComponent
  ],
  imports: [BidiModule, CommonModule, PlatformModule, VtsToolTipModule]
})
export class VtsSliderModule {}
