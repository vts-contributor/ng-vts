/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {
  VtsListItemMetaDescriptionComponent as DescriptionComponent,
  VtsListItemMetaTitleComponent as TitleComponent
} from './list-item-meta-cell';

@Component({
  selector: 'vts-list-item-meta, [vts-list-item-meta]',
  exportAs: 'vtsListItemMeta',
  template: `
    <!--Old API Start-->
    <vts-list-item-meta-avatar *ngIf="avatarStr" [vtsSrc]="avatarStr"></vts-list-item-meta-avatar>
    <vts-list-item-meta-avatar *ngIf="avatarTpl">
      <ng-container [ngTemplateOutlet]="avatarTpl"></ng-container>
    </vts-list-item-meta-avatar>
    <!--Old API End-->

    <ng-content select="vts-list-item-meta-avatar"></ng-content>

    <div
      *ngIf="vtsTitle || vtsDescription || descriptionComponent || titleComponent"
      class="vts-list-item-meta-content"
    >
      <!--Old API Start-->
      <vts-list-item-meta-title *ngIf="vtsTitle && !titleComponent">
        <ng-container *vtsStringTemplateOutlet="vtsTitle">
          {{ vtsTitle }}
        </ng-container>
      </vts-list-item-meta-title>
      <vts-list-item-meta-description *ngIf="vtsDescription && !descriptionComponent">
        <ng-container *vtsStringTemplateOutlet="vtsDescription">
          {{ vtsDescription }}
        </ng-container>
      </vts-list-item-meta-description>
      <!--Old API End-->

      <ng-content select="vts-list-item-meta-title"></ng-content>
      <ng-content select="vts-list-item-meta-description"></ng-content>
    </div>
  `,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VtsListItemMetaComponent {
  avatarStr = '';
  avatarTpl?: TemplateRef<void>;

  @Input()
  set vtsAvatar(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this.avatarStr = '';
      this.avatarTpl = value;
    } else {
      this.avatarStr = value;
    }
  }

  @Input() vtsTitle?: string | TemplateRef<void>;

  @Input() vtsDescription?: string | TemplateRef<void>;

  @ContentChild(DescriptionComponent)
  descriptionComponent?: DescriptionComponent;
  @ContentChild(TitleComponent) titleComponent?: TitleComponent;
  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(elementRef.nativeElement, 'vts-list-item-meta');
  }
}
