---
category: Components
type: Components
title: DatePicker
cols: 1
order: 4
cover: https://gw.alipayobjects.com/zos/alicdn/RT_USzA48/DatePicker.svg
---

```ts
import { VtsDatePickerModule } from '@ui-vts/ng-vts/date-picker';
import { VtsFormModule } from '@ui-vts/ng-vts/form'; // To use in form
```


## API

### vts-date-picker

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsDisabled | Disable picker | `boolean` | `false`
| vtsAutoFocus | Set autofocus on mounted | `boolean` | `false`
| vtsAllowClear | Show clear button | `boolean` | `true`
| vtsSize | Size of input | One of `xl` `lg` `md` `sm` | `md`
| vtsDefaultPickerValue | Specify a date to be in-view of picker dialog | `Date` | `new Date()`
| vtsDropdownClassName | Classname of picker dialog | `string` |
| vtsInputReadOnly | Prevent typing | `boolean` | `false`
| vtsMode | Picker mode | One of `year` `month` `week` `date`<br> Note that ngModelChange always return `Date`, use `date-fns` to parse data for external uses | `date`
| vtsPlaceholder | Placeholder of datepicker | `string` | 
| vtsPlacement | Placement of datepicker | `topLeft` `topRight` `bottomLeft` `bottomRight` | `bottomLeft` 
| vtsSuffixIcon | Customize suffix icon | `string`(icon name) or `TemplateRef` | `suffix:vts-picker`
| vtsRenderExtraFooter | Append custom footer below picker | `TemplateRef` or `string` or `(() => TemplateRef \| string)` |
| [(ngModel)] | Angular ngModel | `Date` |
| [(vtsOpen)] | Bind open/close state | `EventEmitter<boolean>` |
| open | Open picker dialog | Callable function |
| close | Close picker dialog | Callable function |

### vts-date-picker[vtsMode="date"]
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsShowTime | Use timepicker along with datepicker | `boolean` | `false`
| vtsDateRender | Custom date renderer | `TemplateRef<Date>` or `string` or `(d: Date) => TemplateRef<Date> \| string` |
| vtsDisabledDate | Specify dates that cannot be selected | `(current: Date) => boolean` |
| vtsFormat | Specify datatime format | `string` | `dd/MM/yyyy` by default <br/> `dd/MM/yyyy hh:mm:ss` for `vtsShowTime`

### vts-date-picker[vtsMode="week"]
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsFormat | Specify week format | `string` | `ww-yyyy`
| vtsDisabledDate | Specify dates that cannot be selected | `(current: Date) => boolean` |

### vts-date-picker[vtsMode="month"]
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsFormat | Specify month format | `string` | `MMM yyyy`
| vtsDisabledDate | Specify dates that cannot be selected | `(current: Date) => boolean` |

### vts-date-picker[vtsMode="year"]
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsFormat | Specify year format | `string` | `yyyy`
| vtsDisabledDate | Specify dates that cannot be selected | `(current: Date) => boolean` |

### vts-range-picker-single 
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsDisabled | Disable picker | `boolean` | `false`
| vtsPlaceholder | Placeholder of datepicker | `string` | 
| vtsSize | Size of input | One of `xl` `lg` `md` `sm` | `md`
| [(ngModel)] | Angular ngModel | `[Date, Date]` |
| vtsPlacement | Placement of datepicker | `topLeft` `topRight` `bottomLeft` `bottomRight` | `bottomLeft`

### vts-range-picker-multiple
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| gutter | Specify the width of icon between 2 picker | `number` | `26`
| vtsDisabled | Disable picker | `boolean` | `false`
| vtsPlaceholder | Placeholder of datepickers | `string` or `[string, string]` | 
| vtsSize | Size of input | One of `xl` `lg` `md` `sm` | `md`
| [(ngModel)] | Angular ngModel | `[Date, Date]` |
| vtsFormat | Specify datatime format | `string` | `dd/MM/yyyy` by default <br/> `dd/MM/yyyy hh:mm:ss` for `vtsShowTime`
| vtsShowTime | Use timepicker along with datepicker | `boolean` | `false`
| vtsAutoOpen | Whether to open the other picker (if value is empty) when one's value is setted<br/>Note: If one's value invalidate the date range, the other will be setted to empty, this mode will open that empty one to reselect | `boolean` | `false`
| vtsPlacement | Placement of datepicker | `topLeft` `topRight` `bottomLeft` `bottomRight` | `bottomLeft` 