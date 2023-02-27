import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import {
  // ChangeDetectionStrategy,
  Component,
  // ContentChildren,
  // SimpleChanges,
  ElementRef,
  // ChangeDetectorRef,
  // OnDestroy,
  OnInit,
  Input,
  // Optional,
  // OnChanges,
  // QueryList,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'vts-protable-container',
  exportAs: 'vtsProTableContainer',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  template: `
    <vts-search-form></vts-search-form>
    <vts-table-config></vts-table-config>
    <vts-protable-data></vts-protable-data>
  `,
  styles: [
    ``
  ]
})
export class VtsProTableContainerComponent implements OnInit {
  constructor(
    public elementRef: ElementRef
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-protable-container');
  }

  @Input() request: VtsSafeAny;
  @Input() param: Object = {};

  ngOnInit(): void { }
}