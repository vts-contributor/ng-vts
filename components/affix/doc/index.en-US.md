---
category: Components
type: Navigation
title: Affix
cover: https://gw.alipayobjects.com/zos/alicdn/tX6-md4H6/Affix.svg
---

Make an element stick to viewport.

## When To Use

When user browses a long web page, some content need to stick to the viewport. This is common for menus and actions.

Please note that Affix should not cover other content on the page, especially when the size of the viewport is small.

```ts
import { VtsAffixModule } from '@ui-vts/ng-vts/affix';
```

## API

### vts-affix

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[vtsOffsetBottom]` | Pixels to offset from bottom when calculating position of scroll | `number` | - | ✅ |
| `[vtsOffsetTop]` | Pixels to offset from top when calculating position of scroll | `number` | `0` | ✅ |
| `[vtsTarget]` | specifies the scrollable area dom node | `string \| HTMLElement` | `window` |
| `(vtsChange)` | Callback for when affix state is changed | `EventEmitter<boolean>` | - |

**Note:** Children of `vts-affix` can not be `position: absolute`, but you can set `vts-affix` as `position: absolute`:

```jsx
<vts-affix style="position: absolute; top: 10px, left: 10px">
  ...
</vts-affix>
```
