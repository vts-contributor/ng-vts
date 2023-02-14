---
category: Components
type: Components
title: Panel
cols: 1
cover: ''
---

```ts
import { VtsPanelModule } from '@ui-vts/ng-vts/panel';
```

## API

### vts-panel

| Property                  | Description              | Type      | Default |
|---------------------------|--------------------------|-----------|--------|
| vtsTitle              | Panel title               | `string` | |
| vtsExpandIcon | Custom expand icon | `string`  | `ArrowDownOutline`  |
| vtsCollapseIcon | Custom expand icon | `string`  | `ArrowUpOutline`  |
| vtsExpandTpl | Custom expand template | `TemplateRef`  |  |
| vtsCollapseTpl | Custom collapse template | `TemplateRef`  |  |
| vtsExtraTpl | Custom template for whole extra part of panel <br />Must control toggle state manually | `TemplateRef`  |  |
| [(vtsActive)] | Bind collapse/expand state<br />Can be unbinded/undefined to let panel self-manage state | `boolean`  | `true`  |