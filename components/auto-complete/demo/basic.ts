import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vts-demo-auto-complete-basic',
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
      <vts-autocomplete [vtsDataSource]="options" vtsBackfill #auto></vts-autocomplete>
    </div>
  `
})
export class VtsDemoAutoCompleteBasicComponent {
  inputValue?: string;
  options: string[] = [];

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.options = value ? [value, value + value, value + value + value] : [];
  }
}
