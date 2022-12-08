---
category: Components
type: Navigation
title: PageHeader
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/6bKE0Cq0R/PageHeader.svg
---

A header with common actions and design elements built in.

## When To Use

PageHeader can be used to highlight the page topic, display important information about the page, and carry the action items related to the current page (including page-level operations, inter-page navigation, etc.) It can also be used as inter-page navigation.

```ts
import { VtsPageHeaderModule } from '@ui-vts/ng-vts/page-header';
```

## API

```html
<vts-page-header vtsTitle="Page Title"></vts-page-header>
```

### vts-page-header
| Param | Description | Type | Default value | Global Config |
| ----- | ----------- | ---- | ------------- | ------------- |
| `[vtsGhost]` | Make background transparent | `boolean` | `true` | ✅ |
| `[vtsTitle]` | Title string | `string \| TemplateRef<void>` | - | - |
| `[vtsSubtitle]` | SubTitle string | `string \| TemplateRef<void>` | - | - |
| `[vtsBackIcon]` | Custom back icon | `string \| TemplateRef<void>` | - | - |
| `(vtsBack)` | Back icon click event | `EventEmitter<void>` | Call [Location[back]](https://angular.io/api/common/Location#back) when the event not subscribed（you need import [RouterModule](https://angular.io/api/router/RouterModule) or register [Location](https://angular.io/api/common/Location)）| - |

### Page header sections
| Element | Description |
| ----- | ----- |
| `vts-page-header-title` | Title section |
| `vts-page-header-subtitle` | Subtitle section, `[vtsTitle]` has high priority |
| `vts-page-header-content` | Content section, `[vtsSubtitle]` has high priority |
| `vts-page-header-footer` | Footer section |
| `vts-page-header-tags` |  Tags container after the title |
| `vts-page-header-extra` | Operating area, at the end of the line of the title line |
| `vts-breadcrumb[vts-page-header-breadcrumb]` | Breadcrumb section |
| `vts-avatar[vts-page-header-avatar]` | Avatar section |
