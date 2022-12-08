import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vts-demo-mention-custom-tag',
  encapsulation: ViewEncapsulation.None,
  template: `
    <vts-mention
      [vtsSuggestions]="webFrameworks"
      [vtsValueWith]="valueWith"
      (vtsOnSelect)="onSelect($event)"
    >
      <input placeholder="@someone" vts-input vtsMentionTrigger [(ngModel)]="inputValue" />
      <ng-container *vtsMentionSuggestion="let framework">
        <span>{{ framework.name }} - {{ framework.type }}</span>
      </ng-container>
    </vts-mention>
  `
})
export class VtsDemoMentionCustomTagComponent {
  inputValue?: string;
  webFrameworks = [
    { name: 'React', type: 'JavaScript' },
    { name: 'Angular', type: 'JavaScript' },
    { name: 'Laravel', type: 'PHP' },
    { name: 'Flask', type: 'Python' },
    { name: 'Django', type: 'Python' }
  ];

  valueWith = (data: { name: string; type: string }) => data.name;

  onSelect(value: string): void {
    console.log(value);
  }
}
