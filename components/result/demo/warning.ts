import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-result-warning',
  template: `
    <vts-result vtsStatus="warning" vtsTitle="There are some problems with your operation">
      <div vts-result-extra>
        <button vts-button vtsType="primary">Go Console</button>
      </div>
    </vts-result>
  `
})
export class VtsDemoResultWarningComponent {}
