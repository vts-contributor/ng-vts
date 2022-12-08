/* declarations: VtsDemoTabContentLazyComponent,VtsDemoTabContentEagerlyComponent */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vts-demo-tabs-lazy',
  template: `
    <vts-tabset>
      <vts-tab vtsTitle="Tab Eagerly 1">
        <vts-demo-tab-content-eagerly></vts-demo-tab-content-eagerly>
      </vts-tab>
      <vts-tab vtsTitle="Tab Eagerly 2">
        <vts-demo-tab-content-eagerly></vts-demo-tab-content-eagerly>
      </vts-tab>
      <vts-tab vtsTitle="Tab Lazy 1">
        <ng-template vts-tab>
          <vts-demo-tab-content-lazy></vts-demo-tab-content-lazy>
        </ng-template>
      </vts-tab>
      <vts-tab vtsTitle="Tab Lazy 2">
        <ng-template vts-tab>
          <vts-demo-tab-content-lazy></vts-demo-tab-content-lazy>
        </ng-template>
      </vts-tab>
    </vts-tabset>
  `
})
export class VtsDemoTabsLazyComponent {}

@Component({
  selector: 'vts-demo-tab-content-lazy',
  template: `
    lazy
  `
})
export class VtsDemoTabContentLazyComponent implements OnInit {
  ngOnInit(): void {
    console.log(`I will init when tab active`);
  }
}

@Component({
  selector: 'vts-demo-tab-content-eagerly',
  template: `
    eagerly
  `
})
export class VtsDemoTabContentEagerlyComponent implements OnInit {
  ngOnInit(): void {
    console.log(`I will init eagerly`);
  }
}
