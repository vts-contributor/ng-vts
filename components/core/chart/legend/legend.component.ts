import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  ChangeDetectorRef,
  ViewEncapsulation
} from '@angular/core';
import { formatLabel } from '../label.helper';
import { ColorHelper } from '../color.helper';
import { DataItem } from '../models';

export interface LegendEntry {
  color: string;
  formattedLabel: string;
  label: string;
}

@Component({
  selector: 'ngx-charts-legend',
  template: `
    <div [style.width.px]="width">
      <header class="legend-title" *ngIf="title?.length > 0">
        <span class="legend-title-text">{{ title }}</span>
      </header>
      <div class="legend-wrap">
        <ul class="legend-labels" [class.horizontal-legend]="horizontal" [style.max-height.px]="height - 45">
          <li *ngFor="let entry of legendEntries; trackBy: trackBy" class="legend-label">
            <ngx-charts-legend-entry
              [label]="entry.label"
              [formattedLabel]="entry.formattedLabel"
              [color]="entry.color"
              [isActive]="isActive(entry)"
              (select)="labelClick.emit($event)"
              (activate)="activate($event)"
              (deactivate)="deactivate($event)"
            >
            </ngx-charts-legend-entry>
          </li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./legend.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendComponent implements OnChanges {
  @Input() data: string[] = [];
  @Input() title: string = '';
  @Input() colors!: ColorHelper;
  @Input() height: number = 0;
  @Input() width: number = 0;
  @Input() activeEntries: any;
  @Input() horizontal = false;

  @Output() labelClick: EventEmitter<string> = new EventEmitter();
  @Output() labelActivate: EventEmitter<DataItem> = new EventEmitter();
  @Output() labelDeactivate: EventEmitter<DataItem> = new EventEmitter();

  legendEntries: LegendEntry[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(_changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.cd.markForCheck();
    this.legendEntries = this.getLegendEntries();
  }

  getLegendEntries(): LegendEntry[] {
    const items = [];
    for (const label of this.data) {
      const formattedLabel = formatLabel(label);

      const idx = items.findIndex(i => {
        return i.label === formattedLabel;
      });

      if (idx === -1) {
        items.push({
          label,
          formattedLabel,
          color: this.colors.getColor(label)
        });
      }
    }

    return items;
  }

  isActive(entry: LegendEntry): boolean {
    if (!this.activeEntries) return false;
    const item = this.activeEntries.find((d: any) => {
      return entry.label === d.name;
    });
    return item !== undefined;
  }

  activate(item: DataItem) {
    this.labelActivate.emit(item);
  }

  deactivate(item: DataItem) {
    this.labelDeactivate.emit(item);
  }

  trackBy(_index: number, item: LegendEntry): string {
    return item.label;
  }
}
