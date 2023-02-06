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
import { VtsAvatarComponent } from '@ui-vts/ng-vts/avatar';

@Component({
  selector: 'vts-card-meta-title',
  exportAs: 'vtsCardMetaTitle',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: '<ng-content></ng-content>',
  host: {
    '[class.vts-card-meta-title]': 'true'
  }
})
export class VtsCardMetaTitleComponent {}

@Component({
  selector: 'vts-card-meta-description',
  exportAs: 'vtsCardMetaDescription',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: '<ng-content></ng-content>',
  host: {
    '[class.vts-card-meta-description]': 'true'
  }
})
export class VtsCardMetaDescriptionComponent {}

@Component({
  selector: 'vts-card-meta-avatar',
  exportAs: 'vtsCardMetaAvatar',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  templateUrl: '../avatar/avatar.component.html',
  host: {
    '[class.vts-card-meta-avatar]': 'true'
  }
})
export class VtsCardMetaAvatarComponent extends VtsAvatarComponent {}

export type VtsCardMetaAlign = 'left' | 'right' | 'center';
export type VtsCardMetaDirection = 'horizontal' | 'vertical';

@Component({
  selector: 'vts-card-meta',
  exportAs: 'vtsCardMeta',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngIf="vtsAvatarTemplate">
      <ng-content select="vts-card-meta-avatar"></ng-content>
    </ng-container>
    <div class="vts-card-meta-detail">
      <ng-container *ngIf="vtsTitleTemplate; else title">
        <ng-content select="vts-card-meta-title"></ng-content>
      </ng-container>

      <ng-container *ngIf="vtsDescriptionTemplate; else desc">
        <ng-content select="vts-card-meta-description"></ng-content>
      </ng-container>
    </div>

    <ng-template #title>
      <div class="vts-card-meta-title">{{ vtsTitle }}</div>
    </ng-template>

    <ng-template #desc>
      <div class="vts-card-meta-description">{{ vtsDescription }}</div>
    </ng-template>
  `,
  host: {
    '[class.vts-card-meta]': 'true',
    '[class.vts-card-meta-bordered]': 'vtsBordered',
    '[class.vts-card-meta-left]': 'vtsAlign === "left"',
    '[class.vts-card-meta-right]': 'vtsAlign === "right"',
    '[class.vts-card-meta-center]': 'vtsAlign === "center"',
    '[class.vts-card-meta-horizontal]': 'vtsDirection === "horizontal"',
    '[class.vts-card-meta-vertical]': 'vtsDirection === "vertical"'
  }
})
export class VtsCardMetaComponent implements OnInit, OnChanges {
  static ngAcceptInputType_vtsBordered: BooleanInput;

  @Input() vtsTitle?: string | null;
  @Input() vtsDescription?: string | null;
  @Input() @InputBoolean() vtsBordered?: boolean = false;
  @Input() vtsAlign?: VtsCardMetaAlign = 'left';
  @Input() vtsDirection?: VtsCardMetaDirection = 'horizontal';

  @ContentChild(VtsCardMetaAvatarComponent) vtsAvatarTemplate?: VtsCardMetaAvatarComponent;
  @ContentChild(VtsCardMetaTitleComponent) vtsTitleTemplate?: VtsCardMetaTitleComponent;
  @ContentChild(VtsCardMetaDescriptionComponent)
  vtsDescriptionTemplate?: VtsCardMetaDescriptionComponent;

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
