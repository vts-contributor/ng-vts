import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
  ViewEncapsulation,
  OnInit,
  OnChanges,
  SimpleChanges,
  ContentChild
} from '@angular/core';
import { VtsCardComponent } from './card.component';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';

@Component({
  selector: 'vts-card-header-title',
  exportAs: 'vtsCardHeaderTitle',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: '<ng-content></ng-content>',
  host: {
    '[class.vts-card-head-title]': 'true'
  }
})
export class VtsCardHeaderTitleComponent {}

@Component({
  selector: 'vts-card-header-extra',
  exportAs: 'vtsCardHeaderExtra',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: '<ng-content></ng-content>',
  host: {
    '[class.vts-card-head-extra]': 'true'
  }
})
export class VtsCardHeaderExtraComponent {}

@Component({
  selector: 'vts-card-header',
  exportAs: 'vtsCardHeader',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="vts-card-head-wrapper">
      <ng-container *ngIf="titleTemplate; else title">
        <ng-content select="vts-card-header-title"></ng-content>
      </ng-container>
      <ng-template #title>
        <div class="vts-card-head-title">{{ vtsTitle }}</div>
      </ng-template>
      <ng-container *ngIf="extraTemplate">
        <ng-content select="vts-card-header-extra"></ng-content>
      </ng-container>
    </div>
  `,
  host: {
    '[class.vts-card-head]': 'true',
    '[class.vts-card-head-bordered]': 'vtsBordered'
  }
})
export class VtsCardHeaderComponent implements OnInit, OnChanges {
  static ngAcceptInputType_vtsBordered: BooleanInput;

  @Input() vtsTitle?: string | null;
  @Input() @InputBoolean() vtsBordered?: boolean = true;
  @ContentChild(VtsCardHeaderTitleComponent) titleTemplate?: VtsCardHeaderTitleComponent;
  @ContentChild(VtsCardHeaderExtraComponent) extraTemplate?: VtsCardHeaderExtraComponent;

  constructor(@Optional() private parent: VtsCardComponent) {}

  ngOnInit(): void {
    this.setParentProperty();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.setParentProperty();
  }

  setParentProperty() {
    this.parent.cdr.markForCheck();
  }
}
