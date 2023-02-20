import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'tr[vtsExpand]',
  host: {
    '[hidden]': `!vtsExpand`
  }
})
export class VtsTrExpandDirective {
  @Input() vtsExpand = true;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-protable-expanded-row');
  }
}