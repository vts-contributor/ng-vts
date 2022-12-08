import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-avatar-basic',
  template: `
    <div>
      <vts-avatar [vtsSize]="64" vtsIcon="user"></vts-avatar>
      <vts-avatar vtsSize="lg" vtsIcon="user"></vts-avatar>
      <vts-avatar vtsIcon="user"></vts-avatar>
      <vts-avatar vtsSize="sm" vtsIcon="user"></vts-avatar>
    </div>
    <div>
      <vts-avatar [vtsShape]="'square'" [vtsSize]="64" [vtsIcon]="'user'"></vts-avatar>
      <vts-avatar [vtsShape]="'square'" [vtsSize]="'lg'" [vtsIcon]="'user'"></vts-avatar>
      <vts-avatar [vtsShape]="'square'" [vtsIcon]="'user'"></vts-avatar>
      <vts-avatar [vtsShape]="'square'" [vtsSize]="'sm'" [vtsIcon]="'user'"></vts-avatar>
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
export class VtsDemoAvatarBasicComponent {}
