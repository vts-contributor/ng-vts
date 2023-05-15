/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  Self,
  SimpleChanges
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { BooleanInput, VtsSizeXLMSType } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'input[vts-input],textarea[vts-input]',
  exportAs: 'vtsInput',
  host: {
    '[class.vts-input-disabled]': 'disabled',
    '[class.vts-input-borderless]': 'vtsBorderless',
    '[class.vts-input-filled]': 'filled',
    '[class.vts-input-xl]': `vtsSize === 'xl'`,
    '[class.vts-input-lg]': `vtsSize === 'lg'`,
    '[class.vts-input-md]': `vtsSize === 'md'`,
    '[class.vts-input-sm]': `vtsSize === 'sm'`,
    '[attr.disabled]': 'disabled || null',
    '[class.vts-input-rtl]': `dir=== 'rtl'`
  }
})
export class VtsInputDirective implements OnChanges, OnInit, OnDestroy {
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_vtsBorderless: BooleanInput;
  @Input() @InputBoolean() vtsBorderless = false;
  @Input() vtsSize: VtsSizeXLMSType = 'md';
  @Input()
  get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value != null && `${value}` !== 'false';
  }
  _disabled = false;
  disabled$ = new Subject<boolean>();
  dir: Direction = 'ltr';
  filled: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    renderer: Renderer2,
    elementRef: ElementRef,
    @Optional() private directionality: Directionality
  ) {
    renderer.addClass(elementRef.nativeElement, 'vts-input');
  }

  ngOnInit(): void {
    if (this.ngControl) {
      this.ngControl.statusChanges
        ?.pipe(
          filter(() => this.ngControl.disabled !== null),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.disabled$.next(this.ngControl.disabled!);
        });
    }

    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { disabled } = changes;
    if (disabled) {
      this.disabled$.next(this.disabled);
    }
  }

  @HostListener('keyup', ['$event']) onKeyup(e: KeyboardEvent) {
    this.filled = !!e.target && !!(e.target as HTMLInputElement).value;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
