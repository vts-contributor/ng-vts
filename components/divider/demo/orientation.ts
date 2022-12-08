import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-divider-orientation',
  template: `
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
        ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <vts-divider vtsText="Text"></vts-divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
        ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <vts-divider vtsText="Left Text" vtsOrientation="left"></vts-divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
        ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <vts-divider vtsText="Right Text" vtsOrientation="right"></vts-divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
        ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
    </div>
  `
})
export class VtsDemoDividerOrientationComponent {}
