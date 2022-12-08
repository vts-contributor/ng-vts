/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: '[vts-tab-body]',
  exportAs: 'vtsTabBody',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="active || forceRender">
      <ng-template [ngTemplateOutlet]="content"></ng-template>
    </ng-container>
  `,
  host: {
    class: 'vts-tabs-tabpane',
    '[class.vts-tabs-tabpane-active]': 'active',
    '[attr.tabindex]': 'active ? 0 : -1',
    '[attr.aria-hidden]': '!active',
    '[style.visibility]': 'tabPaneAnimated ? active ? null : "hidden" : null',
    '[style.height]': 'tabPaneAnimated ? active ? null : 0 : null',
    '[style.overflow-y]': 'tabPaneAnimated ? active ? null : "none" : null',
    '[style.display]': '!tabPaneAnimated ? active ? null : "none" : null'
  }
})
export class VtsTabBodyComponent {
  @Input() content: TemplateRef<void> | null = null;
  @Input() active = false;
  @Input() tabPaneAnimated = true;
  @Input() forceRender = false;
}
