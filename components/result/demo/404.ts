import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-result-404',
  template: `
    <div>
      <vts-result vtsTemplate="404" vtsOkText="Go to homepage" vtsCancelText="Retry">
        <div vts-result-title>Error while connecting to server</div>
        <div vts-result-subtitle>Please retry again</div>
        <div vts-result-content>
          <b><p>Potential causes:</p></b>
          <vts-space vtsPreset="2" vtsDirection="vertical">
            <div *vtsSpaceItem>😢 Network connection is interrupted</div>
            <div *vtsSpaceItem>😢 Lorem ipsum dolor sit amet consectetuer adipiscing elit</div>
          </vts-space>
        </div>
      </vts-result>
    </div>
  `
})
export class VtsDemoResult404Component {}
