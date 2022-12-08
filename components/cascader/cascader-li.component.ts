/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { Direction } from '@angular/cdk/bidi';
import { VtsCascaderOption } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: '[vts-cascader-option]',
  exportAs: 'vtsCascaderOption',
  template: `
    <ng-container *ngIf="optionTemplate; else defaultOptionTemplate">
      <ng-template
        [ngTemplateOutlet]="optionTemplate"
        [ngTemplateOutletContext]="{
          $implicit: option,
          index: columnIndex
        }"
      ></ng-template>
    </ng-container>
    <ng-template #defaultOptionTemplate>
      <span
        [innerHTML]="optionLabel | vtsHighlight: highlightText:'g':'vts-cascader-menu-item-keyword'"
      ></span>
    </ng-template>
    <span
      *ngIf="!option.isLeaf || option.children?.length || option.loading"
      class="vts-cascader-menu-item-expand-icon"
    >
      <i *ngIf="option.loading; else icon" vts-icon vtsType="Sync"></i>
      <ng-template #icon>
        <ng-container *vtsStringTemplateOutlet="expandIcon">
          <i vts-icon [vtsType]="$any(expandIcon)"></i>
        </ng-container>
      </ng-template>
    </span>
  `,
  host: {
    '[attr.title]': 'option.title || optionLabel',
    '[class.vts-cascader-menu-item-active]': 'activated',
    '[class.vts-cascader-menu-item-expand]': '!option.isLeaf',
    '[class.vts-cascader-menu-item-disabled]': 'option.disabled'
  }
})
export class VtsCascaderOptionComponent implements OnInit {
  @Input() optionTemplate: TemplateRef<VtsCascaderOption> | null = null;
  @Input() option!: VtsCascaderOption;
  @Input() activated = false;
  @Input() highlightText!: string;
  @Input() vtsLabelProperty = 'label';
  @Input() columnIndex!: number;
  @Input() expandIcon: string | TemplateRef<void> = '';
  @Input() dir: Direction = 'ltr';

  readonly nativeElement: HTMLElement;

  constructor(private cdr: ChangeDetectorRef, elementRef: ElementRef, renderer: Renderer2) {
    renderer.addClass(elementRef.nativeElement, 'vts-cascader-menu-item');
    this.nativeElement = elementRef.nativeElement;
  }
  ngOnInit(): void {
    if (this.expandIcon === '' && this.dir === 'rtl') {
      this.expandIcon = 'left';
    } else if (this.expandIcon === '') {
      this.expandIcon = 'right';
    }
  }

  get optionLabel(): string {
    return this.option[this.vtsLabelProperty];
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }
}
