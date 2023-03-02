/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { moveUpMotion } from '@ui-vts/ng-vts/core/animation';

import { VtsMNComponent } from './base';
import { VtsMessageData } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-message',
  exportAs: 'vtsMessage',
  preserveWhitespaces: false,
  animations: [moveUpMotion],
  template: `
    <div
      class="vts-message-notice"
      [@moveUpMotion]="instance.state"
      (@moveUpMotion.done)="animationStateChanged.next($event)"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave()"
    >
      <div class="vts-message-notice-content">
        <div class="vts-message-custom-content" [ngClass]="'vts-message-' + instance.type">
          <ng-container [ngSwitch]="instance.type">
            <i *ngSwitchCase="'success'" vts-icon vtsType="CheckCircle"></i>
            <i *ngSwitchCase="'info'" vts-icon vtsType="info-circle"></i>
            <i *ngSwitchCase="'warning'" vts-icon vtsType="exclamation-circle"></i>
            <i *ngSwitchCase="'error'" vts-icon vtsType="Close"></i>
            <i *ngSwitchCase="'loading'" vts-icon vtsType="Sync"></i>
          </ng-container>
          <ng-container *vtsStringTemplateOutlet="instance.content">
            <span [innerHTML]="instance.content"></span>
          </ng-container>
        </div>
      </div>
    </div>
  `
})
export class VtsMessageComponent extends VtsMNComponent implements OnInit, OnDestroy {
  @Input() override instance!: Required<VtsMessageData>;
  @Output() override readonly destroyed = new EventEmitter<{
    id: string;
    userAction: boolean;
  }>();

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }
}
