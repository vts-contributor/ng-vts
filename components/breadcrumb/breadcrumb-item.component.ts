//@ts-nocheck
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { Router, UrlTree } from '@angular/router';

import { VtsDropdownMenuComponent } from '@ui-vts/ng-vts/dropdown';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';

import { VtsBreadcrumb } from './breadcrumb';

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
        <i *ngIf="!!vtsOverlay" vts-icon vtsType="ArrowDownOutline"></i>
      </span>
    </ng-container>

    <ng-template #noMenuTpl>
      <span class="vts-breadcrumb-link">
        <ng-container *ngIf="vtsUrl && !vtsDisabled; else simpleLabel">
          <a [attr.href]="generateUrl(vtsUrl)" (click)="navigate($event)">
            <i vts-icon *ngIf="vtsIcon" [vtsType]="vtsIcon"></i>
            <span *ngIf="vtsLabel">{{ vtsLabel }}</span>
          </a>
        </ng-container>

        <ng-template #simpleLabel>
          <span>
            <i vts-icon *ngIf="vtsIcon" [vtsType]="vtsIcon"></i>
            <span *ngIf="vtsLabel">{{ vtsLabel }}</span>
          </span>
        </ng-template>
      </span>
    </ng-template>

    <span class="vts-breadcrumb-separator" *ngIf="vtsBreadCrumbComponent.vtsSeparator">
      <ng-container *vtsStringTemplateOutlet="vtsBreadCrumbComponent.vtsSeparator">
        {{ vtsBreadCrumbComponent.vtsSeparator }}
      </ng-container>
    </span>
  `,
  host: {
    '[class.vts-breadcrumb-item]': 'true',
    '[class.vts-breadcrumb-disabled]': 'vtsDisabled'
  }
})
export class VtsBreadCrumbItemComponent {
  static ngAcceptInputType_vtsDisabled: BooleanInput;

  @Input() vtsOverlay?: VtsDropdownMenuComponent;
  @Input() vtsIcon?: string;
  @Input() vtsLabel?: string;
  @Input() vtsUrl?: string | UrlTree | string[];
  @Input() @InputBoolean() vtsDisabled?: boolean;

  constructor(public vtsBreadCrumbComponent: VtsBreadcrumb, private injector: Injector) {}

  navigate(e: MouseEvent): void {
    e.preventDefault();
    const url = this.generateUrl(this.vtsUrl!);
    this.injector.get(Router).navigateByUrl(url);
  }

  generateUrl(url: string | UrlTree | string[]) {
    if (Array.isArray(url)) {
      return this.injector.get(Router).createUrlTree(url).toString();
    }
    return url.toString();
  }
}
