/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { VtsButtonType } from '@ui-vts/ng-vts/button';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { VtsResultActionDirective, VtsResultIconDirective } from './result-cells';

export type VtsSuccessTemplateType = '';
export type VtsExceptionTemplateType = '404' | '403' | '500' | 'bad-connection';
export type VtsResultTemplateType = VtsExceptionTemplateType | VtsSuccessTemplateType;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-result',
  exportAs: 'vtsResult',
  template: `
    <div class="vts-result-icon">
      <ng-container *ngIf="iconTemplate; else resultTpl">
        <ng-content select="vts-result-icon, [vts-result-icon]"></ng-content>
      </ng-container>
    </div>
    <ng-content select="div[vts-result-title]"></ng-content>
    <ng-content select="div[vts-result-subtitle]"></ng-content>
    <ng-content select="div[vts-result-content]"></ng-content>
    <div class="vts-result-action">
      <ng-container *ngIf="actionTemplate; else actionTpl">
        <ng-content select="div[vts-result-action]"></ng-content>
      </ng-container>
    </div>

    <ng-template #resultTpl>
      <ng-container [ngSwitch]="vtsTemplate">
        <vts-result-403 *ngSwitchCase="'403'"></vts-result-403>
        <vts-result-404 *ngSwitchCase="'404'"></vts-result-404>
        <vts-result-500 *ngSwitchCase="'500'"></vts-result-500>
        <vts-result-bad-connection *ngSwitchCase="'bad-connection'"></vts-result-bad-connection>
      </ng-container>
    </ng-template>

    <ng-template #actionTpl>
      <div>
        <div vts-row [vtsGutter]="[20, 16]" vtsJustify="center">
          <div vts-col *ngIf="vtsOkText != null" vtsXXXs="24" vtsXXs="auto">
            <button
              vts-button
              vtsBlock
              [vtsType]="vtsOkType!"
              (click)="vtsOnOk.emit()"
              [vtsLoading]="!!vtsOkLoading"
              [disabled]="vtsOkDisabled"
            >
              {{ vtsOkText }}
            </button>
          </div>
          <div vts-col *ngIf="vtsCancelText != null" vtsXXXs="24" vtsXXs="auto">
            <button
              vts-button
              vtsBlock
              [vtsType]="vtsCancelType!"
              (click)="vtsOnCancel.emit()"
              [vtsLoading]="!!vtsCancelLoading"
              [disabled]="vtsCancelDisabled"
            >
              {{ vtsCancelText }}
            </button>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  host: {
    '[class.vts-result]': 'true',
    '[class.vts-result-layout-icon-first]': `vtsLayout === 'icon-first'`,
    '[class.vts-result-layout-content-first]': `vtsLayout === 'content-first'`,
    '[class.vts-result-404]': `vtsTemplate === '404'`,
    '[class.vts-result-403]': `vtsTemplate === '403'`,
    '[class.vts-result-500]': `vtsTemplate === '500'`,
    '[class.vts-result-bad-connection]': `vtsTemplate === 'bad-connection'`
  }
})
export class VtsResultComponent {
  static ngAcceptInputType_vtsOkLoading: BooleanInput;
  static ngAcceptInputType_vtsOkDisabled: BooleanInput;
  static ngAcceptInputType_vtsCancelDisabled: BooleanInput;
  static ngAcceptInputType_vtsCancelLoading: BooleanInput;

  @Input() vtsTemplate: VtsResultTemplateType = '404';
  @Input() vtsLayout: 'icon-first' | 'content-first' = 'icon-first';

  @Input() @InputBoolean() vtsOkLoading: boolean = false;
  @Input() @InputBoolean() vtsOkDisabled: boolean = false;
  @Input() vtsOkText?: string | null;
  @Input() vtsOkType: VtsButtonType = 'primary';
  @Output() readonly vtsOnOk = new EventEmitter<MouseEvent>();

  @Input() @InputBoolean() vtsCancelDisabled: boolean = false;
  @Input() @InputBoolean() vtsCancelLoading: boolean = false;
  @Input() vtsCancelText?: string | null;
  @Input() vtsCancelType: VtsButtonType = 'default';
  @Output() readonly vtsOnCancel = new EventEmitter<MouseEvent>();

  @ContentChild(VtsResultIconDirective) iconTemplate?: VtsResultIconDirective;
  @ContentChild(VtsResultActionDirective) actionTemplate?: VtsResultActionDirective;
  private destroy$ = new Subject<void>();

  constructor() {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
