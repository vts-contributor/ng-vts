import { ButtonConfig, DrawerConfig, ModalDeleteConfig, ModalUploadConfig, PropertyType, TabGroupConfig, Request, StatusConfig } from '@ui-vts/ng-vts/pro-table';
import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pro-table-basic',
  template: `
    <vts-protable-container 
      [tableTitle]="tableTitle"
      [moreActionConfig]="moreAction"
      [tabGroupConfig]="tabGroupConfig"
      [properties]="properties" 
      [requestData]="request"
      [getRequest]="getRequest"
      [editRequest]="editRequest"
      [deleteRequest]="deleteRequest"
      [saveRequest]="saveRequest"
      [exportRequest]="exportRequest"
      [configTableRequest]="configTableRequest"
      [drawerConfig]="drawerConfig"
      [listStatus]="listStatus"
      [modalUploadConfig]="uploadConfig"
      [modalDeleteConfig]="modalDeleteConfig"
      [filterGroupConfig]="filterGroupConfig"
    ></vts-protable-container>
  `
})
export class VtsDemoProTableBasicComponent {
  tableTitle = "Table Title";
  moreAction: ButtonConfig[] = [
    {
      buttonText: 'Clear selected',
      style: { 'background': 'red' }
    },
    {
      buttonText: 'Clear selected',
      style: { 'background': 'green' }

    }
  ];

  tabGroupConfig: TabGroupConfig = {
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

  listData = [
    {
      "id": 1,
      "title": "success",
      "author": "typicode",
      "num": 10
    },
    {
      "id": 2,
      "title": "warning",
      "author": "typicode1"
    },
    {
      "id": 3,
      "title": "default",
      "author": "typicode1",
      "num": 100000
    },
    {
      "id": 4,
      "title": "processing",
      "author": "typicode1"
    },
    {
      "id": 5,
      "title": "error",
      "author": "typicode1",
      "num": 100000
    }
  ];

  properties: PropertyType[] = [
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

  request: Request = {
    url: "http://localhost:3000/getData/",
    type: "GET",
    onSuccess: (data: any) => {
      console.log(data);
    },
  }

  getRequest: Request = {
    url: "http://localhost:3000/getData/",
    type: "GET",
    onSuccess: (data) => {
      console.log(data);
    }
  }

  editRequest: Request = {
    url: "http://localhost:3000/getData/",
    type: "POST",
    onSuccess: (data) => {
      console.log(data);
    },
  };

  deleteRequest: Request = {
    url: "http://localhost:3000/getData/",
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

  exportRequest: Request = {
    url: "http://localhost:3000/posts/",
    type: "POST",
    onSuccess: (data) => {
      console.log(data);
    }
  }

  configTableRequest: Request = {
    url: "http://localhost:3000/getData/",
    type: "GET"
  }

  listStatus: StatusConfig[] = [
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

  uploadConfig: ModalUploadConfig = {
    acceptTypes: ".png, .jpg, .jpeg",
    maxFileSizeInKB: 1024000
  };

  modalDeleteConfig: ModalDeleteConfig = {
    title: "Confirm delete",
    content: ""
  }

  isDrawerOpened: boolean = false;
  drawerConfig: DrawerConfig = {
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
}
