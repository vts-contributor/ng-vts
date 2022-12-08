/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { badgePresetColors } from './preset-colors';

@Component({
  selector: 'vts-ribbon',
  exportAs: 'vtsRibbon',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
    <div
      class="vts-ribbon"
      [class]="presetColor && 'vts-ribbon-color-' + presetColor"
      [class.vts-ribbon-placement-end]="vtsPlacement === 'end'"
      [class.vts-ribbon-placement-start]="vtsPlacement === 'start'"
      [style.background-color]="!presetColor && vtsColor"
    >
      <ng-container *vtsStringTemplateOutlet="vtsText">
        {{ vtsText }}
      </ng-container>
      <div class="vts-ribbon-corner" [style.color]="!presetColor && vtsColor"></div>
    </div>
  `
})
export class VtsRibbonComponent implements OnChanges {
  @Input() vtsColor: string | undefined;
  @Input() vtsPlacement: 'start' | 'end' = 'end';
  @Input() vtsText: string | TemplateRef<void> | null = null;
  presetColor: string | null = null;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-ribbon-wrapper');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsColor } = changes;
    if (vtsColor) {
      this.presetColor =
        this.vtsColor && badgePresetColors.indexOf(this.vtsColor) !== -1 ? this.vtsColor : null;
    }
  }
}
