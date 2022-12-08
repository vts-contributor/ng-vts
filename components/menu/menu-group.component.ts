/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  Optional,
  Renderer2,
  SkipSelf,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { VtsIsMenuInsideDropDownToken } from './menu.token';

export function MenuGroupFactory(isMenuInsideDropDownToken: boolean): boolean {
  return isMenuInsideDropDownToken ? isMenuInsideDropDownToken : false;
}
@Component({
  selector: '[vts-menu-group]',
  exportAs: 'vtsMenuGroup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    /** check if menu inside dropdown-menu component **/
    {
      provide: VtsIsMenuInsideDropDownToken,
      useFactory: MenuGroupFactory,
      deps: [[new SkipSelf(), new Optional(), VtsIsMenuInsideDropDownToken]]
    }
  ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      [class.vts-menu-item-group-title]="!isMenuInsideDropDown"
      [class.vts-dropdown-menu-item-group-title]="isMenuInsideDropDown"
      #titleElement
    >
      <ng-container *vtsStringTemplateOutlet="vtsTitle">
        {{ vtsTitle }}
      </ng-container>
      <ng-content select="[title]" *ngIf="!vtsTitle"></ng-content>
    </div>
    <ng-content></ng-content>
  `,
  preserveWhitespaces: false
})
export class VtsMenuGroupComponent implements AfterViewInit {
  @Input() vtsTitle?: string | TemplateRef<void>;
  @ViewChild('titleElement') titleElement?: ElementRef;

  constructor(
    public elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(VtsIsMenuInsideDropDownToken) public isMenuInsideDropDown: boolean
  ) {
    const className = this.isMenuInsideDropDown
      ? 'vts-dropdown-menu-item-group'
      : 'vts-menu-item-group';
    this.renderer.addClass(elementRef.nativeElement, className);
  }

  ngAfterViewInit(): void {
    const ulElement = this.titleElement!.nativeElement.nextElementSibling;
    if (ulElement) {
      /** add classname to ul **/
      const className = this.isMenuInsideDropDown
        ? 'vts-dropdown-menu-item-group-list'
        : 'vts-menu-item-group-list';
      this.renderer.addClass(ulElement, className);
    }
  }
}
