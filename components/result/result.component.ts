/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type VtsResultIconType = 'success' | 'error' | 'info' | 'warning';
export type VtsExceptionStatusType = '404' | '500' | '403';
export type VtsResultStatusType = VtsExceptionStatusType | VtsResultIconType;

const IconMap = {
  success: 'check-circle',
  error: 'Close',
  info: 'exclamation-circle',
  warning: 'warning'
};
const ExceptionStatus = ['404', '500', '403'];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-result',
  exportAs: 'vtsResult',
  template: `
    <div class="vts-result-icon">
      <ng-container *ngIf="!isException; else exceptionTpl">
        <ng-container *ngIf="icon">
          <ng-container *vtsStringTemplateOutlet="icon; let icon">
            <i vts-icon [vtsType]="icon"></i>
          </ng-container>
        </ng-container>
        <ng-content *ngIf="!icon" select="[vts-result-icon]"></ng-content>
      </ng-container>
    </div>
    <ng-container *ngIf="vtsTitle">
      <div class="vts-result-title" *vtsStringTemplateOutlet="vtsTitle">
        {{ vtsTitle }}
      </div>
    </ng-container>
    <ng-content *ngIf="!vtsTitle" select="div[vts-result-title]"></ng-content>
    <ng-container *ngIf="vtsSubTitle">
      <div class="vts-result-subtitle" *vtsStringTemplateOutlet="vtsSubTitle">
        {{ vtsSubTitle }}
      </div>
    </ng-container>
    <ng-content *ngIf="!vtsSubTitle" select="div[vts-result-subtitle]"></ng-content>
    <ng-content select="vts-result-content, [vts-result-content]"></ng-content>
    <div class="vts-result-extra" *ngIf="vtsExtra">
      <ng-container *vtsStringTemplateOutlet="vtsExtra">
        {{ vtsExtra }}
      </ng-container>
    </div>
    <ng-content *ngIf="!vtsExtra" select="div[vts-result-extra]"></ng-content>

    <ng-template #exceptionTpl>
      <ng-container [ngSwitch]="vtsStatus">
        <vts-result-not-found *ngSwitchCase="'404'"></vts-result-not-found>
        <vts-result-server-error *ngSwitchCase="'500'"></vts-result-server-error>
        <vts-result-unauthorized *ngSwitchCase="'403'"></vts-result-unauthorized>
      </ng-container>
    </ng-template>
  `,
  host: {
    '[class.vts-result-success]': `vtsStatus === 'success'`,
    '[class.vts-result-error]': `vtsStatus === 'error'`,
    '[class.vts-result-info]': `vtsStatus === 'info'`,
    '[class.vts-result-warning]': `vtsStatus === 'warning'`,
    '[class.vts-result-rtl]': `dir === 'rtl'`
  }
})
export class VtsResultComponent implements OnChanges, OnDestroy, OnInit {
  @Input() vtsIcon?: string | TemplateRef<void>;
  @Input() vtsTitle?: string | TemplateRef<void>;
  @Input() vtsStatus: VtsResultStatusType = 'info';
  @Input() vtsSubTitle?: string | TemplateRef<void>;
  @Input() vtsExtra?: string | TemplateRef<void>;

  icon?: string | TemplateRef<void>;
  isException = false;
  dir: Direction = 'ltr';

  private destroy$ = new Subject<void>();

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-result');
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngOnChanges(): void {
    this.setStatusIcon();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setStatusIcon(): void {
    const icon = this.vtsIcon;

    this.isException = ExceptionStatus.indexOf(this.vtsStatus) !== -1;
    this.icon = icon
      ? typeof icon === 'string'
        ? IconMap[icon as VtsResultIconType] || icon
        : icon
      : this.isException
      ? undefined
      : IconMap[this.vtsStatus as VtsResultIconType];
  }
}
