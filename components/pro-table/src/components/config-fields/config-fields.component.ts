import { VtsSafeAny } from './../../../../core/types/any';
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { VtsDrawerPlacement } from "@ui-vts/ng-vts/drawer/drawer-options";
import { VtsUploadChangeParam } from "@ui-vts/ng-vts/upload";

interface Item {
  id: string;
  content1: string;
  content2: string;
  content3: string;
  content4: string;
  content5: string;
}

@Component({
  selector: 'vts-config-fields',
  templateUrl: './config-fields.component.html',
  styleUrls: ['./config-fields.component.less']
})
export class VtsConfigFieldsComponent {
  @Input() checkedItemsAmount: number = 0;
  @Input() isVisibleModal = false;
  @Input() isOkLoadingModal = false;
  @Input() modalData = {
    title: "Delete Item",
    content: "Do you want delete all selected items?",
  };

  @Input() isVisibleUpload = false;
  @Input() uploadData = {
    url: 'http://mock.com/castlemock/mock/rest/project/lxGcaI/application/iWIW1z/',
    okText: "Upload"
  }

  @Input() visibleDrawer = false;
  @Input() placementDrawer: VtsDrawerPlacement = 'right';
  @Input() drawerData = {
    title: "Edit item detail"
  };

  vtsRowHeight: string | number = 54;
  @Output() readonly rowHeightChanger = new EventEmitter<string>();
  @Output() readonly clearAllCheckedItems = new EventEmitter<boolean>();

  pageSize = 10;
  pageIndex = 1;
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<string>();
  searchTerms: any = {};

  listOfData: Item[] = [
    ...Array.from({ length: 10 }).map((_, i) => {
      return {
        id: `${i + 1}`,
        content1: `Table row ${i + 1}`,
        content2: `Table row ${i + 1}`,
        content3: `Table row ${i + 1} (center)`,
        content4: '0.' + '5'.padStart(Math.round(Math.random() * 7), '0'),
        content5: '0.' + '5'.padStart(Math.round(Math.random() * 7), '0')
      };
    })
  ];

  filteredList = [...this.listOfData];

  mockFn() {
    alert('Mock function!');
    this.visibleDrawer = false;
  }

  showDeleteModal(): void {
    this.isVisibleModal = true;
  }
  showUploadModal(): void {
    this.isVisibleUpload = true;
  }

  handleOkModal(): void {
    this.isOkLoadingModal = true;
    this.checkedItemsAmount = 0;
    this.clearAllCheckedItems.emit(this.checkedItemsAmount === 0);
    // this.onAllChecked(false);
    this.isOkLoadingModal = false;
    this.isVisibleModal = false;
  }
  handleCancelModal(): void {
    this.isVisibleModal = false;
  }

  handleOkUpload(): void {
    this.isVisibleUpload = false;
  }
  handleCancelUpload(): void {
    this.isVisibleUpload = false;
  }

  openDrawer(): void {
    this.visibleDrawer = true;
  }

  closeDrawer(): void {
    this.visibleDrawer = false;
  }

  handleChangeUpload({ file }: VtsUploadChangeParam): void {
    console.log(file);
  }

  handleChangeRowHeight(value: VtsSafeAny) {
    if (value) {
      this.vtsRowHeight = value;
      this.rowHeightChanger.emit(value + 'px');
    }
  }

  // onAllChecked(checked: any): void {
  //   this.filteredList.forEach(({ id }) => this.updateCheckedSet(id, checked));
  //   this.refreshCheckedStatus();
  // }

  // onItemChecked(id: string, checked: boolean): void {
  //   this.updateCheckedSet(id, checked);
  //   this.refreshCheckedStatus();
  // }

  // updateCheckedSet(id: string, checked: boolean): void {
  //   if (checked) {
  //     this.setOfCheckedId.add(id);
  //   } else {
  //     this.setOfCheckedId.delete(id);
  //   }
  //   this.checkedItemsAmount = this.setOfCheckedId.size;
  // }

  // refreshCheckedStatus(): void {
  //   const listOfEnabledData = this.filteredList;
  //   this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
  //   this.indeterminate =
  //     listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  //   this.checkedItemsAmount = this.setOfCheckedId.size;
  // }

  // sortDirections = ['ascend', 'descend', null];
  // sortFn = (item1: any, item2: any) => (item1.content4 < item2.content4 ? 1 : -1);

}
