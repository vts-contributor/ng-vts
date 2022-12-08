import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-input-size',
  template: `
    <div class="example-input">
      <input vts-input placeholder="xl size" vtsSize="xl" />
      <input vts-input placeholder="lg size" vtsSize="lg" />
      <input vts-input placeholder="md size" vtsSize="md" />
      <input vts-input placeholder="sm size" vtsSize="sm" />
    </div>
  `,
  styles: [
    `
      .example-input .vts-input {
        width: 200px;
        margin: 0 8px 8px 0;
      }
    `
  ]
})
export class VtsDemoInputSizeComponent {}
