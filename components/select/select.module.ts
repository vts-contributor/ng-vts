/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VtsCheckboxModule } from '@ui-vts/ng-vts/checkbox';
import { VtsNoAnimationModule } from '@ui-vts/ng-vts/core/no-animation';
import { VtsOutletModule } from '@ui-vts/ng-vts/core/outlet';
import { VtsOverlayModule } from '@ui-vts/ng-vts/core/overlay';
import { ɵVtsTransitionPatchModule as VtsTransitionPatchModule } from '@ui-vts/ng-vts/core/transition-patch';
import { VtsEmptyModule } from '@ui-vts/ng-vts/empty';
import { VtsI18nModule } from '@ui-vts/ng-vts/i18n';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsOptionContainerComponent } from './option-container.component';
import { VtsOptionGroupComponent } from './option-group.component';
import { VtsOptionItemGroupComponent } from './option-item-group.component';
import { VtsOptionItemComponent } from './option-item.component';
import { VtsOptionComponent } from './option.component';
import { VtsSelectArrowComponent } from './select-arrow.component';
import { VtsSelectClearComponent } from './select-clear.component';
import { VtsSelectItemComponent } from './select-item.component';
import { VtsSelectMultipleCountComponent } from './select-multiple-count.component';
import { VtsSelectPlaceholderComponent } from './select-placeholder.component';
import { VtsSelectSearchComponent } from './select-search.component';
import { VtsSelectTopControlComponent } from './select-top-control.component';
import { VtsSelectComponent } from './select.component';

@NgModule({
  imports: [
    BidiModule,
    CommonModule,
    VtsI18nModule,
    FormsModule,
    PlatformModule,
    OverlayModule,
    VtsIconModule,
    VtsOutletModule,
    VtsEmptyModule,
    VtsOverlayModule,
    VtsCheckboxModule,
    VtsNoAnimationModule,
    VtsTransitionPatchModule,
    ScrollingModule,
    A11yModule
  ],
  declarations: [
    VtsOptionComponent,
    VtsSelectComponent,
    VtsOptionContainerComponent,
    VtsOptionGroupComponent,
    VtsOptionItemComponent,
    VtsSelectTopControlComponent,
    VtsSelectSearchComponent,
    VtsSelectItemComponent,
    VtsSelectClearComponent,
    VtsSelectArrowComponent,
    VtsSelectPlaceholderComponent,
    VtsOptionItemGroupComponent,
    VtsSelectMultipleCountComponent
  ],
  exports: [
    VtsOptionComponent,
    VtsSelectComponent,
    VtsOptionGroupComponent,
    VtsSelectArrowComponent,
    VtsSelectClearComponent,
    VtsSelectItemComponent,
    VtsSelectPlaceholderComponent,
    VtsSelectSearchComponent,
    VtsSelectMultipleCountComponent
  ]
})
export class VtsSelectModule {}
