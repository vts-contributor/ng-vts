import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';

@Component({
  selector: 'th[vtsSelections],th[vtsChecked],th[vtsShowCheckbox],th[vtsShowRowSelection]',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <vts-protable-selection
      [checked]="vtsChecked"
      [disabled]="vtsDisabled"
      [indeterminate]="vtsIndeterminate"
      [listOfSelections]="vtsSelections"
      [showCheckbox]="vtsShowCheckbox"
      [showRowSelection]="vtsShowRowSelection"
      (checkedChange)="onCheckedChange($event)"
    ></vts-protable-selection>
    <ng-content></ng-content>
  `
})
export class VtsThSelectionComponent implements OnChanges {
  static ngAcceptInputType_vtsShowCheckbox: BooleanInput;
  static ngAcceptInputType_vtsShowRowSelection: BooleanInput;

  @Input() vtsSelections: Array<{
    text: string;
    onSelect(...args: VtsSafeAny[]): VtsSafeAny;
  }> = [];
  @Input() vtsChecked = false;
  @Input() vtsDisabled = false;
  @Input() vtsIndeterminate = false;
  @Input() @InputBoolean() vtsShowCheckbox = false;
  @Input() @InputBoolean() vtsShowRowSelection = false;
  @Output() readonly vtsCheckedChange = new EventEmitter<boolean>();

  private isVtsShowExpandChanged = false;
  private isVtsShowCheckboxChanged = false;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-protable-selection-column');
  }

  onCheckedChange(checked: boolean): void {
    this.vtsChecked = checked;
    this.vtsCheckedChange.emit(checked);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isFirstChange = (value: SimpleChange) =>
      value && value.firstChange && value.currentValue !== undefined;
    const { vtsChecked, vtsSelections, vtsShowExpand, vtsShowCheckbox } = changes;
    if (vtsShowExpand) {
      this.isVtsShowExpandChanged = true;
    }
    if (vtsShowCheckbox) {
      this.isVtsShowCheckboxChanged = true;
    }
    if (isFirstChange(vtsSelections) && !this.isVtsShowExpandChanged) {
      this.vtsShowRowSelection = true;
    }
    if (isFirstChange(vtsChecked) && !this.isVtsShowCheckboxChanged) {
      this.vtsShowCheckbox = true;
    }
  }
}
