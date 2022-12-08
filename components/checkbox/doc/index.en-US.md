---
category: Components
type: Components
title: Checkbox
cols: 1
order: 7
cover: https://gw.alipayobjects.com/zos/alicdn/8nbVbHEm_/CheckBox.svg
---

```ts
import { VtsCheckboxModule } from '@ui-vts/ng-vts/checkbox';
import { VtsFormModule } from '@ui-vts/ng-vts/form'; // To use in form
```

## API

### vts-checkbox-wrapper
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsDisabled | Disable all checkbox | `boolean` | `false`
| vtsOnChange | Emit selected values | `EventEmitter<any>` |

### [vts-checkbox]

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsDisabled | Disable checkbox option | `boolean` | `false`
| vtsAutoFocus | Set autofocus on mounted | `boolean` | `false`
| vtsValue | Value of option | `any` |
| vtsIndeterminate | Indeterminate status | `boolean` | `false`
| [(ngModel)] | Angular ngModel (checked state) | `boolean` |