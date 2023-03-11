import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-avatar-badge',
  template: `
    <vts-badge [vtsCount]="5" style="margin-right: 24px;">
      <vts-avatar vtsText="VT" [vtsShape]="'square'"></vts-avatar>
    </vts-badge>
    <vts-badge vtsDot>
      <vts-avatar vtsText="VT" [vtsShape]="'square'"></vts-avatar>
    </vts-badge>
  `
})
export class VtsDemoAvatarBadgeComponent {}
