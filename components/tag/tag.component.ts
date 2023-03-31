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
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type VtsTagCustomColor = {
  background?: string;
  color?: string;
  checkedColor?: string;
  checkedBackground?: string;
};

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
    '[class]': `vtsPreset ? ('vts-tag-' + vtsPreset) : ''`,
    '[class.vts-tag-checkable]': `vtsMode === 'checkable'`,
    '[class.vts-tag-checkable-checked]': `vtsChecked`,
    '[class.vts-tag-rtl]': `dir === 'rtl'`,
    '[style.background-color]': `bg`,
    '[style.color]': `color`,
    '[style.borderColor]': `color`,
    '(click)': 'updateCheckedStatus()'
  }
})
export class VtsTagComponent implements OnChanges, OnDestroy, OnInit {
  static ngAcceptInputType_vtsChecked: BooleanInput;
  isPresetColor = false;
  @Input() vtsMode: 'default' | 'closeable' | 'checkable' = 'default';
  @Input() vtsColor?: VtsTagCustomColor;
  @Input() vtsPreset?: 'success' | 'info' | 'warning' | 'error';
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

  get bg() {
    if (!this.vtsColor) return null;
    return this.vtsChecked ? this.vtsColor?.checkedBackground : this.vtsColor?.background;
  }

  get color() {
    if (!this.vtsColor) return null;
    return this.vtsChecked ? this.vtsColor?.checkedColor : this.vtsColor?.color;
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

  ngOnChanges(_changes: SimpleChanges): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
