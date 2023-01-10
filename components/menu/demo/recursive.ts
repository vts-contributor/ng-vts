import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-menu-recursive',
  template: `
    <ul vts-menu vtsMode="inline" style="width: 240px;">
      <ng-container *ngTemplateOutlet="menuTpl; context: { $implicit: menus }"></ng-container>
      <ng-template #menuTpl let-menus>
        <ng-container *ngFor="let menu of menus">
          <li
            *ngIf="!menu.children"
            vts-menu-item
            [vtsPaddingLeft]="menu.level * 24"
            [vtsDisabled]="menu.disabled"
            [vtsSelected]="menu.selected"
          >
            <i vts-icon [vtsType]="menu.icon" *ngIf="menu.icon"></i>
            <span>{{ menu.title }}</span>
          </li>
          <li
            *ngIf="menu.children"
            vts-submenu
            [vtsPaddingLeft]="menu.level * 24"
            [vtsOpen]="menu.open"
            [vtsTitle]="menu.title"
            [vtsIcon]="menu.icon"
            [vtsDisabled]="menu.disabled"
          >
            <ul>
              <ng-container
                *ngTemplateOutlet="menuTpl; context: { $implicit: menu.children }"
              ></ng-container>
            </ul>
          </li>
        </ng-container>
      </ng-template>
    </ul>
  `
})
export class VtsDemoMenuRecursiveComponent {
  mode = false;
  dark = false;
  menus = [
    {
      level: 1,
      title: 'Mail Group',
      icon: 'Mail',
      open: true,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'Group 1',
          icon: 'bars',
          open: false,
          selected: false,
          disabled: false,
          children: [
            {
              level: 3,
              title: 'Option 1',
              selected: false,
              disabled: false
            },
            {
              level: 3,
              title: 'Option 2',
              selected: false,
              disabled: true
            }
          ]
        },
        {
          level: 2,
          title: 'Group 2',
          icon: 'bars',
          selected: true,
          disabled: false
        },
        {
          level: 2,
          title: 'Group 3',
          icon: 'bars',
          selected: false,
          disabled: false
        }
      ]
    },
    {
      level: 1,
      title: 'Team Group',
      icon: 'AccountCircle',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'User 1',
          icon: 'user',
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: 'User 2',
          icon: 'user',
          selected: false,
          disabled: false
        }
      ]
    }
  ];
}
