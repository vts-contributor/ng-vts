import { Routes } from '@angular/router';

import { DEMO_ROUTES } from './router';
//import { DEMOComponent } from './_demo/demo.component';

export const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: '/docs/getting-started/en' },
  ...DEMO_ROUTES,
  //{ path: 'docs', loadChildren: () => import('./docs/index.module').then(m => m.VtsDocsModule) },
  //{ path: 'demo', component: DEMOComponent },
  // {
  //   path: 'components/overview',
  //   loadChildren: () => import('./components-overview/components-overview.module').then(m => m.ComponentsOverviewModule)
  // },

  {
    path: 'installation',
    loadChildren: () => import('./installation/installation.module').then(m => m.InstallationModule)
  },

  { path: '**', redirectTo: 'installation', pathMatch: 'full' }
];
