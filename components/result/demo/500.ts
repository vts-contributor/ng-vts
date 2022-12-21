import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-result-500',
  template: `
    <vts-result vtsTemplate="500" vtsOkText="Go to homepage" vtsCancelText="Retry">
      <div vts-result-title>Internal server error</div>
      <div vts-result-subtitle>Please retry later</div>
    </vts-result>
  `
})
export class VtsDemoResult500Component {}
