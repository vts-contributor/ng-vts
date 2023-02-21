import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { isNil } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';

@Directive({
  selector: 'tr'
})
export class VtsTrMeasureDirective implements OnChanges {
  changes$ = new Subject();
  @Input() vtsHeight: number | null = null;
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    const { vtsHeight } = changes;
    if (vtsHeight) {
      if (!isNil(vtsHeight)) {
        this.renderer.setAttribute(this.elementRef.nativeElement, 'height', `${vtsHeight}px`);
      }
    }
  }
}