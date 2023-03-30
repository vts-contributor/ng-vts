import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { VtsMenuItemProLayout } from './pro-layout.types';

@Component({
  selector: 'vts-prolayout-menu-item',
  templateUrl: 'menu-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class VtsProlayoutMenuItemComponent implements OnInit {
  @Input() vtsMenuItem: VtsMenuItemProLayout = {
    title: '',
    children: [],
    isSelected: false
  };
  defaultIcon: string = "AddDoutone:vts";
  currentUrl: string = "";

  constructor(private router: Router, private cdf: ChangeDetectorRef) {
    this.currentUrl = this.router.url;
    this.router.events.subscribe(evt => {
      if(evt instanceof NavigationEnd){
        // console.log(evt.url);
        this.currentUrl = evt.url;
        this.cdf.detectChanges();
      }
    });
  }

  ngOnInit() {}
}
