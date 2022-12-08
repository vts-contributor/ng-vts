/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'vts-card-meta',
  exportAs: 'vtsCardMeta',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="vts-card-meta-avatar" *ngIf="vtsAvatar">
      <ng-template [ngTemplateOutlet]="vtsAvatar"></ng-template>
    </div>
    <div class="vts-card-meta-detail" *ngIf="vtsTitle || vtsDescription">
      <div class="vts-card-meta-title" *ngIf="vtsTitle">
        <ng-container *vtsStringTemplateOutlet="vtsTitle">
          {{ vtsTitle }}
        </ng-container>
      </div>
      <div class="vts-card-meta-description" *ngIf="vtsDescription">
        <ng-container *vtsStringTemplateOutlet="vtsDescription">
          {{ vtsDescription }}
        </ng-container>
      </div>
    </div>
  `
})
export class VtsCardMetaComponent {
  @Input() vtsTitle: string | TemplateRef<void> | null = null;
  @Input() vtsDescription: string | TemplateRef<void> | null = null;
  @Input() vtsAvatar: TemplateRef<void> | null = null;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-card-meta');
  }
}
