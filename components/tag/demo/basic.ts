import { Component } from '@angular/core';
import { VtsTagCustomColor } from '@ui-vts/ng-vts/tag';

@Component({
  selector: 'vts-demo-tag-basic',
  template: `
    <p>Type:</p>
    <vts-tag>Default</vts-tag>
    <vts-tag>
      <a href="https://github.com">Link</a>
    </vts-tag>
    <vts-tag vtsMode="closeable" (vtsOnClose)="onClose()">Closable</vts-tag>
    <vts-tag vtsMode="checkable" [vtsChecked]="true" (vtsCheckedChange)="checkChange($event)">
      Checkable
    </vts-tag>
    <br />
    <br />
    <p>Preset:</p>
    <vts-tag vtsPreset="success">Success</vts-tag>
    <vts-tag vtsPreset="warning">Warning</vts-tag>
    <vts-tag vtsPreset="error">Error</vts-tag>
    <vts-tag vtsPreset="info">Info</vts-tag>
    <br />
    <br />
    <p>With icon:</p>
    <vts-tag vtsPreset="success">
      <i vts-icon vtsType="CheckCircleOutline:mat"></i>
      Success
    </vts-tag>
    <vts-tag vtsPreset="warning">
      <i vts-icon vtsType="WarningAmberOutline:mat"></i>
      Warning
    </vts-tag>
    <vts-tag vtsPreset="error">
      <i vts-icon vtsType="ErrorOutlineOutline:mat"></i>
      Error
    </vts-tag>
    <vts-tag vtsPreset="info">
      <i vts-icon vtsType="InfoOutline:mat"></i>
      Info
    </vts-tag>
    <br />
    <br />
    <p>With icon:</p>
    <vts-tag [vtsColor]="customColor" vtsMode="checkable">
      <i vts-icon vtsType="InfoOutline:mat"></i>
      Custom checkable
    </vts-tag>
    <vts-tag [vtsColor]="customColor2" vtsPreset="info" vtsMode="checkable">
      <i vts-icon vtsType="InfoOutline:mat"></i>
      Preset & custom checked color
    </vts-tag>
  `
})
export class VtsDemoTagBasicComponent {
  customColor: VtsTagCustomColor = {
    color: '#722ED1',
    background: '#cdbae791',
    checkedBackground: '#722ED1'
  };

  customColor2: VtsTagCustomColor = {
    checkedBackground: '#722ED1'
  };

  onClose(): void {
    console.log('closed');
  }

  checkChange(e: boolean): void {
    console.log(e);
  }
}
