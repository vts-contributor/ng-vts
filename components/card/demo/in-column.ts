import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-in-column',
  template: `
    <div style="background: #ECECEC;padding:30px;">
      <div vts-row [vtsGutter]="8">
        <div vts-col [vtsSpan]="8">
          <vts-card vtsTitle="Card title">
            <p>Card content</p>
          </vts-card>
        </div>
        <div vts-col [vtsSpan]="8">
          <vts-card vtsTitle="Card title">
            <p>Card content</p>
          </vts-card>
        </div>
        <div vts-col [vtsSpan]="8">
          <vts-card vtsTitle="Card title">
            <p>Card content</p>
          </vts-card>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      p {
        margin: 0;
      }
    `
  ]
})
export class VtsDemoCardInColumnComponent {}
