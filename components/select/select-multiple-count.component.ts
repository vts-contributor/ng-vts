import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vts-select-multiple-count',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="count">
      <span>{{ count }}</span>
    </ng-container>
  `,
  host: {
    '[class.vts-select-multiple-count]': 'true'
  }
})
export class VtsSelectMultipleCountComponent {
  @Input() count: number = 0;
}
