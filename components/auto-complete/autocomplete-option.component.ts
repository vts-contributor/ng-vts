/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Optional,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { InputBoolean, scrollIntoView } from '@ui-vts/ng-vts/core/util';

import { VtsAutocompleteOptgroupComponent } from './autocomplete-optgroup.component';

export class VtsOptionSelectionChange {
  constructor(public source: VtsAutocompleteOptionComponent, public isUserInput: boolean = false) {}
}

@Component({
  selector: 'vts-auto-option',
  exportAs: 'vtsAutoOption',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="vts-select-item-option-content">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    role: 'menuitem',
    class: 'vts-select-item vts-select-item-option',
    '[class.vts-select-item-option-grouped]': 'vtsAutocompleteOptgroupComponent',
    '[class.vts-select-item-option-selected]': 'selected',
    '[class.vts-select-item-option-active]': 'active',
    '[class.vts-select-item-option-disabled]': 'vtsDisabled',
    '[attr.aria-selected]': 'selected.toString()',
    '[attr.aria-disabled]': 'vtsDisabled.toString()',
    '(click)': 'selectViaInteraction()',
    '(mouseenter)': 'onMouseEnter()',
    '(mousedown)': '$event.preventDefault()'
  }
})
export class VtsAutocompleteOptionComponent {
  static ngAcceptInputType_vtsDisabled: BooleanInput;

  @Input() vtsValue: VtsSafeAny;
  @Input() vtsLabel?: string;
  @Input() @InputBoolean() vtsDisabled = false;
  @Output()
  readonly selectionChange = new EventEmitter<VtsOptionSelectionChange>();
  @Output()
  readonly mouseEntered = new EventEmitter<VtsAutocompleteOptionComponent>();

  active = false;
  selected = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private element: ElementRef,
    @Optional()
    public vtsAutocompleteOptgroupComponent: VtsAutocompleteOptgroupComponent
  ) {}

  select(emit: boolean = true): void {
    this.selected = true;
    this.changeDetectorRef.markForCheck();
    if (emit) {
      this.emitSelectionChangeEvent();
    }
  }

  onMouseEnter(): void {
    this.mouseEntered.emit(this);
  }

  deselect(): void {
    this.selected = false;
    this.changeDetectorRef.markForCheck();
    this.emitSelectionChangeEvent();
  }

  /** Git display label */
  getLabel(): string {
    return this.vtsLabel || this.vtsValue.toString();
  }

  /** Set active (only styles) */
  setActiveStyles(): void {
    if (!this.active) {
      this.active = true;
      this.changeDetectorRef.markForCheck();
    }
  }

  /** Unset active (only styles) */
  setInactiveStyles(): void {
    if (this.active) {
      this.active = false;
      this.changeDetectorRef.markForCheck();
    }
  }

  scrollIntoViewIfNeeded(): void {
    scrollIntoView(this.element.nativeElement);
  }

  selectViaInteraction(): void {
    if (!this.vtsDisabled) {
      this.selected = !this.selected;
      if (this.selected) {
        this.setActiveStyles();
      } else {
        this.setInactiveStyles();
      }
      this.emitSelectionChangeEvent(true);
      this.changeDetectorRef.markForCheck();
    }
  }

  private emitSelectionChangeEvent(isUserInput: boolean = false): void {
    this.selectionChange.emit(new VtsOptionSelectionChange(this, isUserInput));
  }
}
