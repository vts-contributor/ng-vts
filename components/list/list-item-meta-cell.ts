/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'vts-list-item-meta-title',
  exportAs: 'vtsListItemMetaTitle',
  template: `
    <h4 class="vts-list-item-meta-title">
      <ng-content></ng-content>
    </h4>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsListItemMetaTitleComponent {}

@Component({
  selector: 'vts-list-item-meta-description',
  exportAs: 'vtsListItemMetaDescription',
  template: `
    <div class="vts-list-item-meta-description">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsListItemMetaDescriptionComponent {}

@Component({
  selector: 'vts-list-item-meta-avatar',
  exportAs: 'vtsListItemMetaAvatar',
  template: `
    <div class="vts-list-item-meta-avatar">
      <vts-avatar *ngIf="vtsSrc" [vtsSrc]="vtsSrc"></vts-avatar>
      <ng-content *ngIf="!vtsSrc"></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsListItemMetaAvatarComponent {
  @Input() vtsSrc?: string;
}
