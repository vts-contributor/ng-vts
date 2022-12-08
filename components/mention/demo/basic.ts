import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vts-demo-mention-basic',
  encapsulation: ViewEncapsulation.None,
  template: `
    <vts-mention [vtsSuggestions]="suggestions" (vtsOnSelect)="onSelect($event)">
      <input
        placeholder="input here"
        vtsMentionTrigger
        vts-input
        [(ngModel)]="inputValue"
        (ngModelChange)="onChange($event)"
      />
    </vts-mention>
  `
})
export class VtsDemoMentionBasicComponent {
  inputValue: string = '@afc163';
  suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];

  onChange(value: string): void {
    console.log(value);
  }

  onSelect(suggestion: string): void {
    console.log(`onSelect ${suggestion}`);
  }
}
