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
import { VtsProlayoutService } from './pro-layout.service';

@Component({
  selector: 'vts-prolayout-menu-item',
  templateUrl: 'menu-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  providers: [VtsDestroyService],
  host: {
    '[attr.level]': 'level'
  }
})
export class VtsProlayoutMenuItemComponent implements OnInit {
  @Input() vtsMenuItem: VtsMenuItemProLayout = {
    title: '',
    children: [],
    isSelected: false
  };
  @Input() level = 1;
  defaultIcon: string = 'AddDoutone:vts';
  currentUrl: string = '';

  readonly collapsed$ = this.prolayoutService.collapSiderChange$;

  constructor(
    private router: Router,
    private cdf: ChangeDetectorRef,
    private vtsDestroyService: VtsDestroyService,
    private prolayoutService: VtsProlayoutService
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
