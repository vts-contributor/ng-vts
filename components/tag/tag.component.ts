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
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { isPresetColor, VtsPresetColor } from '@ui-vts/ng-vts/core/color';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vts-tag',
  exportAs: 'vtsTag',
  preserveWhitespaces: false,
  template: `
    <ng-content></ng-content>
    <i
      vts-icon
      vtsType="Close"
      class="vts-tag-close-icon"
      *ngIf="vtsMode === 'closeable'"
      tabindex="-1"
      (click)="closeTag($event)"
    ></i>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[style.background-color]': `isPresetColor ? '' : vtsColor`,
    '[class]': `isPresetColor ? ('vts-tag-' + vtsColor) : ''`,
    '[class.vts-tag-has-color]': `vtsColor && !isPresetColor`,
    '[class.vts-tag-checkable]': `vtsMode === 'checkable'`,
    '[class.vts-tag-checkable-checked]': `vtsChecked`,
    '[class.vts-tag-rtl]': `dir === 'rtl'`,
    '(click)': 'updateCheckedStatus()'
  }
})
export class VtsTagComponent implements OnChanges, OnDestroy, OnInit {
  static ngAcceptInputType_vtsChecked: BooleanInput;
  isPresetColor = false;
  @Input() vtsMode: 'default' | 'closeable' | 'checkable' = 'default';
  @Input() vtsColor?: string | VtsPresetColor;
  @Input() @InputBoolean() vtsChecked = false;
  @Output() readonly vtsOnClose = new EventEmitter<MouseEvent>();
  @Output() readonly vtsCheckedChange = new EventEmitter<boolean>();
  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();

  updateCheckedStatus(): void {
    if (this.vtsMode === 'checkable') {
      this.vtsChecked = !this.vtsChecked;
      this.vtsCheckedChange.emit(this.vtsChecked);
    }
  }

  closeTag(e: MouseEvent): void {
    this.vtsOnClose.emit(e);
    if (!e.defaultPrevented) {
      this.renderer.removeChild(
        this.renderer.parentNode(this.elementRef.nativeElement),
        this.elementRef.nativeElement
      );
    }
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-tag');
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsColor } = changes;
    if (vtsColor) {
      if (!this.vtsColor) {
        this.isPresetColor = false;
      } else {
        this.isPresetColor =
          isPresetColor(this.vtsColor) ||
          /^(success|processing|error|default|warning)$/.test(this.vtsColor);
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
