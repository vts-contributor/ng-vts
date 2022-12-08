/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ComponentPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { VtsConfigService } from '@ui-vts/ng-vts/core/config';
import { VtsEmptyCustomContent, VtsEmptySize, VTS_EMPTY_COMPONENT_NAME } from './config';

function getEmptySize(componentName: string): VtsEmptySize {
  switch (componentName) {
    case 'table':
    case 'list':
      return 'normal';
    case 'select':
    case 'tree-select':
    case 'cascader':
    case 'transfer':
      return 'small';
    default:
      return '';
  }
}

type VtsEmptyContentType = 'component' | 'template' | 'string';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'vts-embed-empty',
  exportAs: 'vtsEmbedEmpty',
  template: `
    <ng-container *ngIf="!content && specificContent !== null" [ngSwitch]="size">
      <vts-empty
        *ngSwitchCase="'normal'"
        class="vts-empty-normal"
        [vtsNotFoundImage]="'simple'"
      ></vts-empty>
      <vts-empty
        *ngSwitchCase="'small'"
        class="vts-empty-small"
        [vtsNotFoundImage]="'simple'"
      ></vts-empty>
      <vts-empty *ngSwitchDefault></vts-empty>
    </ng-container>
    <ng-container *ngIf="content">
      <ng-template *ngIf="contentType !== 'string'" [cdkPortalOutlet]="contentPortal"></ng-template>
      <ng-container *ngIf="contentType === 'string'">
        {{ content }}
      </ng-container>
    </ng-container>
  `
})
export class VtsEmbedEmptyComponent implements OnChanges, OnInit, OnDestroy {
  @Input() vtsComponentName?: string;
  @Input() specificContent?: VtsEmptyCustomContent;

  content?: VtsEmptyCustomContent;
  contentType: VtsEmptyContentType = 'string';
  contentPortal?: Portal<VtsSafeAny>;
  size: VtsEmptySize = '';

  private destroy$ = new Subject<void>();

  constructor(
    private configService: VtsConfigService,
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private injector: Injector
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.vtsComponentName) {
      this.size = getEmptySize(changes.vtsComponentName.currentValue);
    }

    if (changes.specificContent && !changes.specificContent.isFirstChange()) {
      this.content = changes.specificContent.currentValue;
      this.renderEmpty();
    }
  }

  ngOnInit(): void {
    this.subscribeDefaultEmptyContentChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private renderEmpty(): void {
    const content = this.content;

    if (typeof content === 'string') {
      this.contentType = 'string';
    } else if (content instanceof TemplateRef) {
      const context = { $implicit: this.vtsComponentName } as VtsSafeAny;
      this.contentType = 'template';
      this.contentPortal = new TemplatePortal(content, this.viewContainerRef, context);
    } else if (content instanceof Type) {
      const injector = Injector.create({
        parent: this.injector,
        providers: [{ provide: VTS_EMPTY_COMPONENT_NAME, useValue: this.vtsComponentName }]
      });
      this.contentType = 'component';
      this.contentPortal = new ComponentPortal(content, this.viewContainerRef, injector);
    } else {
      this.contentType = 'string';
      this.contentPortal = undefined;
    }

    this.cdr.detectChanges();
  }

  private subscribeDefaultEmptyContentChange(): void {
    this.configService
      .getConfigChangeEventForComponent('empty')
      .pipe(startWith(true), takeUntil(this.destroy$))
      .subscribe(() => {
        this.content = this.specificContent || this.getUserDefaultEmptyContent();
        this.renderEmpty();
      });
  }

  private getUserDefaultEmptyContent():
    | Type<VtsSafeAny>
    | TemplateRef<string>
    | string
    | undefined {
    return (this.configService.getConfigForComponent('empty') || {}).vtsDefaultEmptyContent;
  }
}
