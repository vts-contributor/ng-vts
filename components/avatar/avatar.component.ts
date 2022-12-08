/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import {
  NgClassInterface,
  NgStyleInterface,
  NumberInput,
  VtsShapeSCType,
  VtsSizeLDSType
} from '@ui-vts/ng-vts/core/types';
import { InputNumber } from '@ui-vts/ng-vts/core/util';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'avatar';

@Component({
  selector: 'vts-avatar',
  exportAs: 'vtsAvatar',
  template: `
    <i vts-icon *ngIf="vtsIcon && hasIcon" [vtsType]="vtsIcon"></i>
    <img
      *ngIf="vtsSrc && hasSrc"
      [src]="vtsSrc"
      [attr.srcset]="vtsSrcSet"
      [attr.alt]="vtsAlt"
      (error)="imgError($event)"
    />
    <span class="vts-avatar-string" #textEl [ngStyle]="textStyles" *ngIf="vtsText && hasText">
      {{ vtsText }}
    </span>
  `,
  host: {
    '[class.vts-avatar-lg]': `vtsSize === 'lg'`,
    '[class.vts-avatar-sm]': `vtsSize === 'sm'`,
    '[class.vts-avatar-square]': `vtsShape === 'square'`,
    '[class.vts-avatar-circle]': `vtsShape === 'circle'`,
    '[class.vts-avatar-icon]': `vtsIcon`,
    '[class.vts-avatar-image]': `hasSrc `,
    '[style.width]': 'customSize',
    '[style.height]': 'customSize',
    '[style.line-height]': 'customSize',
    // vtsSize type is number when customSize is true
    '[style.font-size.px]': '(hasIcon && customSize) ? $any(vtsSize) / 2 : null'
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VtsAvatarComponent implements OnChanges {
  static ngAcceptInputType_vtsGap: NumberInput;

  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;
  @Input() @WithConfig() vtsShape: VtsShapeSCType = 'circle';
  @Input() @WithConfig() vtsSize: VtsSizeLDSType | number = 'md';
  @Input() @WithConfig() @InputNumber() vtsGap = 4;
  @Input() vtsText?: string;
  @Input() vtsSrc?: string;
  @Input() vtsSrcSet?: string;
  @Input() vtsAlt?: string;
  @Input() vtsIcon?: string;
  @Output() readonly vtsError = new EventEmitter<Event>();

  hasText: boolean = false;
  hasSrc: boolean = true;
  hasIcon: boolean = false;
  textStyles: NgStyleInterface = {};
  classMap: NgClassInterface = {};
  customSize: string | null = null;

  @ViewChild('textEl', { static: false }) textEl?: ElementRef;

  private el: HTMLElement = this.elementRef.nativeElement;

  constructor(
    public vtsConfigService: VtsConfigService,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private platform: Platform
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-avatar');
  }

  imgError($event: Event): void {
    this.vtsError.emit($event);
    if (!$event.defaultPrevented) {
      this.hasSrc = false;
      this.hasIcon = false;
      this.hasText = false;
      if (this.vtsIcon) {
        this.hasIcon = true;
      } else if (this.vtsText) {
        this.hasText = true;
      }
      this.cdr.detectChanges();
      this.setSizeStyle();
      this.notifyCalc();
    }
  }

  ngOnChanges(): void {
    this.hasText = !this.vtsSrc && !!this.vtsText;
    this.hasIcon = !this.vtsSrc && !!this.vtsIcon;
    this.hasSrc = !!this.vtsSrc;

    this.setSizeStyle();
    this.notifyCalc();
  }

  private calcStringSize(): void {
    if (!this.hasText) {
      return;
    }

    const childrenWidth = this.textEl!.nativeElement.offsetWidth;
    const avatarWidth = this.el.getBoundingClientRect().width;
    const offset = this.vtsGap * 2 < avatarWidth ? this.vtsGap * 2 : 8;
    const scale = avatarWidth - offset < childrenWidth ? (avatarWidth - offset) / childrenWidth : 1;

    this.textStyles = {
      transform: `scale(${scale}) translateX(-50%)`
    };
    if (this.customSize) {
      Object.assign(this.textStyles, {
        lineHeight: this.customSize
      });
    }
    this.cdr.detectChanges();
  }

  private notifyCalc(): void {
    // If use ngAfterViewChecked, always demands more computations, so......
    if (this.platform.isBrowser) {
      setTimeout(() => {
        this.calcStringSize();
      });
    }
  }

  private setSizeStyle(): void {
    if (typeof this.vtsSize === 'number') {
      this.customSize = `${this.vtsSize}px`;
    } else {
      this.customSize = null;
    }
    this.cdr.markForCheck();
  }
}
