/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET, Router } from '@angular/router';
import { PREFIX } from '@ui-vts/ng-vts/core/logger';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';

import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';

export interface BreadcrumbOption {
  label: string;
  params: Params;
  url: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-breadcrumb',
  exportAs: 'vtsBreadcrumb',
  preserveWhitespaces: false,
  template: `
    <ng-content></ng-content>
    <ng-container *ngIf="vtsAutoGenerate && breadcrumbs.length">
      <vts-breadcrumb-item *ngFor="let breadcrumb of breadcrumbs">
        <a [attr.href]="breadcrumb.url" (click)="navigate(breadcrumb.url, $event)">
          {{ breadcrumb.label }}
        </a>
      </vts-breadcrumb-item>
    </ng-container>
  `
})
export class VtsBreadCrumbComponent implements OnInit, OnDestroy {
  static ngAcceptInputType_vtsAutoGenerate: BooleanInput;

  @Input() @InputBoolean() vtsAutoGenerate = false;
  @Input() vtsSeparator: string | TemplateRef<void> | null = '/';
  @Input() vtsRouteLabel: string = 'breadcrumb';
  @Input() vtsRouteLabelFn: (label: string) => string = label => label;

  breadcrumbs: BreadcrumbOption[] = [];
  dir: Direction = 'ltr';

  private destroy$ = new Subject<void>();

  constructor(
    private injector: Injector,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Optional() private directionality: Directionality
  ) {
    renderer.addClass(elementRef.nativeElement, 'vts-breadcrumb');
  }

  ngOnInit(): void {
    if (this.vtsAutoGenerate) {
      this.registerRouterChange();
    }

    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.prepareComponentForRtl();
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
    this.prepareComponentForRtl();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigate(url: string, e: MouseEvent): void {
    e.preventDefault();

    this.ngZone.run(() => this.injector.get(Router).navigateByUrl(url).then()).then();
  }

  private registerRouterChange(): void {
    try {
      const router = this.injector.get(Router);
      const activatedRoute = this.injector.get(ActivatedRoute);
      router.events
        .pipe(
          filter(e => e instanceof NavigationEnd),
          takeUntil(this.destroy$),
          startWith(true) // trigger initial render
        )
        .subscribe(() => {
          this.breadcrumbs = this.getBreadcrumbs(activatedRoute.root);
          this.cdr.markForCheck();
        });
    } catch (e) {
      throw new Error(
        `${PREFIX} You should import RouterModule if you want to use 'VtsAutoGenerate'.`
      );
    }
  }

  private getBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadcrumbOption[] = []
  ): BreadcrumbOption[] {
    const children: ActivatedRoute[] = route.children;

    // If there's no sub root, then stop the recurse and returns the generated breadcrumbs.
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.outlet === PRIMARY_OUTLET) {
        // Only parse components in primary router-outlet (in another word, router-outlet without a specific name).
        // Parse this layer and generate a breadcrumb item.
        const routeUrl: string = child.snapshot.url
          .map(segment => segment.path)
          .filter(path => path)
          .join('/');

        // Do not change nextUrl if routeUrl is falsy. This happens when it's a route lazy loading other modules.
        const nextUrl = !!routeUrl ? url + `/${routeUrl}` : url;
        const breadcrumbLabel = this.vtsRouteLabelFn(child.snapshot.data[this.vtsRouteLabel]);

        // If have data, go to generate a breadcrumb for it.
        if (routeUrl && breadcrumbLabel) {
          const breadcrumb: BreadcrumbOption = {
            label: breadcrumbLabel,
            params: child.snapshot.params,
            url: nextUrl
          };
          breadcrumbs.push(breadcrumb);
        }

        return this.getBreadcrumbs(child, nextUrl, breadcrumbs);
      }
    }

    return breadcrumbs;
  }

  private prepareComponentForRtl(): void {
    if (this.dir === 'rtl') {
      this.renderer.addClass(this.elementRef.nativeElement, 'vts-breadcrumb-rtl');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'vts-breadcrumb-rtl');
    }
  }
}
