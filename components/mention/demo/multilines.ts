import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vts-demo-mention-multilines',
  encapsulation: ViewEncapsulation.None,
  template: `
    <vts-mention [vtsSuggestions]="suggestions">
      <textarea
        vts-input
        [vtsAutosize]="{ minRows: 4, maxRows: 4 }"
        [(ngModel)]="inputValue"
        vtsMentionTrigger
      ></textarea>
    </vts-mention>
  `
})
export class VtsDemoMentionMultilinesComponent {
  inputValue?: string;
  suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];
}
