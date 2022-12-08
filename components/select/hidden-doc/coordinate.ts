import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-select-coordinate',
  template: `
    <div>
      <vts-select [(ngModel)]="selectedProvince" (ngModelChange)="provinceChange($event)">
        <vts-option *ngFor="let p of provinceData" [vtsValue]="p" [vtsLabel]="p"></vts-option>
      </vts-select>
      <vts-select [(ngModel)]="selectedCity">
        <vts-option
          *ngFor="let c of cityData[selectedProvince]"
          [vtsValue]="c"
          [vtsLabel]="c"
        ></vts-option>
      </vts-select>
    </div>
  `,
  styles: [
    `
      vts-select {
        margin-right: 8px;
        width: 120px;
      }
    `
  ]
})
export class VtsDemoSelectCoordinateComponent {
  selectedProvince = 'Zhejiang';
  selectedCity = 'Hangzhou';
  provinceData = ['Zhejiang', 'Jiangsu'];
  cityData: { [place: string]: string[] } = {
    Zhejiang: ['Hangzhou', 'Ningbo', 'Wevtshou'],
    Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang']
  };

  provinceChange(value: string): void {
    this.selectedCity = this.cityData[value][0];
  }
}
