import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-flexible-content',
  template: `
    <vts-card vtsHoverable style="width:240px" [vtsCover]="coverTemplate">
      <vts-card-meta
        vtsTitle="Europe Street beat"
        vtsDescription="www.instagram.com"
      ></vts-card-meta>
    </vts-card>
    <ng-template #coverTemplate>
      <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
    </ng-template>
  `
})
export class VtsDemoCardFlexibleContentComponent {}
