import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-back-top-target',
  template: `
    Scroll down to see the bottom-right
    <strong>gray</strong>
    button.
    <div class="long-div" #divTarget>
      <div class="long-div-inner"></div>
      <vts-back-top [vtsTarget]="divTarget"></vts-back-top>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep .long-div {
        height: 300px;
        overflow-y: scroll;
        background-image: url(//zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg);
      }

      :host ::ng-deep .long-div-inner {
        height: 1500px;
      }

      :host ::ng-deep .long-div .vts-back-top {
        right: 150px;
      }

      :host ::ng-deep .long-div .vts-back-top-rtl {
        right: unset;
        left: 150px;
      }

      :host ::ng-deep strong {
        color: rgba(64, 64, 64, 0.6);
      }
    `
  ]
})
export class VtsDemoBackTopTargetComponent {}
