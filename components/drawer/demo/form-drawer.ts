import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-drawer-form-drawer',
  template: `
    <button vts-button vtsType="primary" (click)="open()">Create</button>
    <vts-drawer
      [vtsBodyStyle]="{ overflow: 'auto' }"
      [vtsMaskClosable]="false"
      [vtsWidth]="720"
      [vtsVisible]="visible"
      vtsTitle="Create"
      [vtsFooter]="footerTpl"
      (vtsOnClose)="close()"
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
        <div vts-row [vtsGutter]="8">
          <div vts-col vtsSpan="12">
            <vts-form-item>
              <vts-form-label>Approver</vts-form-label>
              <vts-form-control>
                <vts-select vtsPlaceHolder="Please choose the approver"></vts-select>
              </vts-form-control>
            </vts-form-item>
          </div>
          <div vts-col vtsSpan="12">
            <vts-form-item>
              <vts-form-label>DateTime</vts-form-label>
              <vts-form-control>
                <vts-range-picker></vts-range-picker>
              </vts-form-control>
            </vts-form-item>
          </div>
        </div>
        <div vts-row [vtsGutter]="8">
          <div vts-col vtsSpan="24">
            <vts-form-item>
              <vts-form-label>Description</vts-form-label>
              <vts-form-control>
                <textarea
                  vts-input
                  placeholder="please enter url description"
                  [vtsAutosize]="{ minRows: 4, maxRows: 4 }"
                ></textarea>
              </vts-form-control>
            </vts-form-item>
          </div>
        </div>
      </form>

      <ng-template #footerTpl>
        <div style="float: right">
          <button vts-button style="margin-right: 8px;" (click)="close()">Cancel</button>
          <button vts-button vtsType="primary" (click)="close()">Submit</button>
        </div>
      </ng-template>
    </vts-drawer>
  `
})
export class VtsDemoDrawerFormDrawerComponent {
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
