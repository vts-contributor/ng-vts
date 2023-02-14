/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';

import { VtsIconDirective } from '@ui-vts/ng-vts/icon';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';

type VtsLegacyButtonType = 'primary' | 'default' | 'link' | 'text' | null;

export type VtsButtonType = VtsLegacyButtonType;
export type VtsButtonShape = 'circle' | 'rounded' | 'square';
export type VtsButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'button';

@Component({
  selector: 'button[vts-button], a[vts-button]',
  exportAs: 'vtsButton',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <!--
    <i vts-icon vtsType="Sync" *ngIf="vtsLoading"></i>
    -->
    <ng-content></ng-content>
  `,
  host: {
    '[class.vts-btn-primary]': `vtsType === 'primary'`,
    // '[class.vts-btn-dashed]': `vtsType === 'dashed'`,
    '[class.vts-btn-link]': `vtsType === 'link'`,
    '[class.vts-btn-text]': `vtsType === 'text'`,
    '[class.vts-btn-circle]': `vtsShape === 'circle'`,
    '[class.vts-btn-rounded]': `vtsShape === 'rounded'`,
    '[class.vts-btn-square]': `vtsShape === 'square'`,
    '[class.vts-btn-xl]': `vtsSize === 'xl'`,
    '[class.vts-btn-lg]': `vtsSize === 'lg'`,
    '[class.vts-btn-md]': `vtsSize === 'md'`,
    '[class.vts-btn-sm]': `vtsSize === 'sm'`,
    '[class.vts-btn-xs]': `vtsSize === 'xs'`,
    // '[class.vts-btn-loading]': `vtsLoading`,
    // '[class.vts-btn-background-ghost]': `vtsGhost`,
    '[class.vts-btn-block]': `vtsBlock`,
    // '[class.vts-input-search-button]': `vtsSearch`,
    '[class.vts-btn-rtl]': `dir === 'rtl'`,
    '[attr.tabindex]': 'disabled ? -1 : (tabIndex === null ? null : tabIndex)',
    '[attr.disabled]': 'disabled || null'
  }
})
export class VtsButtonComponent
  implements OnDestroy, OnChanges, AfterViewInit, AfterContentInit, OnInit
{
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;
  static ngAcceptInputType_vtsBlock: BooleanInput;
  // static ngAcceptInputType_vtsGhost: BooleanInput;
  // static ngAcceptInputType_vtsSearch: BooleanInput;
  static ngAcceptInputType_vtsLoading: BooleanInput;
  static ngAcceptInputType_disabled: BooleanInput;

  @ContentChild(VtsIconDirective, { read: ElementRef })
  vtsIconDirectiveElement!: ElementRef;
  @Input() @InputBoolean() vtsBlock: boolean = false;
  // @Input() @InputBoolean() vtsGhost: boolean = false;
  // @Input() @InputBoolean() vtsSearch: boolean = false;
  @Input() @InputBoolean() vtsLoading: boolean = false;
  @Input() @InputBoolean() disabled: boolean = false;
  @Input() tabIndex: number | string | null = null;
  @Input() vtsType: VtsButtonType = null;
  @Input() vtsShape: VtsButtonShape = 'square';
  @Input() @WithConfig() vtsSize: VtsButtonSize = 'md';
  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();
  private loading$ = new Subject<boolean>();

  insertSpan(nodes: NodeList, renderer: Renderer2): void {
    nodes.forEach(node => {
      if (node.nodeName === '#text') {
        const span = renderer.createElement('span');
        const parent = renderer.parentNode(node);
        renderer.insertBefore(parent, span, node);
        renderer.appendChild(span, node);
      }
    });
  }

  assertIconOnly(element: HTMLButtonElement, renderer: Renderer2): void {
    const listOfNode = Array.from(element.childNodes);
    const iconCount = listOfNode.filter(node => node.nodeName === 'I').length;
    const noText = listOfNode.every(node => node.nodeName !== '#text');
    const noSpan = listOfNode.every(node => node.nodeName !== 'SPAN');
    const isIconOnly = noSpan && noText && iconCount >= 1;
    if (isIconOnly) {
      renderer.addClass(element, 'vts-btn-icon-only');
    }
  }

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    public vtsConfigService: VtsConfigService,
    @Optional() private directionality: Directionality
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-btn');
    this.vtsConfigService
      .getConfigChangeEventForComponent(VTS_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsLoading } = changes;
    if (vtsLoading) {
      this.loading$.next(this.vtsLoading);
    }
  }

  ngAfterViewInit(): void {
    this.assertIconOnly(this.elementRef.nativeElement, this.renderer);
    this.insertSpan(this.elementRef.nativeElement.childNodes, this.renderer);
  }

  ngAfterContentInit(): void {
    this.loading$
      .pipe(
        startWith(this.vtsLoading),
        filter(() => !!this.vtsIconDirectiveElement),
        takeUntil(this.destroy$)
      )
      .subscribe(loading => {
        const nativeElement = this.vtsIconDirectiveElement.nativeElement;
        if (loading) {
          this.renderer.setStyle(nativeElement, 'display', 'none');
        } else {
          this.renderer.removeStyle(nativeElement, 'display');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
