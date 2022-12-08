import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-spin-inside',
  template: `
    <div class="example">
      <vts-spin vtsSimple></vts-spin>
    </div>
  `,
  styles: [
    `
      .example {
        text-align: center;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        margin-bottom: 20px;
        padding: 30px 50px;
        margin: 20px 0;
      }
    `
  ]
})
export class VtsDemoSpinInsideComponent {}
