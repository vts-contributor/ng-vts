/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Renderer2,
  SimpleChange,
  SimpleChanges
} from '@angular/core';

import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { BooleanInput, InputObservable, VtsSizeXLMSType } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'form';

export type VtsFormLayoutType = 'horizontal' | 'vertical' | 'inline';

export const DefaultTooltipIcon = 'QuestionAnswerOutline';

@Directive({
  selector: '[vts-form]',
  exportAs: 'vtsForm',
  host: {
    '[class.vts-form-horizontal]': `vtsLayout === 'horizontal'`,
    '[class.vts-form-vertical]': `vtsLayout === 'vertical'`,
    '[class.vts-form-inline]': `vtsLayout === 'inline'`,
    '[class.vts-form-rtl]': `dir === 'rtl'`,
    '[class.vts-form-xl]': `vtsSize === 'xl'`,
    '[class.vts-form-lg]': `vtsSize === 'lg'`,
    '[class.vts-form-md]': `vtsSize === 'md'`,
    '[class.vts-form-sm]': `vtsSize === 'sm'`
  }
})
export class VtsFormDirective implements OnChanges, OnDestroy, InputObservable {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;
  static ngAcceptInputType_vtsNoColon: BooleanInput;
  static ngAcceptInputType_vtsDisableAutoTips: BooleanInput;

  @Input() vtsSize: VtsSizeXLMSType = 'md';
  @Input() vtsLayout: VtsFormLayoutType = 'horizontal';
  @Input() @WithConfig() @InputBoolean() vtsNoColon: boolean = false;
  @Input() @WithConfig() vtsAutoTips: Record<string, Record<string, string>> = {};
  @Input() @InputBoolean() vtsDisableAutoTips = false;
  @Input() @WithConfig() vtsTooltipIcon: string = DefaultTooltipIcon;

  dir: Direction = 'ltr';
  destroy$ = new Subject();
  private inputChanges$ = new Subject<SimpleChanges>();

  getInputObservable<K extends keyof this>(changeType: K): Observable<SimpleChange> {
    return this.inputChanges$.pipe(
      filter(changes => changeType in changes),
      map(value => value[changeType as string])
    );
  }

  constructor(
    public vtsConfigService: VtsConfigService,
    elementRef: ElementRef,
    private renderer: Renderer2,
    @Optional() private directionality: Directionality
  ) {
    this.renderer.addClass(elementRef.nativeElement, 'vts-form');

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.inputChanges$.next(changes);
  }

  ngOnDestroy(): void {
    this.inputChanges$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
