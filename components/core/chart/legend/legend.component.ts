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

export interface LegendEntry {
  color: string;
  formattedLabel: string;
  label: string;
}

@Component({
  selector: 'vts-charts-legend',
  template: `
    <div [style.width.px]="width">
      <header class="legend-title" *ngIf="!!title">
        <span class="legend-title-text">{{ title }}</span>
      </header>
      <div class="legend-wrap">
        <ul class="legend-labels" [class.horizontal-legend]="horizontal" [style.max-height.px]="height - 45">
          <li *ngFor="let entry of legendEntries; trackBy: trackBy" class="legend-label">
            <vts-charts-legend-entry
              [label]="entry.label"
              [formattedLabel]="entry.formattedLabel"
              [color]="entry.color"
              [isActive]="isActive(entry)"
              (select)="labelClick.emit($event)"
              (activate)="activate($event)"
              (deactivate)="deactivate($event)"
            >
            </vts-charts-legend-entry>
          </li>
        </ul>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LegendComponent implements OnChanges {
  @Input() data: string[] = [];
  @Input() title: string | null = null;
  @Input() colors!: ColorHelper;
  @Input() height: number = 0;
  @Input() width: number = 0;
  @Input() activeEntries: any;
  @Input() horizontal = false;

  @Output() labelClick: EventEmitter<string> = new EventEmitter();
  @Output() labelActivate: EventEmitter<{ name: string }> = new EventEmitter();
  @Output() labelDeactivate: EventEmitter<{ name: string }> = new EventEmitter();

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

  activate(item: { name: string }) {
    this.labelActivate.emit(item);
  }

  deactivate(item: { name: string }) {
    this.labelDeactivate.emit(item);
  }

  trackBy(_index: number, item: LegendEntry): string {
    return item.label;
  }
}
