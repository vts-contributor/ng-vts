import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-result-error',
  template: `
    <vts-result
      vtsTitle="Submission Failed"
      vtsStatus="error"
      vtsSubTitle="Please check and modify the following information before resubmitting."
    >
      <div vts-result-content>
        <div class="desc">
          <h4 vts-title>The content you submitted has the following error:</h4>
          <p vts-paragraph>
            <i vts-icon vtsType="Close"></i>
            Your account has been frozen
            <a>Thaw immediately &gt;</a>
          </p>
          <p vts-paragraph>
            <i vts-icon vtsType="Close"></i>
            Your account is not yet eligible to apply
            <a>Apply immediately &gt;</a>
          </p>
        </div>
      </div>
      <div vts-result-extra>
        <button vts-button vtsType="primary">Go Console</button>
        <button vts-button>Buy Again</button>
      </div>
    </vts-result>
  `
})
export class VtsDemoResultErrorComponent {}
