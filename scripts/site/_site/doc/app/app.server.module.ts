import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

// Import the require modules
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { en_US, VtsI18nModule, VTS_I18N } from '@ui-vts/ng-vts/i18n';

registerLocaleData(en);

// @dynamic
@NgModule({
  imports: [AppModule, ServerModule, HttpClientModule, NoopAnimationsModule, VtsI18nModule],
  bootstrap: [AppComponent],
  providers: [{ provide: VTS_I18N, useValue: en_US }]
})
export class AppServerModule {}
