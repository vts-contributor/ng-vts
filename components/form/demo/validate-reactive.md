---
order: 9
title:
  zh-CN: 响应式表单验证
  en-US: Reactive Forms Validation
---

## zh-CN

我们在 `vts-form-control` 上 提供了 `vtsValidateStatus` `vtsHasFeedback` 等属性，当使用[响应式表单](https://angular.io/guide/reactive-forms#reactive-forms)时，可以自己定义校验的时机和内容。

1. `vtsValidateStatus`: 校验状态，默认自动从 `vts-form-control` 中的 `NgControl` 获得校验状态，也可以手动指定为特定的 `NgControl`。
2. `vtsHasFeedback`：用于给输入框添加反馈图标。
3. `vtsSuccessTip` `vtsWarningTip` `vtsErrorTip` `vtsValidatingTip`：设置不同状态校验文案。
> 当同一种状态下存在多种提示情况时，`vtsSuccessTip` `vtsWarningTip` `vtsErrorTip` `vtsValidatingTip` 均支持传入 `TemplateRef<{ $implicit: FormControl }` 类型，可以通过[模板变量](https://www.angular.cn/guide/template-syntax)导出 `FormControl` 后用于切换不同的提示信息。
> 当 FormControl.status 为 `INVALID` 并且错误包含 `{warning：true}` 时，`vts-form-control` 显示警告状态。

## en-US

We provide properties like `vtsValidateStatus` `vtsHasFeedback` in `vts-form-control` to customize your own validate status and message, when using [reactive forms](https://angular.io/guide/reactive-forms#reactive-forms).

1. `vtsValidateStatus`: validate status of form components, the default status comes from the `NgControl` in `vts-form-control`, you can set other `NgControl` to it.
2. `vtsHasFeedback`: display feed icon of input control
3. `vtsSuccessTip` `vtsWarningTip` `vtsErrorTip` `vtsValidatingTip`：display validate message。
> When there are multiple tips in the same state, `vtsSuccessTip` `vtsWarningTip` `vtsErrorTip` `vtsValidatingTip` supports the passing `TemplateRef<{ $implicit: FormControl }` type, which can be used to switch tips after exporting `FormControl` via the [template syntax](https://angular.io/guide/template-syntax).
> When the FormControl.status is `INVALID`, and the errors contains `{warning:true}` , the `vts-form-control` display with warning status.
