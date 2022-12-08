import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-checkbox-desktop',
  template: `
    <form [vtsLayout]="'vertical'" vts-form>
      <vts-form-item>
        <vts-form-label>Label</vts-form-label>
        <vts-form-control>
          <vts-checkbox-wrapper (vtsOnChange)="print($event)">
            <vts-space vtsPreset="2" vtsDirection="vertical">
              <label name="checkbox1" *vtsSpaceItem vts-checkbox vtsValue="A1" [ngModel]="true">
                Checkbox
              </label>
            </vts-space>
          </vts-checkbox-wrapper>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label>Label</vts-form-label>
        <vts-form-control>
          <vts-checkbox-wrapper (vtsOnChange)="print($event)">
            <vts-space vtsPreset="2" vtsDirection="vertical">
              <label name="checkbox2" *vtsSpaceItem vts-checkbox vtsValue="A2" [ngModel]="true">
                Checkbox
              </label>
              <label name="checkbox3" *vtsSpaceItem vts-checkbox vtsValue="B2">Checkbox</label>
            </vts-space>
          </vts-checkbox-wrapper>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label>Label</vts-form-label>
        <vts-form-control>
          <vts-checkbox-wrapper (vtsOnChange)="print($event)">
            <vts-space vtsPreset="2" vtsDirection="vertical">
              <label name="checkbox4" *vtsSpaceItem vts-checkbox vtsValue="A3" [ngModel]="true">
                Checkbox
              </label>
              <label name="checkbox5" *vtsSpaceItem vts-checkbox vtsValue="B3">Checkbox</label>
              <label name="checkbox6" *vtsSpaceItem vts-checkbox vtsValue="C3">Checkbox</label>
            </vts-space>
          </vts-checkbox-wrapper>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label>Label</vts-form-label>
        <vts-form-control>
          <vts-checkbox-wrapper (vtsOnChange)="print($event)">
            <vts-space vtsPreset="2" vtsDirection="vertical">
              <label name="checkbox7" *vtsSpaceItem vts-checkbox vtsValue="A4" [ngModel]="true">
                Checkbox
              </label>
              <label name="checkbox8" *vtsSpaceItem vts-checkbox vtsValue="B4">Checkbox</label>
              <label name="checkbox9" *vtsSpaceItem vts-checkbox vtsValue="C4">Checkbox</label>
              <label name="checkbox10" *vtsSpaceItem vts-checkbox vtsValue="D4">Checkbox</label>
            </vts-space>
          </vts-checkbox-wrapper>
        </vts-form-control>
      </vts-form-item>
    </form>
  `
})
export class VtsDemoCheckboxDesktopComponent {
  print(e: string[]) {
    console.log(e);
  }
}
