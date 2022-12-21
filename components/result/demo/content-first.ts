import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-result-content-first',
  template: `
    <vts-result
      vtsLayout="content-first"
      vtsTemplate="500"
      vtsOkText="Go to homepage"
      vtsCancelText="Retry"
    >
      <div vts-result-title>Internal server error</div>
      <div vts-result-subtitle>Please retry later</div>
    </vts-result>
  `
})
export class VtsDemoResultContentFirstComponent {}
