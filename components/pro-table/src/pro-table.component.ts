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
      <vts-table-config [listData]="listData" [properties]="properties" [editRequest]="editRequest" [saveRequest]="saveRequest" [searchData]="searchData" (reloadTable)="reloadTable($event)"></vts-table-config>
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

  @Input() properties: PropertyType[] = [];
  @Input() listData: { [key: string]: VtsSafeAny }[] = [];
  @Input() requestData: Request | undefined;

  editRequest: Request = {
    url: "http://localhost:3000/posts/",
    type: "GET",
    onSuccess: (data) => {
      console.log(data);
    },
  }

  saveRequest: Request = {
    url: "http://localhost:3000/posts/",
    type: "POST"
  }

  exportRequest: Request = {
    url: "http://localhost:3000/posts/",
    type: "POST"
  }

  displayedProps: PropertyType[] = [];
  loading: boolean = false;
  searchData: Object = {};

  ngOnInit(): void {
    this.getRenderData(this.requestData)
  }

  getRenderData(request?: Request) {
    if (request && request.url) {
      this.loading = true;
      let url = request.url;
      this.service.getRenderData({ ...request, url }).subscribe(data => {
        this.listData = { ...data };
        this.loading = false;
        this.changeDetector.detectChanges();
      });
    }
  }

  searchDataByForm(event: VtsSafeAny) {
    console.log('search', event);
    this.searchData = event;
    if (!_.isEqual(event, {})) {
      const searchRequest: Request = {
        url: this.requestData ? this.requestData.url : '',
        body: event,
        type: 'GET',
        onSuccess: (data) => {
          console.log(data);
        },
      };
      this.getRenderData(searchRequest);
    }
  }

  reloadTable(event: boolean) {
    if (event) {
      console.log('reload data', event);
      this.getRenderData(this.requestData);
    }
  }
}