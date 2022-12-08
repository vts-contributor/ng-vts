/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'vts-breadcrumb-separator',
  exportAs: 'vtsBreadcrumbSeparator',
  template: `
    <span class="vts-breadcrumb-separator">
      <ng-content></ng-content>
    </span>
  `
})
export class VtsBreadCrumbSeparatorComponent {}
