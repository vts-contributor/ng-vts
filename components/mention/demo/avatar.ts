import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vts-demo-mention-avatar',
  encapsulation: ViewEncapsulation.None,
  template: `
    <vts-mention
      [vtsSuggestions]="webFrameworks"
      [vtsValueWith]="valueWith"
      (vtsOnSelect)="onSelect($event)"
    >
      <input vts-input vtsMentionTrigger [(ngModel)]="inputValue" />
      <ng-container *vtsMentionSuggestion="let framework">
        <vts-avatar vtsSize="sm" [vtsText]="framework.name" [vtsSrc]="framework.icon"></vts-avatar>
        <span>{{ framework.name }} - {{ framework.type }}</span>
      </ng-container>
    </vts-mention>
  `,
  styles: [
    `
      .vts-avatar.vts-avatar-sm {
        width: 14px;
        height: 14px;
        margin-right: 8px;
        position: relative;
      }
    `
  ]
})
export class VtsDemoMentionAvatarComponent {
  inputValue?: string;
  webFrameworks = [
    {
      name: 'React',
      type: 'JavaScript',
      icon: 'https://zos.alipayobjects.com/rmsportal/LFIeMPzdLcLnEUe.svg'
    },
    {
      name: 'Angular',
      type: 'JavaScript',
      icon: 'https://zos.alipayobjects.com/rmsportal/PJTbxSvzYWjDZnJ.png'
    },
    {
      name: 'Dva',
      type: 'Javascript',
      icon: 'https://zos.alipayobjects.com/rmsportal/EYPwSeEJKxDtVxI.png'
    },
    {
      name: 'Flask',
      type: 'Python',
      icon: 'https://zos.alipayobjects.com/rmsportal/xaypBUijfnpAlXE.png'
    }
  ];

  valueWith = (data: { name: string; type: string; icon: string }) => data.name;

  onSelect(value: string): void {
    console.log(value);
  }
}
