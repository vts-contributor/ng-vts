import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-select-custom-dropdown-menu',
  template: `
    <vts-select
      vtsShowSearch
      vtsAllowClear
      [vtsDropdownRender]="renderTemplate"
      vtsPlaceHolder="custom dropdown render"
    >
      <vts-option *ngFor="let item of listOfItem" [vtsLabel]="item" [vtsValue]="item"></vts-option>
    </vts-select>
    <ng-template #renderTemplate>
      <vts-divider></vts-divider>
      <div class="container">
        <input type="text" vts-input #inputElement />
        <a class="add-item" (click)="addItem(inputElement)">
          <i vts-icon vtsType="plus"></i>
          Add item
        </a>
      </div>
    </ng-template>
  `,
  styles: [
    `
      vts-select {
        width: 240px;
      }
      vts-divider {
        margin: 4px 0;
      }
      .container {
        display: flex;
        flex-wrap: nowrap;
        padding: 8px;
      }
      input {
      }
      .add-item {
        flex: 0 0 auto;
        padding: 8px;
        display: block;
      }
    `
  ]
})
export class VtsDemoSelectCustomDropdownMenuComponent {
  listOfItem = ['jack', 'lucy'];
  index = 0;
  addItem(input: HTMLInputElement): void {
    const value = input.value;
    if (this.listOfItem.indexOf(value) === -1) {
      this.listOfItem = [...this.listOfItem, input.value || `New item ${this.index++}`];
    }
  }
}
