/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

@Directive({
  selector: '[vtsStringTemplateOutlet]',
  exportAs: 'vtsStringTemplateOutlet'
})
export class VtsStringTemplateOutletDirective<_T = unknown> implements OnChanges {
  private embeddedViewRef: EmbeddedViewRef<VtsSafeAny> | null = null;
  private context = new VtsStringTemplateOutletContext();
  @Input() vtsStringTemplateOutletContext: VtsSafeAny | null = null;
  @Input() vtsStringTemplateOutlet: VtsSafeAny | TemplateRef<VtsSafeAny> = null;

  static ngTemplateContextGuard<T>(
    _dir: VtsStringTemplateOutletDirective<T>,
    _ctx: VtsSafeAny
  ): _ctx is VtsStringTemplateOutletContext {
    return true;
  }

  private recreateView(): void {
    this.viewContainer.clear();
    const isTemplateRef = this.vtsStringTemplateOutlet instanceof TemplateRef;
    const templateRef = (
      isTemplateRef ? this.vtsStringTemplateOutlet : this.templateRef
    ) as VtsSafeAny;
    this.embeddedViewRef = this.viewContainer.createEmbeddedView(
      templateRef,
      isTemplateRef ? this.vtsStringTemplateOutletContext : this.context
    );
  }

  private updateContext(): void {
    const isTemplateRef = this.vtsStringTemplateOutlet instanceof TemplateRef;
    const newCtx = isTemplateRef ? this.vtsStringTemplateOutletContext : this.context;
    const oldCtx = this.embeddedViewRef!.context as VtsSafeAny;
    if (newCtx) {
      for (const propName of Object.keys(newCtx)) {
        oldCtx[propName] = newCtx[propName];
      }
    }
  }

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<VtsSafeAny>
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsStringTemplateOutletContext, vtsStringTemplateOutlet } = changes;
    const shouldRecreateView = (): boolean => {
      let shouldOutletRecreate = false;
      if (vtsStringTemplateOutlet) {
        if (vtsStringTemplateOutlet.firstChange) {
          shouldOutletRecreate = true;
        } else {
          const isPreviousOutletTemplate =
            vtsStringTemplateOutlet.previousValue instanceof TemplateRef;
          const isCurrentOutletTemplate =
            vtsStringTemplateOutlet.currentValue instanceof TemplateRef;
          shouldOutletRecreate = isPreviousOutletTemplate || isCurrentOutletTemplate;
        }
      }
      const hasContextShapeChanged = (ctxChange: SimpleChange): boolean => {
        const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
        const currCtxKeys = Object.keys(ctxChange.currentValue || {});
        if (prevCtxKeys.length === currCtxKeys.length) {
          for (const propName of currCtxKeys) {
            if (prevCtxKeys.indexOf(propName) === -1) {
              return true;
            }
          }
          return false;
        } else {
          return true;
        }
      };
      const shouldContextRecreate =
        vtsStringTemplateOutletContext && hasContextShapeChanged(vtsStringTemplateOutletContext);
      return shouldContextRecreate || shouldOutletRecreate;
    };

    if (vtsStringTemplateOutlet) {
      this.context.$implicit = vtsStringTemplateOutlet.currentValue;
    }

    const recreateView = shouldRecreateView();
    if (recreateView) {
      /** recreate view when context shape or outlet change **/
      this.recreateView();
    } else {
      /** update context **/
      this.updateContext();
    }
  }
}

export class VtsStringTemplateOutletContext {
  public $implicit: VtsSafeAny;
}
