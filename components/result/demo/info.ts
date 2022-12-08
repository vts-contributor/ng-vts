import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-result-info',
  template: `
    <vts-result vtsStatus="info" vtsTitle="Your operation has been executed">
      <div vts-result-extra>
        <button vts-button vtsType="primary">Go Console</button>
      </div>
    </vts-result>
  `
})
export class VtsDemoResultInfoComponent {}
