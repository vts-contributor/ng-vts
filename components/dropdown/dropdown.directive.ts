/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import { warnDeprecation } from '@ui-vts/ng-vts/core/logger';
import { POSITION_MAP } from '@ui-vts/ng-vts/core/overlay';
import { BooleanInput, IndexableObject } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { BehaviorSubject, combineLatest, EMPTY, fromEvent, merge, Subject } from 'rxjs';
import {
  auditTime,
  distinctUntilChanged,
  filter,
  map,
  mapTo,
  switchMap,
  takeUntil
} from 'rxjs/operators';
import { VtsDropdownMenuComponent, VtsPlacementType } from './dropdown-menu.component';

const listOfPositions = [
  POSITION_MAP.bottomLeft,
  POSITION_MAP.bottomRight,
  POSITION_MAP.topRight,
  POSITION_MAP.topLeft
];

@Directive({
  selector: '[vts-dropdown]',
  exportAs: 'vtsDropdown'
})
export class VtsDropDownDirective implements AfterViewInit, OnDestroy, OnChanges, OnInit {
  static ngAcceptInputType_vtsBackdrop: BooleanInput;
  static ngAcceptInputType_vtsHasBackdrop: BooleanInput;
  static ngAcceptInputType_vtsClickHide: BooleanInput;
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsVisible: BooleanInput;

  private portal?: TemplatePortal;
  private overlayRef: OverlayRef | null = null;
  private destroy$ = new Subject();
  private positionStrategy = this.overlay
    .position()
    .flexibleConnectedTo(this.elementRef.nativeElement)
    .withLockedPosition()
    .withTransformOriginOn('.vts-dropdown');
  private inputVisible$ = new BehaviorSubject<boolean>(false);
  private vtsTrigger$ = new BehaviorSubject<'click' | 'hover'>('hover');
  private overlayClose$ = new Subject<boolean>();
  @Input() vtsDropdownMenu: VtsDropdownMenuComponent | null = null;
  @Input() vtsTrigger: 'click' | 'hover' = 'hover';
  @Input() vtsMatchWidthElement: ElementRef | null = null;
  /**
   * @deprecated Not supported, use `vtsHasBackDrop` instead.
   * @breaking-change 12.0.0
   */
  @Input() @InputBoolean() vtsBackdrop = false;
  @Input() @InputBoolean() vtsHasBackdrop = false;
  @Input() @InputBoolean() vtsClickHide = true;
  @Input() @InputBoolean() vtsDisabled = false;
  @Input() @InputBoolean() vtsVisible = false;
  @Input() vtsOverlayClassName: string = '';
  @Input() vtsOverlayStyle: IndexableObject = {};
  @Input() vtsPlacement: VtsPlacementType = 'bottomLeft';
  @Output()
  readonly vtsVisibleChange: EventEmitter<boolean> = new EventEmitter();

  setDropdownMenuValue<T extends keyof VtsDropdownMenuComponent>(
    key: T,
    value: VtsDropdownMenuComponent[T]
  ): void {
    if (this.vtsDropdownMenu) {
      this.vtsDropdownMenu.setValue(key, value);
    }
  }

