import { Component } from '@angular/core';
import { VtsContextMenuService, VtsDropdownMenuComponent } from '@ui-vts/ng-vts/dropdown';

@Component({
  selector: 'vts-demo-dropdown-context-menu',
  template: `
    <div class="context-area" (contextmenu)="contextMenu($event, menu)">Right Click on here</div>
    <vts-dropdown-menu #menu="vtsDropdownMenu">
      <ul vts-menu>
        <li vts-menu-item>1st menu item</li>
        <li vts-menu-item>2nd menu item</li>
        <li vts-menu-item vtsDisabled>disabled menu item</li>
        <li vts-submenu vtsTitle="sub menu">
          <ul>
            <li vts-menu-item>3rd menu item</li>
            <li vts-menu-item>4th menu item</li>
          </ul>
        </li>
        <li vts-submenu vtsDisabled vtsTitle="disabled sub menu">
          <ul>
            <li vts-menu-item>3rd menu item</li>
            <li vts-menu-item>4th menu item</li>
          </ul>
        </li>
      </ul>
    </vts-dropdown-menu>
  `,
  styles: [
    `
      .context-area {
        background: #f7f7f7;
        color: #777;
        text-align: center;
        height: 200px;
        line-height: 200px;
      }
    `
  ]
})
export class VtsDemoDropdownContextMenuComponent {
  contextMenu($event: MouseEvent, menu: VtsDropdownMenuComponent): void {
    this.vtsContextMenuService.create($event, menu);
  }

  closeMenu(): void {
    this.vtsContextMenuService.close();
  }

  constructor(private vtsContextMenuService: VtsContextMenuService) {}
}
