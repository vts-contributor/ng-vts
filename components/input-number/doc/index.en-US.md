---
category: Components
type: Data Entry
title: InputNumber
cover: https://gw.alipayobjects.com/zos/alicdn/XOS8qZ0kU/InputNumber.svg
---

Enter a number within certain range with the mouse or keyboard.

## When To Use

When a numeric value needs to be provided.

```ts
import { VtsInputNumberModule } from '@ui-vts/ng-vts/input-number';
```

## API

### vts-input-number

| property | description | type | default |
| -------- | ----------- | ---- | ------- |
| `[ngModel]` | current value, double binding | `number \| string`  \|  `string` | - |
| `[vtsAutoFocus]` | get focus when component mounted | `boolean` | `false` |
| `[vtsDisabled]` | disable the input | `boolean` | `false` |
| `[vtsMax]` | max value | `number` | `Infinity` |
| `[vtsMin]` | min value | `number` | `-Infinity` |
| `[vtsFormatter]` | Specifies the format of the value presented | `(value: number \| string) => string \| number` | - |
| `[vtsParser]` | Specifies the value extracted from vtsFormatter | `(value: string) => string \| number` | `(value: string) => value.trim().replace(/。/g, '.').replace(/[^\w\.-]+/g, '')` |
| `[vtsPrecision]` | precision of input value | `number` | - |
| `[vtsPrecisionMode]` | The method for calculating the precision of input value | `'cut' \| 'toFixed' \| ((value: number \| string, precision?: number) => number)` | `'toFixed'` |
| `[vtsSize]` | width of input box | `'large' \| 'small' \| 'default'` | `'default'` |
| `[vtsStep]` | The number to which the current value is increased or decreased. It can be an integer or decimal. | `number \| string` | `1` |
| `[vtsInputMode]` | enumerated attribute that hints at the type of data that might be entered by the user, [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) | `string` | `decimal` |
| `[vtsPlaceHolder]` | Placeholder of select | `string` | - |
| `[vtsId]` | input id attribute inside the component| `string` | - |
| `(ngModelChange)` | The callback triggered when the value is changed | `EventEmitter<number>` | - |
| `(vtsFocus)` | focus callback | `EventEmitter<void>` | - |
| `(vtsBlur)` | blur callback | `EventEmitter<void>` | - |

#### Methods

You can get instance by `ViewChild`

| Name | Description |
| ---- | ----------- |
| focus() | get focus |
| blur() | remove focus |
