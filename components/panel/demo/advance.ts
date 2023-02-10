import { Component } from '@angular/core';
import { VtsPanelComponent } from '@ui-vts/ng-vts/panel';

@Component({
  selector: 'vts-demo-panel-advance',
  template: `
    <div style="padding: 16px">
      <vts-row [vtsGutter]="[32, 32]">
        <div vts-col vtsFlex="400px">
          <vts-panel #panel vtsTitle="Card Header" [(vtsActive)]="active" [vtsExtraTpl]="extraTpl">
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries
            </div>
          </vts-panel>
          <ng-template #extraTpl>
            <button
              vts-button
              vtsType="text"
              vts-dropdown
              vtsTrigger="click"
              [vtsDropdownMenu]="menu"
            >
              <i vts-icon vtsType="SettingsOutline"></i>
            </button>

            <!-- Disable focus state of button by re-rerendering button -->
            <button *ngIf="active" vts-button vtsType="text" (click)="toggle(panel)">
              <i vts-icon vtsType="ArrowUpOutline"></i>
            </button>
            <button *ngIf="!active" vts-button vtsType="text" (click)="toggle(panel)">
              <i vts-icon vtsType="ArrowDownOutline"></i>
            </button>
          </ng-template>
        </div>
      </vts-row>
    </div>
    <vts-dropdown-menu #menu="vtsDropdownMenu">
      <ul vts-menu vtsSelectable>
        <li vts-menu-item>Options 1</li>
        <li vts-menu-item>Options 2</li>
        <li vts-menu-item>Options 3</li>
      </ul>
    </vts-dropdown-menu>
  `
})
export class VtsDemoPanelAdvanceComponent {
  active: boolean = true;

  toggle(panel: VtsPanelComponent) {
    panel.toggle();
  }
}
