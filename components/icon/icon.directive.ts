/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentChecked,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { getNameAndType, hasType, IconDirective } from '@ui-vts/icons-angular';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';

import { VtsIconPatchService, VtsIconService } from './icon.service';

@Directive({
  selector: '[vts-icon]',
  exportAs: 'vtsIcon',
  host: {
    '[class.vtsicon]': 'true'
  }
})
export class VtsIconDirective
  extends IconDirective
  implements OnInit, OnChanges, AfterContentChecked
{
  static ngAcceptInputType_vtsSpin: BooleanInput;

  cacheClassName: string | null = null;
  @Input()
  @InputBoolean()
  set vtsSpin(value: boolean) {
    this.spin = value;
  }

  @Input() vtsRotate: number = 0;

  @Input()
  set vtsType(value: string) {
    if (!value) this.iconName = value;
    if (hasType(value)) this.iconName = value;
    else this.iconName = `${value}:vts`;
  }

  hostClass?: string;

  private readonly el: HTMLElement;
  private iconfont?: string;
  private spin: boolean = false;

  constructor(
    elementRef: ElementRef,
    public iconService: VtsIconService,
    public renderer: Renderer2,
    @Optional() iconPatch: VtsIconPatchService
  ) {
    super(iconService, elementRef, renderer);

    if (iconPatch) {
      iconPatch.doPatch();
    }

    this.el = elementRef.nativeElement;
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { vtsType, vtsTwotoneColor, vtsSpin, vtsTheme, vtsRotate } = changes;

    if (vtsType || vtsTwotoneColor || vtsSpin || vtsTheme) {
      this.changeIcon2();
    } else if (vtsRotate) {
      this.handleRotate(this.el.firstChild as SVGElement);
    } else {
      this._setSVGElement(this.iconService.createIconfontIcon(`#${this.iconfont}`));
    }
  }

  ngOnInit(): void {
    this.renderer.setAttribute(this.el, 'class', `vtsicon ${this.el.className}`.trim());
  }

  /**
   * If custom content is provided, try to normalize SVG elements.
   */
  ngAfterContentChecked(): void {
    if (!this.iconName) {
      const children = this.el.children;
      let length = children.length;
      if (!this.iconName && children.length) {
        while (length--) {
          const child = children[length];
          if (child.tagName.toLowerCase() === 'svg') {
            this.iconService.normalizeSvgElement(child as SVGElement);
          }
        }
      }
    }
  }

  /**
   * Replacement of `changeIcon` for more modifications.
   */
  private changeIcon2(): void {
    this.setClassName();
    this._changeIcon().then(svgOrRemove => {
      if (svgOrRemove) {
        this.setSVGData(svgOrRemove);
        this.handleSpin(svgOrRemove);
        this.handleRotate(svgOrRemove);
        this.setType();
      }
    });
  }

  private handleSpin(svg: SVGElement): void {
    if (this.spin || this.iconName === 'loading') {
      this.renderer.addClass(svg, 'vtsicon-spin');
    } else {
      this.renderer.removeClass(svg, 'vtsicon-spin');
    }
  }

  private handleRotate(svg: SVGElement): void {
    if (this.vtsRotate) {
      this.renderer.setAttribute(svg, 'style', `transform: rotate(${this.vtsRotate}deg)`);
    } else {
      this.renderer.removeAttribute(svg, 'style');
    }
  }

  private setClassName(): void {
    if (this.cacheClassName) {
      this.renderer.removeClass(this.el, this.cacheClassName);
    }
    this.cacheClassName = `vtsicon-${this.iconName}`;
    this.renderer.addClass(this.el, this.cacheClassName);
    const cls = this.el.classList;
    cls.forEach(cl => {
      if (cl.startsWith('vts-icon-type-')) this.renderer.removeClass(this.el, cl);
    });
  }

  private setSVGData(svg: SVGElement): void {
    this.renderer.setAttribute(svg, 'data-icon', this.iconName as string);
    this.renderer.setAttribute(svg, 'aria-hidden', 'true');
  }

  private setType(): void {
    const [_, type] = getNameAndType(this.iconName as string);
    this.renderer.addClass(this.el, `vts-icon-type-${type}`);
  }
}
