import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { ButtonConfig, DrawerConfig, ModalDeleteConfig, ModalUploadConfig, VtsPropertyType, VtsRequest, StatusConfig, TabGroupConfig } from './pro-table.type';
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

  @Input() tableTitle: string | undefined;
  @Input() moreActionConfig: ButtonConfig[] | undefined;
  @Input() tabGroupConfig: TabGroupConfig | undefined;
  @Input() filterGroupConfig: { [key: string]: any }[] | undefined;
  @Input() loading: boolean = false;
  @Input() properties: VtsPropertyType[] = [];
  @Input() listData: { [key: string]: VtsSafeAny }[] = [];
  @Input() pageIndex: number = 1;
  @Input() pageSize: number = 10;
  @Input() onSuccess: VtsSafeAny = () => { };
  @Input() onError: VtsSafeAny = () => { };
  @Input() requestData: VtsRequest | undefined;
  @Input() getRequest: VtsRequest | undefined;
  @Input() editRequest: VtsRequest | undefined;
  @Input() deleteRequest: VtsRequest | undefined;
  @Input() saveRequest: VtsRequest | undefined;
  @Input() exportRequest: VtsRequest | undefined;
  @Input() configTableRequest: VtsRequest | undefined;
  @Input() drawerConfig: DrawerConfig | undefined;
  @Input() listStatus: StatusConfig[] = [];
  @Input() modalDeleteConfig: ModalDeleteConfig | undefined;
  @Input() modalUploadConfig: ModalUploadConfig | undefined;

  @Output() onPageSizeChanger = new EventEmitter<number>();
  @Output() onPageIndexChanger = new EventEmitter<number>();
  @Output() onSuccessEvent = new EventEmitter<VtsSafeAny>();
  @Output() onErrorEvent = new EventEmitter<VtsSafeAny>();

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
    if (changes.requestData) {
      // this.getRenderData(this.requestData);
    }

    if (changes.tabGroupConfig) {
      this.getTotalDataWithTabConfig();
    }

    if (changes.properties) {
      this.publicProperties = changes.properties.currentValue.filter((prop: VtsPropertyType) => prop.headerTitle);
    }
  }

  getRenderData(request?: VtsRequest) {
    if (request && request.url) {
      let { onSuccess, onError } = request;
      this.loading = true;
      request.url += `?_page=${this.pageIndex}&_limit=${this.pageSize}`
      this.service.getRenderData({ ...request }).subscribe(data => {
        this.listData = [...data.body];
        this.vtsTotal = +data.headers.get('X-Total-Count');
        this.loading = false;
        if (onSuccess) {
          onSuccess(data);
        }
        this.changeDetector.detectChanges();
      }, error => {
        if (onError) {
          onError(error);
        }
        this.loading = false;
      });
    }
  }

  searchDataByForm(event: { [key: string]: any }) {
    if (event && typeof this.requestData !== `undefined`) {
      let { onSuccess, onError } = this.requestData;
      this.searchData = event;
      this.requestData.body = event;
      this.service.getRenderData({ ...this.requestData }).subscribe(data => {
        this.listData = [...data.body];
        this.vtsTotal = +data.headers.get('X-Total-Count');
        this.loading = false;
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
    if (event && this.requestData) {
      let { onSuccess, onError } = this.requestData;
      let url = this.requestData.url.split('?')[0] + `?_page=1&_limit=${this.pageSize}`;

      this.service.getRenderData({ ...this.requestData, url }).subscribe(data => {
        this.listData = [...data.body];
        this.vtsTotal = +data.headers.get('X-Total-Count');
        this.loading = false;
        if (onSuccess) {
          onSuccess(data);
        }
        this.changeDetector.detectChanges();
      }, error => {
        this.listData = [];
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
    const tabArray = this.tabGroupConfig?.tabValueConfig;
    const urlsFork = [];
    if (tabArray) {
      if (this.requestData) {
        for (let i = 0; i < tabArray.length; i++) {
          let url = this.requestData.url.split('?')[0] + `?_page=1&_limit=${this.pageSize}`;
          if (tabArray[i].tabCondition) {
            url += `&${this.tabGroupConfig?.tabProperty}=${tabArray[i].tabCondition?.threshold}`
          }
          urlsFork.push(this.httpClient.get(url, { observe: 'response' }));
        }

        let { onSuccess, onError } = this.requestData;
        forkJoin(urlsFork).subscribe(res => {
          this.totalDataWithFilter = res;
          if (this.tabGroupConfig) {
            for (let i = 0; i < this.tabGroupConfig.tabValueConfig.length; i++) {
              this.tabGroupConfig.tabValueConfig[i].total = +this.totalDataWithFilter[i].headers.get('X-Total-Count');
            }
          }
          this.listData = [...this.totalDataWithFilter[this.selectedTabIndex].body];
          this.vtsTotal = +this.totalDataWithFilter[this.selectedTabIndex].headers.get('X-Total-Count');
          if (onSuccess) {
            this.onSuccess(res);
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
    this.pageIndex = 1;
    this.selectedTabIndex = event;
    this.tabConfig = this.tabGroupConfig?.tabValueConfig[event];
    this.listData = [...this.totalDataWithFilter[event].body];
    this.vtsTotal = +this.totalDataWithFilter[event].headers.get('X-Total-Count');
  }
}