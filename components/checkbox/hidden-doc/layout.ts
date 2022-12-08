import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-checkbox-layout',
  template: `
    <vts-checkbox-wrapper style="width: 100%;" (vtsOnChange)="log($event)">
      <div vts-row>
        <div vts-col vtsSpan="8">
          <label vts-checkbox vtsValue="A" [ngModel]="true">A</label>
        </div>
        <div vts-col vtsSpan="8">
          <label vts-checkbox vtsValue="B">B</label>
        </div>
        <div vts-col vtsSpan="8">
          <label vts-checkbox vtsValue="C">C</label>
        </div>
        <div vts-col vtsSpan="8">
          <label vts-checkbox vtsValue="D">D</label>
        </div>
        <div vts-col vtsSpan="8">
          <label vts-checkbox vtsValue="E">E</label>
        </div>
      </div>
    </vts-checkbox-wrapper>
  `
})
export class VtsDemoCheckboxLayoutComponent {
  log(value: string[]): void {
    console.log(value);
  }
}
