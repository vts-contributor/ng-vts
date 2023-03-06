import { PropertyType, Request } from './pro-table.type';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import {
  // ChangeDetectionStrategy,
  Component,
  // ContentChildren,
  // SimpleChanges,
  ElementRef,
  // ChangeDetectorRef,
  // OnDestroy,
  OnInit,
  Input,
  // Optional,
  // OnChanges,
  // QueryList,
  ViewEncapsulation,
  ChangeDetectorRef
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
      [editRequest]="editRequest"
      [deleteRequest]="deleteRequest" 
      [saveRequest]="saveRequest"
      [configTableRequest]="configTableRequest" 
      [searchData]="searchData" 
      (reloadTable)="reloadTable($event)"
      >
    </vts-table-config>
    </vts-spin>
  `,
  styles: [
    ``
  ]
})
export class VtsProTableContainerComponent implements OnInit {
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
  @Input() requestData: Request | undefined;
  @Input() pageSize: number = 10;


  editRequest: Request = {
    url: "http://mock.com/castlemock/mock/rest/project/lxGcaI/application/iWIW1z/",
    type: "GET",
    onSuccess: (data) => {
      console.log(data);
    },
  }

  deleteRequest: Request = {
    url: "http://mock.com/castlemock/mock/rest/project/lxGcaI/application/iWIW1z/",
    type: "POST",
    onSuccess: (data) => {
      console.log(data);
    },
  }

  saveRequest: Request = {
    url: "http://localhost:3000/posts/",
    type: "POST",
    onSuccess: (data) => {
      console.log(data);
    }
  }

  configTableRequest: Request = {
    url: "http://mock.com/castlemock/mock/rest/project/lxGcaI/application/iWIW1z/",
    type: "GET"
  }

  displayedProps: PropertyType[] = [];
  searchData: Object = {};

  ngOnInit(): void {
    this.getRenderData(this.requestData);
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
        this.listData = { ...data.listData };
        this.properties = { ...data.properties }
        this.loading = false;
        this.changeDetector.detectChanges();
      }, err => {
        console.log(err);
        this.loading = false;
      });
    }
  }

  searchDataByForm(event: VtsSafeAny) {
    console.log('search', event);
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
      this.listData = { ...data.listData };
      this.properties = { ...data.properties }
      this.loading = false;
      this.changeDetector.detectChanges();
    });
  }

  reloadTable(event: boolean) {
    if (event) {
      console.log('reload data', event);
      const getRequest: Request = {
        url: this.requestData ? this.requestData.url : '',
        type: 'GET',
        onSuccess: (data) => {
          console.log(data);
        },
      };

      let url = getRequest.url;
      this.service.getRenderData({ ...getRequest, url }).subscribe(data => {
        this.listData = { ...data.listData };
        this.properties = { ...data.properties }
        this.loading = false;
        this.changeDetector.detectChanges();
      });
    }
  }
}