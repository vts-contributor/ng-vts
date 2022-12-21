---
category: Components
type: Components
title: Typography
cols: 1
order: 15
cover: https://gw.alipayobjects.com/zos/alicdn/xS9YEJhfe/Input.svg
---

## API

### [vts-typography]

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsType | Type of text | One of `h1` `h2` `h3` `h4` `h5` `sub1` `sub2` `body1` `body2` `link` | `body1` |
| vtsColor | Color of text | One of `default` `secondary` `primary` `info` `success` `processing` `error` `highlight` `warning` `disabled` | `default` |
| vtsAlign | Alignment of text | One of `left` `center` `right` | |
| vtsTransform | Transformation of text | One of `lowercase` `uppercase` `capitalize` | |
| vtsWeight | Font weight of text | One of `thin` `extra-light` `light` `normal` `medium` `semi-bold` `bold` `extra-bold` `heavy` | |
| vtsXXXs | Breakpoint options on screen `<360px` | `object`<br>&nbsp;Object example: `{type: 'h1', color: 'secondary', align: 'right', transform: 'uppercase', weight: 'bold' }` | |
| vtsXXs | Breakpoint options on screen `≥360px` | Same as `vtsXXXs` | |
| vtsXs | Breakpoint options on screen `≥600px` | Same as `vtsXXXs` | |
| vtsSm | Breakpoint options on screen `≥768px` | Same as `vtsXXXs` | |
| vtsMd | Breakpoint options on screen `≥1024px` | Same as `vtsXXXs` | |
| vtsLg | Breakpoint options on screen `≥1200px` | Same as `vtsXXXs` | |
| vtsXl | Breakpoint options on screen `≥1600px` | Same as `vtsXXXs` | |