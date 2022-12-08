/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Directive, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'vts-list-empty',
  exportAs: 'vtsListHeader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <vts-embed-empty [vtsComponentName]="'list'" [specificContent]="vtsNoResult"></vts-embed-empty>
  `,
  host: {
    class: 'vts-list-empty-text'
  }
})
export class VtsListEmptyComponent {
  @Input() vtsNoResult?: string | TemplateRef<void>;
}

@Component({
  selector: 'vts-list-header',
  exportAs: 'vtsListHeader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    class: 'vts-list-header'
  }
})
export class VtsListHeaderComponent {}

@Component({
  selector: 'vts-list-footer',
  exportAs: 'vtsListFooter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    class: 'vts-list-footer'
  }
})
export class VtsListFooterComponent {}

@Component({
  selector: 'vts-list-pagination',
  exportAs: 'vtsListPagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    class: 'vts-list-pagination'
  }
})
export class VtsListPaginationComponent {}

@Directive({
  selector: 'vts-list-load-more',
  exportAs: 'vtsListLoadMoreDirective'
})
export class VtsListLoadMoreDirective {}

@Directive({
  selector: 'vts-list[vtsGrid]',
  host: {
    class: 'vts-list-grid'
  }
})
export class VtsListGridDirective {}
