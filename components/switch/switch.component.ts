/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Direction, Directionality } from '@angular/cdk/bidi';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import {
  BooleanInput,
  VtsSizeDSType,
  OnChangeType,
  OnTouchedType
} from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'switch';

@Component({
  selector: 'vts-switch',
  exportAs: 'vtsSwitch',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VtsSwitchComponent),
      multi: true
    }
  ],
  template: `
    <button
      vts-wave
      type="button"
      class="vts-switch"
      #switchElement
      [disabled]="vtsDisabled"
      [class.vts-switch-checked]="isChecked"
      [class.vts-switch-loading]="vtsLoading"
      [class.vts-switch-disabled]="vtsDisabled"
      [class.vts-switch-small]="vtsSize === 'sm'"
      [class.vts-switch-rtl]="dir === 'rtl'"
      [vtsWaveExtraNode]="true"
      (keydown)="onKeyDown($event)"
    >
      <span class="vts-switch-handle">
        <i *ngIf="vtsLoading" vts-icon vtsType="Sync" class="vts-switch-loading-icon"></i>
      </span>
      <span class="vts-switch-inner">
        <ng-container *ngIf="isChecked; else uncheckTemplate">
          <ng-container *vtsStringTemplateOutlet="vtsCheckedChildren">
            {{ vtsCheckedChildren }}
          </ng-container>
        </ng-container>
        <ng-template #uncheckTemplate>
          <ng-container *vtsStringTemplateOutlet="vtsUnCheckedChildren">
            {{ vtsUnCheckedChildren }}
          </ng-container>
        </ng-template>
      </span>
      <div class="vts-click-animating-node"></div>
    </button>
  `,
  host: {
    '(click)': 'onHostClick($event)'
  }
})
export class VtsSwitchComponent implements ControlValueAccessor, AfterViewInit, OnDestroy, OnInit {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;

  static ngAcceptInputType_vtsLoading: BooleanInput;
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsControl: BooleanInput;

  isChecked = false;
  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  @ViewChild('switchElement', { static: true })
  private switchElement?: ElementRef;
  @Input() @InputBoolean() vtsLoading = false;
  @Input() @InputBoolean() vtsDisabled = false;
  @Input() @InputBoolean() vtsControl = false;
  @Input() vtsCheckedChildren: string | TemplateRef<void> | null = null;
  @Input() vtsUnCheckedChildren: string | TemplateRef<void> | null = null;
  @Input() @WithConfig() vtsSize: VtsSizeDSType = 'md';

  dir: Direction = 'ltr';

  private destroy$ = new Subject<void>();

  onHostClick(e: MouseEvent): void {
    e.preventDefault();
    if (!this.vtsDisabled && !this.vtsLoading && !this.vtsControl) {
      this.updateValue(!this.isChecked);
    }
  }

  updateValue(value: boolean): void {
    if (this.isChecked !== value) {
      this.isChecked = value;
      this.onChange(this.isChecked);
    }
  }

  onKeyDown(e: KeyboardEvent): void {
    if (!this.vtsControl && !this.vtsDisabled && !this.vtsLoading) {
      if (e.keyCode === LEFT_ARROW) {
        this.updateValue(false);
        e.preventDefault();
      } else if (e.keyCode === RIGHT_ARROW) {
        this.updateValue(true);
        e.preventDefault();
      } else if (e.keyCode === SPACE || e.keyCode === ENTER) {
        this.updateValue(!this.isChecked);
        e.preventDefault();
      }
    }
  }

  focus(): void {
    this.focusMonitor.focusVia(this.switchElement?.nativeElement, 'keyboard');
  }

  blur(): void {
    this.switchElement?.nativeElement.blur();
  }

  constructor(
    public vtsConfigService: VtsConfigService,
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor,
    @Optional() private directionality: Directionality
  ) {}

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngAfterViewInit(): void {
    this.focusMonitor.monitor(this.switchElement!.nativeElement, true).subscribe(focusOrigin => {
      if (!focusOrigin) {
        /** https://github.com/angular/angular/issues/17793 **/
        Promise.resolve().then(() => this.onTouched());
      }
    });
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.switchElement!.nativeElement);
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: boolean): void {
    this.isChecked = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.vtsDisabled = disabled;
    this.cdr.markForCheck();
  }
}
