

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { VtsProTableLayout } from '../protable.types';

@Component({
  selector: 'protable-content[vts-protable-content]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <col [style.width]="width" [style.minWidth]="width" *ngFor="let width of listOfColWidth" />
    <thead class="vts-table-thead" *ngIf="theadTemplate">
      <ng-template [ngTemplateOutlet]="theadTemplate"></ng-template>
    </thead>
    <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    <ng-content></ng-content>
    `,
  host: {
    '[style.table-layout]': 'tableLayout',
    '[class.vts-table-fixed]': 'scrollX',
    '[style.width]': 'scrollX',
    '[style.min-width]': `scrollX ? '100%': null`
  }
})
export class VtsProTableContentComponent {
  @Input() tableLayout: VtsProTableLayout = 'auto';
  @Input() theadTemplate: TemplateRef<VtsSafeAny> | null = null;
  @Input() contentTemplate: TemplateRef<VtsSafeAny> | null = null;
  @Input() listOfColWidth: ReadonlyArray<string | null> = [];
  @Input() scrollX: string | null = null;
  @Input() rowHeight: string | null = null;
}
