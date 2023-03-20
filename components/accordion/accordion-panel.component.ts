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
import { accordionMotion } from '@ui-vts/ng-vts/core/animation';

import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { VtsNoAnimationDirective } from '@ui-vts/ng-vts/core/no-animation';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { VtsAccordionComponent } from './accordion.component';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'accordionPanel';

@Component({
  selector: 'vts-accordion-panel',
  exportAs: 'vtsAccordionPanel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [accordionMotion],
  template: `
    <div
      role="tab"
      [attr.aria-expanded]="vtsActive"
      class="vts-accordion-header"
      (click)="clickHeader()"
    >
      <ng-container *vtsStringTemplateOutlet="vtsHeader">
        {{ vtsHeader }}
      </ng-container>
      <div class="vts-accordion-extra" *ngIf="vtsExtra">
        <ng-container *vtsStringTemplateOutlet="vtsExtra">
          {{ vtsExtra }}
        </ng-container>
      </div>

      <ng-container *ngIf="vtsShowArrow">
        <ng-container *vtsStringTemplateOutlet="vtsExpandedIcon; let expandedIcon">
          <i
            vts-icon
            [vtsType]="expandedIcon ? expandedIcon : 'ArrowDownOutline'"
            class="vts-accordion-arrow"
            [vtsRotate]="vtsActive ? 0 : 180"
          ></i>
        </ng-container>
      </ng-container>
    </div>
    <div
      class="vts-accordion-content"
      [class.vts-accordion-content-active]="vtsActive"
      [@.disabled]="noAnimation?.vtsNoAnimation"
      [@accordionMotion]="vtsActive ? 'expanded' : 'hidden'"
    >
      <div class="vts-accordion-content-box">
        <ng-content></ng-content>
      </div>
    </div>
  `,

  host: {
    '[class.vts-accordion-no-arrow]': '!vtsShowArrow',
    '[class.vts-accordion-item-active]': 'vtsActive',
    '[class.vts-accordion-item-disabled]': 'vtsDisabled'
  }
})
export class VtsAccordionPanelComponent implements OnInit, OnDestroy {
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
      this.vtsAccordionComponent.click(this);
    }
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  constructor(
    public vtsConfigService: VtsConfigService,
    private cdr: ChangeDetectorRef,
    @Host() private vtsAccordionComponent: VtsAccordionComponent,
    private elementRef: ElementRef,
    @Optional() public noAnimation?: VtsNoAnimationDirective
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-accordion-item');
    this.vtsConfigService
      .getConfigChangeEventForComponent(VTS_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    this.vtsAccordionComponent.addPanel(this);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.vtsAccordionComponent.removePanel(this);
  }
}
