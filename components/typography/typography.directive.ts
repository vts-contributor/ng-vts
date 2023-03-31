import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { InputBoolean, isNotNil } from '@ui-vts/ng-vts/core/util';
import { BooleanInput, NgClassInterface } from '@ui-vts/ng-vts/core/types';

export type VtsTypographyType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'sub1'
  | 'sub2'
  | 'body1'
  | 'body2'
  | 'link';
export type VtsTypographyColor =
  | 'default'
  | 'secondary'
  | 'primary'
  | 'info'
  | 'success'
  | 'processing'
  | 'error'
  | 'highlight'
  | 'warning'
  | 'disabled';
export type VtsTypographyAlign = 'center' | 'left' | 'right';
export type VtsTypographyTransform = 'lowercase' | 'uppercase' | 'capitalize';
export type VtsTypographyWeight =
  | 'thin'
  | 'extra-light'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semi-bold'
  | 'bold'
  | 'extra-bold'
  | 'heavy';
interface EmbeddedProperty {
  type?: VtsTypographyType;
  color?: VtsTypographyColor;
  align?: VtsTypographyAlign;
  transform?: VtsTypographyTransform;
  weight?: VtsTypographyWeight;
}

@Directive({
  selector: `[vts-typography], [vts-typo], vts-card-meta-title, vts-card-meta-description, vts-card-header-title, `,
  exportAs: 'vtsTypography'
})
export class VtsTypographyDirective implements OnInit, OnChanges {
  static ngAcceptInputType_vtsNoWrap: BooleanInput;
  static ngAcceptInputType_vtsTruncate: BooleanInput;
  private classMap: { [key: string]: boolean } = {};
  @Input() vtsType: VtsTypographyType | null = null;
  @Input() vtsColor: VtsTypographyColor | null = null;
  @Input() vtsAlign: VtsTypographyAlign | null = null;
  @Input() vtsTransform: VtsTypographyTransform | null = null;
  @Input() vtsWeight: VtsTypographyWeight | null = null;
  @Input() vtsXXXs: EmbeddedProperty | null = null;
  @Input() vtsXXs: EmbeddedProperty | null = null;
  @Input() vtsXs: EmbeddedProperty | null = null;
  @Input() vtsSm: EmbeddedProperty | null = null;
  @Input() vtsMd: EmbeddedProperty | null = null;
  @Input() vtsLg: EmbeddedProperty | null = null;
  @Input() vtsXl: EmbeddedProperty | null = null;
  @Input() @InputBoolean() vtsNoWrap: boolean = false;
  @Input() @InputBoolean() vtsTruncate: boolean = false;

  setHostClass() {
    const hostClassMap = {
      [`vts-typo`]: true,
      [`vts-typo-type-${this.vtsType}`]: isNotNil(this.vtsType),
      [`vts-typo-color-${this.vtsColor}`]: isNotNil(this.vtsColor),
      [`vts-typo-align-${this.vtsAlign}`]: isNotNil(this.vtsAlign),
      [`vts-typo-transform-${this.vtsTransform}`]: isNotNil(this.vtsTransform),
      [`vts-typo-weight-${this.vtsWeight}`]: isNotNil(this.vtsWeight),
      [`vts-typo-nowrap`]: this.vtsNoWrap,
      ...this.generateClass()
    };

    for (const i in this.classMap) {
      if (this.classMap.hasOwnProperty(i)) {
        this.renderer.removeClass(this.elementRef.nativeElement, i);
      }
    }
    this.classMap = { ...hostClassMap };
    for (const i in this.classMap) {
      if (this.classMap.hasOwnProperty(i) && this.classMap[i]) {
        this.renderer.addClass(this.elementRef.nativeElement, i);
      }
    }
  }

  generateClass(): object {
    const listOfSizeInputName: Array<keyof VtsTypographyDirective> = [
      'vtsXXXs',
      'vtsXXs',
      'vtsXs',
      'vtsSm',
      'vtsMd',
      'vtsLg',
      'vtsXl'
    ];
    const listClassMap: NgClassInterface = {};
    listOfSizeInputName.forEach(name => {
      const sizeName = name.replace('vts', '').toLowerCase();
      if (isNotNil(this[name])) {
        if (typeof this[name] === 'number' || typeof this[name] === 'string') {
          listClassMap[`vts-typo-${sizeName}-${this[name]}`] = true;
        } else {
          const embedded = this[name] as EmbeddedProperty;
          const prefixArray: Array<keyof EmbeddedProperty> = [
            'type',
            'color',
            'align',
            'transform',
            'weight'
          ];
          prefixArray.forEach(prefix => {
            const prefixClass = `-${prefix}-`;
            listClassMap[`vts-typo-${sizeName}${prefixClass}${embedded[prefix]}`] =
              embedded && isNotNil(embedded[prefix]);
          });
        }
      }
    });
    return listClassMap;
  }

  constructor(public renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.setHostClass();
  }

  ngOnChanges(): void {
    this.setHostClass();
  }
}
