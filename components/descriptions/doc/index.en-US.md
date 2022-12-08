---
category: Components
type: Data Display
title: Descriptions
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/MjtG9_FOI/Descriptions.svg
---

Display multiple read-only fields in groups.

## When To Use

Commonly displayed on the details page.

```ts
import { VtsDescriptionsModule } from '@ui-vts/ng-vts/descriptions';
```

## API

### vts-descriptions

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[vtsTitle]` | Describe the title of the list, displayed at the top | `string\|TemplateRef<void>` | `false` |
| `[vtsExtra]` | The action area of the description list, placed at the top-right | `string\|TemplateRef<void>` | `-` |
| `[vtsBordered]` | Whether to display the border | `boolean` | `false` | ✅ |
| `[vtsColumn]` | The number of `vts-descriptions-item` in a row. It could be a number or a object like `{ xs: 8, sm: 16, md: 24}` | `number\|object` | `{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }` | ✅ |
| `[vtsSize]` | Set the size of the list. Only works when `vtsBordered` is set | `'default' \| 'middle' \| 'small'` | `'default'` | ✅ |
| `[vtsColon]` | Show colon after title | `boolean` | `true` | ✅ |

### vts-descriptions-item

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsTitle]` | Description of the content | `boolean` | `string\|TemplateRef<void>` |
| `[vtsSpan]` | The number of columns included | `number` | `1` |
