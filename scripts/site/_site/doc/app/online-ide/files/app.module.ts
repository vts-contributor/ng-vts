export default (componentName: string): string => {
  return `
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';

import { VTS_ICONS } from '@ui-vts/ng-vts/icon';
import { VTS_I18N, en_US } from '@ui-vts/ng-vts/i18n';
import { IconDefinition } from '@ui-vts/icons-angular';
import * as AllIcons from '@ui-vts/icons-angular/icons';

import { DemoNgVTSModule } from './ng-vts.module';

import { ${componentName} } from './app.component';

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  imports: [
    BrowserModule,FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    DemoNgVTSModule,
    BrowserAnimationsModule,
    ScrollingModule,
    DragDropModule
  ],
  declarations: [ ${componentName} ],
  bootstrap: [ ${componentName} ],
  providers: [ { provide: VTS_I18N, useValue: en_US }, { provide: VTS_ICONS, useValue: icons } ]
})
export class AppModule { }`;
};
