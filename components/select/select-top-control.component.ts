/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BACKSPACE } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  OnChanges,
  Optional,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { VtsNoAnimationDirective } from '@ui-vts/ng-vts/core/no-animation';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { VtsSelectSearchComponent } from './select-search.component';
import {
  VtsSelectItemInterface,
  VtsSelectModeType,
  VtsSelectTopControlItemType
} from './select.types';

@Component({
  selector: 'vts-select-top-control',
  exportAs: 'vtsSelectTopControl',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <!--single mode-->
    <ng-container [ngSwitch]="mode">
      <ng-container *ngSwitchCase="'default'">
        <vts-select-search
          [vtsId]="vtsId"
          [disabled]="disabled"
          [value]="inputValue!"
          [showInput]="showSearch"
          [mirrorSync]="false"
          [autofocus]="autofocus"
          [focusTrigger]="open"
          (isComposingChange)="isComposingChange($event)"
          (valueChange)="onInputValueChange($event)"
        ></vts-select-search>
        <vts-select-item
          *ngIf="isShowSingleLabel"
          [deletable]="false"
          [disabled]="false"
          [removeIcon]="removeIcon"
          [label]="listOfTopItem[0].vtsLabel"
          [contentTemplateOutlet]="customTemplate"
          [contentTemplateOutletContext]="listOfTopItem[0]"
        ></vts-select-item>
      </ng-container>
      <ng-container *ngSwitchDefault>
        <!--multiple or tags mode-->
        <vts-select-item
          *ngFor="let item of listOfSlicedItem; trackBy: trackValue"
          [removeIcon]="removeIcon"
          [label]="item.vtsLabel"
          [disabled]="item.vtsDisabled || disabled"
          [contentTemplateOutlet]="item.contentTemplateOutlet"
          [deletable]="true"
          [contentTemplateOutletContext]="item.contentTemplateOutletContext"
          (delete)="onDeleteItem(item.contentTemplateOutletContext)"
        ></vts-select-item>
        <vts-select-search
          [vtsId]="vtsId"
          [disabled]="disabled"
          [value]="inputValue!"
          [autofocus]="autofocus"
          [showInput]="showSearch"
          [mirrorSync]="true"
          [focusTrigger]="open"
          (isComposingChange)="isComposingChange($event)"
          (valueChange)="onInputValueChange($event)"
          [placeholder]="
            this.listOfTopItem.length !== 0 && !!placeHolder && !disabled ? placeHolder : ''
          "
        ></vts-select-search>
      </ng-container>
    </ng-container>
    <vts-select-placeholder
      *ngIf="isShowPlaceholder"
      [placeholder]="placeHolder"
    ></vts-select-placeholder>
  `,
  host: {
    '(keydown)': 'onHostKeydown($event)'
  }
})
export class VtsSelectTopControlComponent implements OnChanges {
  @Input() vtsId: string | null = null;
  @Input() showSearch = false;
  @Input() placeHolder: string | TemplateRef<VtsSafeAny> | null = null;
  @Input() open = false;
  @Input() maxTagCount: number = Infinity;
  @Input() autofocus = false;
  @Input() disabled = false;
  @Input() mode: VtsSelectModeType = 'default';
  @Input() customTemplate: TemplateRef<{
    $implicit: VtsSelectItemInterface;
  }> | null = null;
  @Input() maxTagPlaceholder: TemplateRef<{
    $implicit: VtsSafeAny[];
  }> | null = null;
  @Input() removeIcon: TemplateRef<VtsSafeAny> | null = null;
  @Input() listOfTopItem: VtsSelectItemInterface[] = [];
  @Input() tokenSeparators: string[] = [];
  @Output() readonly tokenize = new EventEmitter<string[]>();
  @Output() readonly inputValueChange = new EventEmitter<string>();
  @Output() readonly deleteItem = new EventEmitter<VtsSelectItemInterface>();
  @ViewChild(VtsSelectSearchComponent)
  vtsSelectSearchComponent!: VtsSelectSearchComponent;
  listOfSlicedItem: VtsSelectTopControlItemType[] = [];
  isShowPlaceholder = true;
  isShowSingleLabel = false;
  isComposing = false;
  inputValue: string | null = null;

  onHostKeydown(e: KeyboardEvent): void {
    const inputValue = (e.target as HTMLInputElement).value;
    if (
      e.keyCode === BACKSPACE &&
      this.mode !== 'default' &&
      !inputValue &&
      this.listOfTopItem.length > 0
    ) {
      e.preventDefault();
      this.onDeleteItem(this.listOfTopItem[this.listOfTopItem.length - 1]);
    }
  }

  updateTemplateVariable(): void {
    const isSelectedValueEmpty = this.listOfTopItem.length === 0;
    this.isShowPlaceholder = isSelectedValueEmpty && !this.isComposing && !this.inputValue;
    this.isShowSingleLabel = !isSelectedValueEmpty && !this.isComposing && !this.inputValue;
  }

  isComposingChange(isComposing: boolean): void {
    this.isComposing = isComposing;
    this.updateTemplateVariable();
  }

  onInputValueChange(value: string): void {
    if (value !== this.inputValue) {
      this.inputValue = value;
      this.updateTemplateVariable();
      this.inputValueChange.emit(value);
      this.tokenSeparate(value, this.tokenSeparators);
    }
  }

  tokenSeparate(inputValue: string, tokenSeparators: string[]): void {
    const includesSeparators = (str: string | string[], separators: string[]): boolean => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < separators.length; ++i) {
        if (str.lastIndexOf(separators[i]) > 0) {
          return true;
        }
      }
      return false;
    };
    const splitBySeparators = (str: string | string[], separators: string[]): string[] => {
      const reg = new RegExp(`[${separators.join()}]`);
      const array = (str as string).split(reg).filter(token => token);
      return [...new Set(array)];
    };
    if (
      inputValue &&
      inputValue.length &&
      tokenSeparators.length &&
      this.mode !== 'default' &&
      includesSeparators(inputValue, tokenSeparators)
    ) {
      const listOfLabel = splitBySeparators(inputValue, tokenSeparators);
      this.tokenize.next(listOfLabel);
    }
  }

  clearInputValue(): void {
    if (this.vtsSelectSearchComponent) {
      this.vtsSelectSearchComponent.clearInputValue();
    }
  }

  focus(): void {
    if (this.vtsSelectSearchComponent) {
      this.vtsSelectSearchComponent.focus();
    }
  }

  blur(): void {
    if (this.vtsSelectSearchComponent) {
      this.vtsSelectSearchComponent.blur();
    }
  }

  trackValue(_index: number, option: VtsSelectTopControlItemType): VtsSafeAny {
    return option.vtsValue;
  }

  onDeleteItem(item: VtsSelectItemInterface): void {
    if (!this.disabled && !item.vtsDisabled) {
      this.deleteItem.next(item);
    }
  }

  constructor(
    private elementRef: ElementRef,
    @Host() @Optional() public noAnimation?: VtsNoAnimationDirective
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-select-selector');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { listOfTopItem, maxTagCount, customTemplate, maxTagPlaceholder } = changes;
    if (listOfTopItem) {
      this.updateTemplateVariable();
    }
    if (listOfTopItem || maxTagCount || customTemplate || maxTagPlaceholder) {
      const listOfSlicedItem: VtsSelectTopControlItemType[] = this.listOfTopItem
        .slice(0, this.maxTagCount)
        .map(o => {
          return {
            vtsLabel: o.vtsLabel,
            vtsValue: o.vtsValue,
            vtsDisabled: o.vtsDisabled,
            contentTemplateOutlet: this.customTemplate,
            contentTemplateOutletContext: o
          };
        });
      if (this.listOfTopItem.length > this.maxTagCount) {
        const exceededLabel = `+ ${this.listOfTopItem.length - this.maxTagCount} ...`;
        const listOfSelectedValue = this.listOfTopItem.map(item => item.vtsValue);
        const exceededItem = {
          vtsLabel: exceededLabel,
          vtsValue: '$$__vts_exceeded_item',
          vtsDisabled: true,
          contentTemplateOutlet: this.maxTagPlaceholder,
          contentTemplateOutletContext: listOfSelectedValue.slice(this.maxTagCount)
        };
        listOfSlicedItem.push(exceededItem);
      }
      this.listOfSlicedItem = listOfSlicedItem;
    }
  }
}
