/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewEncapsulation
} from '@angular/core';

import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { BooleanInput } from '@ui-vts/ng-vts/core/types';
import { InputBoolean } from '@ui-vts/ng-vts/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { VtsCollapsePanelComponent } from './collapse-panel.component';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'collapse';

@Component({
  selector: 'vts-collapse',
  exportAs: 'vtsCollapse',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '[class.vts-collapse-icon-position-left]': `vtsExpandIconPosition === 'left'`,
    '[class.vts-collapse-icon-position-right]': `vtsExpandIconPosition === 'right'`,
    '[class.vts-collapse-ghost]': `vtsGhost`,
    '[class.vts-collapse-borderless]': '!vtsBordered',
    '[class.vts-collapse-rtl]': "dir === 'rtl'"
  }
})
export class VtsCollapseComponent implements OnDestroy, OnInit {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;
  static ngAcceptInputType_vtsAccordion: BooleanInput;
  static ngAcceptInputType_vtsBordered: BooleanInput;
  static ngAcceptInputType_vtsGhost: BooleanInput;

  @Input() @WithConfig() @InputBoolean() vtsAccordion: boolean = false;
  @Input() @WithConfig() @InputBoolean() vtsBordered: boolean = true;
  @Input() @WithConfig() @InputBoolean() vtsGhost: boolean = false;
  @Input() vtsExpandIconPosition: 'left' | 'right' = 'left';

  dir: Direction = 'ltr';

  private listOfVtsCollapsePanelComponent: VtsCollapsePanelComponent[] = [];
  private destroy$ = new Subject();
  constructor(
    public vtsConfigService: VtsConfigService,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-collapse');

    this.vtsConfigService
      .getConfigChangeEventForComponent(VTS_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  addPanel(value: VtsCollapsePanelComponent): void {
    this.listOfVtsCollapsePanelComponent.push(value);
  }

  removePanel(value: VtsCollapsePanelComponent): void {
    this.listOfVtsCollapsePanelComponent.splice(
      this.listOfVtsCollapsePanelComponent.indexOf(value),
      1
    );
  }

  click(collapse: VtsCollapsePanelComponent): void {
    if (this.vtsAccordion && !collapse.vtsActive) {
      this.listOfVtsCollapsePanelComponent
        .filter(item => item !== collapse)
        .forEach(item => {
          if (item.vtsActive) {
            item.vtsActive = false;
            item.vtsActiveChange.emit(item.vtsActive);
            item.markForCheck();
          }
        });
    }
    collapse.vtsActive = !collapse.vtsActive;
    collapse.vtsActiveChange.emit(collapse.vtsActive);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
