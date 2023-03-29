import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { VtsThemeModule } from '@ui-vts/theme/services'
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VTS_CONFIG } from '@ui-vts/ng-vts/core/config';
import { AppComponent } from './app.component';
import { routes } from './app.routing.module';
import { SiteNgZorroAntdModule } from './ng-vts.module';
import * as allIconTypes from '@ui-vts/icons-angular/icons';
{{importPart}}

const icons = Object.values(allIconTypes)
  .map(i => Object.values(i))
  .flatMap(i => i);

@NgModule({
  declarations: [
    AppComponent,
{{declarationPart}}
  ],
  imports     : [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    VtsThemeModule.forRoot({
      themes: [
        {
          theme: 'dark',
          url: '/dark.css'
        },
        {
          theme: 'default',
          url: '/default.css'
        },
      ],
      defaultTheme: 'default'
    }),
    VtsIconModule.forChild(icons),
    HttpClientModule,
    SiteNgZorroAntdModule,
    RouterModule.forRoot(routes,{ useHash: true })
  ],
  providers   : [
    Title,
    {
      provide: VTS_CONFIG,
      useValue: { global: { vtsDirection: 'ltr' } }
    }
  ],
  bootstrap   : [ AppComponent ]
})
export class AppModule {
}
