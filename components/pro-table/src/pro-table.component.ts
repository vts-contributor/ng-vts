import { PropertyType, Request } from './pro-table.type';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import {
  // ChangeDetectionStrategy,
  Component,
  // ContentChildren,
  // SimpleChanges,
  ElementRef,
  // ChangeDetectorRef,
  // OnDestroy,
  OnInit,
  Input,
  // Optional,
  // OnChanges,
  // QueryList,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'vts-protable-container',
  exportAs: 'vtsProTableContainer',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  template: `
    <vts-search-form [headers]="properties" [data]="listData"></vts-search-form>
    <vts-table-config [listData]="listData" [properties]="properties" [editRequest]="editRequest" [saveRequest]="saveRequest"></vts-table-config>
  `,
  styles: [
    ``
  ]
})
export class VtsProTableContainerComponent implements OnInit {
  constructor(
    public elementRef: ElementRef
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-protable-container');
  }

  @Input() properties: PropertyType[] = [];
  @Input() listData: { [key: string]: VtsSafeAny }[] = [];
  editRequest: Request = {
    url: "http://localhost:3000/posts/",
    type: "GET",
    onSuccess: (data) => {
      console.log(data);
    },
  }

  saveRequest: Request = {
    url: "http://localhost:3000/posts/",
    type: "POST",
    onSuccess: (data) => {
      console.log(data);
    }
  }

  displayedProps: PropertyType[] = [];

  ngOnInit(): void {
  }
}