/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Direction, Directionality } from '@angular/cdk/bidi';
import { VtsTimelineItemComponent } from './timeline-item.component';
import { TimelineService } from './timeline.service';
import { VtsTimelineMode, VtsTimelinePosition } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  selector: 'vts-timeline',
  providers: [TimelineService],
  exportAs: 'vtsTimeline',
  template: `
    <ul
      class="vts-timeline"
      [class.vts-timeline-right]="vtsMode === 'right'"
      [class.vts-timeline-alternate]="vtsMode === 'alternate' || vtsMode === 'custom'"
      [class.vts-timeline-pending]="!!vtsPending"
      [class.vts-timeline-reverse]="vtsReverse"
      [class.vts-timeline-rtl]="dir === 'rtl'"
    >
      <!-- pending dot (reversed) -->
      <ng-container *ngIf="vtsReverse" [ngTemplateOutlet]="pendingTemplate"></ng-container>
      <!-- timeline items -->
      <ng-container *ngFor="let item of timelineItems">
        <ng-template [ngTemplateOutlet]="item.template"></ng-template>
      </ng-container>
      <ng-container *ngIf="!vtsReverse" [ngTemplateOutlet]="pendingTemplate"></ng-container>
      <!-- pending dot -->
    </ul>
    <ng-template #pendingTemplate>
      <li *ngIf="vtsPending" class="vts-timeline-item vts-timeline-item-pending">
        <div class="vts-timeline-item-tail"></div>
        <div
          class="vts-timeline-item-head vts-timeline-item-head-custom vts-timeline-item-head-blue"
        >
          <ng-container *vtsStringTemplateOutlet="vtsPendingDot">
            {{ vtsPendingDot }}
            <i *ngIf="!vtsPendingDot" vts-icon vtsType="Sync"></i>
          </ng-container>
        </div>
        <div class="vts-timeline-item-content">
          <ng-container *vtsStringTemplateOutlet="vtsPending">
            {{ isPendingBoolean ? '' : vtsPending }}
          </ng-container>
        </div>
      </li>
    </ng-template>
    <!-- Grasp items -->
    <ng-content></ng-content>
  `
})
export class VtsTimelineComponent implements AfterContentInit, OnChanges, OnDestroy, OnInit {
  @ContentChildren(VtsTimelineItemComponent)
  listOfItems!: QueryList<VtsTimelineItemComponent>;

  @Input() vtsMode: VtsTimelineMode = 'left';
  @Input() vtsPending?: string | boolean | TemplateRef<void>;
  @Input() vtsPendingDot?: string | TemplateRef<void>;
  @Input() vtsReverse: boolean = false;

  isPendingBoolean: boolean = false;
  timelineItems: VtsTimelineItemComponent[] = [];
  dir: Direction = 'ltr';

  private destroy$ = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private timelineService: TimelineService,
    @Optional() private directionality: Directionality
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsMode, vtsReverse, vtsPending } = changes;

    if (simpleChangeActivated(vtsMode) || simpleChangeActivated(vtsReverse)) {
      this.updateChildren();
    }

    if (vtsPending) {
      this.isPendingBoolean = vtsPending.currentValue === true;
    }
  }

  ngOnInit(): void {
    this.timelineService.check$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cdr.markForCheck();
    });

    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngAfterContentInit(): void {
    this.updateChildren();

    this.listOfItems.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateChildren();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateChildren(): void {
    if (this.listOfItems && this.listOfItems.length) {
      const length = this.listOfItems.length;

      this.listOfItems.forEach((item, index) => {
        item.isLast = !this.vtsReverse ? index === length - 1 : index === 0;
        item.position = getInferredTimelineItemPosition(index, this.vtsMode);
        item.detectChanges();
      });
      this.timelineItems = this.vtsReverse
        ? this.listOfItems.toArray().reverse()
        : this.listOfItems.toArray();
    }
    this.cdr.markForCheck();
  }
}

function simpleChangeActivated(simpleChange?: SimpleChange): boolean {
  return !!(
    simpleChange &&
    (simpleChange.previousValue !== simpleChange.currentValue || simpleChange.isFirstChange())
  );
}

function getInferredTimelineItemPosition(
  index: number,
  mode: VtsTimelineMode
): VtsTimelinePosition | undefined {
  return mode === 'custom'
    ? undefined
    : mode === 'left'
    ? 'left'
    : mode === 'right'
    ? 'right'
    : mode === 'alternate' && index % 2 === 0
    ? 'left'
    : 'right';
}
