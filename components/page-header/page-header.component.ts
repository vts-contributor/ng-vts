/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { Direction, Directionality } from '@angular/cdk/bidi';
import { Location } from '@angular/common';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { PREFIX } from '@ui-vts/ng-vts/core/logger';
import { VtsResizeObserver } from '@ui-vts/ng-vts/cdk/resize-observer';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import {
  VtsPageHeaderBreadcrumbDirective,
  VtsPageHeaderFooterDirective
} from './page-header-cells';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'pageHeader';

@Component({
  selector: 'vts-page-header',
  exportAs: 'vtsPageHeader',
  template: `
    <ng-content select="vts-breadcrumb[vts-page-header-breadcrumb]"></ng-content>

    <div class="vts-page-header-heading">
      <div class="vts-page-header-heading-left">
        <!--back-->
        <div *ngIf="vtsBackIcon !== null" (click)="onBack()" class="vts-page-header-back">
          <div role="button" tabindex="0" class="vts-page-header-back-button">
            <ng-container *vtsStringTemplateOutlet="vtsBackIcon; let backIcon">
              <i vts-icon [vtsType]="backIcon || getBackIcon()"></i>
            </ng-container>
          </div>
        </div>
        <!--avatar-->
        <ng-content select="vts-avatar[vts-page-header-avatar]"></ng-content>
        <!--title-->
        <span class="vts-page-header-heading-title" *ngIf="vtsTitle">
          <ng-container *vtsStringTemplateOutlet="vtsTitle">
            {{ vtsTitle }}
          </ng-container>
        </span>
        <ng-content
          *ngIf="!vtsTitle"
          select="vts-page-header-title, [vts-page-header-title]"
        ></ng-content>
        <!--subtitle-->
        <span class="vts-page-header-heading-sub-title" *ngIf="vtsSubtitle">
          <ng-container *vtsStringTemplateOutlet="vtsSubtitle">
            {{ vtsSubtitle }}
          </ng-container>
        </span>
        <ng-content
          *ngIf="!vtsSubtitle"
          select="vts-page-header-subtitle, [vts-page-header-subtitle]"
        ></ng-content>
        <ng-content select="vts-page-header-tags, [vts-page-header-tags]"></ng-content>
      </div>

      <ng-content select="vts-page-header-extra, [vts-page-header-extra]"></ng-content>
    </div>

    <ng-content select="vts-page-header-content, [vts-page-header-content]"></ng-content>
    <ng-content select="vts-page-header-footer, [vts-page-header-footer]"></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'vts-page-header',
    '[class.has-footer]': 'vtsPageHeaderFooter',
    '[class.vts-page-header-ghost]': 'vtsGhost',
    '[class.has-breadcrumb]': 'vtsPageHeaderBreadcrumb',
    '[class.vts-page-header-compact]': 'compact',
    '[class.vts-page-header-rtl]': `dir === 'rtl'`
  }
})
export class VtsPageHeaderComponent implements AfterViewInit, OnDestroy, OnInit {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;

  @Input() vtsBackIcon: string | TemplateRef<void> | null = null;
  @Input() vtsTitle?: string | TemplateRef<void>;
  @Input() vtsSubtitle?: string | TemplateRef<void>;
  @Input() @WithConfig() vtsGhost: boolean = true;
  @Output() readonly vtsBack = new EventEmitter<void>();

  @ContentChild(VtsPageHeaderFooterDirective, { static: false })
  vtsPageHeaderFooter?: ElementRef<VtsPageHeaderFooterDirective>;
  @ContentChild(VtsPageHeaderBreadcrumbDirective, { static: false })
  vtsPageHeaderBreadcrumb?: ElementRef<VtsPageHeaderBreadcrumbDirective>;

  compact = false;
  destroy$ = new Subject<void>();
  dir: Direction = 'ltr';

  constructor(
    @Optional() private location: Location,
    public vtsConfigService: VtsConfigService,
    private elementRef: ElementRef,
    private vtsResizeObserver: VtsResizeObserver,
    private cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality
  ) {}

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngAfterViewInit(): void {
    this.vtsResizeObserver
      .observe(this.elementRef)
      .pipe(
        map(([entry]) => entry.contentRect.width),
        takeUntil(this.destroy$)
      )
      .subscribe((width: number) => {
        this.compact = width < 768;
        this.cdr.markForCheck();
      });
  }

  onBack(): void {
    if (this.vtsBack.observers.length) {
      this.vtsBack.emit();
    } else {
      if (!this.location) {
        throw new Error(
          `${PREFIX} you should import 'RouterModule' or register 'Location' if you want to use 'vtsBack' default event!`
        );
      }
      this.location.back();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getBackIcon(): string {
    if (this.dir === 'rtl') {
      return 'arrow-right';
    }
    return 'arrow-left';
  }
}
