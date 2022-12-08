---
category: Components
type: Data Display
title: Card
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/keNB-R8Y9/Card.svg
---

Simple rectangular container.

## When To Use

A card can be used to display content related to a single subject. The content can consist of multiple elements of varying types and sizes.

```ts
import { VtsCardModule } from '@ui-vts/ng-vts/card';
```

## API

```html
<vts-card vtsTitle="card title">card content</vts-card>
```

### vts-card

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[vtsActions]` | The action list, shows at the bottom of the Card. | `Array<TemplateRef<void>>` | - |
| `[vtsBodyStyle]` | Inline style to apply to the card content | `{ [key: string]: string }` | - |
| `[vtsBorderless]` | Remove border around the card | `boolean` | `false` | ✅ |
| `[vtsCover]` | Card cover | `TemplateRef<void>` | - |
| `[vtsExtra]` | Content to render in the top-right corner of the card | `string\|TemplateRef<void>` | - |
| `[vtsHoverable]` | Lift up when hovering card | `boolean` | `false` | ✅ |
| `[vtsLoading]` | Shows a loading indicator while the contents of the card are being fetched | `boolean` | `false` |
| `[vtsTitle]` | Card title | `string\|TemplateRef<void>` | - |
| `[vtsType]` | Card style type, can be set to `inner` or not set | `'inner'` | - |
| `[vtsSize]` | Size of card | `'default'\|'small'` | `'default'` | ✅ |


### vts-card-meta

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsAvatar]` | avatar or icon | `TemplateRef<void>` | - |
| `[vtsDescription]` | description content | `string\|TemplateRef<void>` | - |
| `[vtsTitle]` | title content | `string\|TemplateRef<void>` | - |

### [vts-card-grid]

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[vtsHoverable]` | Lift up when hovering card | `boolean` | `true` | - |

Area for grid style card

### vts-card-tab
Area for tab card
