/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { VtsEmptyI18nInterface, VtsI18nService } from '@ui-vts/ng-vts/i18n';

const VtsEmptyDefaultImages = ['default', 'simple'] as const;
type VtsEmptyNotFoundImageType =
  | (typeof VtsEmptyDefaultImages)[number]
  | null
  | string
  | TemplateRef<void>;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-empty',
  exportAs: 'vtsEmpty',
  template: `
    <div class="vts-empty-image">
      <ng-container *ngIf="!isImageBuildIn">
        <ng-container *vtsStringTemplateOutlet="vtsNotFoundImage">
          <img [src]="vtsNotFoundImage" [alt]="isContentString ? vtsNoResult : 'empty'" />
        </ng-container>
      </ng-container>
      <vts-empty-default
        *ngIf="isImageBuildIn && vtsNotFoundImage !== 'simple'"
      ></vts-empty-default>
      <vts-empty-simple *ngIf="isImageBuildIn && vtsNotFoundImage === 'simple'"></vts-empty-simple>
    </div>
    <p class="vts-empty-description" *ngIf="vtsNoResult !== null">
      <ng-container *vtsStringTemplateOutlet="vtsNoResult">
        {{ isContentString ? vtsNoResult : locale['description'] }}
      </ng-container>
    </p>
    <div class="vts-empty-footer" *ngIf="vtsNotFoundFooter">
      <ng-container *vtsStringTemplateOutlet="vtsNotFoundFooter">
        {{ vtsNotFoundFooter }}
      </ng-container>
    </div>
  `,
  host: {
    class: 'vts-empty'
  }
})
export class VtsEmptyComponent implements OnChanges, OnInit, OnDestroy {
  @Input() vtsNotFoundImage: VtsEmptyNotFoundImageType = 'default';
  @Input() vtsNoResult?: string | TemplateRef<void> | null;
  @Input() vtsNotFoundFooter?: string | TemplateRef<void>;

  isContentString = false;
  isImageBuildIn = true;
  locale!: VtsEmptyI18nInterface;

  private readonly destroy$ = new Subject<void>();

  constructor(private i18n: VtsI18nService, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsNoResult, vtsNotFoundImage } = changes;

    if (vtsNoResult) {
      const content = vtsNoResult.currentValue;
      this.isContentString = typeof content === 'string';
    }

    if (vtsNotFoundImage) {
      const image = vtsNotFoundImage.currentValue || 'default';
      this.isImageBuildIn = VtsEmptyDefaultImages.findIndex(i => i === image) > -1;
    }
  }

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Empty');
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
