import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { VtsMenuItemProLayout } from './pro-layout.types';

@Component({
  selector: 'vts-prolayout-menu-item',
  templateUrl: 'menu-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class VtsProlayoutMenuItemComponent implements OnInit {
  @Input() vtsMenuItem: VtsMenuItemProLayout = {
    title: '',
    children: [],
    isSelected: false
  };
  defaultIcon: string = 'AddDoutone:vts';

  constructor(private router: Router) {}

  ngOnInit() {}

  onClickAvatarMenuItem(item: VtsMenuItemProLayout): void {
    if (typeof item.url !== 'undefined') {
      this.router.navigateByUrl(item.url);
    }
  }
}
