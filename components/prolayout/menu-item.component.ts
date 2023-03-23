import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemProLayout } from './pro-layout.types';

@Component({
  selector: 'vts-prolayout-menu-item',
  templateUrl: 'menu-item.component.html'
})
export class VtsProlayoutMenuItemComponent implements OnInit {
  @Input() menuItem: MenuItemProLayout = {
    title: '',
    children: [],
    isSelected: false
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  onClickAvatarMenuItem(item: MenuItemProLayout): void {
    if(typeof item.url !== 'undefined'){
      this.router.navigateByUrl(item.url);
    }
  }
}