  constructor(
    public elementRef: ElementRef,
    private overlay: Overlay,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef,
    private platform: Platform
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-dropdown-trigger');
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.vtsDropdownMenu) {
      const nativeElement: HTMLElement = this.elementRef.nativeElement;
      /** host mouse state **/
      const hostMouseState$ = merge(
        fromEvent(nativeElement, 'mouseenter').pipe(mapTo(true)),
        fromEvent(nativeElement, 'mouseleave').pipe(mapTo(false))
      );
      /** menu mouse state **/
      const menuMouseState$ = this.vtsDropdownMenu.mouseState$;
      /** merged mouse state **/
      const mergedMouseState$ = merge(menuMouseState$, hostMouseState$);
      /** host click state **/
      const hostClickState$ = fromEvent(nativeElement, 'click').pipe(map(() => !this.vtsVisible));
      /** visible state switch by vtsTrigger **/
      const visibleStateByTrigger$ = this.vtsTrigger$.pipe(
        switchMap(trigger => {
          if (trigger === 'hover') {
            return mergedMouseState$;
          } else if (trigger === 'click') {
            return hostClickState$;
          } else {
            return EMPTY;
          }
        })
      );
      const descendantMenuItemClick$ = this.vtsDropdownMenu.descendantMenuItemClick$.pipe(
        filter(() => this.vtsClickHide),
        mapTo(false)
      );
      const domTriggerVisible$ = merge(
        visibleStateByTrigger$,
        descendantMenuItemClick$,
        this.overlayClose$
      ).pipe(filter(() => !this.vtsDisabled));
      const visible$ = merge(this.inputVisible$, domTriggerVisible$);
      combineLatest([visible$, this.vtsDropdownMenu.isChildSubMenuOpen$])
        .pipe(
          map(([visible, sub]) => visible || sub),
          auditTime(150),
          distinctUntilChanged(),
          filter(() => this.platform.isBrowser),
          takeUntil(this.destroy$)
        )
        .subscribe((visible: boolean) => {
          const element = this.vtsMatchWidthElement
            ? this.vtsMatchWidthElement.nativeElement
            : nativeElement;
          const triggerWidth = element.getBoundingClientRect().width;
          if (this.vtsVisible !== visible) {
            this.vtsVisibleChange.emit(visible);
          }
          this.vtsVisible = visible;
          if (visible) {
            /** set up overlayRef **/
            if (!this.overlayRef) {
              /** new overlay **/
              this.overlayRef = this.overlay.create({
                positionStrategy: this.positionStrategy,
                minWidth: triggerWidth,
                disposeOnNavigation: true,
                hasBackdrop:
                  (this.vtsHasBackdrop || this.vtsBackdrop) && this.vtsTrigger === 'click',
                scrollStrategy: this.overlay.scrollStrategies.reposition()
              });
              merge(
                this.overlayRef.backdropClick(),
                this.overlayRef.detachments(),
                this.overlayRef
                  .outsidePointerEvents()
                  .pipe(
                    filter((e: MouseEvent) => !this.elementRef.nativeElement.contains(e.target))
                  ),
                this.overlayRef
                  .keydownEvents()
                  .pipe(filter(e => e.keyCode === ESCAPE && !hasModifierKey(e)))
              )
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                  this.overlayClose$.next(false);
                });
            } else {
              /** update overlay config **/
              const overlayConfig = this.overlayRef.getConfig();
              overlayConfig.minWidth = triggerWidth;
            }
            /** open dropdown with animation **/
            this.positionStrategy.withPositions([
              POSITION_MAP[this.vtsPlacement],
              ...listOfPositions
            ]);
            /** reset portal if needed **/
            if (!this.portal || this.portal.templateRef !== this.vtsDropdownMenu!.templateRef) {
              this.portal = new TemplatePortal(
                this.vtsDropdownMenu!.templateRef,
                this.viewContainerRef
              );
            }
            this.overlayRef.attach(this.portal);
          } else {
            /** detach overlayRef if needed **/
            if (this.overlayRef) {
              this.overlayRef.detach();
            }
          }
        });

      this.vtsDropdownMenu!.animationStateChange$.pipe(takeUntil(this.destroy$)).subscribe(
        event => {
          if (event.toState === 'void') {
            if (this.overlayRef) {
              this.overlayRef.dispose();
            }
            this.overlayRef = null;
          }
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {
      vtsVisible,
      vtsDisabled,
      vtsOverlayClassName,
      vtsOverlayStyle,
      vtsTrigger,
      vtsBackdrop
    } = changes;
    if (vtsTrigger) {
      this.vtsTrigger$.next(this.vtsTrigger);
    }
    if (vtsVisible) {
      this.inputVisible$.next(this.vtsVisible);
    }
    if (vtsDisabled) {
      const nativeElement = this.elementRef.nativeElement;
      if (this.vtsDisabled) {
        this.renderer.setAttribute(nativeElement, 'disabled', '');
        this.inputVisible$.next(false);
      } else {
        this.renderer.removeAttribute(nativeElement, 'disabled');
      }
    }
    if (vtsOverlayClassName) {
      this.setDropdownMenuValue('vtsOverlayClassName', this.vtsOverlayClassName);
    }
    if (vtsOverlayStyle) {
      this.setDropdownMenuValue('vtsOverlayStyle', this.vtsOverlayStyle);
    }
    if (vtsBackdrop) {
      warnDeprecation(
        '`vtsBackdrop` in dropdown component will be removed in 12.0.0, please use `vtsHasBackdrop` instead.'
      );
    }
  }
}
