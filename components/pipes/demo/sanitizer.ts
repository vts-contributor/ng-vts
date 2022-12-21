import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pipes-sanitizer',
  template: `
    <div [innerHTML]="html | vtsSanitizer : 'html'"></div>
  `
})
export class VtsDemoPipesSanitizerComponent {
  html = `<span>I am <code>innerHTML</code></span>`;
}
