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
        [vtsInlineIndent]="0"
      >
        <ng-container *ngIf="page === 'docs'">
          <ng-container *ngFor="let intro of routerList.intro">
            <li vts-menu-item vtsMatchRouter [hidden]="intro.language !== language || intro.hidden">
              <span>
                <a routerLink="{{ intro.path }}">{{ intro.label }}</a>
              </span>
            </li>
            <div class="divider"></div>
          </ng-container>
        </ng-container>

        <ng-container *ngIf="page === 'experimental'">
          <li
            vts-menu-group
            *ngFor="let group of routerList.components"
            [hidden]="group.language !== language || group.experimentalChildren.length === 0"
            [vtsTitle]="group.name"
          >
            <ul>
              <ng-container>
                <li
                  vts-menu-item
                  vtsMatchRouter
                  *ngFor="let component of group.experimentalChildren"
                >
                  <a routerLink="{{ component.path }}">
                    <span>{{ component.label }}</span>
                    <span class="chinese">{{ component.zh }}</span>
                  </a>
                </li>
              </ng-container>
            </ul>
          </li>
        </ng-container>

        <ng-container *ngIf="page !== 'experimental' && page !== 'docs'">
          <!--
        <li vts-menu-item vtsMatchRouter>
          <span><a routerLink="components/overview/{{ language }}" *ngIf="language === 'en'">Components Overview</a></span>
        </li>
        -->

          <li vts-menu-item vtsMatchRouter>
            <i vts-icon vtsType="Settings"></i>
            <span><a routerLink="installation">Installation</a></span>
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
                <li vts-menu-item vtsMatchRouter *ngFor="let component of group.children">
                  <a routerLink="{{ component.path }}">
                    <span>{{ component.label }}</span>
                    <span class="chinese">{{ component.zh }}</span>
                  </a>
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
