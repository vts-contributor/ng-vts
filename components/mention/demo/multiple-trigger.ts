import { Component, ViewEncapsulation } from '@angular/core';
import { MentionOnSearchTypes } from '@ui-vts/ng-vts/mention';

@Component({
  selector: 'vts-demo-mention-multiple-trigger',
  encapsulation: ViewEncapsulation.None,
  template: `
    <vts-mention
      [vtsSuggestions]="suggestions"
      (vtsOnSearchChange)="onSearchChange($event)"
      [vtsPrefix]="['#', '@']"
    >
      <input
        placeholder="input @ to mention people, # to mention tag"
        vtsMentionTrigger
        vts-input
        [(ngModel)]="inputValue"
      />
    </vts-mention>
  `
})
export class VtsDemoMentionMultipleTriggerComponent {
  inputValue?: string;
  suggestions: string[] = [];
  users = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];
  tags = ['1.0', '2.0', '3.0'];

  onSearchChange({ value, prefix }: MentionOnSearchTypes): void {
    console.log('vtsOnSearchChange', value, prefix);
    this.suggestions = prefix === '@' ? this.users : this.tags;
  }
}
