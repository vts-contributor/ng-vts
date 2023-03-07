import { DrawerConfig, PropertyType } from '@ui-vts/ng-vts/pro-table';
import { Component } from '@angular/core';

interface Request {
  url: string,
  type: "POST" | "GET",
  params?: {[key: string]: any},
  body?: {[key: string]: any},
  onSuccess?: (data: {[key: string]: any}) => void,
  onError?: () => void
}

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
    ></vts-protable-container>
  `
})
export class VtsDemoProTableBasicComponent {

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
      // headerTitle: 'ID',
      propertyName: 'id',
      required: true,
      datatype: 'string',
      checked: true,
    },

    {
      headerTitle: 'Prop 1',
      propertyName: 'title',
      required: true,
      datatype: 'status',
      checked: true
    },
    {
      headerTitle: 'Prop 2',
      propertyName: 'author',
      required: true,
      datatype: 'string'
    },
    {
      headerTitle: 'Prop 4',
      propertyName: 'num',
      required: true,
      datatype: 'number',
      checked: true
    }
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

  isDrawerOpened: boolean = false;
  drawerConfig: DrawerConfig = {
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
}
