import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-button-icon',
  template: `
    <button vts-button vtsType="primary" vtsShape="circle">
      <i vts-icon vtsType="Search"></i>
    </button>
    <button vts-button vtsType="primary" vtsShape="circle">A</button>
    <button vts-button vtsType="primary">
      <i vts-icon vtsType="Search"></i>
      Search
    </button>
    <button vts-button vtsType="default" vtsShape="circle">
      <i vts-icon vtsType="Search"></i>
    </button>
    <button vts-button vtsType="default">
      <i vts-icon vtsType="Search"></i>
      Search
    </button>
    <br />
    <button vts-button vtsType="default" vtsShape="circle">
      <i vts-icon vtsType="Search"></i>
    </button>
    <button vts-button vtsType="default">
      <i vts-icon vtsType="Search"></i>
      Search
    </button>
    <button vts-button vtsType="default" vtsShape="circle">
      <i vts-icon vtsType="Search"></i>
    </button>
    <button vts-button vtsType="default">
      <i vts-icon vtsType="Search"></i>
      Search
    </button>
  `,
  styles: [
    `
      [vts-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }
    `
  ]
})
export class VtsDemoButtonIconComponent {}
