import { VtsSafeAny } from './../../../../core/types/any';
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { VtsDrawerPlacement } from "@ui-vts/ng-vts/drawer/drawer-options";
import { VtsUploadChangeParam } from "@ui-vts/ng-vts/upload";

@Component({
  selector: 'vts-config-fields',
  templateUrl: './config-fields.component.html',
  styleUrls: ['./config-fields.component.less']
})
export class VtsConfigFieldsComponent {
  @Input() vtsNoSelectedItems: number = 3;
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
    this.vtsNoSelectedItems = 0;

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
      this.rowHeightChanger.emit(value+'px');
    }
  }

}
