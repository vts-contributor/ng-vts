/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { VtsSelectItemInterface, VtsSelectModeType } from './select.types';

@Component({
  selector: 'vts-option-container',
  exportAs: 'vtsOptionContainer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  template: `
    <div>
      <div *ngIf="listOfContainerItem.length === 0" class="vts-select-item-empty">
        <vts-embed-empty
          vtsComponentName="select"
          [specificContent]="notFoundContent!"
        ></vts-embed-empty>
      </div>
      <cdk-virtual-scroll-viewport
        [class.full-width]="!matchWidth"
        [itemSize]="itemSize"
        [maxBufferPx]="itemSize * maxItemLength"
        [minBufferPx]="itemSize * maxItemLength"
        (scrolledIndexChange)="onScrolledIndexChange($event)"
        [style.height.px]="listOfContainerItem.length * itemSize + 2"
        [style.max-height.px]="itemSize * maxItemLength + 2"
      >
        <ng-template
          cdkVirtualFor
          [cdkVirtualForOf]="listOfContainerItem"
          [cdkVirtualForTrackBy]="trackValue"
          [cdkVirtualForTemplateCacheSize]="0"
          let-item
        >
          <ng-container [ngSwitch]="item.type">
            <vts-option-item-group
              *ngSwitchCase="'group'"
              [vtsLabel]="item.groupLabel"
            ></vts-option-item-group>
            <vts-option-item
              *ngSwitchCase="'item'"
              [icon]="menuItemSelectedIcon"
              [customContent]="item.vtsCustomContent"
              [template]="item.template"
              [grouped]="!!item.groupLabel"
              [disabled]="item.vtsDisabled"
              [showState]="mode === 'default'"
              [mode]="mode"
              [label]="item.vtsLabel"
              [vtsCustomCompareFn]="vtsCustomCompareFn"
              [activatedValue]="activatedValue"
              [listOfSelectedValue]="listOfSelectedValue"
              [value]="item.vtsValue"
              (itemHover)="onItemHover($event)"
              (itemClick)="onItemClick($event)"
            ></vts-option-item>
          </ng-container>
        </ng-template>
      </cdk-virtual-scroll-viewport>
      <ng-template [ngTemplateOutlet]="dropdownRender"></ng-template>
    </div>
  `
})
export class VtsOptionContainerComponent implements OnChanges, AfterViewInit {
  @Input() notFoundContent: string | TemplateRef<VtsSafeAny> | undefined = undefined;
  @Input() menuItemSelectedIcon: TemplateRef<VtsSafeAny> | null = null;
  @Input() dropdownRender: TemplateRef<VtsSafeAny> | null = null;
  @Input() activatedValue: VtsSafeAny | null = null;
  @Input() listOfSelectedValue: VtsSafeAny[] = [];
  @Input() vtsCustomCompareFn!: (o1: VtsSafeAny, o2: VtsSafeAny) => boolean;
  @Input() mode: VtsSelectModeType = 'default';
  @Input() matchWidth = true;
  @Input() itemSize = 48;
  @Input() maxItemLength = 8;
  @Input() listOfContainerItem: VtsSelectItemInterface[] = [];
  @Output() readonly itemClick = new EventEmitter<VtsSafeAny>();
  @Output() readonly scrollToBottom = new EventEmitter<void>();
  @ViewChild(CdkVirtualScrollViewport, { static: true })
  cdkVirtualScrollViewport!: CdkVirtualScrollViewport;
  private scrolledIndex = 0;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-select-dropdown');
  }

  onItemClick(value: VtsSafeAny): void {
    this.itemClick.emit(value);
  }

  onItemHover(value: VtsSafeAny): void {
    // TODO: keydown.enter won't activate this value
    this.activatedValue = value;
  }

  trackValue(_index: number, option: VtsSelectItemInterface): VtsSafeAny {
    return option.key;
  }

  onScrolledIndexChange(index: number): void {
    this.scrolledIndex = index;
    if (index === this.listOfContainerItem.length - this.maxItemLength) {
      this.scrollToBottom.emit();
    }
  }

  scrollToActivatedValue(): void {
    const index = this.listOfContainerItem.findIndex(item =>
      this.vtsCustomCompareFn(item.key, this.activatedValue)
    );
    if (index < this.scrolledIndex || index >= this.scrolledIndex + this.maxItemLength) {
      this.cdkVirtualScrollViewport.scrollToIndex(index || 0);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { listOfContainerItem, activatedValue } = changes;
    if (listOfContainerItem || activatedValue) {
      this.scrollToActivatedValue();
    }
  }
  ngAfterViewInit(): void {
    setTimeout(() => this.scrollToActivatedValue());
  }
}
