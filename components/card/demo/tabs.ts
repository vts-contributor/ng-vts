import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-tabs',
  template: `
    <vts-card style="width: 100%;" vtsTitle="Card title" [vtsExtra]="extraTemplate">
      <vts-card-tab>
        <vts-tabset vtsSize="lg" [(vtsSelectedIndex)]="index1">
          <vts-tab vtsTitle="tab1"></vts-tab>
          <vts-tab vtsTitle="tab2"></vts-tab>
        </vts-tabset>
      </vts-card-tab>
      content{{ index1 }}
    </vts-card>
    <ng-template #extraTemplate>
      <a>More</a>
    </ng-template>
    <br />
    <br />
    <vts-card style="width: 100%;">
      <vts-card-tab>
        <vts-tabset vtsSize="lg" [(vtsSelectedIndex)]="index2">
          <vts-tab vtsTitle="article"></vts-tab>
          <vts-tab vtsTitle="app"></vts-tab>
          <vts-tab vtsTitle="project"></vts-tab>
        </vts-tabset>
      </vts-card-tab>
      content{{ index2 }}
    </vts-card>
  `
})
export class VtsDemoCardTabsComponent {
  index1 = 0;
  index2 = 0;
}
