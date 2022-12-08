import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-radio-desktop',
  template: `
    <form [vtsLayout]="'vertical'" vts-form>
      <vts-form-item>
        <vts-form-label>Label</vts-form-label>
        <vts-form-control>
          <vts-radio-group name="radio1" [(ngModel)]="radioValue">
            <vts-space vtsPreset="2" vtsDirection="vertical">
              <label *vtsSpaceItem vts-radio vtsValue="A">Radio button item</label>
            </vts-space>
          </vts-radio-group>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label>Label</vts-form-label>
        <vts-form-control>
          <vts-radio-group name="radio2" [(ngModel)]="radioValue2">
            <vts-space vtsPreset="2" vtsDirection="vertical">
              <label *vtsSpaceItem vts-radio vtsValue="A">Radio button item</label>
              <label *vtsSpaceItem vts-radio vtsValue="B">Radio button item</label>
            </vts-space>
          </vts-radio-group>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label>Label</vts-form-label>
        <vts-form-control>
          <vts-radio-group name="radio3" [(ngModel)]="radioValue3">
            <vts-space vtsPreset="2" vtsDirection="vertical">
              <label *vtsSpaceItem vts-radio vtsValue="A">Radio button item</label>
              <label *vtsSpaceItem vts-radio vtsValue="B">Radio button item</label>
              <label *vtsSpaceItem vts-radio vtsValue="C">Radio button item</label>
            </vts-space>
          </vts-radio-group>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label>Label</vts-form-label>
        <vts-form-control>
          <vts-radio-group name="radio4" [(ngModel)]="radioValue4">
            <vts-space vtsPreset="2" vtsDirection="vertical">
              <label *vtsSpaceItem vts-radio vtsValue="A">Radio button item</label>
              <label *vtsSpaceItem vts-radio vtsValue="B">Radio button item</label>
              <label *vtsSpaceItem vts-radio vtsValue="C">Radio button item</label>
              <label *vtsSpaceItem vts-radio vtsValue="D">Radio button item</label>
            </vts-space>
          </vts-radio-group>
        </vts-form-control>
      </vts-form-item>
    </form>
  `
})
export class VtsDemoRadioDesktopComponent {
  radioValue: string = 'A';
  radioValue2: string = 'A';
  radioValue3: string = 'A';
  radioValue4: string = 'A';
}
