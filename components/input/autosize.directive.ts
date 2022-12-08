/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import {
  AfterViewInit,
  Directive,
  DoCheck,
  ElementRef,
  Input,
  NgZone,
  OnDestroy
} from '@angular/core';
import { VtsResizeService } from '@ui-vts/ng-vts/core/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import calculateNodeHeight from './calculateNodeHeight';

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}

@Directive({
  selector: 'textarea[vtsAutosize]',
  exportAs: 'vtsAutosize',
  host: {
    // Textarea elements that have the directive applied should have a single row by default.
    // Browsers normally show two rows by default and therefore this limits the minRows binding.
    rows: '1',
    '(input)': 'noopInputHandler()'
  }
})
export class VtsAutosizeDirective implements AfterViewInit, OnDestroy, DoCheck {
  private autosize: boolean = false;
  private el: HTMLTextAreaElement | HTMLInputElement = this.elementRef.nativeElement;
  // private cachedLineHeight!: number;
  private previousValue!: string;
  private previousMinRows: number | undefined;
  private minRows: number | undefined;
  private maxRows: number | undefined;
  private destroy$ = new Subject();

  @Input()
  set vtsAutosize(value: AutoSizeType | string | boolean) {
    const isAutoSizeType = (data: string | boolean | AutoSizeType): data is AutoSizeType => {
      return (
        typeof data !== 'string' && typeof data !== 'boolean' && (!!data.maxRows || !!data.minRows)
      );
    };
    if (typeof value === 'string' || value === true) {
      this.autosize = true;
    } else if (isAutoSizeType(value)) {
      this.autosize = true;
      this.minRows = value.minRows;
      this.maxRows = value.maxRows;
    }
  }

  resizeToFitContent(force: boolean = false): void {
    const textarea = this.el as HTMLTextAreaElement;
    const value = textarea.value;

    // Only resize if the value or minRows have changed since these calculations can be expensive.
    if (!force && this.minRows === this.previousMinRows && value === this.previousValue) {
      return;
    }
    const placeholderText = textarea.placeholder;

    // Reset the textarea height to auto in order to shrink back to its default size.
    // Also temporarily force overflow:hidden, so scroll bars do not interfere with calculations.
    // Long placeholders that are wider than the textarea width may lead to a bigger scrollHeight
    // value. To ensure that the scrollHeight is not bigger than the content, the placeholders
    // need to be removed temporarily.
    textarea.placeholder = '';
    const styles = calculateNodeHeight(this.el, false, this.minRows, this.maxRows);
    Object.entries(styles).forEach(([k, v]) => ((this.el.style as any)[k] = v));
    // Use the scrollHeight to know how large the textarea *would* be if fit its entire value.
    textarea.placeholder = placeholderText;

    // On Firefox resizing the textarea will prevent it from scrolling to the caret position.
    // We need to re-set the selection in order for it to scroll to the proper position.
    if (typeof requestAnimationFrame !== 'undefined') {
      this.ngZone.runOutsideAngular(() =>
        requestAnimationFrame(() => {
          const { selectionStart, selectionEnd } = textarea;

          // IE will throw an "Unspecified error" if we try to set the selection range after the
          // element has been removed from the DOM. Assert that the directive hasn't been destroyed
          // between the time we requested the animation frame and when it was executed.
          // Also note that we have to assert that the textarea is focused before we set the
          // selection range. Setting the selection range on a non-focused textarea will cause
          // it to receive focus on IE and Edge.
          if (!this.destroy$.isStopped && document.activeElement === textarea) {
            textarea.setSelectionRange(selectionStart, selectionEnd);
          }
        })
      );
    }

    this.previousValue = value;
    this.previousMinRows = this.minRows;
  }

  noopInputHandler(): void {
    // no-op handler that ensures we're running change detection on input events.
  }

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
    private platform: Platform,
    private resizeService: VtsResizeService
  ) {}

  ngAfterViewInit(): void {
    if (this.autosize && this.platform.isBrowser) {
      this.resizeToFitContent();
      this.resizeService
        .subscribe()
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.resizeToFitContent(true));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngDoCheck(): void {
    if (this.autosize && this.platform.isBrowser) {
      this.resizeToFitContent();
    }
  }
}
