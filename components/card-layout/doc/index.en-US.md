---
category: Components
type: Components
title: Card Layout
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/keNB-R8Y9/Card.svg
---

Simple rectangular container. Contains layouts can display multiple types of data.

## When To Use

A card layout can be used to display different type for multiple data type.
A card layout can be implemented on card or modal.

```ts
import { VtsCardLayoutModule } from '@ui-vts/ng-vts/card-layout';
```

## API

```html
<vts-card vts-card-layout vtsTitle="card title">card content</vts-card>
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
