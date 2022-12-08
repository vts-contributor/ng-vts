---
category: Components
type: Data Display
title: Tag
cover: https://gw.alipayobjects.com/zos/alicdn/cH1BOLfxC/Tag.svg
---

Tag for categorizing or markup.

## When To Use

- It can be used to tag by dimension or property.

- When categorizing.

```ts
import { VtsTagModule } from '@ui-vts/ng-vts/tag';
```

## API

### vts-tag

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[vtsMode]` | Mode of tag | `'closeable' \| 'default' \| 'checkable'` | `'default'` |
| `[vtsChecked]` | Checked status of Tag, double binding, only works when `vtsMode="checkable"` | `boolean` | `false` |
| `[vtsColor]` | Color of the Tag | `string` | - |
| `(vtsOnClose)` | Callback executed when tag is closed, only works when `vtsMode="closable"`| `EventEmitter<MouseEvent>` | - |
| `(vtsCheckedChange)` | Checked status change call back, only works when `vtsMode="checkable"` | `EventEmitter<boolean>` | - |
