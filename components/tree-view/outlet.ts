/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkTreeNodeOutlet, CDK_TREE_NODE_OUTLET_NODE } from '@angular/cdk/tree';
import { Directive, Inject, Optional, ViewContainerRef } from '@angular/core';

import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

@Directive({
  selector: '[vtsTreeNodeOutlet]',
  providers: [
    {
      provide: CdkTreeNodeOutlet,
      useExisting: VtsTreeNodeOutletDirective
    }
  ]
})
export class VtsTreeNodeOutletDirective implements CdkTreeNodeOutlet {
  constructor(
    public viewContainer: ViewContainerRef,
    @Inject(CDK_TREE_NODE_OUTLET_NODE) @Optional() public _node?: VtsSafeAny
  ) {}
}
