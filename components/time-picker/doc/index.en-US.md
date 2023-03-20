---
category: Components
type: Components
title: TimePicker
cols: 1
order: 14
cover: https://gw.alipayobjects.com/zos/alicdn/h04Zsl98I/TimePicker.svg
---

```ts
import { VtsTimePickerModule } from '@ui-vts/ng-vts/time-picker';
```


## API

### vts-time-picker

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsDisabled | Disable picker | `boolean` | `false`
| vtsAutoFocus | Set autofocus on mounted | `boolean` | `false`
| vtsAllowClear | Show clear button | `boolean` | `true`
| vtsSize | Size of input | One of `xl` `lg` `md` `sm` | `md`
| vtsDropdownClassName | Classname of picker dialog | `string` |
| vtsInputReadOnly | Prevent typing | `boolean` | `false`
| vtsPlaceholder | Placeholder of datepicker | `string` | 
| vtsUse12Hours | Use 12-hour mode | `boolean` | `false`
| vtsSuffixIcon | Customize suffix icon | `string`(icon name) or `TemplateRef` | `Time`
| vtsDefaultOpenValue | Default open value if `ngModel` is null | `Date` |
| vtsNowText | Text of Now button, set empty to hide button | `string` | `Now`
| vtsDisabledHours | Specify hours that cannot be selected | `() => number[]` |
| vtsDisabledMinutes | Specify minutes that cannot be selected | `(hour: number) => number[]` |
| vtsDisabledSeconds | Specify hours that cannot be selected | `(hour: number, minute: number) => number[]` |
| vtsHourStep | Step between hours | `number` | `1`
| vtsMinuteStep | Step between minutes | `number` | `1`
| vtsSecondStep | Step between seconds | `number` | `1`
| [(ngModel)] | Angular ngModel | `Date` |
| [(vtsOpen)] | Bind open/close state | `EventEmitter<boolean>` |
| open | Open picker dialog | Callable function |
| close | Close picker dialog | Callable function |

### vts-time-picker[vtsUse12Hours="true"]
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsFormat | Specify time format | `string` | `HH:mm:ss`

### vts-time-picker[vtsUse12Hours="false"]
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsFormat | Specify time format | `string` | `h:mm:ss a`