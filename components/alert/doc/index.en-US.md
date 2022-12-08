---
category: Components
type: Feedback
title: Alert
cover: https://gw.alipayobjects.com/zos/alicdn/8emPa3fjl/Alert.svg
---

Alert component for feedback.

## When To Use

- When you need to show alert messages to users.
- When you need a persistent static container which is closable by user actions.

```ts
import { VtsAlertModule } from '@ui-vts/ng-vts/alert';
```

## API

### vts-alert

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[vtsBanner]` | Whether to show as banner | `boolean` | `false` |
| `[vtsCloseable]` | Whether Alert can be closed | `boolean` | - | ✅ |
| `[vtsCloseText]` | Close text to show | `string \| TemplateRef<void>` | - |
| `[vtsDescription]` | Additional content of Alert | `string \| TemplateRef<void>` | - |
| `[vtsMessage]` | Content of Alert | `string \| TemplateRef<void>` | - |
| `[vtsShowIcon]` | Whether to show icon, in `vtsBanner` mode default is `true` | `boolean` | `false` | ✅ |
| `[vtsIconType]` | Icon type, effective when `vtsShowIcon` is `true` | `string` | - |
| `[vtsType]` | Type of Alert styles, in `vtsBanner` mode default is `'warning'` | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` |
| `(vtsOnClose)` | Callback when Alert is closed | `EventEmitter<void>` | - |
