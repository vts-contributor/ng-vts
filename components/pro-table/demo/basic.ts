import { DrawerConfig, PropertyType, Request, StatusConfig, UploadConfig } from '@ui-vts/ng-vts/pro-table';
import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pro-table-basic',
  template: `
    <vts-protable-container 
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
      [uploadConfig]="uploadConfig"
    ></vts-protable-container>
  `
})
export class VtsDemoProTableBasicComponent {

  properties: PropertyType[] = [
    {
      propertyName: 'id',
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
      datatype: 'string'
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
      datatype: 'date'
    },
  ];

  request: Request = {
    url: "http://localhost:3000/getData",
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

  uploadConfig: UploadConfig = {
    acceptTypes: ".png, .jpg, .jpeg",
    maxFileSizeInKB: 1024000
  };

  isDrawerOpened: boolean = false;
  drawerConfig: DrawerConfig = {
    openWith: "modal",
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
