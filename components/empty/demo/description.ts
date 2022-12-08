import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-empty-description',
  template: `
    <vts-empty [vtsNoResult]="null"></vts-empty>
  `
})
export class VtsDemoEmptyDescriptionComponent {}
