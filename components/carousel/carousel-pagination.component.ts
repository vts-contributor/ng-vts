import { Component, ElementRef, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'vts-carousel-pagination,[vts-carousel-pagination]',
  encapsulation: ViewEncapsulation.None,
  exportAs: 'vtsCarouselPagination',
  template: '<ng-content></ng-content>'
})
export class VtsCarouselPaginationComponent implements OnInit {
  constructor(public elementRef: ElementRef) {}

  ngOnInit(): void {}
}
