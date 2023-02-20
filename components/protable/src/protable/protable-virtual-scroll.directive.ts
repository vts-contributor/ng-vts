import { Directive, TemplateRef } from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

@Directive({
  selector: '[vts-virtual-scroll]',
  exportAs: 'vtsVirtualScroll'
})
export class VtsProTableVirtualScrollDirective {
  constructor(public templateRef: TemplateRef<{ $implicit: VtsSafeAny; index: number }>) {}
}