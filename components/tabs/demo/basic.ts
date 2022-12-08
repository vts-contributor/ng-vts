import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tabs-basic',
  template: `
    <vts-tabset>
      <vts-tab vtsTitle="Tab 1">Content of Tab Pane 1</vts-tab>
      <vts-tab vtsTitle="Tab 2">Content of Tab Pane 2</vts-tab>
      <vts-tab vtsTitle="Tab 3">Content of Tab Pane 3</vts-tab>
    </vts-tabset>
  `
})
export class VtsDemoTabsBasicComponent {}
