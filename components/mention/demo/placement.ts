import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vts-demo-mention-placement',
  encapsulation: ViewEncapsulation.None,
  template: `
    <vts-mention vtsPlacement="top" [vtsSuggestions]="suggestions" (vtsOnSelect)="onSelect($event)">
      <input
        vtsMentionTrigger
        vts-input
        [(ngModel)]="inputValue"
        (ngModelChange)="onChange($event)"
      />
    </vts-mention>
  `
})
export class VtsDemoMentionPlacementComponent {
  inputValue?: string;
  suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];

  onChange(value: string): void {
    console.log(value);
  }

  onSelect(suggestion: string): void {
    console.log(`onSelect ${suggestion}`);
  }
}
