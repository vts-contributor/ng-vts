import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { IconDefinition } from '@ui-vts/icons-angular';
import { VTS_ICONS } from '@ui-vts/ng-vts/icon';

import { AppComponent } from './app.component';
import { routes } from './app.routing.module';
import { SiteNgZorroAntdModule } from './ng-vts.module';
{{importPart}}

const icons: IconDefinition[] = [];

@NgModule({
  declarations: [
    AppComponent,
{{declarationPart}}
  ],
  imports     : [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SiteNgZorroAntdModule,
    RouterModule.forRoot(routes,{ useHash: true })
  ],
  providers   : [
    Title,
    { provide: VTS_ICONS, useValue: icons },
  ],
  bootstrap   : [ AppComponent ]
})
export class AppModule {
}
