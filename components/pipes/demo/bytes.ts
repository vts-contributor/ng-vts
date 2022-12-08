import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pipes-bytes',
  template: `
    <ul>
      <li>{{ 200 | vtsBytes }}</li>
      <li>{{ 1024 | vtsBytes }}</li>
      <li>{{ 1048576 | vtsBytes }}</li>
      <li>{{ 1024 | vtsBytes: 0:'KB' }}</li>
      <li>{{ 1073741824 | vtsBytes }}</li>
      <li>{{ 1099511627776 | vtsBytes }}</li>
      <li>{{ 1073741824 | vtsBytes: 0:'B':'MB' }}</li>
    </ul>
  `
})
export class VtsDemoPipesBytesComponent {}
