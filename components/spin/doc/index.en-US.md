---
category: Components
type: Feedback
title: Spin
cover: https://gw.alipayobjects.com/zos/alicdn/LBcJqCPRv/Spin.svg
---

A spinner for displaying loading state of a page or a section.

## When To Use

When part of the page is waiting for asynchronous data or during a rendering process, an appropriate loading animation can effectively alleviate users' inquietude.

```ts
import { VtsSpinModule } from '@ui-vts/ng-vts/spin';
```

## API

### vts-spin

| Property | Description | Type | Default Value | Global Config |
| -------- | ----------- | ---- | ------------- | ------------- |
| `[vtsDelay]` | specifies a delay in milliseconds for loading state (prevent flush), unit: milliseconds | `number` | - |
| `[vtsIndicator]` | the spinning indicator | `TemplateRef<void>` | - | ✅ |
| `[vtsSize]` | size of Spin | `'large' \| 'small' \| 'default'` | `'default'` |
| `[vtsSpinning]` | whether Spin is spinning | `boolean` | `true` |
| `[vtsSimple]` | whether Spin has no children | `boolean` | `false` |
| `[vtsTip]` | customize description content when Spin has children | `string` | - |
