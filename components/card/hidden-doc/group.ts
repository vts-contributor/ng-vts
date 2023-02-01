import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-group',
  template: `
    <vts-card-group>
      <vts-card
        [vtsCardLayout]="'basic'"
        vtsCoverPosition="top"
        [vtsCover]="coverTemplate"
        vtsTitle="Card name">
        <vts-card-meta
          vtsDescription="Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. commodo enim craft beer mlkshk aliquip jean shorts ullamco."
        ></vts-card-meta>
        <span>Last updated 3 mins ago</span>
      </vts-card>
      <ng-template #coverTemplate>
        <img
          alt="example"
          src="https://avatars.githubusercontent.com/u/43126830"
        />
      </ng-template>

      <vts-card
        [vtsCardLayout]="'basic'"
        vtsCoverPosition="top"
        [vtsCover]="coverTemplate"
        vtsTitle="Card name">
        <vts-card-meta
          vtsDescription="Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. commodo enim craft beer mlkshk aliquip jean shorts ullamco."
        ></vts-card-meta>
        <span>Last updated 3 mins ago</span>
      </vts-card>
      <ng-template #coverTemplate>
        <img
          alt="example"
          src="https://avatars.githubusercontent.com/u/43126830"
        />
      </ng-template>

      <vts-card
        [vtsCardLayout]="'basic'"
        vtsCoverPosition="top"
        [vtsCover]="coverTemplate"
        vtsTitle="Card name">
        <vts-card-meta
          vtsDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        ></vts-card-meta>
        <span>Last updated 3 mins ago</span>
      </vts-card>
      <ng-template #coverTemplate>
        <img
          alt="example"
          src="https://avatars.githubusercontent.com/u/43126830"
        />
      </ng-template>
    </vts-card-group>
  `
})
export class VtsDemoCardGroupComponent {}
