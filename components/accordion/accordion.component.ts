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
  OnDestroy,
  OnInit,
  Optional,
  ViewEncapsulation
} from '@angular/core';

import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { VtsAccordionPanelComponent } from './accordion-panel.component';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'accordion';

@Component({
  selector: 'vts-accordion',
  exportAs: 'vtsAccordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.vts-accordion-icon-position-left]': `vtsExpandIconPosition === 'left'`,
    '[class.vts-accordion-icon-position-right]': `vtsExpandIconPosition === 'right'`,
    '[class.vts-accordion-flush]': `vtsFlush`,
    '[class.vts-accordion-rtl]': "dir === 'rtl'"
  }
})
export class VtsAccordionComponent implements OnDestroy, OnInit {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;
  static ngAcceptInputType_vtsFlush: BooleanInput;
  static ngAcceptInputType_vtsMultiple: BooleanInput;

  @Input() vtsExpandIconPosition: 'left' | 'right' = 'right';
  @Input() @WithConfig() @InputBoolean() vtsFlush = false;
  @Input() vtsMultiple: boolean = true;

  dir: Direction = 'ltr';
  private listOfVtsAccordionPanelComponent: VtsAccordionPanelComponent[] = [];
  private destroy$ = new Subject();
  constructor(
    public vtsConfigService: VtsConfigService,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-accordion');

    this.vtsConfigService
      .getConfigChangeEventForComponent(VTS_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  addPanel(value: VtsAccordionPanelComponent): void {
    this.listOfVtsAccordionPanelComponent.push(value);
  }

  removePanel(value: VtsAccordionPanelComponent): void {
    this.listOfVtsAccordionPanelComponent.splice(
      this.listOfVtsAccordionPanelComponent.indexOf(value),
      1
    );
  }

  click(collapse: VtsAccordionPanelComponent): void {
    if (this.vtsMultiple && !collapse.vtsActive) {
      this.listOfVtsAccordionPanelComponent
        .filter(item => item !== collapse)
        .forEach(item => {
          if (item.vtsActive && !item.vtsDisabled) {
            item.vtsActive = false;
            item.vtsActiveChange.emit(item.vtsActive);
            item.markForCheck();
          }
        });
    }
    collapse.vtsActive = !collapse.vtsActive;
    collapse.vtsActiveChange.emit(collapse.vtsActive);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
