import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-panel-basic',
  template: `
    <div style="padding: 16px">
      <vts-row [vtsGutter]="[32, 32]">
        <div vts-col vtsFlex="400px">
          <vts-panel vtsTitle="Card Header">
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries
            </div>
          </vts-panel>
        </div>
        <div vts-col vtsFlex="400px">
          <vts-panel
            vtsTitle="Card Header"
            [vtsCollapseTpl]="collapseToggle"
            [vtsExpandTpl]="expandToggle"
          >
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries
            </div>
            <ng-template #collapseToggle>
              <a>Collapse</a>
            </ng-template>
            <ng-template #expandToggle>
              <a>Expand</a>
            </ng-template>
          </vts-panel>
        </div>
      </vts-row>
    </div>
  `
})
export class VtsDemoPanelBasicComponent {}
