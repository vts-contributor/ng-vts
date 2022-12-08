import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../share/share.module';
import { moduleList } from './module';

{{imports}}

@NgModule({
  imports     : [
    ShareModule,
    ...moduleList,
    RouterModule.forChild([
      { path: '', redirectTo: 'en' },
      { path: 'en', component: VtsDemo{{component}}EnComponent },
      { path: '**', redirectTo: 'installation' }
    ])
  ],
  declarations: [
{{declarations}}
  ],
entryComponents: [
  {{entryComponents}}
]
})
export class VtsDemo{{component}}Module {

}
