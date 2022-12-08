import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-affix-on-change',
  template: `
    <vts-affix [vtsOffsetTop]="120" (vtsChange)="onChange($event)">
      <button vts-button>
        <span>120px to affix top</span>
      </button>
    </vts-affix>
  `
})
export class VtsDemoAffixOnChangeComponent {
  onChange(status: boolean): void {
    console.log(status);
  }
}
