import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-time-picker-addon',
  template: `
    <vts-time-picker [(ngModel)]="time" [vtsAddOn]="addOnTemplate" #timePicker></vts-time-picker>
    <ng-template #addOnTemplate>
      <button vts-button vtsSize="sm" vtsType="primary" (click)="timePicker.close()">Ok</button>
    </ng-template>
  `
})
export class VtsDemoTimePickerAddonComponent {
  time: Date | null = null;
}
