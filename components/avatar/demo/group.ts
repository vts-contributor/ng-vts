import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-avatar-group',
  template: `
    <vts-avatar-group>
      <vts-avatar
        vtsIcon="user"
        vtsSrc="//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      ></vts-avatar>
      <vts-avatar style="background-color: #f56a00" vtsText="U"></vts-avatar>
      <vts-avatar
        style="background-color: #87d068"
        vts-tooltip
        vtsTooltipTitle="NG-ZORRO User"
        vtsIcon="user"
      ></vts-avatar>
      <vts-avatar style="background-color: #1890ff" vtsText="NG"></vts-avatar>
    </vts-avatar-group>
    <vts-divider></vts-divider>
    <vts-avatar-group>
      <vts-avatar
        vtsIcon="user"
        vtsSrc="//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      ></vts-avatar>
      <vts-avatar style="background-color: #f56a00" vtsText="U"></vts-avatar>
      <vts-avatar style="background-color: #fde3cf; color: #f56a00" vtsText="+2"></vts-avatar>
    </vts-avatar-group>
  `,
  styles: [``]
})
export class VtsDemoAvatarGroupComponent {}
