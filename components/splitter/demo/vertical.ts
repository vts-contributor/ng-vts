import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-splitter-vertical',
  template: `
    <vts-splitter
      [vtsStyle]="{ height: '300px', width: '100%', border: '1px solid #dee2e6' }"
      vtsLayout="vertical"
    >
      <ng-template vts-splitter-item>
        <div vts-row vtsJustify="center" vtsAlign="middle" style="width: 100%">
          <div vts-col>Panel 1</div>
        </div>
      </ng-template>
      <ng-template vts-splitter-item>
        <div vts-row vtsJustify="center" vtsAlign="middle" style="width: 100%">
          <div vts-col>Panel 2</div>
        </div>
      </ng-template>
    </vts-splitter>
  `
})
export class VtsDemoSplitterVerticalComponent {}
