---
category: Components
type: Layout
title: Divider
cover: https://gw.alipayobjects.com/zos/alicdn/5swjECahe/Divider.svg
---

A divider line separates different content.

## When To Use

- Divide sections of article.
- Divide inline text and links such as the operation column of table.

```ts
import { VtsDividerModule } from '@ui-vts/ng-vts/divider';
```

## API

### vts-divider

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsDashed]` | whether line is dashed | `boolean` | `false` |
| `[vtsType]` | direction type of divider | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `[vtsText]` | inner text of divider | `string \| TemplateRef<void>` | - |
| `[vtsPlain]` | Divider text show as plain style | `boolean` | `false` |
| `[vtsOrientation]` | inner text orientation | `'center' \| 'left' \| 'right'` | `'center'` |
