/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: 'td[vtsRight],th[vtsRight],td[vtsLeft],th[vtsLeft]',
  host: {
    '[class.vts-table-cell-fix-right]': `isFixedRight`,
    '[class.vts-table-cell-fix-left]': `isFixedLeft`,
    '[style.position]': `isFixed? 'sticky' : null`
  }
})
export class VtsCellFixedDirective implements OnChanges {
  @Input() vtsRight: string | boolean = false;
  @Input() vtsLeft: string | boolean = false;
  @Input() colspan: number | null = null;
  @Input() colSpan: number | null = null;
  changes$ = new Subject<void>();
  isAutoLeft = false;
  isAutoRight = false;
  isFixedLeft = false;
  isFixedRight = false;
  isFixed = false;

  setAutoLeftWidth(autoLeft: string | null): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'left', autoLeft);
  }

  setAutoRightWidth(autoRight: string | null): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'right', autoRight);
  }

  setIsFirstRight(isFirstRight: boolean): void {
    this.setFixClass(isFirstRight, 'vts-table-cell-fix-right-first');
  }

  setIsLastLeft(isLastLeft: boolean): void {
    this.setFixClass(isLastLeft, 'vts-table-cell-fix-left-last');
  }

  private setFixClass(flag: boolean, className: string): void {
    // the setFixClass function may call many times, so remove it first.
    this.renderer.removeClass(this.elementRef.nativeElement, className);

    if (flag) {
      this.renderer.addClass(this.elementRef.nativeElement, className);
    }
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnChanges(): void {
    this.setIsFirstRight(false);
    this.setIsLastLeft(false);
    this.isAutoLeft = this.vtsLeft === '' || this.vtsLeft === true;
    this.isAutoRight = this.vtsRight === '' || this.vtsRight === true;
    this.isFixedLeft = this.vtsLeft !== false;
    this.isFixedRight = this.vtsRight !== false;
    this.isFixed = this.isFixedLeft || this.isFixedRight;
    const validatePx = (value: string | boolean): string | null => {
      if (typeof value === 'string' && value !== '') {
        return value;
      } else {
        return null;
      }
    };
    this.setAutoLeftWidth(validatePx(this.vtsLeft));
    this.setAutoRightWidth(validatePx(this.vtsRight));
    this.changes$.next();
  }
}
