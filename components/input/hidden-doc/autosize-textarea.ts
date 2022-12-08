import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-input-autosize-textarea',
  template: `
    <div>
      <textarea
        vts-input
        placeholder="Autosize height based on content lines"
        vtsAutosize
      ></textarea>
      <textarea
        vts-input
        placeholder="Autosize height with minimum and maximum number of lines"
        [vtsAutosize]="{ minRows: 2, maxRows: 6 }"
      ></textarea>
      <textarea
        vts-input
        placeholder="Controlled autosize"
        [vtsAutosize]="{ minRows: 3, maxRows: 5 }"
      ></textarea>
    </div>
  `,
  styles: [
    `
      textarea + textarea {
        margin-top: 24px;
      }
    `
  ]
})
export class VtsDemoInputAutosizeTextareaComponent {}
