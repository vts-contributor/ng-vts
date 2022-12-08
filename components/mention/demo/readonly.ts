import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vts-demo-mention-readonly',
  encapsulation: ViewEncapsulation.None,
  template: `
    <vts-mention [vtsSuggestions]="suggestions">
      <input
        style="margin-bottom: 10px"
        placeholder="this is disabled Mention"
        vtsMentionTrigger
        vts-input
        disabled
        [(ngModel)]="inputValue"
      />
      <input
        placeholder="this is readOnly Mention"
        vtsMentionTrigger
        vts-input
        readOnly
        [(ngModel)]="inputValue"
      />
    </vts-mention>
  `
})
export class VtsDemoMentionReadonlyComponent {
  inputValue?: string;
  suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];
}
