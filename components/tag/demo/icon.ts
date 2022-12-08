import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-tag-icon',
  template: `
    <vts-tag vtsColor="#55acee">
      <i vts-icon vtsType="twitter"></i>
      <span>Twitter</span>
    </vts-tag>
    <vts-tag vtsColor="#cd201f">
      <i vts-icon vtsType="youtube"></i>
      <span>Youtube</span>
    </vts-tag>
    <vts-tag vtsColor="#3b5999">
      <i vts-icon vtsType="facebook"></i>
      <span>Facebook</span>
    </vts-tag>
    <vts-tag vtsColor="#55acee">
      <i vts-icon vtsType="linkedin"></i>
      <span>LinkedIn</span>
    </vts-tag>
  `
})
export class VtsDemoTagIconComponent {}
