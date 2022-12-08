import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vts-demo-auto-complete-options',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="example-input">
      <input
        placeholder="input here"
        vts-input
        [(ngModel)]="inputValue"
        (input)="onInput($event)"
        [vtsAutocomplete]="auto"
      />
      <vts-autocomplete #auto>
        <vts-auto-option *ngFor="let option of options" [vtsValue]="option">
          {{ option }}
        </vts-auto-option>
      </vts-autocomplete>
    </div>
  `
})
export class VtsDemoAutoCompleteOptionsComponent {
  inputValue?: string;
  options: string[] = [];

  onInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    if (!value || value.indexOf('@') >= 0) {
      this.options = [];
    } else {
      this.options = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
    }
  }
}
