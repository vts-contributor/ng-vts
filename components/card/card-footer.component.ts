import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
  ViewEncapsulation,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { VtsCardComponent } from './card.component';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';

@Component({
  selector: 'vts-card-footer',
  exportAs: 'vtsCardFooter',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: '<ng-content></ng-content>',
  host: {
    '[class.vts-card-footer]': 'true',
    '[class.vts-card-footer-padding]': 'vtsPadding',
    '[class.vts-card-footer-bordered]': 'vtsBordered'
  }
})
export class VtsCardFooterComponent implements OnInit, OnChanges {
  static ngAcceptInputType_vtsPadding: BooleanInput;
  static ngAcceptInputType_vtsBordered: BooleanInput;

  @Input() @InputBoolean() vtsPadding?: boolean = true;
  @Input() @InputBoolean() vtsBordered?: boolean = false;

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
