import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-button-button-group',
  template: `
    <h4>Basic</h4>
    <vts-button-group>
      <button vts-button>Cancel</button>
      <button vts-button vtsType="primary">OK</button>
    </vts-button-group>
    <vts-button-group>
      <button vts-button vtsType="default" disabled>L</button>
      <button vts-button vtsType="default" disabled>M</button>
      <button vts-button vtsType="default" disabled>R</button>
    </vts-button-group>
    <vts-button-group>
      <button vts-button vtsType="primary" disabled>L</button>
      <button vts-button vtsType="default" disabled>M</button>
      <button vts-button vtsType="default">M</button>
      <button vts-button vtsType="default" disabled>R</button>
    </vts-button-group>
    <h4>With Icon</h4>
    <vts-button-group>
      <button vts-button vtsType="primary">
        <i vts-icon vtsType="ChevronLeft"></i>
        Go back
      </button>
      <button vts-button vtsType="primary">
        Go forward
        <i vts-icon vtsType="ChevronRight"></i>
      </button>
    </vts-button-group>
    <vts-button-group>
      <button vts-button vtsType="primary">
        <i vts-icon vtsType="CodeOutline"></i>
      </button>
      <button vts-button vtsType="primary">
        <i vts-icon vtsType="Download"></i>
      </button>
    </vts-button-group>
  `,
  styles: [
    `
      h4 {
        margin: 16px 0;
        font-size: 16px;
        line-height: 1;
        font-weight: normal;
      }

      h4:first-child {
        margin-top: 0;
      }

      [vts-button] {
        margin-bottom: 12px;
      }

      vts-button-group {
        margin-bottom: 8px;
        margin-right: 8px;
      }
    `
  ]
})
export class VtsDemoButtonButtonGroupComponent {}
