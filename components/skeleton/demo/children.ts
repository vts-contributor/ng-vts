import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-skeleton-children',
  template: `
    <div class="article">
      <vts-skeleton [vtsLoading]="loading">
        <h4>Ant Design, a design language</h4>
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully
          and efficiently.
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
