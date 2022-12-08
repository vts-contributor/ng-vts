import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-button-loading',
  template: `
    <button vts-button vtsType="primary" vtsLoading>
      <i vts-icon vtsType="SettingsPower"></i>
      Loading
    </button>
    <button vts-button vtsType="primary" vtsSize="sm" vtsLoading>Loading</button>
    <br />
    <button vts-button vtsType="primary" (click)="loadOne()" [vtsLoading]="isLoadingOne">
      Click me!
    </button>
    <button vts-button vtsType="primary" (click)="loadTwo()" [vtsLoading]="isLoadingTwo">
      <i vts-icon vtsType="SettingsPower"></i>
      Click me!
    </button>
    <br />
    <button vts-button vtsLoading vtsShape="circle"></button>
    <button vts-button vtsLoading vtsType="primary" vtsShape="circle"></button>
  `,
  styles: [
    `
      [vts-button] {
        margin-right: 8px;
        margin-bottom: 12px;
      }
    `
  ]
})
export class VtsDemoButtonLoadingComponent {
  isLoadingOne = false;
  isLoadingTwo = false;

  loadOne(): void {
    this.isLoadingOne = true;
    setTimeout(() => {
      this.isLoadingOne = false;
    }, 5000);
  }

  loadTwo(): void {
    this.isLoadingTwo = true;
    setTimeout(() => {
      this.isLoadingTwo = false;
    }, 5000);
  }
}
