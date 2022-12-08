import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-list-resposive',
  template: `
    <vts-list vtsGrid>
      <div vts-row [vtsGutter]="16">
        <div
          vts-col
          [vtsXl]="4"
          [vtsLg]="6"
          [vtsMd]="6"
          [vtsSm]="12"
          [vtsXs]="24"
          *ngFor="let item of data"
        >
          <vts-list-item>
            <vts-card [vtsTitle]="item.title">Card content</vts-card>
          </vts-list-item>
        </div>
      </div>
    </vts-list>
  `
})
export class VtsDemoListResposiveComponent {
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
    },
    {
      title: 'Title 5'
    },
    {
      title: 'Title 6'
    }
  ];
}
