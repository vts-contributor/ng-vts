/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { Directionality } from '@angular/cdk/bidi';
import { VtsStatisticComponent } from './statistic.component';

const REFRESH_INTERVAL = 1000 / 30;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-countdown',
  exportAs: 'vtsCountdown',
  template: `
    <vts-statistic
      [vtsValue]="diff"
      [vtsValueStyle]="vtsValueStyle"
      [vtsValueTemplate]="vtsValueTemplate || countDownTpl"
      [vtsTitle]="vtsTitle"
      [vtsPrefix]="vtsPrefix"
      [vtsSuffix]="vtsSuffix"
    ></vts-statistic>

    <ng-template #countDownTpl>
      {{ diff | vtsTimeRange : vtsFormat }}
    </ng-template>
  `
})
export class VtsCountdownComponent
  extends VtsStatisticComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() vtsFormat: string = 'HH:mm:ss';
  @Output() readonly vtsCountdownFinish = new EventEmitter<void>();

  diff!: number;

  private target: number = 0;
  private updater_?: Subscription | null;

  constructor(
    cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private platform: Platform,
    @Optional() directionality: Directionality
  ) {
    super(cdr, directionality);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.vtsValue) {
      this.target = Number(changes.vtsValue.currentValue);
      if (!changes.vtsValue.isFirstChange()) {
        this.syncTimer();
      }
    }
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.syncTimer();
  }

  override ngOnDestroy(): void {
    this.stopTimer();
  }

  syncTimer(): void {
    if (this.target >= Date.now()) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  startTimer(): void {
    if (this.platform.isBrowser) {
      this.ngZone.runOutsideAngular(() => {
        this.stopTimer();
        this.updater_ = interval(REFRESH_INTERVAL).subscribe(() => {
          this.updateValue();
          this.cdr.detectChanges();
        });
      });
    }
  }

  stopTimer(): void {
    if (this.updater_) {
      this.updater_.unsubscribe();
      this.updater_ = null;
    }
  }

  /**
   * Update time that should be displayed on the screen.
   */
  protected updateValue(): void {
    this.diff = Math.max(this.target - Date.now(), 0);

    if (this.diff === 0) {
      this.stopTimer();
      this.vtsCountdownFinish.emit();
    }
  }
}
