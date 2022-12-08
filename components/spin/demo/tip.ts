import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-spin-tip',
  template: `
    <vts-spin vtsTip="Loading...">
      <vts-alert
        vtsType="info"
        vtsMessage="Alert message title"
        vtsDescription="Further details about the context of this alert."
      ></vts-alert>
    </vts-spin>
  `
})
export class VtsDemoSpinTipComponent {}
