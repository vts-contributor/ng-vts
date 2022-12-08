import { Component } from '@angular/core';

const userList = ['Lucy', 'U', 'Tom', 'Edward'];
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

@Component({
  selector: 'vts-demo-avatar-dynamic',
  template: `
    <div>
      <label>
        Gap:
        <vts-input-number
          [vtsMin]="0"
          [vtsMax]="16"
          [vtsStep]="1"
          [(ngModel)]="gap"
        ></vts-input-number>
      </label>
      <button vts-button (click)="change()">
        <span>Change Text</span>
      </button>
    </div>

    <vts-avatar
      [vtsGap]="gap"
      [ngStyle]="{ 'background-color': color }"
      [vtsText]="text"
      vtsSize="lg"
      style="vertical-align: middle;"
    ></vts-avatar>
  `,
  styles: [
    `
      div {
        margin-bottom: 16px;
      }
      button {
        margin-left: 8px;
      }
    `
  ]
})
export class VtsDemoAvatarDynamicComponent {
  text: string = userList[3];
  color: string = colorList[3];
  gap = 4;
  change(): void {
    let idx = userList.indexOf(this.text);
    ++idx;
    if (idx === userList.length) {
      idx = 0;
    }
    this.text = userList[idx];
    this.color = colorList[idx];
  }
}
