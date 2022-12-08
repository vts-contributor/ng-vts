import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-input-textarea',
  template: `
    <textarea rows="4" vts-input [(ngModel)]="inputValue"></textarea>
  `
})
export class VtsDemoInputTextareaComponent {
  inputValue?: string;
}
