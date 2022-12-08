import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tag-status',
  template: `
    <div>
      <h4>Without icon</h4>
      <vts-tag vtsColor="success">success</vts-tag>
      <vts-tag vtsColor="processing">processing</vts-tag>
      <vts-tag vtsColor="error">error</vts-tag>
      <vts-tag vtsColor="warning">warning</vts-tag>
      <vts-tag vtsColor="default">default</vts-tag>
    </div>
    <div>
      <h4>With icon</h4>
      <vts-tag vtsColor="success">
        <i vts-icon vtsType="CheckCircle"></i>
        <span>success</span>
      </vts-tag>
      <vts-tag vtsColor="processing">
        <i vts-icon vtsType="sync" vtsSpin></i>
        <span>processing</span>
      </vts-tag>
      <vts-tag vtsColor="error">
        <i vts-icon vtsType="Close"></i>
        <span>error</span>
      </vts-tag>
      <vts-tag vtsColor="warning">
        <i vts-icon vtsType="exclamation-circle"></i>
        <span>warning</span>
      </vts-tag>
      <vts-tag vtsColor="default">
        <i vts-icon vtsType="clock-circle"></i>
        <span>default</span>
      </vts-tag>
    </div>
  `
})
export class VtsDemoTagStatusComponent {}
