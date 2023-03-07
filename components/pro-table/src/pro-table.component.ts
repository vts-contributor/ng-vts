import { DrawerConfig, PropertyType, Request, StatusConfig } from './pro-table.type';
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

@Component({
  selector: 'vts-protable-container',
  exportAs: 'vtsProTableContainer',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  template: `
    <vts-spin [vtsSpinning]="loading">
      <vts-search-form [headers]="properties" [data]="listData" (putSearchData)="searchDataByForm($event)"></vts-search-form>
      <vts-table-config 
      [listData]="listData" 
      [properties]="properties"
      [getRequest]="getRequest"
      [editRequest]="editRequest"
      [deleteRequest]="deleteRequest" 
      [saveRequest]="saveRequest"
      [exportRequest]="exportRequest"
      [configTableRequest]="configTableRequest" 
      [searchData]="searchData" 
      (reloadTable)="reloadTable($event)"
      [drawerConfig]="drawerConfig"
      [listStatus]="listStatus"
      >
    </vts-table-config>
    </vts-spin>
  `,
  styles: [
    ``
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

  @Input() loading: boolean = false;
  @Input() properties: PropertyType[] = [];
  @Input() listData: { [key: string]: VtsSafeAny }[] = [];
  @Input() pageSize: number = 10;
  @Input() onSuccess: VtsSafeAny = () => {};
  @Input() onError: VtsSafeAny = () => {};
  @Input() requestData: Request | undefined;
  @Input() getRequest: Request | undefined;
  @Input() editRequest: Request | undefined;
  @Input() deleteRequest: Request | undefined;
  @Input() saveRequest: Request | undefined;
  @Input() exportRequest: Request | undefined;
  @Input() configTableRequest: Request | undefined;
  @Input() drawerConfig: DrawerConfig | undefined;
  @Input() listStatus: StatusConfig[] = [];

  @Output() onPageSizeChanger = new EventEmitter<number>();
  @Output() onPageIndexChanger = new EventEmitter<number>();
  @Output() onSuccessEvent = new EventEmitter<VtsSafeAny>();
  @Output() onErrorEvent = new EventEmitter<VtsSafeAny>();

  searchData: Object = {};

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.requestData) {
      this.getRenderData(this.requestData);
    }
  }

  getRenderData(request?: Request) {
    if (request && request.url) {
      this.loading = true;
      const getRequest: Request = {
        url: request ? request.url : '',
        body: event,
        type: 'GET',
        onSuccess: (data) => {
          console.log(data);
        },
      };
      let url = getRequest.url;
      this.service.getRenderData({ ...getRequest, url }).subscribe(data => {
        this.listData = [...data];
        this.loading = false;
        this.changeDetector.detectChanges();
      }, err => {
        console.log(err);
        this.loading = false;
      });
    }
  }

  searchDataByForm(event: VtsSafeAny) {
    // console.log('search', event);
    this.searchData = event;
    const searchRequest: Request = {
      url: this.requestData ? this.requestData.url : '',
      body: event,
      type: 'GET',
      onSuccess: (data) => {
        console.log(data);
      },
    };

    let url = searchRequest.url;
    this.service.getRenderData({ ...searchRequest, url }).subscribe(data => {
      this.listData = [...data];
      this.loading = false;
      this.changeDetector.detectChanges();
    });
  }

  reloadTable(event: boolean) {
    if (event) {
      // console.log('reload data', event);
      const getRequest: Request = {
        url: this.requestData ? this.requestData.url : '',
        type: 'GET',
        onSuccess: (data) => {
          console.log(data);
        },
      };

      let url = getRequest.url;
      this.service.getRenderData({ ...getRequest, url }).subscribe(data => {
        this.listData = [...data];
        this.loading = false;
        this.changeDetector.detectChanges();
      });
    }
  }
}