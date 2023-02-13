---
category: Components
type: Components
cols: 1
title: Layout
cover: ''
---

```ts
import { VtsLayoutModule } from '@ui-vts/ng-vts/layout';
```

## API

### vts-sider

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsBreakpoint | Breakpoints of the responsive layout | One of `xxs` `xs` `sm` `md` `lg` `xl` |  |
| vtsCollapsedWidth | Width of the collapsed sidebar | `number` | |
| [(vtsCollapsed)] | Collapsed status of sider | `boolean` | `false` |
| vtsWidth | Width of the sidebar | `number \| string` | `240` |

#### breakpoint width

```js
Breakpoint table:
- xxs: `<360px`
- xs: `<600px`
- sm: `<768px`
- md: `<1024px`
- lg: `<1200px`
- xl: `<1600px`
```
