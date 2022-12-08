---
category: Components
type: Data Display
title: Badge
cover: https://gw.alipayobjects.com/zos/antfincdn/6%26GF9WHwvY/Badge.svg
---

Small numerical value or status descriptor for UI elements.

## When To Use

Badge normally appears in proximity to notifications or user avatars with eye-catching appeal, typically displaying unread messages count.

```ts
import { VtsBadgeModule } from '@ui-vts/ng-vts/badge';
```

## API

```html
<vts-badge [vtsCount]="5">
  <a class="head-example"></a>
</vts-badge>
```

```html
<vts-badge [vtsCount]="5" vtsStandalone></vts-badge>
```

### vts-badge

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[vtsStandalone]` | Whether standalone mode | `boolean` | - | - |
| `[vtsColor]` | Customize Badge dot color | string | - | ✅ |
| `[vtsCount]` | Number to show in badge | `number \| TemplateRef<void>` | - |
| `[vtsDot]` | Whether to display a red dot instead of `count` | `boolean` | `false` |
| `[vtsShowDot]` | Whether to display the red dot | `boolean` | `true` |
| `[vtsOverflowCount]` | Max count to show | `number` | `99` | ✅ |
| `[vtsShowZero]` | Whether to show badge when `count` is zero | `boolean` | `false` |
| `[vtsStatus]` | Set `vts-badge` as a status dot | `'success' \| 'processing' \| 'default' \| 'error' \| 'warning'` | - |
| `[vtsText]` | If `vtsStatus` is set, `text` sets the display text of the status `dot` | `string \| TemplateRef<void>` | - |
| `[vtsTitle]` | Text to show when hovering over the badge（Only Non-standalone), hide when value is `null` | `string \| null` | `vtsCount` |
| `[vtsOffset]` | set offset of the badge dot, like[x, y] (Only Non-standalone) | `[number, number]` | - |


### vts-ribbon

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| vtsColor | Customize Ribbon color | `string` | - |
| vtsPlacement | The placement of the Ribbon | `start` \| `end` | `end` |
| vtsText | Content inside the Ribbon | `string \| TemplateRef<void>` | - |  |