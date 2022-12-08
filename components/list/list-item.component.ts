/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput, VtsDirectionVHType } from '@ui-vts/ng-vts/core/types';

import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subscription } from 'rxjs';
import { VtsListItemExtraComponent } from './list-item-cell';
import { VtsListComponent } from './list.component';

@Component({
  selector: 'vts-list-item, [vts-list-item]',
  exportAs: 'vtsListItem',
  template: `
    <ng-template #actionsTpl>
      <ul
        vts-list-item-actions
        *ngIf="vtsActions && vtsActions.length > 0"
        [vtsActions]="vtsActions"
      ></ul>
      <ng-content select="vts-list-item-actions, [vts-list-item-actions]"></ng-content>
    </ng-template>
    <ng-template #contentTpl>
      <ng-content select="vts-list-item-meta, [vts-list-item-meta]"></ng-content>
      <ng-content></ng-content>
      <ng-container *ngIf="vtsContent">
        <ng-container *vtsStringTemplateOutlet="vtsContent">
          {{ vtsContent }}
        </ng-container>
      </ng-container>
    </ng-template>
    <ng-template #extraTpl>
      <ng-content select="vts-list-item-extra, [vts-list-item-extra]"></ng-content>
    </ng-template>
    <ng-template #simpleTpl>
      <ng-template [ngTemplateOutlet]="contentTpl"></ng-template>
      <ng-template [ngTemplateOutlet]="vtsExtra"></ng-template>
      <ng-template [ngTemplateOutlet]="extraTpl"></ng-template>
      <ng-template [ngTemplateOutlet]="actionsTpl"></ng-template>
    </ng-template>

    <ng-container *ngIf="isVerticalAndExtra; else simpleTpl">
      <div class="vts-list-item-main">
        <ng-template [ngTemplateOutlet]="contentTpl"></ng-template>
        <ng-template [ngTemplateOutlet]="actionsTpl"></ng-template>
      </div>
      <vts-list-item-extra *ngIf="vtsExtra">
        <ng-template [ngTemplateOutlet]="vtsExtra"></ng-template>
      </vts-list-item-extra>
      <ng-template [ngTemplateOutlet]="extraTpl"></ng-template>
    </ng-container>
  `,
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsListItemComponent implements OnDestroy, AfterViewInit {
  static ngAcceptInputType_vtsNoFlex: BooleanInput;

  @Input() vtsActions: Array<TemplateRef<void>> = [];
  @Input() vtsContent?: string | TemplateRef<void>;
  @Input() vtsExtra: TemplateRef<void> | null = null;
  @Input()
  @InputBoolean()
  @HostBinding('class.vts-list-item-no-flex')
  vtsNoFlex: boolean = false;

  @ContentChild(VtsListItemExtraComponent)
  listItemExtraDirective?: VtsListItemExtraComponent;

  private itemLayout?: VtsDirectionVHType;
  private itemLayout$?: Subscription;

  get isVerticalAndExtra(): boolean {
    return this.itemLayout === 'vertical' && (!!this.listItemExtraDirective || !!this.vtsExtra);
  }

  constructor(
    elementRef: ElementRef,
    renderer: Renderer2,
    private parentComp: VtsListComponent,
    private cdr: ChangeDetectorRef
  ) {
    renderer.addClass(elementRef.nativeElement, 'vts-list-item');
  }

  ngAfterViewInit(): void {
    this.itemLayout$ = this.parentComp.itemLayoutNotify$.subscribe(val => {
      this.itemLayout = val;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.itemLayout$) {
      this.itemLayout$.unsubscribe();
    }
  }
}
