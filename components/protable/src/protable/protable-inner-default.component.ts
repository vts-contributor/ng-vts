
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { VtsProTableLayout } from '../protable.types';

@Component({
  selector: 'vts-protable-inner-default',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
      <div class="vts-protable-content">
        <table
          vts-protable-content
          [contentTemplate]="contentTemplate"
          [tableLayout]="tableLayout"
          [listOfColWidth]="listOfColWidth"
          [theadTemplate]="theadTemplate"
          [rowHeight]="rowHeight"
        ></table>
      </div>
    `
})
export class VtsProTableInnerDefaultComponent {
  @Input() tableLayout: VtsProTableLayout = 'auto';
  @Input() listOfColWidth: ReadonlyArray<string | null> = [];
  @Input() theadTemplate: TemplateRef<VtsSafeAny> | null = null;
  @Input() contentTemplate: TemplateRef<VtsSafeAny> | null = null;
  @Input() rowHeight: string | null = null;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-protable-container');
    console.log(this.rowHeight, 'x');
  }
}
