/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { collapseMotion } from '@ui-vts/ng-vts/core/animation';

import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { VtsNoAnimationDirective } from '@ui-vts/ng-vts/core/no-animation';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { VtsCollapseComponent } from './collapse.component';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'collapsePanel';

@Component({
  selector: 'vts-collapse-panel',
  exportAs: 'vtsCollapsePanel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [collapseMotion],
  template: `
    <div
      role="tab"
      [attr.aria-expanded]="vtsActive"
      class="vts-collapse-header"
      (click)="clickHeader()"
    >
      <ng-container *ngIf="vtsShowArrow">
        <ng-container *vtsStringTemplateOutlet="vtsExpandedIcon; let expandedIcon">
          <i
            vts-icon
            [vtsType]="expandedIcon || 'right'"
            class="vts-collapse-arrow"
            [vtsRotate]="vtsActive ? 90 : 0"
          ></i>
        </ng-container>
      </ng-container>
      <ng-container *vtsStringTemplateOutlet="vtsHeader">
        {{ vtsHeader }}
      </ng-container>
      <div class="vts-collapse-extra" *ngIf="vtsExtra">
        <ng-container *vtsStringTemplateOutlet="vtsExtra">
          {{ vtsExtra }}
        </ng-container>
      </div>
    </div>
    <div
      class="vts-collapse-content"
      [class.vts-collapse-content-active]="vtsActive"
      [@.disabled]="noAnimation?.vtsNoAnimation"
      [@collapseMotion]="vtsActive ? 'expanded' : 'hidden'"
    >
      <div class="vts-collapse-content-box">
        <ng-content></ng-content>
      </div>
    </div>
  `,

  host: {
    '[class.vts-collapse-no-arrow]': '!vtsShowArrow',
    '[class.vts-collapse-item-active]': 'vtsActive',
    '[class.vts-collapse-item-disabled]': 'vtsDisabled'
  }
})
export class VtsCollapsePanelComponent implements OnInit, OnDestroy {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;
  static ngAcceptInputType_vtsActive: BooleanInput;
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsShowArrow: BooleanInput;

  @Input() @InputBoolean() vtsActive = false;
  @Input() @InputBoolean() vtsDisabled = false;
  @Input() @WithConfig() @InputBoolean() vtsShowArrow: boolean = true;
  @Input() vtsExtra?: string | TemplateRef<void>;
  @Input() vtsHeader?: string | TemplateRef<void>;
  @Input() vtsExpandedIcon?: string | TemplateRef<void>;
  @Output() readonly vtsActiveChange = new EventEmitter<boolean>();
  private destroy$ = new Subject();
  clickHeader(): void {
    if (!this.vtsDisabled) {
      this.vtsCollapseComponent.click(this);
    }
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  constructor(
    public vtsConfigService: VtsConfigService,
    private cdr: ChangeDetectorRef,
    @Host() private vtsCollapseComponent: VtsCollapseComponent,
    private elementRef: ElementRef,
    @Optional() public noAnimation?: VtsNoAnimationDirective
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-collapse-item');
    this.vtsConfigService
      .getConfigChangeEventForComponent(VTS_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    this.vtsCollapseComponent.addPanel(this);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.vtsCollapseComponent.removePanel(this);
  }
}
