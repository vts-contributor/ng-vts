import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy,
  HostListener
} from '@angular/core';

@Component({
  selector: 'g[vts-charts-circle]',
  template: `
    <svg:circle
      [attr.cx]="cx"
      [attr.cy]="cy"
      [attr.r]="r"
      [attr.fill]="fill"
      [attr.stroke]="stroke"
      [attr.opacity]="circleOpacity"
      [attr.class]="classNames"
      [attr.pointer-events]="pointerEvents"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircleComponent implements OnChanges {
  @Input() cx: number = 0;
  @Input() cy: number = 0;
  @Input() r: number = 0;
  @Input() fill: string = '';
  @Input() stroke: string = '';
  @Input() data: number | string = '';
  @Input() classNames: string[] | string = '';
  @Input() circleOpacity: number = 0;
  @Input() pointerEvents: string = '';

  @Output() select: EventEmitter<number | string> = new EventEmitter();
  @Output() activate: EventEmitter<number | string> = new EventEmitter();
  @Output() deactivate: EventEmitter<number | string> = new EventEmitter();

  @HostListener('click')
  onClick() {
    this.select.emit(this.data);
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.activate.emit(this.data);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.deactivate.emit(this.data);
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.classNames = Array.isArray(this.classNames) ? this.classNames.join(' ') : '';
    this.classNames += 'circle';
  }
}
