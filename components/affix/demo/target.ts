import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-affix-target',
  template: `
    <div class="scrollable-container" #target>
      <div class="background">
        <vts-affix [vtsTarget]="target" id="affix-container-target">
          <button vts-button [vtsType]="'primary'">
            <span>Fixed at the top of container</span>
          </button>
        </vts-affix>
      </div>
    </div>
  `,
  styles: [
    `
      .scrollable-container {
        height: 100px;
        overflow-y: scroll;
      }

      .background {
        padding-top: 60px;
        height: 300px;
        background-image: url(//zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg);
      }
    `
  ]
})
export class VtsDemoAffixTargetComponent {}
