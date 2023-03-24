/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { PlatformModule } from '@angular/cdk/platform';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { IconDefinition } from '@ui-vts/icons-angular';
import { VtsIconDirective } from './icon.directive';
import { VtsIconPatchService, VTS_ICONS, VTS_ICONS_PATCH } from './icon.service';

@NgModule({
  exports: [VtsIconDirective],
  declarations: [VtsIconDirective],
  imports: [PlatformModule]
})
export class VtsIconModule {
  static forRoot(icons: IconDefinition[]): ModuleWithProviders<VtsIconModule> {
    return {
      ngModule: VtsIconModule,
      providers: [
        {
          provide: VTS_ICONS,
          useValue: icons
        }
      ]
    };
  }

  static forChild(icons: IconDefinition[]): ModuleWithProviders<VtsIconModule> {
    return {
      ngModule: VtsIconModule,
      providers: [
        VtsIconPatchService,
        {
          provide: VTS_ICONS_PATCH,
          useValue: icons
        }
      ]
    };
  }
}
