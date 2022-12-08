---
category: Components
type: Data Display
title: Avatar
cover: https://gw.alipayobjects.com/zos/antfincdn/aBcnbw68hP/Avatar.svg
---

Avatars can be used to represent people or objects. It supports images, `Icon`s, or letters.

```ts
import { VtsAvatarModule } from '@ui-vts/ng-vts/avatar';
```

## API

### vts-avatar

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[vtsIcon]` | The `Icon` type for an icon avatar, see `Icon` | `string` | - |
| `[vtsShape]` | The shape of avatar | `'circle' \| 'square'` | `'circle'` | ✅ |
| `[vtsSize]` | The size of the avatar | `'large' \| 'small' \| 'default' \| number` | `'default'` | ✅ |
| `[vtsGap]` | Letter type unit distance between left and right sides | `number` | `4` | ✅ |
| `[vtsSrc]` | The address of the image for an image avatar | `string` | - |
| `[vtsSrcSet]` | a list of sources to use for different screen resolutions | string | - |
| `[vtsAlt]` | This attribute defines the alternative text describing the image | string | - |
| `[vtsText]` | Letter type avatar | `string` | - |
| `(vtsError)` | Handler when img load error, call the `preventDefault` method to prevent default fallback behavior | `EventEmitter<Event>` | - |

### vts-avatar-group

```html
 <vts-avatar-group>
  <vts-avatar vtsIcon="user"></vts-avatar>
  ...
</vts-avatar-group>
```
