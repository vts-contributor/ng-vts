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
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { VtsResizableService } from './resizable.service';

export type VtsResizeDirection =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft'
  | 'topLeft';

export class VtsResizeHandleMouseDownEvent {
  constructor(public direction: VtsResizeDirection, public mouseEvent: MouseEvent | TouchEvent) {}
}

@Component({
  selector: 'vts-resize-handle, [vts-resize-handle]',
  exportAs: 'vtsResizeHandle',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.vts-resizable-handle-top]': `vtsDirection === 'top'`,
    '[class.vts-resizable-handle-right]': `vtsDirection === 'right'`,
    '[class.vts-resizable-handle-bottom]': `vtsDirection === 'bottom'`,
    '[class.vts-resizable-handle-left]': `vtsDirection === 'left'`,
    '[class.vts-resizable-handle-topRight]': `vtsDirection === 'topRight'`,
    '[class.vts-resizable-handle-bottomRight]': `vtsDirection === 'bottomRight'`,
    '[class.vts-resizable-handle-bottomLeft]': `vtsDirection === 'bottomLeft'`,
    '[class.vts-resizable-handle-topLeft]': `vtsDirection === 'topLeft'`,
    '[class.vts-resizable-handle-box-hover]': 'entered',
    '(mousedown)': 'onMousedown($event)',
    '(touchstart)': 'onMousedown($event)'
  }
})
export class VtsResizeHandleComponent implements OnInit, OnDestroy {
  @Input() vtsDirection: VtsResizeDirection = 'bottomRight';
  @Output()
  readonly vtsMouseDown = new EventEmitter<VtsResizeHandleMouseDownEvent>();

  entered = false;
  private destroy$ = new Subject<void>();

  constructor(
    private vtsResizableService: VtsResizableService,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-resizable-handle');
  }

  ngOnInit(): void {
    this.vtsResizableService.mouseEntered$.pipe(takeUntil(this.destroy$)).subscribe(entered => {
      this.entered = entered;
      this.cdr.markForCheck();
    });
  }

  onMousedown(event: MouseEvent | TouchEvent): void {
    this.vtsResizableService.handleMouseDown$.next(
      new VtsResizeHandleMouseDownEvent(this.vtsDirection, event)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
