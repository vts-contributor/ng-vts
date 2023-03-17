/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { VtsScrollService } from '@ui-vts/ng-vts/core/services';
import { BooleanInput, NgStyleInterface, NumberInput, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { InputBoolean, InputNumber } from '@ui-vts/ng-vts/core/util';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

import { VtsAnchorLinkComponent } from './anchor-link.component';
import { getOffsetTop } from './util';

interface Section {
  comp: VtsAnchorLinkComponent;
  top: number;
}

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'anchor';
const sharpMatcherRegx = /#([^#]+)$/;

@Component({
  selector: 'vts-anchor',
  exportAs: 'vtsAnchor',
  preserveWhitespaces: false,
  template: `
    <vts-affix *ngIf="vtsAffix; else content" [vtsOffsetTop]="vtsOffsetTop" [vtsTarget]="container">
      <ng-template [ngTemplateOutlet]="content"></ng-template>
    </vts-affix>
    <ng-template #content>
      <div class="vts-anchor-wrapper" [ngStyle]="wrapperStyle">
        <div class="vts-anchor" [ngClass]="{ fixed: !vtsAffix && !vtsShowInkInFixed }">
          <div class="vts-anchor-ink">
            <div class="vts-anchor-ink-ball" #ink></div>
          </div>
          <ng-content></ng-content>
        </div>
      </div>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsAnchorComponent implements OnDestroy, AfterViewInit, OnChanges {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;
  static ngAcceptInputType_vtsAffix: BooleanInput;
  static ngAcceptInputType_vtsShowInkInFixed: BooleanInput;
  static ngAcceptInputType_vtsBounds: NumberInput;
  static ngAcceptInputType_vtsOffsetTop: NumberInput;

  @ViewChild('ink', { static: false }) private ink!: ElementRef;

  @Input() @InputBoolean() vtsAffix = true;

  @Input()
  @WithConfig()
  @InputBoolean()
  vtsShowInkInFixed: boolean = false;

  @Input()
  @WithConfig()
  @InputNumber()
  vtsBounds: number = 5;

  @Input()
  @InputNumber(undefined)
  @WithConfig<number>()
  vtsOffsetTop?: number = undefined;

  @Input() vtsContainer?: string | HTMLElement;

  @Output() readonly vtsClick = new EventEmitter<string>();
  @Output() readonly vtsScroll = new EventEmitter<VtsAnchorLinkComponent>();

  visible = false;
  wrapperStyle: NgStyleInterface = { 'max-height': '100vh' };

  container?: HTMLElement | Window;

  private links: VtsAnchorLinkComponent[] = [];
  private animating = false;
  private destroy$ = new Subject();
  private handleScrollTimeoutID: number | ReturnType<typeof setTimeout> = -1;

  constructor(
    @Inject(DOCUMENT) private doc: VtsSafeAny,
    public vtsConfigService: VtsConfigService,
    private scrollSrv: VtsScrollService,
    private cdr: ChangeDetectorRef,
    private platform: Platform,
    private zone: NgZone,
    private renderer: Renderer2
  ) {}

  registerLink(link: VtsAnchorLinkComponent): void {
    this.links.push(link);
  }

  unregisterLink(link: VtsAnchorLinkComponent): void {
    this.links.splice(this.links.indexOf(link), 1);
  }

  private getContainer(): HTMLElement | Window {
    return this.container || window;
  }

  ngAfterViewInit(): void {
    this.registerScrollEvent();
  }

  ngOnDestroy(): void {
    clearTimeout(this.handleScrollTimeoutID);
    this.destroy$.next();
    this.destroy$.complete();
  }

  private registerScrollEvent(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    this.destroy$.next();
    this.zone.runOutsideAngular(() => {
      fromEvent(this.getContainer(), 'scroll')
        .pipe(throttleTime(50), takeUntil(this.destroy$))
        .subscribe(() => this.handleScroll());
    });
    // Browser would maintain the scrolling position when refreshing.
    // So we have to delay calculation in avoid of getting a incorrect result.
    this.handleScrollTimeoutID = setTimeout(() => this.handleScroll());
  }

  handleScroll(): void {
    if (typeof document === 'undefined' || this.animating) {
      return;
    }

    const sections: Section[] = [];
    const scope = (this.vtsOffsetTop || 0) + this.vtsBounds;
    this.links.forEach(comp => {
      const sharpLinkMatch = sharpMatcherRegx.exec(comp.vtsHref.toString());
      if (!sharpLinkMatch) {
        return;
      }
      const target = this.doc.getElementById(sharpLinkMatch[1]);
      if (target) {
        const top = getOffsetTop(target, this.getContainer());
        if (top < scope) {
          sections.push({
            top,
            comp
          });
        }
      }
    });

    this.visible = !!sections.length;
    if (!this.visible) {
      this.clearActive();
      this.cdr.detectChanges();
    } else {
      const maxSection = sections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
      this.handleActive(maxSection.comp);
    }
    this.setVisible();
  }

  private clearActive(): void {
    this.links.forEach(i => {
      i.unsetActive();
    });
  }

  private handleActive(comp: VtsAnchorLinkComponent): void {
    this.clearActive();
    comp.setActive();
    const linkNode = comp.getLinkTitleElement();
    this.ink.nativeElement.style.top = `${linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
    this.visible = true;
    this.setVisible();
    this.vtsScroll.emit(comp);
  }

  private setVisible(): void {
    const visible = this.visible;
    const visibleClassname = 'visible';
    if (this.ink) {
      if (visible) {
        this.renderer.addClass(this.ink.nativeElement, visibleClassname);
      } else {
        this.renderer.removeClass(this.ink.nativeElement, visibleClassname);
      }
    }
  }

  handleScrollTo(linkComp: VtsAnchorLinkComponent): void {
    const el = this.doc.querySelector(linkComp.vtsHref);
    if (!el) {
      return;
    }

    this.animating = true;
    const containerScrollTop = this.scrollSrv.getScroll(this.getContainer());
    const elOffsetTop = getOffsetTop(el, this.getContainer());
    const targetScrollTop = containerScrollTop + elOffsetTop - (this.vtsOffsetTop || 0);
    this.scrollSrv.scrollTo(this.getContainer(), targetScrollTop, {
      callback: () => {
        this.animating = false;
        this.handleActive(linkComp);
      }
    });
    this.vtsClick.emit(linkComp.vtsHref);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsOffsetTop, vtsContainer } = changes;
    if (vtsOffsetTop) {
      this.wrapperStyle = {
        'max-height': `calc(100vh - ${this.vtsOffsetTop}px)`
      };
    }
    if (vtsContainer) {
      const container = this.vtsContainer;
      this.container =
        typeof container === 'string' ? this.doc.querySelector(container) : container;
      this.registerScrollEvent();
    }
  }
}
