import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-header',
  template: `
    <div vts-row [vtsGutter]="[16, 8]">
      <div vts-col [vtsSpan]="8">
        <vts-card
          [vtsCardLayout]="'basic'"
          [vtsTitle]="'Card name'"
          vtsCoverPosition="top"
          [vtsCover]="coverTemplate"
        >
          <vts-card-meta
            vtsDescription="Each design is a new, unique piece of art birthed into this world, and while you have the opportunity to be creative and make your unpleasant for the reader."
          ></vts-card-meta>
          <span>Last updated 3 mins ago</span>
        </vts-card>
        <ng-template #coverTemplate>
          <img
            alt="example"
            src="https://avatars.githubusercontent.com/u/43126830"
          />
        </ng-template>
      </div>

      <div vts-col [vtsSpan]="8">
        <vts-card
          [vtsCardLayout]="'basic'"
          [vtsTitle]="'Card name'"
          vtsCoverPosition="bottom"
          [vtsCover]="coverTemplate"
        >
          <vts-card-meta
            vtsDescription="Each design is a new, unique piece of art birthed into this world, and while you have the opportunity to be creative and make your unpleasant for the reader."
          ></vts-card-meta>
          <span>Last updated 3 mins ago</span>
        </vts-card>
        <ng-template #coverTemplate>
          <img
            alt="example"
            src="https://avatars.githubusercontent.com/u/43126830"
          />
        </ng-template>
      </div>

      <div vts-col [vtsSpan]="8">
        <vts-card
          [vtsCardLayout]="'basic'"
          [vtsTitle]="'Card name'"
          [vtsCover]="coverTemplate"
          [vtsCoverPosition]="'fluid'"
          [vtsActions]="[actionFooter]"
        >
          <vts-card-meta
            vtsDescription="Each design is a new, unique piece of art birthed into this world, and while you have the opportunity to be creative and make your unpleasant for the reader."
          ></vts-card-meta>
        </vts-card>
        <ng-template #coverTemplate>
          <img
            alt="example"
            src="https://avatars.githubusercontent.com/u/43126830"
          />
        </ng-template>
        <ng-template #actionFooter>
          <span>Last updated 3 minutes ago</span>
        </ng-template>
      </div>
    </div>
    <div vts-row [vtsGutter]="[16, 8]">
      <div vts-col [vtsSpan]="12">
        <vts-card
          [vtsCardLayout]="'basic'"
          [vtsTitle]="'Card name'"
          [vtsCoverPosition]="'left'"
          [vtsCover]="coverTemplate"
        >
          <vts-card-meta
            vtsDescription="Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee."
          ></vts-card-meta>
          <span>Last updated 3 mins ago</span>
        </vts-card>
        <ng-template #coverTemplate>
          <img
            alt="example"
            src="https://avatars.githubusercontent.com/u/43126830"
          />
        </ng-template>
      </div>
      <div vts-col [vtsSpan]="12">
        <vts-card
          [vtsCardLayout]="'basic'"
          [vtsTitle]="'Card name'"
          [vtsCoverPosition]="'right'"
          [vtsCover]="coverTemplate"
        >
          <vts-card-meta
            vtsDescription="Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee."
          ></vts-card-meta>
          <span>Last updated 3 mins ago</span>
        </vts-card>
        <ng-template #coverTemplate>
          <img
            alt="example"
            src="https://avatars.githubusercontent.com/u/43126830"
          />
        </ng-template>
      </div>
    </div>
  `
})
export class VtsDemoCardHeaderComponent {}
