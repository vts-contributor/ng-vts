import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vts-demo-auto-complete-custom',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="example-input">
      <textarea
        placeholder="input here"
        vts-input
        row="4"
        [(ngModel)]="inputValue"
        (input)="onInput($event)"
        [vtsAutocomplete]="auto"
      ></textarea>
      <vts-autocomplete #auto>
        <vts-auto-option *ngFor="let option of options" [vtsValue]="option">
          {{ option }}
        </vts-auto-option>
      </vts-autocomplete>
    </div>
  `
})
export class VtsDemoAutoCompleteCustomComponent {
  inputValue?: string;
  options: string[] = [];

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.options = value ? [value, value + value, value + value + value] : [];
  }
}
