import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-avatar-type',
  template: `
    <vts-avatar vtsIcon="user"></vts-avatar>
    <vts-avatar vtsText="U"></vts-avatar>
    <vts-avatar vtsText="USER"></vts-avatar>
    <vts-avatar
      vtsIcon="user"
      vtsSrc="//zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
    ></vts-avatar>
    <vts-avatar vtsText="U" style="color:#f56a00; background-color:#fde3cf;"></vts-avatar>
    <vts-avatar vtsIcon="user" style="background-color:#87d068;"></vts-avatar>
  `,
  styles: [
    `
      vts-avatar {
        margin-top: 16px;
        margin-right: 16px;
      }
    `
  ]
})
export class VtsDemoAvatarTypeComponent {}
