import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-affix-basic',
  template: `
    <vts-affix [vtsOffsetTop]="offsetTop">
      <button vts-button vtsType="primary" (click)="setOffsetTop()">
        <span>Affix top</span>
      </button>
    </vts-affix>
    <br />
    <vts-affix [vtsOffsetBottom]="vtsOffsetBottom" (click)="setOffsetBottom()">
      <button vts-button vtsType="primary">
        <span>Affix bottom</span>
      </button>
    </vts-affix>
  `
})
export class VtsDemoAffixBasicComponent {
  offsetTop = 10;
  vtsOffsetBottom = 10;

  setOffsetTop(): void {
    this.offsetTop += 10;
  }

  setOffsetBottom(): void {
    this.vtsOffsetBottom += 10;
  }
}
