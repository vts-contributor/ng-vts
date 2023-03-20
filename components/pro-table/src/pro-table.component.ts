import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { VtsButtonConfig, VtsDrawerConfig, VtsModalDeleteConfig, VtsModalUploadConfig, VtsPropertyType, VtsRequest, VtsStatusConfig, VtsTabGroupConfig } from './pro-table.type';
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
  ChangeDetectorRef,
  EventEmitter,
  Output
} from '@angular/core';
import { ProtableService } from './pro-table.service';
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
    private service: ProtableService,
    private changeDetector: ChangeDetectorRef,
    private httpClient: HttpClient
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
  @Input() vtsOnSuccess: VtsSafeAny = () => { };
  @Input() vtsOnError: VtsSafeAny = () => { };
  @Input() vtsRequestData: VtsRequest | undefined;
  @Input() vtsGetRequest: VtsRequest | undefined;
  @Input() vtsEditRequest: VtsRequest | undefined;
  @Input() vtsDeleteRequest: VtsRequest | undefined;
  @Input() vtsSaveRequest: VtsRequest | undefined;
  @Input() vtsExportRequest: VtsRequest | undefined;
  @Input() vtsConfigTableRequest: VtsRequest | undefined;
  @Input() vtsDrawerConfig: VtsDrawerConfig | undefined;
  @Input() vtsListStatus: VtsStatusConfig[] = [];
  @Input() vtsModalDeleteConfig: VtsModalDeleteConfig | undefined;
  @Input() vtsModalUploadConfig: VtsModalUploadConfig | undefined;

  @Output() vtsOnPageSizeChanger = new EventEmitter<number>();
  @Output() vtsOnPageIndexChanger = new EventEmitter<number>();
  @Output() vtsOnSuccessEvent = new EventEmitter<VtsSafeAny>();
  @Output() vtsOnErrorEvent = new EventEmitter<VtsSafeAny>();

  searchData: Object = {};
  vtsTotal: number = 0;
  buttonSize: VtsButtonSize = 'sm';
  publicProperties: VtsPropertyType[] = [];
  actionType: { 'key': string } = { key: '' };
  selectedTabIndex = 0;
  totalDataWithFilter: VtsSafeAny[] = [];
  tabConfig: VtsSafeAny;

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.vtsRequestData) {
      // this.getRenderData(this.requestData);
    }

    if (changes.vtsTabGroupConfig) {
      this.getTotalDataWithTabConfig();
    }

    if (changes.vtsProperties) {
      this.publicProperties = changes.vtsProperties.currentValue.filter((prop: VtsPropertyType) => prop.headerTitle);
    }
  }

  getRenderData(request?: VtsRequest) {
    if (request && request.url) {
      let { onSuccess, onError } = request;
      this.vtsLoading = true;
      request.url += `?_page=${this.vtsPageIndex}&_limit=${this.vtsPageSize}`;
      this.service.getRenderData({ ...request }).subscribe(data => {
        this.vtsListData = [...data.body];
        this.vtsTotal = +data.headers.get('X-Total-Count');
        this.vtsLoading = false;
        if (onSuccess) {
          onSuccess(data);
        }
        this.changeDetector.detectChanges();
      }, error => {
        if (onError) {
          onError(error);
        }
        this.vtsLoading = false;
      });
    }
  }

  searchDataByForm(event: { [key: string]: any }) {
    if (event && typeof this.vtsRequestData !== `undefined`) {
      let { onSuccess, onError } = this.vtsRequestData;
      this.searchData = event;
      this.vtsRequestData.body = event;
      this.service.getRenderData({ ...this.vtsRequestData }).subscribe(data => {
        this.vtsListData = [...data.body];
        this.vtsTotal = +data.headers.get('X-Total-Count');
        this.vtsLoading = false;
        if (onSuccess) {
          onSuccess(data);
        }
        this.changeDetector.detectChanges();
      }, error => {
        if (onError) {
          onError(error);
        }
      });
    }
  }

  reloadTable(event: boolean) {
    if (event && this.vtsRequestData) {
      let { onSuccess, onError } = this.vtsRequestData;
      let url = this.vtsRequestData.url.split('?')[0] + `?_page=1&_limit=${this.vtsPageSize}`;

      this.service.getRenderData({ ...this.vtsRequestData, url }).subscribe(data => {
        this.vtsListData = [...data.body];
        this.vtsTotal = +data.headers.get('X-Total-Count');
        this.vtsLoading = false;
        if (onSuccess) {
          onSuccess(data);
        }
        this.changeDetector.detectChanges();
      }, error => {
        this.vtsListData = [];
        if (onError) {
          onError(error);
        }
      }
      );
    }
  }

  onClickAction(key: string) {
    let actionType = { 'key': key };
    this.actionType = {
      ...actionType
    }
  }

  getTotalDataWithTabConfig() {
    const tabArray = this.vtsTabGroupConfig?.tabValueConfig;
    const urlsFork = [];
    if (tabArray) {
      if (this.vtsRequestData) {
        for (let i = 0; i < tabArray.length; i++) {
          let url = this.vtsRequestData.url.split('?')[0] + `?_page=1&_limit=${this.vtsPageSize}`;
          if (tabArray[i].tabCondition) {
            url += `&${this.vtsTabGroupConfig?.tabProperty}=${tabArray[i].tabCondition?.threshold}`
          }
          urlsFork.push(this.httpClient.get(url, { observe: 'response' }));
        }

        let { onSuccess, onError } = this.vtsRequestData;
        forkJoin(urlsFork).subscribe(res => {
          this.totalDataWithFilter = res;
          if (this.vtsTabGroupConfig) {
            for (let i = 0; i < this.vtsTabGroupConfig.tabValueConfig.length; i++) {
              this.vtsTabGroupConfig.tabValueConfig[i].total = +this.totalDataWithFilter[i].headers.get('X-Total-Count');
            }
          }
          this.vtsListData = [...this.totalDataWithFilter[this.selectedTabIndex].body];
          this.vtsTotal = +this.totalDataWithFilter[this.selectedTabIndex].headers.get('X-Total-Count');
          if (onSuccess) {
            onSuccess(res);
          }
        }, error => {
          if (onError) {
            onError(error);
          }
        })
      }
    }
  }

  onChangeTabFilter(event: number) {
    this.vtsPageIndex = 1;
    this.selectedTabIndex = event;
    this.tabConfig = this.vtsTabGroupConfig?.tabValueConfig[event];
    this.vtsListData = [...this.totalDataWithFilter[event].body];
    this.vtsTotal = +this.totalDataWithFilter[event].headers.get('X-Total-Count');
  }
}