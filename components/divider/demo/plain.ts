import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-divider-plain',
  template: `
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
        ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <vts-divider vtsPlain vtsText="Text"></vts-divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
        ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <vts-divider vtsPlain vtsText="Left Text" vtsOrientation="left"></vts-divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
        ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
      <vts-divider vtsPlain vtsText="Right Text" vtsOrientation="right"></vts-divider>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
        ista probare, quae sunt a te dicta? Refert tamen, quo modo.
      </p>
    </div>
  `
})
export class VtsDemoDividerPlainComponent {}
