/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive } from '@angular/core';

@Directive({
  selector: 'vts-page-header-title, [vts-page-header-title]',
  exportAs: 'vtsPageHeaderTitle',
  host: {
    class: 'vts-page-header-heading-title'
  }
})
export class VtsPageHeaderTitleDirective {}

@Directive({
  selector: 'vts-page-header-subtitle, [vts-page-header-subtitle]',
  exportAs: 'vtsPageHeaderSubtitle',
  host: {
    class: 'vts-page-header-heading-sub-title'
  }
})
export class VtsPageHeaderSubtitleDirective {}

@Directive({
  selector: 'vts-page-header-content, [vts-page-header-content]',
  exportAs: 'vtsPageHeaderContent',
  host: {
    class: 'vts-page-header-content'
  }
})
export class VtsPageHeaderContentDirective {}

@Directive({
  selector: 'vts-page-header-tags, [vts-page-header-tags]',
  exportAs: 'vtsPageHeaderTags',
  host: {
    class: 'vts-page-header-heading-tags'
  }
})
export class VtsPageHeaderTagDirective {}

@Directive({
  selector: 'vts-page-header-extra, [vts-page-header-extra]',
  exportAs: 'vtsPageHeaderExtra',
  host: {
    class: 'vts-page-header-heading-extra'
  }
})
export class VtsPageHeaderExtraDirective {}

@Directive({
  selector: 'vts-page-header-footer, [vts-page-header-footer]',
  exportAs: 'vtsPageHeaderFooter',
  host: {
    class: 'vts-page-header-footer'
  }
})
export class VtsPageHeaderFooterDirective {}

@Directive({
  selector: 'vts-breadcrumb[vts-page-header-breadcrumb]',
  exportAs: 'vtsPageHeaderBreadcrumb'
})
export class VtsPageHeaderBreadcrumbDirective {}

@Directive({
  selector: 'vts-avatar[vts-page-header-avatar]',
  exportAs: 'vtsPageHeaderAvatar'
})
export class VtsPageHeaderAvatarDirective {}
