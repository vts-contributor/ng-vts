/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { VtsAnchorComponent } from './anchor.component';

@Component({
  selector: 'vts-link',
  exportAs: 'vtsLink',
  preserveWhitespaces: false,
  template: `
    <a
      #linkTitle
      (click)="goToClick($event)"
      href="{{ vtsHref }}"
      class="vts-anchor-link-title"
      title="{{ titleStr }}"
    >
      <span *ngIf="titleStr; else titleTpl || vtsTemplate">{{ titleStr }}</span>
    </a>
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsAnchorLinkComponent implements OnInit, OnDestroy {
  @Input() vtsHref = '#';

  titleStr: string | null = '';
  titleTpl?: TemplateRef<VtsSafeAny>;

  @Input()
  set vtsTitle(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this.titleStr = null;
      this.titleTpl = value;
    } else {
      this.titleStr = value;
    }
  }

  @ContentChild('vtsTemplate', { static: false })
  vtsTemplate!: TemplateRef<void>;
  @ViewChild('linkTitle') linkTitle!: ElementRef<HTMLAnchorElement>;

  constructor(
    public elementRef: ElementRef,
    private anchorComp: VtsAnchorComponent,
    private platform: Platform,
    private renderer: Renderer2
  ) {
    this.renderer.addClass(elementRef.nativeElement, 'vts-anchor-link');
  }

  ngOnInit(): void {
    this.anchorComp.registerLink(this);
  }

  getLinkTitleElement(): HTMLAnchorElement {
    return this.linkTitle.nativeElement;
  }

  setActive(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'vts-anchor-link-active');
  }

  unsetActive(): void {
    this.renderer.removeClass(this.elementRef.nativeElement, 'vts-anchor-link-active');
  }

  goToClick(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    if (this.platform.isBrowser) {
      this.anchorComp.handleScrollTo(this);
    }
  }

  ngOnDestroy(): void {
    this.anchorComp.unregisterLink(this);
  }
}
