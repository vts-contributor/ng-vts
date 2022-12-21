import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-typography-breakpoint',
  template: `
    <div class="example-line">
      <p vts-typography vtsTransform="uppercase" [vtsMd]="{ transform: 'lowercase' }">
        Upper case below 1024px
      </p>
    </div>
    <div class="example-line">
      <p
        vts-typography
        vtsColor="error"
        vtsWeight="bold"
        [vtsSm]="{ weight: 'normal', color: 'default' }"
      >
        Bold and red below 768px
      </p>
    </div>
  `,
  styles: [
    `
      * {
        margin: 10px 0;
      }
    `,
    `
      .example-line {
        display: flex;
        flex-wrap: wrap;
      }
      .example-line div {
        margin-left: 10px;
        display: flex;
        align-items: flex-end;
        font-size: 15px;
        padding-bottom: 5px;
        color: #73777a;
      }
    `
  ]
})
export class VtsDemoTypographyBreakpointComponent {}
