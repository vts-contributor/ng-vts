import { VtsButtonConfig, VtsDrawerConfig, VtsModalDeleteConfig, VtsModalUploadConfig, VtsPropertyType, VtsStatusConfig, VtsTabGroupConfig, VtsActionType } from './pro-table.type';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import {
  // ChangeDetectionStrategy,
  Component,
  // ContentChildren,
  SimpleChanges,
  ElementRef,
  // ChangeDetectorRef,
  // OnDestroy,
  OnInit,
  Input,
  // Optional,
  OnChanges,
  // QueryList,
  ViewEncapsulation,
  EventEmitter,
  Output
} from '@angular/core';
import _ from 'lodash';
import { VtsButtonSize } from '@ui-vts/ng-vts/button';

@Component({
  selector: 'vts-protable-container',
  exportAs: 'vtsProTableContainer',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  templateUrl: './pro-table.component.html',
  styles: [
    `
      .title-table {
        font-family: 'Sarabun';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 30px;
        color: #000000;
      }

      .btn-default {
        border: 1px solid #737373;
        border-radius: 6px;
        background: #FFFFFF;
        color: #737373;
        margin-right: 8px;
        width: 106px;
        display: flex;
        align-items: end;
        justify-content: center;
      }

      .btn-more-action {
        border-radius: 6px !important;
        color: #FFFFFF !important;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .btn-more-action-content {
        width: 106px;
        border-top-right-radius: 0px !important;
        border-bottom-right-radius: 0px !important;
      }

      .btn-more-action-arrow {
        margin-left: 1px !important; 
        border-top-left-radius: 0px !important;
        border-bottom-left-radius: 0px !important;
      }

      .vts-tabs-tab-btn {
        padding: 0 12px;
      }

      .vts-tabs-tab {
        font-family: 'Sarabun';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #73777A;
      }
    `
  ]
})
export class VtsProTableContainerComponent implements OnInit, OnChanges {
  constructor(
    public elementRef: ElementRef,
  ) {
    this.elementRef.nativeElement.classList.add('vts-protable-container');
  }

  @Input() vtsTableTitle: string | undefined;
  @Input() vtsMoreActionConfig: VtsButtonConfig[] | undefined;
  @Input() vtsTabGroupConfig: VtsTabGroupConfig | undefined;
  @Input() vtsFilterGroupConfig: { [key: string]: any }[] | undefined;
  @Input() vtsLoading: boolean = false;
  @Input() vtsProperties: VtsPropertyType[] = [];
  @Input() vtsListData: { [key: string]: VtsSafeAny }[] = [];
  @Input() vtsPageIndex: number = 1;
  @Input() vtsPageSize: number = 10;
  @Input() vtsTotal: number = 0;
  @Input() vtsOnSuccess: VtsSafeAny = () => { };
  @Input() vtsOnError: VtsSafeAny = () => { };
  @Input() vtsDrawerConfig: VtsDrawerConfig | undefined;
  @Input() vtsListStatus: VtsStatusConfig[] = [];
  @Input() vtsModalDeleteConfig: VtsModalDeleteConfig | undefined;
  @Input() vtsModalUploadConfig: VtsModalUploadConfig | undefined;

  @Output() vtsOnPageSizeChanger = new EventEmitter<number>();
  @Output() vtsOnPageIndexChanger = new EventEmitter<number>();
  @Output() vtsOnSuccessEvent = new EventEmitter<VtsSafeAny>();
  @Output() vtsOnErrorEvent = new EventEmitter<VtsSafeAny>();
  @Output() vtsOnActionChanger = new EventEmitter<VtsActionType>();
  @Output() vtsOnTabFilterChanger = new EventEmitter<number>();
  @Output() vtsOnSearchingByKey = new EventEmitter<string>();

  searchData: Object = {};
  buttonSize: VtsButtonSize = 'sm';
  publicProperties: VtsPropertyType[] = [];
  actionType: { 'key': string } = { key: '' };
  selectedTabIndex = 0;
  totalDataWithFilter: VtsSafeAny[] = [];
  tabConfig: VtsSafeAny;

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.vtsRequestData) {
    }

    if (changes.vtsTabGroupConfig) {
    }

    if (changes.vtsProperties) {
      this.publicProperties = changes.vtsProperties.currentValue.filter((prop: VtsPropertyType) => prop.headerTitle);
    }
  }

  onSearchingByKey(event: string) {
    if (event) {
      this.vtsOnSearchingByKey.emit(event);
    }
  }

  reloadTable(event: boolean) {
    if (event) {
      this.onClickAction('reload');
    }
  }
  
  onClickAction(key: VtsActionType) {
    let actionType = { 'key': key };
    this.actionType = {
      ...actionType
    }
    this.vtsOnActionChanger.emit(key);
  }

  onChangeTabFilter(event: number) {
    if (typeof this.vtsTabGroupConfig != 'undefined' && typeof this.vtsTabGroupConfig.tabValueConfig != 'undefined') {
      this.vtsPageIndex = 1;
      this.selectedTabIndex = event;
      this.tabConfig = this.vtsTabGroupConfig.tabValueConfig[event];
      this.vtsOnTabFilterChanger.emit(event);
    }
  }
}