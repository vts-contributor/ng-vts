import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vts-demo-auto-complete-non-case-sensitive',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="example-input">
      <input
        placeholder="try to type \`b\`"
        vts-input
        [(ngModel)]="inputValue"
        (ngModelChange)="onChange($event)"
        [vtsAutocomplete]="auto"
      />
      <vts-autocomplete [vtsDataSource]="filteredOptions" #auto></vts-autocomplete>
    </div>
  `
})
export class VtsDemoAutoCompleteNonCaseSensitiveComponent {
  inputValue?: string;
  filteredOptions: string[] = [];
  options = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

  constructor() {
    this.filteredOptions = this.options;
  }

  onChange(value: string): void {
    this.filteredOptions = this.options.filter(
      option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }
}
