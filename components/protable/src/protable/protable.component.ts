import { Direction, Directionality } from '@angular/cdk/bidi';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  TemplateRef,
  TrackByFunction,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { VtsConfigKey, VtsConfigService, WithConfig } from '@ui-vts/ng-vts/core/config';
import { VtsResizeObserver } from '@ui-vts/ng-vts/cdk/resize-observer';
import { BooleanInput, VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { InputBoolean, measureScrollbar } from '@ui-vts/ng-vts/core/util';
import { PaginationItemRenderContext } from '@ui-vts/ng-vts/pagination';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

const VTS_CONFIG_MODULE_NAME: VtsConfigKey = 'protable';

@Component({
  selector: 'vts-protable',
  exportAs: 'vtsProTable',
  providers: [],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <h1>ProTable</h1>
  `,
  host: {
    '[class.vts-table-wrapper-rtl]': 'dir === "rtl"'
  }
})
export class VtsProTableComponent<T = VtsSafeAny>
implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  readonly _vtsModuleName: VtsConfigKey = VTS_CONFIG_MODULE_NAME;

  private destroy$ = new Subject<void>();
  private loading$ = new BehaviorSubject<boolean>(false);
  private templateMode$ = new BehaviorSubject<boolean>(false);
  dir: Direction = 'ltr';

  ngOnInit() :void {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}