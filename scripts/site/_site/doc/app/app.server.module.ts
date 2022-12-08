import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { IconDefinition } from '@ui-vts/icons-angular';
import { VTS_ICONS } from '@ui-vts/ng-vts/icon';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

// Import the require modules
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import zh from '@angular/common/locales/zh';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import * as AllIcons from '@ui-vts/icons-angular/icons';
import { en_US, VtsI18nModule, VTS_I18N } from '@ui-vts/ng-vts/i18n';

registerLocaleData(zh, 'zh-cn');
registerLocaleData(en);
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

// @dynamic
@NgModule({
  imports: [AppModule, ServerModule, HttpClientModule, NoopAnimationsModule, VtsI18nModule],
  bootstrap: [AppComponent],
  providers: [
    { provide: VTS_I18N, useValue: en_US },
    { provide: VTS_ICONS, useValue: icons }
  ]
})
export class AppServerModule {}
