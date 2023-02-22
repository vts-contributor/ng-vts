import { BidiModule } from '@angular/cdk/bidi';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IconDefinition } from '@ui-vts/icons-angular';
import { ChevronLeft, ChevronRight, PencilOutline } from '@ui-vts/icons-angular/icons';
import { VtsAffixModule } from '@ui-vts/ng-vts/affix';
import { VtsBadgeModule } from '@ui-vts/ng-vts/badge';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VTS_CONFIG } from '@ui-vts/ng-vts/core/config';
import { VtsGridModule } from '@ui-vts/ng-vts/grid';
import { VtsI18nModule } from '@ui-vts/ng-vts/i18n';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsInputModule } from '@ui-vts/ng-vts/input';
import { VtsMenuModule } from '@ui-vts/ng-vts/menu';
import { VtsMessageModule } from '@ui-vts/ng-vts/message';
import { VtsPopoverModule } from '@ui-vts/ng-vts/popover';
import { VtsSelectModule } from '@ui-vts/ng-vts/select';
import { VtsLayoutModule } from '@ui-vts/ng-vts/layout';
import { VtsProLayoutModule } from '@ui-vts/ng-vts/prolayout';
import { VtsSwitchModule } from '@ui-vts/ng-vts/switch';
import { VtsDrawerModule } from '@ui-vts/ng-vts/drawer';
import { ColorSketchModule } from 'ngx-color/sketch';
import { HoverPreloadModule, HoverPreloadStrategy } from 'ngx-hover-preload';
import { environment } from '../environments/environment';
import { DEMOComponent } from './_demo/demo.component';
import { AppComponent } from './app.component';
import { routes } from './app.routing.module';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { SideModule } from './side/side.module';
import { VtsContributorsListModule } from './share/contributors-list/contributors-list.module';
import { VtsNavBottomModule } from './share/nav-bottom/nav-bottom.module';
// import { VtsResizeObserverFactory } from '@ui-vts/ng-vts/cdk/resize-observer';

const icons: IconDefinition[] = [ChevronLeft, ChevronRight, PencilOutline];

@NgModule({
  declarations: [AppComponent, DEMOComponent],
  imports: [
    BidiModule,
    BrowserModule.withServerTransition({ appId: 'docs' }),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    VtsNavBottomModule,
    ColorSketchModule,
    VtsIconModule.forRoot(icons),
    VtsGridModule,
    VtsAffixModule,
    VtsMenuModule,
    VtsI18nModule,
    VtsSelectModule,
    VtsMessageModule,
    VtsPopoverModule,
    VtsButtonModule,
    VtsInputModule,
    VtsBadgeModule,
    VtsLayoutModule,
    VtsProLayoutModule,
    VtsSwitchModule,
    VtsDrawerModule,
    VtsPopoverModule,
    HttpClientJsonpModule,
    HeaderModule,
    SideModule,
    FooterModule,
    VtsContributorsListModule,
    HoverPreloadModule,
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy: HoverPreloadStrategy,
        scrollPositionRestoration: 'enabled',
        initialNavigation: 'enabledBlocking'
      }
      // environment.production
      // ? { preloadingStrategy: HoverPreloadStrategy, scrollPositionRestoration: 'enabled', initialNavigation: 'enabledBlocking' }
      //   : {}
    ),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production && !environment.preProduction
    })
  ],
  providers: [
    Title,
    {
      provide: VTS_CONFIG,
      useValue: { icon: { vtsTwotoneColor: '#1890ff' }, global: { vtsDirection: 'ltr' } }
    }
    // {
    //   provide: VtsResizeObserverFactory,
    //   useValue: {
    //     create(callback: ResizeObserverCallback): ResizeObserver | null {
    //       return typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(callback);
    //     }
    //   }
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
