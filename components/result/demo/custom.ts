import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-result-custom',
  template: `
    <vts-result [vtsIcon]="'smile-twotone'" [vtsTitle]="'Great, we have done all the operators!'">
      <div vts-result-extra>
        <button vts-button vtsType="primary">Next</button>
      </div>
    </vts-result>
  `
})
export class VtsDemoResultCustomComponent {}
