import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-skeleton-usage',
  template: `
    <vts-space vtsPreset="3" vtsWrap vtsAlign="center">
      <span *vtsSpaceItem>
        Loading: &nbsp;
        <vts-switch [(ngModel)]="loading"></vts-switch>
      </span>
    </vts-space>
    <br />
    <br />
    <p>Basic</p>
    <vts-skeleton vtsActive [vtsLoading]="loading" [vtsParagraph]="{ rows: 3 }">
      <h3>Demo:</h3>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </p>
    </vts-skeleton>
    <br />
    <br />
    <p>Card</p>
    <vts-card style="max-width: 400px">
      <vts-card-header>
        <vts-card-header-title>
          <vts-skeleton vtsActive [vtsLoading]="loading" [vtsParagraph]="{ rows: 0 }">
            Card header
          </vts-skeleton>
        </vts-card-header-title>
      </vts-card-header>
      <vts-skeleton vtsActive [vtsLoading]="loading" [vtsParagraph]="{ rows: 6 }">
        <h3>Demo:</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged.
        </p>
      </vts-skeleton>
    </vts-card>
  `
})
export class VtsDemoSkeletonUsageComponent {
  loading: boolean = true;
}
