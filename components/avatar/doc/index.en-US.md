---
category: Components
type: Components
title: Avatar
cover: ''
---

```ts
import { VtsAvatarModule } from '@ui-vts/ng-vts/avatar';
```

## API

### vts-avatar

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsIcon | The `VtsIcon` type for an icon avatar | `string` | |
| vtsText | Text content for text avatar | `string` | |
| vtsShape | The shape of avatar | One of `square` `rounded` `circle` | `circle` |
| vtsSize | The size of the avatar | `number` or one of `xxs` `xs` `sm` `md` `lg` `xl` | `xs`
| vtsGap | Letter type unit distance between left and right sides | `number` | `4` |
| vtsSrc | The image src for an image avatar | `string` | |
| vtsSrcSet | Srcset property to use for different screen resolutions | `string` |  |
| vtsAlt | Alternative text describing the image | string | |
| (vtsError) | Handler when img load error, call the `preventDefault` method to prevent default fallback behavior | `EventEmitter<Event>` | |

### vts-avatar-group

```html
<vts-avatar-group>
  <vts-avatar vtsIcon="user"></vts-avatar>
  ...
</vts-avatar-group>
```
