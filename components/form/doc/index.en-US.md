---
category: Components
type: Data Entry
cols: 1
title: Form
cover: https://gw.alipayobjects.com/zos/alicdn/ORmcdeaoO/Form.svg
---

Form is used to collect, validate, and submit the user input, usually contains various form items including checkbox, radio, input, select, and etc.

Form is totally based on [Angular Forms](https://angular.io/guide/forms#forms), you can use [reactive forms](https://angular.io/guide/reactive-forms#reactive-forms) or [template-driven-forms](https://angular.io/guide/forms#template-driven-forms).

> Please make sure you have read the official form document before using the component.

## Form

You can align the controls of a `form` using the `layout` prop：

- `horizontal`：to horizontally align the `label`s and controls of the fields. (Default)
- `vertical`：to vertically align the `label`s and controls of the fields.
- `inline`：to render form fields in one line.

### vts-form-item

Used to separate the item in forms, contains label(optional) and control field.

### vts-form-label

The label of the form item, optional.

### vts-form-control

A form consists of one or more form fields whose type includes input, textarea, checkbox, radio, select, tag, and more.

```html
<form vts-form>
  <vts-form-item>
    <vts-form-label [vtsSpan]="6" vtsFor="email">E-mail</vts-form-label>
    <vts-form-control [vtsSpan]="14">
      <input vts-input name="email" type="email" id="email">
    </vts-form-control>
  </vts-form-item >
</form>
```

```ts
import { VtsFormModule } from '@ui-vts/ng-vts/form';
```

## API

### [vts-form]

| Property | Description | Type | Default Value | Global Config |
| -------- | ----------- | ---- | ------------- | ------------- |
| `[vtsLayout]`| Form layout | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'` |
| `[vtsAutoTips]`| Set default props `[vtsAutoTips]` value of `vts-form-control`, please refer to the example: **Auto tips** | `Record<string, Record<string, string>>` | `{}` | ✅ |
| `[vtsDisableAutoTips]`| Set default props `[vtsDisableAutoTip]` value of `vts-form-control` | `boolean` | `false` | ✅ |
| `[vtsNoColon]`| Set default props `[vtsNoColon]` value of `vts-form-label` | `boolean` | `false` | ✅ |
| `[vtsTooltipIcon]`| Set default props `[vtsTooltipIcon]` value of `vts-form-label` | `string \| { type: string; theme: ThemeType }` | `{ type: 'question-circle', theme: 'outline' }` | ✅ |

### vts-form-item

Used to separate the item in forms, contains label(optional) and control field.

> All api in [vts-row](/components/grid/zh) can be used in `vts-form-item`.

### vts-form-label

The label of the form item, optional.

> All api in [vts-col](/components/grid/zh) can be used in `vts-form-label`.

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| `[vtsRequired]`| add required style to current item | `boolean` | `false` |
| `[vtsNoColon]`| whether to not display `:` after label text. | `boolean` | `false` |
| `[vtsFor]`| The `for` property of `label` | `string` | - |
| `[vtsTooltipTitle]`| Set tooltip info | `string \| TemplateRef<void>` | - |
| `[vtsTooltipIcon]`| Set icon of tooltip info | `string \| VtsFormTooltipIcon` | - |

### vts-form-control
> Note：Due to the lack of partial Observable in [Angular Form](https://github.com/angular/angular/issues/10887), you have to notify `vts-form-control` to update its status with `updateValueAndValidity` when you update form status using methods like `markAsDirty`.

A form consists of one or more form fields whose type includes input, textarea, checkbox, radio, select, tag, and more.

> All api in [vts-col](/components/grid/zh) can be used in `vts-form-control`.

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| `[vtsValidateStatus]` | Will generate status based on the input `FormControl`, `NgModel` or string, the default value is the first `FormControl` or `NgModel` in `vts-form-control` | `'success' \| 'warning' \| 'error' \| 'validating'  \|  FormControl  \|  NgModel` | first `FormControl` or `NgModel` in `vts-form-control` |
| `[vtsHasFeedback]`| Used with `vtsValidateStatus`, this option specifies the validation status icon. Recommended to be used only with `Input`. | `boolean` | `false` |
| `[vtsExtra]`| The extra prompt message | `string  \|  TemplateRef<void>` | - |
| `[vtsSuccessTip]`| Tip display when validate success  | `string  \|  TemplateRef<{ $implicit: FormControl  \|  NgModel }>` | - |
| `[vtsWarningTip]`| Tip display when validate warning | `string  \|  TemplateRef<{ $implicit: FormControl  \|  NgModel }>` | - |
| `[vtsErrorTip]`| Tip display when validate error | `string  \|  TemplateRef<{ $implicit: FormControl  \|  NgModel }>` | - |
| `[vtsValidatingTip]`| Tip display when validating | `string  \|  TemplateRef<{ $implicit: FormControl  \|  NgModel }>` | - |
| `[vtsAutoTips]`| The object of the tips, please refer to the example: **Auto tips** | `Record<string, string \| Record<string, string>>` | - | - |
| `[vtsDisableAutoTips]`| Disable Auto Tips | `boolean` | - | - |

### vts-form-split

The split icon of `-`

### vts-form-text

Text in `vts-form-control`

