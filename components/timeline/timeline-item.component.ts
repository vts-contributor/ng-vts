/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { TimelineService } from './timeline.service';
import { VtsTimelineItemColor, VtsTimelinePosition, TimelineTimeDefaultColors } from './typings';

function isDefaultColor(color?: string): boolean {
  return TimelineTimeDefaultColors.findIndex(i => i === color) !== -1;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  selector: 'vts-timeline-item, [vts-timeline-item]',
  exportAs: 'vtsTimelineItem',
  template: `
    <ng-template #template>
      <li
        class="vts-timeline-item"
        [class.vts-timeline-item-right]="(vtsPosition || position) === 'right'"
        [class.vts-timeline-item-left]="(vtsPosition || position) === 'left'"
        [class.vts-timeline-item-last]="isLast"
      >
        <div class="vts-timeline-item-tail"></div>
        <div
          class="vts-timeline-item-head"
          [class.vts-timeline-item-head-red]="vtsColor === 'red'"
          [class.vts-timeline-item-head-blue]="vtsColor === 'blue'"
          [class.vts-timeline-item-head-green]="vtsColor === 'green'"
          [class.vts-timeline-item-head-gray]="vtsColor === 'gray'"
          [class.vts-timeline-item-head-custom]="!!vtsDot"
          [style.border-color]="borderColor"
        >
          <ng-container *vtsStringTemplateOutlet="vtsDot">
            {{ vtsDot }}
          </ng-container>
        </div>
        <div class="vts-timeline-item-content">
          <ng-content></ng-content>
        </div>
      </li>
    </ng-template>
  `
})
export class VtsTimelineItemComponent implements OnChanges {
  @ViewChild('template', { static: false }) template!: TemplateRef<void>;

  @Input() vtsPosition?: VtsTimelinePosition;
  @Input() vtsColor: VtsTimelineItemColor = 'blue';
  @Input() vtsDot?: string | TemplateRef<void>;

  isLast = false;
  borderColor: string | null = null;
  position?: VtsTimelinePosition;

  constructor(private cdr: ChangeDetectorRef, private timelineService: TimelineService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.timelineService.markForCheck();
    if (changes.vtsColor) {
      this.updateCustomColor();
    }
  }

  detectChanges(): void {
    this.cdr.detectChanges();
  }

  private updateCustomColor(): void {
    this.borderColor = isDefaultColor(this.vtsColor) ? null : this.vtsColor;
  }
}
