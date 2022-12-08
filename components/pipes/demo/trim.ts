import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pipes-trim',
  template: `
    <input type="text" vts-input [(ngModel)]="str" />
    <br />
    <div>
      <pre>{{ str }}</pre>
    </div>
    <div>
      <pre>{{ str | vtsTrim }}</pre>
    </div>
  `,
  styles: [
    `
      div {
        padding: 8px 12px;
      }
      pre {
        display: inline-block;
        background: #eee;
      }
    `
  ]
})
export class VtsDemoPipesTrimComponent {
  str = ' Ant Design ';
}
