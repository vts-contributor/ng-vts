import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterList } from '../router';

@Component({
  selector: 'app-side',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container>
      <ul
        (vtsClick)="onItemClick($event)"
        id="mainSider"
        [vtsInlineCollapsed]="sideCollapsed"
        vts-menu
        [vtsMode]="'inline'"
        class="aside-container"
      >
        <ng-container>
          <li routerLink="installation" vts-menu-item vtsMatchRouter>
            <i vts-icon vtsType="Settings"></i>
            <span>Installation</span>
          </li>

          <li
            #sub
            [vtsOpen]="!sideCollapsed && !!sub"
            vts-submenu
            *ngFor="let group of routerList.components"
            [vtsTitle]="group.name"
            vtsIcon="Cube-1"
          >
            <ul>
              <ng-container>
                <li
                  vts-menu-item
                  vtsMatchRouter
                  *ngFor="let component of group.children"
                  routerLink="{{ component.path }}"
                >
                  <span>{{ component.label }}</span>
                </li>
              </ng-container>
            </ul>
          </li>
        </ng-container>
      </ul>
    </ng-container>
  `
})
export class SideComponent {
  @Input() page: 'docs' | 'components' | 'experimental' | string = 'docs';
  @Input() routerList: RouterList = {} as RouterList;
  @Input() language: 'zh' | 'en' = 'en';
  @Input() sideCollapsed: boolean = false;

  @Input() onItemClick = (_e?: any) => {};
}
