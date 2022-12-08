import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-result-fof',
  template: `
    <vts-result
      vtsStatus="404"
      vtsTitle="404"
      vtsSubTitle="Sorry, the page you visited does not exist."
    >
      <div vts-result-extra>
        <button vts-button vtsType="primary">Back Home</button>
      </div>
    </vts-result>
  `
})
export class VtsDemoResultFofComponent {}
