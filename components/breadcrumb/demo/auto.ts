import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-breadcrumb-auto',
  template: `
    <vts-breadcrumb [vtsAutoGenerate]="true">
      Please refer to StackBlitz demo at https://stackblitz.com/edit/ng-zorro-breadcrumb-auto
    </vts-breadcrumb>
  `
})
export class VtsDemoBreadcrumbAutoComponent {}
