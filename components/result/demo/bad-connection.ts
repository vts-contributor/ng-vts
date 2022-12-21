import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-result-bad-connection',
  template: `
    <vts-result vtsTemplate="bad-connection" vtsOkText="Go to homepage" vtsCancelText="Retry">
      <div vts-result-subtitle>Error while connecting to server</div>
    </vts-result>
  `
})
export class VtsDemoResultBadConnectionComponent {}
