import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-badge-colorful',
  template: `
    <div>
      <h4>Presets:</h4>
      <div *ngFor="let color of colors">
        <vts-badge [vtsColor]="color" [vtsText]="color"></vts-badge>
      </div>
      <br />
      <h4>Custom:</h4>
      <vts-badge vtsColor="#f50" vtsText="#f50"></vts-badge>
      <br />
      <vts-badge vtsColor="#2db7f5" vtsText="#2db7f5"></vts-badge>
      <br />
      <vts-badge vtsColor="#87d068" vtsText="#87d068"></vts-badge>
      <br />
      <vts-badge vtsColor="#108ee9" vtsText="#108ee9"></vts-badge>
    </div>
  `
})
export class VtsDemoBadgeColorfulComponent {
  colors = [
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime'
  ];
}
