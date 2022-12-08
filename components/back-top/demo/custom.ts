import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-back-top-custom',
  template: `
    <vts-back-top [vtsTemplate]="tpl" [vtsVisibilityHeight]="100" (vtsOnClick)="notify()">
      <ng-template #tpl>
        <div class="vts-back-top-inner">UP</div>
      </ng-template>
    </vts-back-top>
    Scroll down to see the bottom-right
    <strong>blue</strong>
    button.
  `,
  styles: [
    `
      :host ::ng-deep .vts-back-top {
        bottom: 100px;
      }

      :host ::ng-deep .vts-back-top-inner {
        height: 40px;
        width: 40px;
        line-height: 40px;
        border-radius: 4px;
        background-color: #1088e9;
        color: #fff;
        text-align: center;
        font-size: 20px;
      }

      :host ::ng-deep strong {
        color: #1088e9;
      }
    `
  ]
})
export class VtsDemoBackTopCustomComponent {
  notify(): void {
    console.log('notify');
  }
}
