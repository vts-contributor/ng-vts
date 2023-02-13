import { Component, Optional, ViewEncapsulation } from '@angular/core';
import { VtsInplaceComponent } from './inplace.component';

@Component({
  selector: 'vts-inplace-placeholder',
  exportAs: 'vtsInplacePlaceholder',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.vts-inplace-placeholder]': 'true',
    '[attr.tabindex]': '1',
    '(click)': 'onActivateClick()'
  },
  template: '<ng-content></ng-content>'
})
export class VtsInplacePlaceholderComponent {
  constructor(@Optional() private parent: VtsInplaceComponent) {}

  onActivateClick() {
    this.parent?.activate();
  }
}
