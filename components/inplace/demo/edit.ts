import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-inplace-edit',
  template: `
    <h4>Basic</h4>
    <div class="container">
        <vts-inplace vtsIcon="Edit" [closable]="true">
        <div vtsInplaceDisplay>
          Click to edit
        </div>
        <div vtsInplaceContent>
          <input type="text" value="VtsInplace">
        </div>
      </vts-inplace>
      <vts-inplace disabled vtsIcon="Edit">
        <div vtsInplaceDisplay>
          Click to edit (disabled)
        </div>
        <div vtsInplaceContent>
          <input type="text" value="VtsInplace">
        </div>
      </vts-inplace>
    </div>
  `,
  styles: [
    `
      input {
        height: 32px;
        border-radius: 5px;
      }

      .container {
        display: flex;
      }
    `
  ]
  
})
export class VtsDemoInplaceEditComponent {}
