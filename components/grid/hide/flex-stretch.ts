import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-grid-flex-stretch',
  template: `
    <div>
      <p>Percentage columns</p>
      <div vts-row>
        <div vts-col vtsFlex="2">2 / 5</div>
        <div vts-col vtsFlex="3">3 / 5</div>
      </div>
      <p>Fill rest</p>
      <div vts-row>
        <div vts-col vtsFlex="100px">100px</div>
        <div vts-col vtsFlex="auto">Fill Rest</div>
      </div>
      <p>Raw flex style</p>
      <div vts-row>
        <div vts-col vtsFlex="1 1 200px">1 1 200px</div>
        <div vts-col vtsFlex="0 1 300px">0 1 300px</div>
      </div>
    </div>
  `,
  styles: [
    `
      [vts-row] {
        background-color: rgba(128, 128, 128, 0.08);
      }
    `
  ]
})
export class VtsDemoGridFlexStretchComponent {}
