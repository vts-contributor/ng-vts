import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-checkbox-basic',
  template: `
    <form [vtsLayout]="'horizontal'" vts-form>
      <vts-form-item>
        <vts-form-label>No Label</vts-form-label>
        <vts-form-control>
          <vts-checkbox-wrapper (vtsOnChange)="print($event)">
            <label name="checkbox1" vts-checkbox vtsValue="A"></label>
          </vts-checkbox-wrapper>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label>Plus Label</vts-form-label>
        <vts-form-control>
          <vts-checkbox-wrapper (vtsOnChange)="print($event)">
            <label name="checkbox2" vts-checkbox vtsValue="A">Checkbox</label>
          </vts-checkbox-wrapper>
        </vts-form-control>
      </vts-form-item>
    </form>
  `
})
export class VtsDemoCheckboxBasicComponent {
  print(value: object) {
    console.log(value);
  }
}
