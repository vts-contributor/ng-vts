---
order: 9
title:
  en-US: Reactive Forms Validation
---
## en-US

We provide properties like `vtsValidateStatus` `vtsHasFeedback` in `vts-form-control` to customize your own validate status and message, when using [reactive forms](https://angular.io/guide/reactive-forms#reactive-forms).

1. `vtsValidateStatus`: validate status of form components, the default status comes from the `NgControl` in `vts-form-control`, you can set other `NgControl` to it.
2. `vtsHasFeedback`: display feed icon of input control
3. `vtsSuccessTip` `vtsWarningTip` `vtsErrorTip` `vtsValidatingTip`：display validate message。
> When there are multiple tips in the same state, `vtsSuccessTip` `vtsWarningTip` `vtsErrorTip` `vtsValidatingTip` supports the passing `TemplateRef<{ $implicit: FormControl }` type, which can be used to switch tips after exporting `FormControl` via the [template syntax](https://angular.io/guide/template-syntax).
> When the FormControl.status is `INVALID`, and the errors contains `{warning:true}` , the `vts-form-control` display with warning status.
