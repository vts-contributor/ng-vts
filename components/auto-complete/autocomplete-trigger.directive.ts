/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOWN_ARROW, ENTER, ESCAPE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import {
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  ExistingProvider,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  Optional,
  ViewContainerRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { VtsSafeAny, OnChangeType, OnTouchedType } from '@ui-vts/ng-vts/core/types';
import { VtsInputGroupWhitSuffixOrPrefixDirective } from '@ui-vts/ng-vts/input';

import { Subject, Subscription } from 'rxjs';
import { delay, filter, takeUntil, tap } from 'rxjs/operators';

import { VtsAutocompleteOptionComponent } from './autocomplete-option.component';
import { VtsAutocompleteComponent } from './autocomplete.component';

export const VTS_AUTOCOMPLETE_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => VtsAutocompleteTriggerDirective),
  multi: true
};

export function getVtsAutocompleteMissingPanelError(): Error {
  return Error(
    'Attempting to open an undefined instance of `vts-autocomplete`. ' +
      'Make sure that the id passed to the `vtsAutocomplete` is correct and that ' +
      "you're attempting to open it after the ngAfterContentInit hook."
  );
}

@Directive({
  selector: `input[vtsAutocomplete], textarea[vtsAutocomplete]`,
  exportAs: 'vtsAutocompleteTrigger',
  providers: [VTS_AUTOCOMPLETE_VALUE_ACCESSOR],
  host: {
    autocomplete: 'off',
    'aria-autocomplete': 'list',
    '(focusin)': 'handleFocus()',
    '(blur)': 'handleBlur()',
    '(input)': 'handleInput($event)',
    '(keydown)': 'handleKeydown($event)'
  }
})
export class VtsAutocompleteTriggerDirective
  implements AfterViewInit, ControlValueAccessor, OnDestroy
{
  /** Bind vtsAutocomplete component */
  @Input() vtsAutocomplete!: VtsAutocompleteComponent;

  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  panelOpen: boolean = false;

  /** Current active option */
  get activeOption(): VtsAutocompleteOptionComponent | void {
    if (this.vtsAutocomplete && this.vtsAutocomplete.options.length) {
      return this.vtsAutocomplete.activeItem;
    }
  }

  private destroy$ = new Subject<void>();
  private overlayRef: OverlayRef | null = null;
  private portal: TemplatePortal<{}> | null = null;
  private positionStrategy!: FlexibleConnectedPositionStrategy;
  private previousValue: string | number | null = null;
  private selectionChangeSubscription!: Subscription;
  private optionsChangeSubscription!: Subscription;
  private overlayOutsideClickSubscription!: Subscription;

  constructor(
    private elementRef: ElementRef,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    @Optional()
    private vtsInputGroupWhitSuffixOrPrefixDirective: VtsInputGroupWhitSuffixOrPrefixDirective,
    @Optional() @Inject(DOCUMENT) private document: VtsSafeAny
  ) {}

  ngAfterViewInit(): void {
    if (this.vtsAutocomplete) {
      this.vtsAutocomplete.animationStateChange.pipe(takeUntil(this.destroy$)).subscribe(event => {
        if (event.toState === 'void') {
          if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroyPanel();
  }

  writeValue(value: VtsSafeAny): void {
    Promise.resolve(null).then(() => this.setTriggerValue(value));
  }

  registerOnChange(fn: (value: {}) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    const element: HTMLInputElement = this.elementRef.nativeElement;
    element.disabled = isDisabled;
    this.closePanel();
  }

  openPanel(): void {
    this.previousValue = this.elementRef.nativeElement.value;
    this.attachOverlay();
    this.updateStatus();
  }

  closePanel(): void {
    if (this.panelOpen) {
      this.vtsAutocomplete.isOpen = this.panelOpen = false;

      if (this.overlayRef && this.overlayRef.hasAttached()) {
        this.overlayRef.detach();
        this.selectionChangeSubscription.unsubscribe();
        this.overlayOutsideClickSubscription.unsubscribe();
        this.optionsChangeSubscription.unsubscribe();
        this.portal = null;
      }
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;

    if (keyCode === ESCAPE) {
      event.preventDefault();
    }

    if (this.panelOpen && (keyCode === ESCAPE || keyCode === TAB)) {
      // Reset value when tab / ESC close
      if (this.activeOption && this.activeOption.getLabel() !== this.previousValue) {
        this.setTriggerValue(this.previousValue);
      }
      this.closePanel();
    } else if (this.panelOpen && keyCode === ENTER) {
      if (this.vtsAutocomplete.showPanel && this.activeOption) {
        event.preventDefault();
        this.activeOption.selectViaInteraction();
      }
    } else if (this.panelOpen && isArrowKey && this.vtsAutocomplete.showPanel) {
      event.stopPropagation();
      event.preventDefault();
      if (keyCode === UP_ARROW) {
        this.vtsAutocomplete.setPreviousItemActive();
      } else {
        this.vtsAutocomplete.setNextItemActive();
      }
      if (this.activeOption) {
        this.activeOption.scrollIntoViewIfNeeded();
      }
      this.doBackfill();
    }
  }

  handleInput(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    const document = this.document as Document;
    let value: number | string | null = target.value;

    if (target.type === 'number') {
      value = value === '' ? null : parseFloat(value);
    }
    if (this.previousValue !== value) {
      this.previousValue = value;
      this.onChange(value);

      if (this.canOpen() && document.activeElement === event.target) {
        this.openPanel();
      }
    }
  }

  handleFocus(): void {
    if (this.canOpen()) {
      this.openPanel();
    }
  }

  handleBlur(): void {
    this.onTouched();
  }

  /**
   * Subscription data source changes event
   */
  private subscribeOptionsChange(): Subscription {
    const optionChanges = this.vtsAutocomplete.options.changes.pipe(
      tap(() => this.positionStrategy.reapplyLastPosition()),
      delay(0)
    );
    return optionChanges.subscribe(() => {
      this.resetActiveItem();
      if (this.panelOpen) {
        this.overlayRef!.updatePosition();
      }
    });
  }

  /**
   * Subscription option changes event and set the value
   */
  private subscribeSelectionChange(): Subscription {
    return this.vtsAutocomplete.selectionChange.subscribe(
      (option: VtsAutocompleteOptionComponent) => {
        this.setValueAndClose(option);
      }
    );
  }

  private subscribeOverlayOutsideClick(): Subscription {
    return this.overlayRef!.outsidePointerEvents()
      .pipe(filter((e: MouseEvent) => !this.elementRef.nativeElement.contains(e.target)))
      .subscribe(() => {
        this.closePanel();
      });
  }

  private attachOverlay(): void {
    if (!this.vtsAutocomplete) {
      throw getVtsAutocompleteMissingPanelError();
    }

    if (!this.portal && this.vtsAutocomplete.template) {
      this.portal = new TemplatePortal(this.vtsAutocomplete.template, this.viewContainerRef);
    }

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create(this.getOverlayConfig());
    }

    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.portal);
      this.selectionChangeSubscription = this.subscribeSelectionChange();
      this.optionsChangeSubscription = this.subscribeOptionsChange();
      this.overlayOutsideClickSubscription = this.subscribeOverlayOutsideClick();
      this.overlayRef
        .detachments()
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.closePanel();
        });
    }
    this.vtsAutocomplete.isOpen = this.panelOpen = true;
  }

  private updateStatus(): void {
    if (this.overlayRef) {
      this.overlayRef.updateSize({
        width: this.vtsAutocomplete.vtsWidth || this.getHostWidth()
      });
    }
    this.vtsAutocomplete.setVisibility();
    this.resetActiveItem();
    if (this.activeOption) {
      this.activeOption.scrollIntoViewIfNeeded();
    }
  }

  private destroyPanel(): void {
    if (this.overlayRef) {
      this.closePanel();
    }
  }

  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this.getOverlayPosition(),
      disposeOnNavigation: true,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      // default host element width
      width: this.vtsAutocomplete.vtsWidth || this.getHostWidth()
    });
  }

  private getConnectedElement(): ElementRef {
    return this.vtsInputGroupWhitSuffixOrPrefixDirective
      ? this.vtsInputGroupWhitSuffixOrPrefixDirective.elementRef
      : this.elementRef;
  }

  private getHostWidth(): number {
    return this.getConnectedElement().nativeElement.getBoundingClientRect().width;
  }

  private getOverlayPosition(): PositionStrategy {
    const positions = [
      new ConnectionPositionPair(
        { originX: 'start', originY: 'bottom' },
        { overlayX: 'start', overlayY: 'top' }
      ),
      new ConnectionPositionPair(
        { originX: 'start', originY: 'top' },
        { overlayX: 'start', overlayY: 'bottom' }
      )
    ];
    this.positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.getConnectedElement())
      .withFlexibleDimensions(false)
      .withPush(false)
      .withPositions(positions)
      .withTransformOriginOn('.vts-select-dropdown');
    return this.positionStrategy;
  }

  private resetActiveItem(): void {
    const index = this.vtsAutocomplete.getOptionIndex(this.previousValue);
    this.vtsAutocomplete.clearSelectedOptions(null, true);
    if (index !== -1) {
      this.vtsAutocomplete.setActiveItem(index);
      this.vtsAutocomplete.activeItem.select(false);
    } else {
      this.vtsAutocomplete.setActiveItem(this.vtsAutocomplete.vtsDefaultActiveFirstOption ? 0 : -1);
    }
  }

  private setValueAndClose(option: VtsAutocompleteOptionComponent): void {
    const value = option.vtsValue;
    this.setTriggerValue(option.getLabel());
    this.onChange(value);
    this.elementRef.nativeElement.focus();
    this.closePanel();
  }

  private setTriggerValue(value: VtsSafeAny): void {
    const option = this.vtsAutocomplete.getOption(value);
    const displayValue = option ? option.getLabel() : value;
    this.elementRef.nativeElement.value = displayValue != null ? displayValue : '';
    if (!this.vtsAutocomplete.vtsBackfill) {
      this.previousValue = displayValue;
    }
  }

  private doBackfill(): void {
    if (this.vtsAutocomplete.vtsBackfill && this.vtsAutocomplete.activeItem) {
      this.setTriggerValue(this.vtsAutocomplete.activeItem.getLabel());
    }
  }

  private canOpen(): boolean {
    const element: HTMLInputElement = this.elementRef.nativeElement;
    return !element.readOnly && !element.disabled;
  }
}
