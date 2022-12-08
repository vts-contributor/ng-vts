import { Component, ViewEncapsulation } from '@angular/core';
import { MentionOnSearchTypes } from '@ui-vts/ng-vts/mention';

@Component({
  selector: 'vts-demo-mention-async',
  encapsulation: ViewEncapsulation.None,
  template: `
    <vts-mention
      [vtsSuggestions]="suggestions"
      [vtsLoading]="loading"
      (vtsOnSearchChange)="onSearchChange($event)"
    >
      <input vtsMentionTrigger vts-input [(ngModel)]="inputValue" />
    </vts-mention>
  `
})
export class VtsDemoMentionAsyncComponent {
  inputValue?: string;
  loading = false;
  suggestions: string[] = [];

  onSearchChange({ value }: MentionOnSearchTypes): void {
    console.log(`search: ${value}`);
    this.loading = true;
    this.fetchSuggestions(value, suggestions => {
      console.log(suggestions);
      this.suggestions = suggestions;
      this.loading = false;
    });
  }

  fetchSuggestions(value: string, callback: (suggestions: string[]) => void): void {
    const users = ['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai'];
    setTimeout(() => {
      return callback(users.filter(item => item.indexOf(value) !== -1));
    }, 500);
  }
}
