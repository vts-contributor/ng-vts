---
category: Components
type: Data Display
title: List
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/5FrZKStG_/List.svg
---

Simple List.

## When To Use

A list can be used to display content related to a single subject. The content can consist of multiple elements of varying type and size.

```ts
import { VtsListModule } from '@ui-vts/ng-vts/list';
```

## API

### vts-list

| Property | Description | Type | Default
| --- | --- | --- | --- |
| `[vtsBordered]` | Toggles rendering of the border around the list | `boolean` | `false` |
| `[vtsFooter]` | List footer renderer | `string \| TemplateRef<void>` | - |
| `[vtsHeader]` | List header renderer | `string \| TemplateRef<void>` | - |
| `[vtsItemLayout]` | The layout of list, default is `horizontal`, If a vertical list is desired, set the itemLayout property to `vertical` | `'vertical' \| 'horizontal'` | `'horizontal'` |
| `[vtsLoading]` | Shows a loading indicator while the contents of the list are being fetched | `boolean` | `false` |
| `[vtsSize]` | Size of list | `'large' \| 'small' \| 'default'` | `'default'` |
| `[vtsSplit]` | Toggles rendering of the split under the list item | `boolean` | `true` |

### vts-list-empty

Empty content component for the list.

| Property | Description | Type | Default
| --- | --- | --- | --- |
| `[vtsNoResult]` | Empty content | `string \| TemplateRef<void>` | - |

### vts-list[vtsGrid]

Use grid layout for the list.


### vts-list-header

Header component for the list.

### vts-list-footer

Footer component for the list.

### vts-list-pagination

Pagination component for the list.

### vts-list-load-more

Load more component for the list.

---

### vts-list-item

| Property | Description | Type | Default
| --- | --- | --- | --- |
| `[vtsNoFlex]` | Whether it's not `flex` layout rendering | `boolean` | `false` |

#### ul[vts-list-item-actions]

Actions container component for the list items.

#### vts-list-item-action

Action component for the list items.

#### vts-list-item-extra

Extra content for the list items.

---

### vts-list-item-meta

| Property | Description | Type | Default
| --- | --- | --- | --- |
| `[vtsAvatar]` | The avatar of list item | `string \| TemplateRef<void>` | - |
| `[vtsDescription]` | The description of list item | `string \| TemplateRef<void>` | - |
| `[vtsTitle]` | The title of list item | `string \| TemplateRef<void>` | - |

#### vts-list-item-meta-title

Title component for the list items meta part.

#### vts-list-item-meta-description

Description component for the list items meta part.

#### vts-list-item-meta-avatar

Avatar component for the list items meta part.

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[vtsSrc]` | The address of the image for an image avatar | `string` | - |

