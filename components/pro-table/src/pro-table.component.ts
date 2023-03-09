import { ButtonConfig, DrawerConfig, ModalDeleteConfig, ModalUploadConfig, PropertyType, Request, StatusConfig, TabGroupConfig } from './pro-table.type';
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
  template: `
    <div [ngStyle]="{'display': 'flex', 'flex-direction':'row', 'justify-content':tableTitle?'space-between':'right'}">
      <ng-container *ngIf="tableTitle">
        <span class="title-table">{{tableTitle}}</span>
      </ng-container>
      <div vts-col class="btn-control-area">
        <button vts-button vtsType="default" [vtsSize]="buttonSize" class="btn-default">
          <span vts-icon vtsType="AddDoutone"></span>
          New
        </button>
        <button vts-button class="btn-table-config" vtsType="default" [vtsSize]="buttonSize" class="btn-default">
          <span vts-icon vtsType="CloudUploadDoutone"></span>
          Export
        </button>
        <button vts-button class="btn-table-config" vtsType="default" [vtsSize]="buttonSize" class="btn-default">
          <span vts-icon vtsType="SaveAltDoutone"></span>
          Import
        </button>

        <ng-container *ngIf="moreActionConfig">
          <vts-button-group [vtsSize]="buttonSize">
            <button vts-button vtsType="primary" class="btn-table-config btn-more-action" [vtsSize]="buttonSize" vts-dropdown vtsTrigger="click" [vtsDropdownMenu]="moreAction">
              More action
              <span vts-icon vtsType="ArrowDownOutline"></span>
            </button>
          </vts-button-group>
          <vts-dropdown-menu #moreAction="vtsDropdownMenu">
            <ul vts-menu style="padding: 0px">
              <ng-container *ngFor="let action of moreActionConfig">
                <li vts-menu-item [ngStyle]="action.style">{{action.buttonText}}</li>
              </ng-container>
            </ul>
          </vts-dropdown-menu>
        </ng-container> 
      </div>
    </div>

    <ng-container *ngIf="tabGroupConfig; else tableArea">
      <vts-tabset>
        <ng-container *ngFor="let tabConfig of tabGroupConfig.tabValueConfig">
          <vts-tab [vtsTitle]="tabConfig.tabTitle">
            <ng-container *ngTemplateOutlet="tableArea"></ng-container>
          </vts-tab>
        </ng-container>
      </vts-tabset>
    </ng-container>

    <ng-template #tableArea>
      <vts-spin [vtsSpinning]="loading">
        <!-- for older design -->
        <!-- <vts-search-form [headers]="properties" [data]="listData" (putSearchData)="searchDataByForm($event)"></vts-search-form> -->

        <!-- for new design 03/2023 -->
        <!-- <vts-group-filter [headers]="properties" [data]="listData" (putSearchData)="searchDataByForm($event)"></vts-group-filter> -->
        <vts-table-config 
          [listData]="listData" 
          [properties]="properties"
          [requestData]="requestData"
          [getRequest]="getRequest"
          [editRequest]="editRequest"
          [deleteRequest]="deleteRequest" 
          [saveRequest]="saveRequest"
          [exportRequest]="exportRequest"
          [configTableRequest]="configTableRequest"
          [filterGroupConfig]="filterGroupConfig"
          [searchData]="searchData" 
          (reloadTable)="reloadTable($event)"
          [drawerConfig]="drawerConfig"
          [listStatus]="listStatus" 
          [modalUploadConfig]="modalUploadConfig"
          [vtsTotal]="vtsTotal"
        >
      </vts-table-config>
      </vts-spin>
    </ng-template>

  `,
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
      }

      .btn-more-action {
        border-radius: 6px !important;
        color: #FFFFFF !important;
      }

      .vts-tabs-tab-btn {
        padding: 0 12px;
      }
    `
  ]
})
export class VtsProTableContainerComponent implements OnInit, OnChanges {
  constructor(
    public elementRef: ElementRef,
    private service: ProtableService,
    private changeDetector: ChangeDetectorRef
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-protable-container');
  }

  @Input() tableTitle: string | undefined;
  @Input() moreActionConfig: ButtonConfig[] | undefined;
  @Input() tabGroupConfig: TabGroupConfig | undefined;
  @Input() filterGroupConfig: { [key: string]: any }[] | undefined;
  @Input() loading: boolean = false;
  @Input() properties: PropertyType[] = [];
  @Input() listData: { [key: string]: VtsSafeAny }[] = [];
  @Input() pageIndex: number = 1;
  @Input() pageSize: number = 10;
  @Input() onSuccess: VtsSafeAny = () => { };
  @Input() onError: VtsSafeAny = () => { };
  @Input() requestData: Request | undefined;
  @Input() getRequest: Request | undefined;
  @Input() editRequest: Request | undefined;
  @Input() deleteRequest: Request | undefined;
  @Input() saveRequest: Request | undefined;
  @Input() exportRequest: Request | undefined;
  @Input() configTableRequest: Request | undefined;
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

  ngOnInit(): void {
    this.filterGroupConfig = [
      {
        filterText: 'Filter 1',
        filterValues: [
          {
            label: 'Home',
            value: 'Home'
          },
          {
            label: 'Country',
            value: 'Country'
          },
        ],
        'defaultValue': 'Home'
      },
      {
        filterText: 'Filter 2',
        filterValues: [
          {
            label: 'Home',
            value: 'Home'
          },
          {
            label: 'Country',
            value: 'Country'
          },
        ],
        'defaultValue': 'Home'
      },
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.requestData) {
      this.getRenderData(this.requestData);
    }

    if (changes.moreActionConfig) {
      console.log(changes.moreActionConfig);
    }
  }

  getRenderData(request?: Request) {
    if (request && request.url) {
      this.loading = true;
      request.url += `?_page=${this.pageIndex}&_limit=${this.pageSize}`
      this.service.getRenderData({ ...request }).subscribe(data => {
        this.listData = [...data.body];
        this.vtsTotal = +data.headers.get('X-Total-Count');
        this.loading = false;
        this.changeDetector.detectChanges();
      }, err => {
        console.log(err);
        this.loading = false;
      });
    }
  }

  searchDataByForm(event: { [key: string]: any }) {
    if (event && typeof this.requestData !== `undefined`) {
      this.searchData = event;
      this.requestData.body = event;
      this.service.getRenderData({ ...this.requestData }).subscribe(data => {
        this.listData = [...data.body];
        this.vtsTotal = +data.headers.get('X-Total-Count');
        this.loading = false;
        this.changeDetector.detectChanges();
      });
    }
  }

  reloadTable(event: boolean) {
    if (event && this.requestData) {
      let url = this.requestData.url.split('?')[0] + `?_page=1&_limit=${this.pageSize}`
      this.service.getRenderData({ ...this.requestData, url }).subscribe(data => {
        this.listData = [...data.body];
        this.vtsTotal = +data.headers.get('X-Total-Count');
        this.loading = false;
        this.changeDetector.detectChanges();
      });
    }
  }
}