import { Component, Optional, ViewEncapsulation } from '@angular/core';
import { VtsInplaceComponent } from './inplace.component';

@Component({
  selector: 'vts-inplace-collapse',
  exportAs: 'vtsInplaceCollapse',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.vts-inplace-collapse]': 'true',
    '[attr.tabindex]': '1',
    '(click)': 'onDeactivateClick()'
  },
  template: '<ng-content></ng-content>'
})
export class VtsInplaceCollapseComponent {
  constructor(@Optional() private parent: VtsInplaceComponent) {}

  onDeactivateClick() {
    this.parent?.deactivate();
  }
}
