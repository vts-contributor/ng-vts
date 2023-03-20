import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  Input,
  TemplateRef
} from '@angular/core';

@Component({
  selector: 'vts-card-body',
  exportAs: 'vtsCardBody',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngIf="vtsMeta">
      <ng-container *ngTemplateOutlet="vtsMeta"></ng-container>
    </ng-container>
    <ng-container *ngIf="vtsContent">
      <ng-container *ngTemplateOutlet="vtsContent"></ng-container>
    </ng-container>
  `,
  host: {
    '[class.vts-card-body]': 'true'
  }
})
export class VtsCardBodyComponent {
  @Input() vtsMeta?: TemplateRef<any> | null;
  @Input() vtsContent?: TemplateRef<any> | null;
}
