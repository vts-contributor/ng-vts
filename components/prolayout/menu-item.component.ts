import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { VtsMenuItemProLayout } from './pro-layout.types';
import { VtsDestroyService } from '@ui-vts/ng-vts/core/services';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vts-prolayout-menu-item',
  templateUrl: 'menu-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  providers: [VtsDestroyService]
})
export class VtsProlayoutMenuItemComponent implements OnInit {
  @Input() vtsMenuItem: VtsMenuItemProLayout = {
    title: '',
    children: [],
    isSelected: false
  };
  defaultIcon: string = 'AddDoutone:vts';
  currentUrl: string = '';

  constructor(
    private router: Router,
    private cdf: ChangeDetectorRef,
    private vtsDestroyService: VtsDestroyService
  ) {
    this.currentUrl = this.router.url;
    this.router.events.pipe(takeUntil(this.vtsDestroyService)).subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.currentUrl = evt.url;
        this.cdf.detectChanges();
      }
    });
  }

  ngOnInit() {}
}
