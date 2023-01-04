---
category: Components
type: Components
title: Alert
cover: https://gw.alipayobjects.com/zos/alicdn/8emPa3fjl/Alert.svg
---

Alert component for feedback.

## API

### vts-alert

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[vtsBanner]` | Whether to show as banner | `boolean` | `false` |
| `[vtsCloseable]` | Whether Alert can be closed | `boolean` | - | ✅ |
| `[vtsCloseText]` | Close text to show | `string \| TemplateRef<void>` | - |
| `[vtsDescription]` | Additional content of Alert | `string \| TemplateRef<void>` | - |
| `[vtsMessage]` | Content of Alert | `string \| TemplateRef<void>` | - |
| `[vtsForm]` | Whether to show in form mode | `boolean` | `false` |
| `[vtsShowIcon]` | Whether to show icon, in `vtsBanner` mode default is `true` | `boolean` | `false` | ✅ |
| `[vtsIconType]` | Icon type, effective when `vtsShowIcon` is `true` | `string` | - |
| `[vtsType]` | Type of Alert styles, in `vtsBanner` mode default is `'warning'` | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` |
| `(vtsOnClose)` | Callback when Alert is closed | `EventEmitter<void>` | - |
