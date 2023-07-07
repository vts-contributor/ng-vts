import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-divider-horizontal',
  template: `
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
        ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <vts-divider></vts-divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
        ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <vts-divider vtsText="With Text"></vts-divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
        ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <vts-divider vtsDashed [vtsText]="text">
        <ng-template #text>
          <i vts-icon vtsType="PlusOutline:antd"></i>
          Add
        </ng-template>
      </vts-divider>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
        ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
    </div>
  `
})
export class VtsDemoDividerHorizontalComponent {}
