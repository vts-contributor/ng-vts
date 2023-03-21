import { HttpClient } from '@angular/common/http';
import { VtsButtonConfig, VtsDrawerConfig, VtsModalDeleteConfig, VtsModalUploadConfig, VtsPropertyType, VtsTabGroupConfig, VtsRequest, VtsStatusConfig } from '@ui-vts/ng-vts/pro-table';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

@Component({
  selector: 'vts-demo-pro-table-basic',
  template: `
    <vts-protable-container 
      [vtsTableTitle]="tableTitle"
      [vtsMoreActionConfig]="moreAction"
      [vtsTabGroupConfig]="tabGroupConfig"
      [vtsListData]="listData"
      [vtsProperties]="properties"
      [vtsDrawerConfig]="drawerConfig"
      [vtsListStatus]="listStatus"
      [vtsModalUploadConfig]="uploadConfig"
      [vtsModalDeleteConfig]="modalDeleteConfig"
      [vtsFilterGroupConfig]="filterGroupConfig"
      [vtsTotal]="total"
      (vtsOnActionChanger)="onActionChanger($event)"
      (vtsOnTabFilterChanger)="onChangeTabFilter($event)"
      (vtsOnSearchingByKey)="onSearchingByKey($event)"
      (vtsOnPageIndexChanger)="onChangePageIndex($event)"
    ></vts-protable-container>
  `
})
export class VtsDemoProTableBasicComponent implements OnInit {
  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getTotalDataWithTabConfig();
  }

  tableTitle = "Table Title";
  moreAction: VtsButtonConfig[] = [
    {
      buttonText: 'Clear selected',
      style: { 'background': 'red' }
    },
    {
      buttonText: 'Clear selected',
      style: { 'background': 'green' }

    }
  ];

  tabGroupConfig: VtsTabGroupConfig = {
    tabProperty: 'title',
    tabValueConfig: [
      {
        tabTitle: "All",
        tabValue: "all",
      },
      {
        tabTitle: "Category A",
        tabValue: "cateA",
        tabCondition: {
          operation: ['='],
          threshold: ['success']
        }
      },
      {
        tabTitle: "Category B",
        tabValue: "cateB",
        tabCondition: {
          operation: ['='],
          threshold: ['warning']
        }
      },
      {
        tabTitle: "Category C",
        tabValue: "cateC",
        tabCondition: {
          operation: ['='],
          threshold: ['']
        }
      },
    ]
  }

  listData: { [key: string]: VtsSafeAny }[] = [
    // {
    //   "id": 1,
    //   "content": "content",
    //   "title": "success",
    //   "author": "typicode1",
    //   "num": 10000,
    //   "birth": "2023/03/08 00:00:00"
    // },
    // {
    //   "id": 2,
    //   "content": "content",
    //   "title": "error",
    //   "author": "typicode2",
    //   "num": 20000,
    //   "birth": "2023/03/08 00:00:00"
    // },
    // {
    //   "id": 3,
    //   "content": "content",
    //   "title": "processing",
    //   "author": "typicode3",
    //   "num": 30000,
    //   "birth": "2023/03/08 00:00:00"
    // },
    // {
    //   "id": 4,
    //   "content": "content",
    //   "title": "warning",
    //   "author": "typicode4",
    //   "num": 40000,
    //   "birth": "2023/03/08 00:00:00"
    // },
    // {
    //   "id": 5,
    //   "content": "content",
    //   "title": "json-server",
    //   "author": "typicode5",
    //   "num": 50000,
    //   "birth": "2023/03/08 00:00:00"
    // },
    // {
    //   "id": 6,
    //   "content": "content",
    //   "title": "json-server",
    //   "author": "typicode6",
    //   "num": 60000,
    //   "birth": "2023/03/08 00:00:00"
    // },
    // {
    //   "id": 7,
    //   "content": "content",
    //   "title": "json-server",
    //   "author": "typicode7",
    //   "num": 70000,
    //   "birth": "2023/03/08 00:00:00"
    // },
    // {
    //   "id": 8,
    //   "content": "content",
    //   "title": "json-server",
    //   "author": "typicode8",
    //   "num": 80000,
    //   "birth": "2023/03/08 00:00:00"
    // },
    // {
    //   "id": 9,
    //   "content": "content",
    //   "title": "json-server",
    //   "author": "typicode9",
    //   "num": 90000,
    //   "birth": "2023/03/08 00:00:00"
    // },
    // {
    //   "id": 10,
    //   "content": "content",
    //   "title": "json-server",
    //   "author": "typicode10",
    //   "num": 100000,
    //   "birth": "2023/03/08 00:00:00"
    // },
    // {
    //   "id": 11,
    //   "content": "content",
    //   "title": "json-server",
    //   "author": "typicode11",
    //   "num": 110000,
    //   "birth": "2023/03/08 00:00:00"
    // },
    // {
    //   "id": 12,
    //   "content": "content",
    //   "title": "json-server",
    //   "author": "typicode12",
    //   "num": 120000,
    //   "birth": "2023/03/08 00:00:00"
    // }
  ];

  properties: VtsPropertyType[] = [
    {
      propertyName: 'id',
      required: true,
      datatype: 'string',
      checked: true,
    },
    {
      headerTitle: 'Content',
      propertyName: 'content',
      required: true,
      datatype: 'string',
      checked: true,
    },
    {
      headerTitle: 'Status type',
      propertyName: 'title',
      required: true,
      datatype: 'status',
      checked: true
    },
    {
      headerTitle: 'String type',
      propertyName: 'author',
      required: true,
      datatype: 'string',
      checked: true
    },
    {
      headerTitle: 'Number type',
      propertyName: 'num',
      required: true,
      datatype: 'number',
      checked: true
    },
    {
      headerTitle: 'Date type',
      propertyName: 'birth',
      required: true,
      datatype: 'date',
      checked: true
    },
  ];

  filterGroupConfig: { [key: string]: any }[] = [
    {
      filterText: 'Filter 1',
      filterValues: [
        {
          label: 'Home',
          value: 'Home'
        },
        {
          label: 'Country 1',
          value: 'Country 1'
        },
        {
          label: 'Country 2',
          value: 'Country 2'
        },
      ],
      selectedValues: []
    },
    {
      filterText: 'Filter 2',
      filterValues: [
        {
          label: 'Home',
          value: 'Home'
        },
        {
          label: 'Country 1',
          value: 'Country 1'
        },
        {
          label: 'Country 2',
          value: 'Country 2'
        },

      ],
      selectedValues: []
    },
    {
      filterText: 'Filter 3',
      filterValues: [
        {
          label: 'Home',
          value: 'Home'
        },
        {
          label: 'Country 1',
          value: 'Country 1'
        },
        {
          label: 'Country 2',
          value: 'Country 2'
        },
      ],
      selectedValues: []
    },
    {
      filterText: 'Filter 4',
      filterValues: [
        {
          label: 'Home',
          value: 'Home'
        },
        {
          label: 'Country 1',
          value: 'Country 1'
        },
        {
          label: 'Country 2',
          value: 'Country 2'
        },
      ],
      selectedValues: []
    },
    {
      filterText: 'Filter 5',
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
      selectedValues: []
    },
  ];

  request: VtsRequest = {
    url: "http://localhost:3000/getData/",
    type: "GET",
    onSuccess: (data: any) => {
      console.log(data);
    },
  }

  getRequest: VtsRequest = {
    url: "http://localhost:3000/getData/",
    type: "GET",
    onSuccess: (data) => {
      console.log(data);
    }
  }

  editRequest: VtsRequest = {
    url: "http://localhost:3000/getData/",
    type: "POST",
    onSuccess: (data) => {
      console.log(data);
    },
  };

  deleteRequest: VtsRequest = {
    url: "http://localhost:3000/getData/",
    type: "POST",
    onSuccess: (data) => {
      console.log(data);
    },
  }

  saveRequest: VtsRequest = {
    url: "http://localhost:3000/posts/",
    type: "POST",
    onSuccess: (data) => {
      console.log(data);
    }
  }

  exportRequest: VtsRequest = {
    url: "http://localhost:3000/posts/",
    type: "POST",
    onSuccess: (data) => {
      console.log(data);
    }
  }

  configTableRequest: VtsRequest = {
    url: "http://localhost:3000/getData/",
    type: "GET"
  }

  listStatus: VtsStatusConfig[] = [
    {
      text: "New",
      color: "success",
      value: "success"
    },
    {
      text: "processing",
      color: "processing",
      value: "processing"
    },
    {
      text: "Danger",
      color: "error",
      value: "error"
    },
    {
      text: "Warning",
      color: "warning",
      value: "warning"
    },
    {
      text: "Draft",
      color: "default",
      value: "default"
    },
  ]

  uploadConfig: VtsModalUploadConfig = {
    acceptTypes: ".png, .jpg, .jpeg",
    maxFileSizeInKB: 1024000
  };

  modalDeleteConfig: VtsModalDeleteConfig = {
    title: "Confirm delete",
    content: ""
  }

  isDrawerOpened: boolean = false;
  drawerConfig: VtsDrawerConfig = {
    openWith: "drawer",
    entityName: "post",
    showTitleBasedOnProp: "id",
    onOpen: () => {
      this.isDrawerOpened = true;
      console.log('drawer open');
    },
    onClose: () => {
      this.isDrawerOpened = false;
      console.log('drawer close');
    },
    onSave: (data) => {
      console.log(data);
      this.isDrawerOpened = false;
    }
  }

  pageSize = 10;
  pageIndex = 1;
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<string>();
  noCheckedItems = 0;
  searchTerms: any = {};
  totalDataWithFilter: VtsSafeAny[] = [];
  selectedTabIndex: number = 0;
  total: number = 0;

  onActionChanger(event: string) {
    switch(event) {
      case 'reload': {
        this.getTotalDataWithTabConfig();
        break;
      }
      default: {
        alert(event);
        break;
      }
    }
  }

  getTotalDataWithTabConfig() {
    if (this.tabGroupConfig && typeof this.tabGroupConfig.tabValueConfig != 'undefined') {
      const tabArray = this.tabGroupConfig.tabValueConfig;
      const urlsFork = [];
      if (tabArray) {
        if (this.request) {
          for (let i = 0; i < tabArray.length; i++) {
            let url = this.request.url.split('?')[0] + `?_page=1&_limit=${this.pageSize}`;
            if (tabArray[i].tabCondition) {
              url += `&${this.tabGroupConfig?.tabProperty}=${tabArray[i].tabCondition?.threshold}`
            }
            urlsFork.push(this.httpClient.get(url, { observe: 'response' }));
          }
  
          let { onSuccess, onError } = this.request;
          forkJoin(urlsFork).subscribe(res => {
            this.totalDataWithFilter = res;
            if (typeof this.tabGroupConfig != 'undefined' && typeof this.tabGroupConfig.tabValueConfig != 'undefined') {
              for (let i = 0; i < this.tabGroupConfig.tabValueConfig.length; i++) {
                this.tabGroupConfig.tabValueConfig[i].total = +this.totalDataWithFilter[i].headers.get('X-Total-Count');
              }
            }
            this.listData = [...this.totalDataWithFilter[this.selectedTabIndex].body];
            this.total = +this.totalDataWithFilter[this.selectedTabIndex].headers.get('X-Total-Count');
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
    } else {
      let url = this.request.url.split('?')[0] + `?_page=1&_limit=${this.pageSize}`;
      this.httpClient.get(url, { observe: 'response' }).subscribe(res => {
        const data = res.body as VtsSafeAny;
        this.listData = [...data];
        this.total = +res.headers.get('X-Total-Count')!;
      })
    }
  }

  onChangeTabFilter(event: number) {
    this.selectedTabIndex = event;
    this.listData = [...this.totalDataWithFilter[event].body];
    this.total = +this.totalDataWithFilter[event].headers.get('X-Total-Count');
  }

  onSearchingByKey(event: VtsSafeAny) {
    console.log(event);
  }

  onChangePageIndex(event: number) {
    if (event) {
      let url = this.request.url.split('?')[0] + `?_page=${event}&_limit=${this.pageSize}`;
      this.httpClient.get(url, { observe: 'response' }).subscribe(res => {
        const data = res.body as VtsSafeAny;
        this.listData = [...data];
        this.total = +res.headers.get('X-Total-Count')!;
      });
    }
  }
}
