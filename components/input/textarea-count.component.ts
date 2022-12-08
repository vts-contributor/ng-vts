/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  isDevMode,
  OnDestroy,
  Renderer2
} from '@angular/core';

import { EMPTY, merge, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

import { isNotNil } from '@ui-vts/ng-vts/core/util';

import { VtsInputDirective } from './input.directive';

@Component({
  selector: 'vts-textarea-count',
  template: `
    <ng-content select="textarea[vts-input]"></ng-content>
  `,
  host: {
    class: 'vts-input-textarea-show-count'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsTextareaCountComponent implements AfterContentInit, OnDestroy {
  @ContentChild(VtsInputDirective, { static: true })
  vtsInputDirective!: VtsInputDirective;
  @Input() vtsMaxCharacterCount: number = 0;
  @Input() vtsComputeCharacterCount: (v: string) => number = v => v.length;
  @Input() vtsFormatter: (cur: number, max: number) => string = (c, m) =>
    `${c}` + (m > 0 ? `/${m}` : ``);

  private configChange$ = new Subject();
  private destroy$ = new Subject();

  constructor(private renderer: Renderer2, private elementRef: ElementRef<HTMLElement>) {}

  ngAfterContentInit(): void {
    if (!this.vtsInputDirective && isDevMode()) {
      throw new Error('[vts-textarea-count]: Could not find matching textarea[vts-input] child.');
    }

    if (this.vtsInputDirective.ngControl) {
      const valueChanges = this.vtsInputDirective.ngControl.valueChanges || EMPTY;
      merge(valueChanges, this.configChange$)
        .pipe(
          takeUntil(this.destroy$),
          map(() => this.vtsInputDirective.ngControl.value),
          startWith(this.vtsInputDirective.ngControl.value as string)
        )
        .subscribe(value => {
          this.setDataCount(value);
        });
    }
  }

  setDataCount(value: string): void {
    const inputValue = isNotNil(value) ? String(value) : '';
    const currentCount = this.vtsComputeCharacterCount(inputValue);
    const dataCount = this.vtsFormatter(currentCount, this.vtsMaxCharacterCount);
    this.renderer.setAttribute(this.elementRef.nativeElement, 'data-count', dataCount);
  }

  ngOnDestroy(): void {
    this.configChange$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
