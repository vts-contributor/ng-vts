import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-pipes-ellipsis',
  template: `
    <input type="text" vts-input [(ngModel)]="str" />
    <br />
    <p>{{ str | vtsEllipsis : 36 : '...' }}</p>
  `,
  styles: [
    `
      p {
        padding: 8px 12px;
      }
    `
  ]
})
export class VtsDemoPipesEllipsisComponent {
  str = 'Ant Design, a design language for background applications';
}
