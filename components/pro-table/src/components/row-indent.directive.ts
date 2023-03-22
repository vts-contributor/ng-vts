import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'vts-row-indent',
  host: {
    '[style.padding-left.px]': 'indentSize'
  }
})
export class VtsRowIndentDirective {
  @Input() indentSize = 0;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-protable-row-indent');
  }
}
