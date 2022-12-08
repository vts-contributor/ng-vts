---
category: Components
type: Components
cols: 1
title: Space
order: 12
cover: https://gw.alipayobjects.com/zos/antfincdn/wc6%263gJ0Y8/Space.svg
---

```ts
import { VtsSpaceModule } from '@ui-vts/ng-vts/space';
```

## API

### [vts-space]

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsPreset | Preset space between item | `number` in range `[0-10]` |
| vtsSize | Manually set space between item | `number` |
| vtsDirection | Set direction for main axis | `horizontal` or `vertical` | `horizontal`
| vtsWrap | Wrap overflow item | `boolean` | `false`
| vtsAlign | Cross axis alignment | One of `start` `end` `center` `baseline` `stretch` | 
| vtsJustify | Main axis alignment | One of `start` `end` `center` `around` `between` | 