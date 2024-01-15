/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { TabTemplateContext } from './interfaces';

import { Subject } from 'rxjs';

import { BooleanInput, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';

import { VtsTabLinkDirective, VtsTabLinkTemplateDirective } from './tab-link.directive';
import { VtsTabDirective } from './tab.directive';

/**
 * Used to provide a tab set to a tab without causing a circular dependency.
 */
export const VTS_TAB_SET = new InjectionToken<VtsSafeAny>('VTS_TAB_SET');

@Component({
  selector: 'vts-tab',
  exportAs: 'vtsTab',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #tabLinkTemplate>
      <ng-content select="[vts-tab-link]"></ng-content>
    </ng-template>
    <ng-template #contentTemplate><ng-content></ng-content></ng-template>
  `
})
export class VtsTabComponent implements OnChanges, OnDestroy {
  static ngAcceptInputType_vtsDisabled: BooleanInput;
  static ngAcceptInputType_vtsClosable: BooleanInput;
  static ngAcceptInputType_vtsForceRender: BooleanInput;

  @Input() vtsTitle: string | TemplateRef<TabTemplateContext> = '';
  @Input() @InputBoolean() vtsClosable = false;
  @Input() vtsCloseIcon: string | TemplateRef<VtsSafeAny> = 'Close:vts';
  @Input() @InputBoolean() vtsDisabled = false;
  @Input() @InputBoolean() vtsForceRender = false;
  @Output() readonly vtsSelect = new EventEmitter<void>();
  @Output() readonly vtsDeselect = new EventEmitter<void>();
  @Output() readonly vtsClick = new EventEmitter<void>();
  @Output() readonly vtsContextmenu = new EventEmitter<MouseEvent>();

  @ContentChild(VtsTabLinkTemplateDirective, { static: false })
  vtsTabLinkTemplateDirective!: VtsTabLinkTemplateDirective;
  @ContentChild(VtsTabDirective, { static: false, read: TemplateRef })
  template: TemplateRef<void> | null = null;
  @ContentChild(VtsTabLinkDirective, { static: false })
  linkDirective!: VtsTabLinkDirective;
  @ViewChild('contentTemplate', { static: true })
  contentTemplate!: TemplateRef<VtsSafeAny>;

  isActive: boolean = false;
  position: number | null = null;
  origin: number | null = null;
  readonly stateChanges = new Subject<void>();

  get content(): TemplateRef<VtsSafeAny> {
    return this.template || this.contentTemplate;
  }

  get label(): string | TemplateRef<VtsSafeAny> {
    return this.vtsTitle || this.vtsTabLinkTemplateDirective?.templateRef;
  }

  constructor(@Inject(VTS_TAB_SET) public closestTabSet: VtsSafeAny) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { vtsTitle, vtsDisabled, vtsForceRender } = changes;
    if (vtsTitle || vtsDisabled || vtsForceRender) {
      this.stateChanges.next();
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }
}
