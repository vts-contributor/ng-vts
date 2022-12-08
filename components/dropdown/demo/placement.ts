import { Component } from '@angular/core';
import { VtsPlacementType } from '@ui-vts/ng-vts/dropdown';

@Component({
  selector: 'vts-demo-dropdown-placement',
  template: `
    <div>
      <ng-container *ngFor="let position of listOfPosition">
        <button vts-button vts-dropdown [vtsDropdownMenu]="menu" [vtsPlacement]="position">
          {{ position }}
        </button>
        <vts-dropdown-menu #menu="vtsDropdownMenu">
          <ul vts-menu>
            <li vts-menu-item>1st menu item length</li>
            <li vts-menu-item>2nd menu item length</li>
            <li vts-menu-item>3rd menu item length</li>
          </ul>
        </vts-dropdown-menu>
      </ng-container>
    </div>
  `,
  styles: [
    `
      [vts-button] {
        margin-right: 8px;
        margin-bottom: 8px;
      }
    `
  ]
})
export class VtsDemoDropdownPlacementComponent {
  listOfPosition: VtsPlacementType[] = [
    'bottomLeft',
    'bottomCenter',
    'bottomRight',
    'topLeft',
    'topCenter',
    'topRight'
  ];
}
