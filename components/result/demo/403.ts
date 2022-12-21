import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-result-403',
  template: `
    <vts-result vtsTemplate="403" vtsOkText="Go to homepage" vtsCancelText="Contact us">
      <div vts-result-subtitle>You are not allow to access this site.</div>
    </vts-result>
  `
})
export class VtsDemoResult403Component {}
