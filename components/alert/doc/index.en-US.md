---
category: Components
type: Components
title: Alert
cols: 1
cover: ''
order: 100
---

## API

### vts-alert

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsBanner | Whether to show as banner | `boolean` | `false` |
| vtsCloseable | Whether Alert can be closed | `boolean` | `false` |
| vtsCloseText | Close text to show | `string \| TemplateRef<void>` |
| vtsDescription | Additional content of Alert | `string \| TemplateRef<void>` |
| vtsMessage | Content of Alert | `string \| TemplateRef<void>` |
| vtsShowIcon | Whether to show prefix icon, in `vtsBanner` mode default is `true` | `boolean` | `false` |
| vtsIconType | Prefix icon type, effective when `vtsShowIcon` is `true` | `string` |
| vtsType | Type of Alert styles, in `vtsBanner` mode default is `'warning'` | `'success' \| 'info' \| 'warning' \| 'error'` | `info` |
| vtsTheme | Theme of Alert styles | `outline` or `fill` | `outline` |
| (vtsOnClose) | Callback when Alert is closed | `EventEmitter<void>` |
