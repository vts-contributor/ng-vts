import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-avatar-content',
  template: `
    <div>
      <vts-avatar [vtsShape]="'square'" vtsSize="sm" vtsText="SM"></vts-avatar>
      <vts-avatar [vtsShape]="'square'" vtsSize="md" vtsText="MD"></vts-avatar>
      <vts-avatar [vtsShape]="'square'" vtsSize="lg" vtsText="LG"></vts-avatar>
    </div>
    <vts-divider></vts-divider>
    <div>
      <vts-avatar [vtsShape]="'circle'" vtsSize="sm" vtsText="SM"></vts-avatar>
      <vts-avatar [vtsShape]="'circle'" vtsSize="md" vtsText="MD"></vts-avatar>
      <vts-avatar [vtsShape]="'circle'" vtsSize="lg" vtsText="LG"></vts-avatar>
    </div>
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
export class VtsDemoAvatarContentComponent {}
