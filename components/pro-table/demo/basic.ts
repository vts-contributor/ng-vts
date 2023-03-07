import { DrawerConfig, PropertyType } from '@ui-vts/ng-vts/pro-table';
import { Component } from '@angular/core';

interface Item {
  id: string;
  content1: string;
  content2: string;
  content3: string;
  content4: string;
  content5: string;
  num?: number;
  disabled?: boolean;
}

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
  listOfData: Item[] = [
    ...Array.from({ length: 20 }).map((_, i) => {
      return {
        id: `${i + 1}`,
        content1: `Table row ${i + 1}`,
        content2: `Table row ${i + 1}`,
        content3: `Table row ${i + 1} (center)`,
        content4: '0.' + '5'.padStart(Math.round(Math.random() * 7), '0'),
        content5: '0.' + '5'.padStart(Math.round(Math.random() * 7), '0'),
        num: i + 1,
        disabled: i % 3 == 1 ? true : false
      };
    })
  ];

  listData2 = [
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
    // {
    //   headerTitle: 'Prop 3',
    //   propertyName: 'content3',
    //   required: true,
    //   datatype: 'string',
    //   checked: true
    // },
    {
      headerTitle: 'Prop 4',
      propertyName: 'num',
      required: true,
      datatype: 'number',
      checked: true
    }
    // {
    //   headerTitle: 'Prop 4',
    //   propertyName: 'content4',
    //   required: true,
    //   datatype: 'string'
    // },
    // {
    //   headerTitle: 'Prop 5',
    //   propertyName: 'content5',
    //   required: true,
    //   datatype: 'string'
    // }
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
    },
    onClose: () => {
      this.isDrawerOpened = false;
    },
    onSave: (data) => {
      console.log(data);
      this.isDrawerOpened = false;
    }
  }

  filteredList = [...this.listOfData];

  pageSize = 10;
  pageIndex = 1;
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<string>();
  noCheckedItems = 0;
  searchTerms: any = {};

  onAllChecked(checked: any): void {
    this.filteredList.forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  onClearAllCheckedItem(event: boolean) {
    if (event) {
      console.log(event);
      this.onAllChecked(!event);
    }
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
    this.noCheckedItems = this.setOfCheckedId.size;
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.filteredList;
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate =
      listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
    this.noCheckedItems = this.setOfCheckedId.size;
  }

  filter(searchKey: string, column: string) {
    this.searchTerms[column] = searchKey;
    this.refreshFilter();
  }

  refreshFilter() {
    this.filteredList = this.listOfData.filter((item: any) => {
      return Object.keys(this.searchTerms).every(k =>
        item[k]
          .toUpperCase()
          .trim()
          .includes(this.searchTerms[k]?.toUpperCase()?.trim() || '')
      );
    });
  }

  sortDirections = ['ascend', 'descend', null];
  sortFn = (item1: any, item2: any) => (item1.content4 < item2.content4 ? 1 : -1);
}
