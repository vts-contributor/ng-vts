import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-skeleton-children',
  template: `
    <div class="article">
      <vts-skeleton [vtsLoading]="loading">
        <h4>
          Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
          velit...
        </h4>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </p>
      </vts-skeleton>
      <button vts-button (click)="showSkeleton()" [disabled]="loading">Show Skeleton</button>
    </div>
  `,
  styles: [
    `
      .article h4 {
        margin-bottom: 16px;
      }
      .article button {
        margin-top: 16px;
      }
    `
  ]
})
export class VtsDemoSkeletonChildrenComponent {
  loading = false;

  showSkeleton(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
}
