/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { notificationMotion } from '@ui-vts/ng-vts/core/animation';
import { VtsMNComponent } from '@ui-vts/ng-vts/message';

import { VtsNotificationData } from './typings';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-notification',
  exportAs: 'vtsNotification',
  preserveWhitespaces: false,
  animations: [notificationMotion],
  template: `
    <div
      class="vts-notification-notice vts-notification-notice-closable"
      [ngStyle]="instance.options?.vtsStyle || null"
      [ngClass]="instance.options?.vtsClass || ''"
      [@notificationMotion]="state"
      (@notificationMotion.done)="animationStateChanged.next($event)"
      (click)="onClick($event)"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave()"
    >
      <div *ngIf="!instance.template" class="vts-notification-notice-content">
        <div
          class="vts-notification-notice-content"
          [ngClass]="{
            'vts-notification-notice-with-icon': instance.type !== 'blank'
          }"
        >
          <div [class.vts-notification-notice-with-icon]="instance.type !== 'blank'">
            <ng-container [ngSwitch]="instance.type">
              <i
                *ngSwitchCase="'success'"
                vts-icon
                vtsType="check-circle"
                class="vts-notification-notice-icon vts-notification-notice-icon-success"
              ></i>
              <i
                *ngSwitchCase="'info'"
                vts-icon
                vtsType="info-circle"
                class="vts-notification-notice-icon vts-notification-notice-icon-info"
              ></i>
              <i
                *ngSwitchCase="'warning'"
                vts-icon
                vtsType="exclamation-circle"
                class="vts-notification-notice-icon vts-notification-notice-icon-warning"
              ></i>
              <i
                *ngSwitchCase="'error'"
                vts-icon
                vtsType="Close"
                class="vts-notification-notice-icon vts-notification-notice-icon-error"
              ></i>
            </ng-container>
            <div class="vts-notification-notice-message" [innerHTML]="instance.title"></div>
            <div class="vts-notification-notice-description" [innerHTML]="instance.content"></div>
          </div>
        </div>
      </div>
      <ng-template
        [ngIf]="instance.template"
        [ngTemplateOutlet]="instance.template!"
        [ngTemplateOutletContext]="{
          $implicit: this,
          data: instance.options?.vtsData
        }"
      ></ng-template>
      <a tabindex="0" class="vts-notification-notice-close" (click)="close()">
        <span class="vts-notification-notice-close-x">
          <ng-container *ngIf="instance.options?.vtsCloseIcon; else iconTpl">
            <ng-container *vtsStringTemplateOutlet="instance.options?.vtsCloseIcon; let closeIcon">
              <i vts-icon [vtsType]="closeIcon"></i>
            </ng-container>
          </ng-container>
          <ng-template #iconTpl>
            <i vts-icon vtsType="Close" class="vts-notification-close-icon"></i>
          </ng-template>
        </span>
      </a>
    </div>
  `
})
export class VtsNotificationComponent extends VtsMNComponent implements OnDestroy {
  @Input() instance!: Required<VtsNotificationData>;
  @Input() placement?: string;
  @Input() index!: number;
  @Output() readonly destroyed = new EventEmitter<{
    id: string;
    userAction: boolean;
  }>();

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.instance.onClick.complete();
  }

  onClick(event: MouseEvent): void {
    this.instance.onClick.next(event);
  }

  close(): void {
    this.destroy(true);
  }

  get state(): string | undefined {
    if (this.instance.state === 'enter') {
      if (this.placement === 'topLeft' || this.placement === 'bottomLeft') {
        return 'enterLeft';
      } else {
        return 'enterRight';
      }
    } else {
      return this.instance.state;
    }
  }
}
