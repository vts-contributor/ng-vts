import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-list-grid',
  template: `
    <vts-list vtsGrid>
      <div vts-row [vtsGutter]="16">
        <div vts-col [vtsSpan]="6" *ngFor="let item of data">
          <vts-list-item>
            <vts-card [vtsTitle]="item.title">Card content</vts-card>
          </vts-list-item>
        </div>
      </div>
    </vts-list>
  `
})
export class VtsDemoListGridComponent {
  data = [
    {
      title: 'Title 1'
    },
    {
      title: 'Title 2'
    },
    {
      title: 'Title 3'
    },
    {
      title: 'Title 4'
    }
  ];
}
