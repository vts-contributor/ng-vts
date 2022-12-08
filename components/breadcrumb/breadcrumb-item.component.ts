/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import { VtsDropdownMenuComponent } from '@ui-vts/ng-vts/dropdown';

import { VtsBreadCrumbComponent } from './breadcrumb.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-breadcrumb-item',
  exportAs: 'vtsBreadcrumbItem',
  preserveWhitespaces: false,
  template: `
    <ng-container *ngIf="!!vtsOverlay; else noMenuTpl">
      <span class="vts-breadcrumb-overlay-link" vts-dropdown [vtsDropdownMenu]="vtsOverlay">
        <ng-template [ngTemplateOutlet]="noMenuTpl"></ng-template>
        <i *ngIf="!!vtsOverlay" vts-icon vtsType="ArrowDown"></i>
      </span>
    </ng-container>

    <ng-template #noMenuTpl>
      <span class="vts-breadcrumb-link">
        <ng-content></ng-content>
      </span>
    </ng-template>

    <span class="vts-breadcrumb-separator" *ngIf="vtsBreadCrumbComponent.vtsSeparator">
      <ng-container *vtsStringTemplateOutlet="vtsBreadCrumbComponent.vtsSeparator">
        {{ vtsBreadCrumbComponent.vtsSeparator }}
      </ng-container>
    </span>
  `
})
export class VtsBreadCrumbItemComponent {
  /**
   * Dropdown content of a breadcrumb item.
   */
  @Input() vtsOverlay?: VtsDropdownMenuComponent;

  constructor(public vtsBreadCrumbComponent: VtsBreadCrumbComponent) {}
}
