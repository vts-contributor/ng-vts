import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tabs-link-router',
  template: `
    <vts-tabset vtsLinkRouter>
      <vts-tab>
        <a
          *vtsTabLink
          vts-tab-link
          [routerLink]="['.']"
          [queryParams]="{ tab: 'one' }"
          queryParamsHandling="merge"
        >
          Default
        </a>
        Default.
      </vts-tab>
      <vts-tab>
        <a
          *vtsTabLink
          vts-tab-link
          [routerLink]="['.']"
          [queryParams]="{ tab: 'two' }"
          queryParamsHandling="merge"
        >
          Two
        </a>
        Two.
      </vts-tab>
      <vts-tab>
        <a
          *vtsTabLink
          vts-tab-link
          [routerLink]="['.']"
          [queryParams]="{ tab: 'three' }"
          queryParamsHandling="merge"
        >
          Three
        </a>
        Three.
      </vts-tab>
      <vts-tab>
        <a
          *vtsTabLink
          vts-tab-link
          [routerLink]="['.']"
          [queryParams]="{ tab: 'four' }"
          queryParamsHandling="merge"
        >
          Four
        </a>
        Four.
      </vts-tab>
    </vts-tabset>
  `
})
export class VtsDemoTabsLinkRouterComponent {}
