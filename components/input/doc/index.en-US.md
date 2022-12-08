---
category: Components
type: Components
title: Textfield
cols: 1
order: 2
cover: https://gw.alipayobjects.com/zos/alicdn/xS9YEJhfe/Input.svg
---

```ts
import { VtsInputModule } from '@ui-vts/ng-vts/input';
import { VtsFormModule } from '@ui-vts/ng-vts/form'; // To use in form
```

## API

### [input[vts-input]]

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsSize | Size of input | One of `xl` `lg` `md` `sm` | `md`
| disabled | Disable input | `boolean` | `false`

### vts-input-group

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsSize | Size of input | One of `xl` `lg` `md` `sm` | `md`
| vtsAddOnBefore | Display text or custom template on the left side of group (seperated by border) | `string` or `TemplaleRef` |
| vtsAddOnAfter | Display text or custom template on the right side of group (seperated by border) | `string` or `TemplaleRef` |
| vtsPrefix | Display text or custom template on the left side of inner input | `string` or `TemplaleRef` |
| vtsSuffix | Display text or custom template on the left side of inner input | `string` or `TemplaleRef` |