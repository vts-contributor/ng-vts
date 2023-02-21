import { Component, Input } from "@angular/core";
import { VtsDrawerPlacement } from "@ui-vts/ng-vts/drawer/drawer-options";
import { VtsUploadChangeParam } from "@ui-vts/ng-vts/upload";
@Component({
  selector: 'vts-protable-configuration',
  template: `
    <div class='vts-protable-configuration'>
      <div class="btn-area">
        <div vts-col class="btn-control-area">
          <button vts-button vtsType="primary" [vtsSize]="'xs'" (click)="openDrawer()"><i class="collapse-icon" vts-icon [vtsType]="'AddCircle'"></i>New</button>
          <button vts-button vtsType="primary" [vtsSize]="'xs'" (click)="mockFn()"><i class="collapse-icon" vts-icon [vtsType]="'AddCircle'"></i>Export</button>
          <button vts-button vtsType="primary" [vtsSize]="'xs'" (click)="showUploadModal()"><i class="collapse-icon" vts-icon [vtsType]="'AddCircle'"></i>Import</button>
          <ng-container>
            <button vts-button vtsType="default" [vtsSize]="'xs'" [disabled]="vtsNoSelectedItems===0" (click)="showDeleteModal()">Delete all selected items</button>
          </ng-container>
        </div>
        <div vts-col class="btn-config-area">
          <button vts-button vtsType="default" (click)="mockFn()"><i vts-icon vtsType="SwapVert"></i></button>
          <button vts-button vtsType="default" (click)="mockFn()"><i vts-icon vtsType="Sync"></i></button>
          <button vts-button vtsType="default" (click)="mockFn()"><i vts-icon vtsType="Settings"></i></button>
        </div>
      </div>
      <ng-container *ngIf="vtsNoSelectedItems > 0">
        <ng-template [ngTemplateOutlet]="selectedInfo"></ng-template>
      </ng-container>
      <ng-template #selectedInfo>
        <div class="select-label">
          <span style="padding-left: 16px;">
            <span style="color: #CB002B">{{ vtsNoSelectedItems }}</span> items is selected <span style="color: #CB002B">| <a (click)="showDeleteModal()">Clear selected</a></span>
          </span>
        </div>
      </ng-template>
    </div>

    <vts-modal
      [(vtsVisible)]="isVisibleModal"
      [vtsTitle]="modalData.title"
      [vtsContent]="modalData.content"
      (vtsOnCancel)="handleCancelModal()"
      (vtsOnOk)="handleOkModal()"
      [vtsOkLoading]="isOkLoadingModal"
    >
      <p *vtsModalContent>Modal Content</p>
    </vts-modal>

    <vts-modal
      [(vtsVisible)]="isVisibleUpload"
      [vtsWidth]="720"
      [vtsOkText]="uploadData.okText"
      (vtsOnCancel)="handleCancelUpload()"
      (vtsOnOk)="handleOkUpload()"
    >
      <ng-container *vtsModalContent>
        <vts-upload
          vtsType="drag"
          vtsAccept=".png, .jpg, .jpeg, .svg"
          [vtsMultiple]="true"
          [vtsOpenFileDialogOnClick]="false"
          [vtsAction]="uploadData.url"
          (vtsChange)="handleChangeUpload($event)"
          #container
        >
          <p class="vts-upload-drag-icon">
            <i vts-icon vtsType="UploadCloud"></i>
          </p>
          <p class="text-hint">
            Kéo thả ảnh/video hoặc
            <a vts-button vtsType="link" (click)="container.openDialog()">Chọn file</a>
            để tải lên
          </p>
          <p class="text-hint">
            Chỉ cho phép file dạng .png, .jpg, .jpeg, .svg và dung lượng không quá 100Mb
          </p>
        </vts-upload>
      </ng-container>
    </vts-modal>
    
    <vts-drawer
      [vtsBodyStyle]="{ overflow: 'auto' }"
      [vtsMaskClosable]="false"
      [vtsWidth]="720"
      [vtsVisible]="visibleDrawer"
      [vtsTitle]="drawerData.title"
      [vtsFooter]="footerTpl"
      (vtsOnClose)="closeDrawer()"
    >
      <form vts-form *vtsDrawerContent>
        <div vts-row [vtsGutter]="8">
          <div vts-col vtsSpan="12">
            <vts-form-item>
              <vts-form-label>Name</vts-form-label>
              <vts-form-control>
                <input vts-input placeholder="please enter user name" />
              </vts-form-control>
            </vts-form-item>
          </div>
          <div vts-col vtsSpan="12">
            <vts-form-item>
              <vts-form-label>Url</vts-form-label>
              <vts-form-control>
                <vts-input-group vtsAddOnBefore="http://" vtsAddOnAfter=".com">
                  <input type="text" vts-input placeholder="please enter url" />
                </vts-input-group>
              </vts-form-control>
            </vts-form-item>
          </div>
        </div>
        <div vts-row [vtsGutter]="8">
          <div vts-col vtsSpan="12">
            <vts-form-item>
              <vts-form-label>Owner</vts-form-label>
              <vts-form-control>
                <vts-select vtsPlaceHolder="Please select an owner"></vts-select>
              </vts-form-control>
            </vts-form-item>
          </div>
          <div vts-col vtsSpan="12">
            <vts-form-item>
              <vts-form-label>Type</vts-form-label>
              <vts-form-control>
                <vts-select vtsPlaceHolder="Please choose the type"></vts-select>
              </vts-form-control>
            </vts-form-item>
          </div>
        </div>
      </form>

      <ng-template #footerTpl>
        <div style="float: right">
          <button vts-button style="margin-right: 8px;" (click)="mockFn()">Save</button>
          <button vts-button vtsType="primary" (click)="closeDrawer()">Close</button>
        </div>
      </ng-template>
    </vts-drawer>
    `,
  styles: [`
    .vts-protable-configuration {
      padding: 16px;
      background: #FFFFFF;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      margin-bottom: 16px;
    }

    .select-label {
      background: #FCE5EA;
      border: 0.5px solid #CB002B;
      border-radius: 10px;
      margin-left: 8px;
    }

    .btn-area {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    button {
      margin-left: 8px;
    }

    .btn-control-area {
      display: flex !important;
      text-align: left;
    }

    .config-area > button {
      border: none;
    }
  `]
})
export class VtsProTableConfiguration {

  @Input() vtsNoSelectedItems:number = 3;
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
}