import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-switch-control',
  template: `
    <vts-switch
      [(ngModel)]="switchValue"
      [vtsControl]="true"
      (click)="clickSwitch()"
      [vtsLoading]="loading"
    ></vts-switch>
  `
})
export class VtsDemoSwitchControlComponent {
  switchValue = false;
  loading = false;

  clickSwitch(): void {
    if (!this.loading) {
      this.loading = true;
      setTimeout(() => {
        this.switchValue = !this.switchValue;
        this.loading = false;
      }, 3000);
    }
  }
}
