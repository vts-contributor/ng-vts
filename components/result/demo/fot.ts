import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-result-fot',
  template: `
    <vts-result
      vtsStatus="403"
      vtsTitle="403"
      vtsSubTitle="Sorry, you are not authorized to access this page."
    >
      <div vts-result-extra>
        <button vts-button vtsType="primary">Back Home</button>
      </div>
    </vts-result>
  `
})
export class VtsDemoResultFotComponent {}
