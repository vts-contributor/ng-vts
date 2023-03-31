import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-skeleton-paragraph',
  template: `
    <vts-space vtsPreset="3" vtsWrap vtsAlign="center">
      <span *vtsSpaceItem>
        Rounded: &nbsp;
        <vts-switch [(ngModel)]="rounded"></vts-switch>
      </span>
      <span *vtsSpaceItem>
        Active: &nbsp;
        <vts-switch [(ngModel)]="active"></vts-switch>
      </span>
      <span *vtsSpaceItem>
        Number of rows: &nbsp;
        <vts-input-number
          style="width: 90px"
          [vtsMin]="1"
          [vtsStep]="1"
          [(ngModel)]="rows"
        ></vts-input-number>
      </span>
    </vts-space>
    <br />
    <br />
    <p>Without avatar:</p>
    <vts-skeleton
      [vtsRounded]="rounded"
      [vtsActive]="active"
      [vtsTitle]="{ width: '40%' }"
      [vtsParagraph]="{ rows, width: ['50%', '30%'] }"
    ></vts-skeleton>
    <br />
    <br />
    <p>With avatar:</p>
    <vts-skeleton
      [vtsRounded]="rounded"
      [vtsActive]="active"
      [vtsTitle]="{ width: '40%' }"
      [vtsParagraph]="{ rows, width: ['30%', '30%'] }"
      [vtsAvatar]="true"
    ></vts-skeleton>
  `
})
export class VtsDemoSkeletonParagraphComponent {
  active: boolean = false;
  rounded: boolean = false;
  rows: number = 5;
}
