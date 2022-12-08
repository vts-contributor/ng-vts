import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-result-foo',
  template: `
    <vts-result vtsStatus="500" vtsTitle="500" vtsSubTitle="Sorry, there is an error on server.">
      <div vts-result-extra>
        <button vts-button vtsType="primary">Back Home</button>
      </div>
    </vts-result>
  `
})
export class VtsDemoResultFooComponent {}
