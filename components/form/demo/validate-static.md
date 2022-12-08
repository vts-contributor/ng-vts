---
order: 11
title:
  zh-CN: 手动指定表单状态
  en-US: Manual Set Validation Status
---

## zh-CN

用户可以在通过 `vts-form-control` 的 `vtsValidateStatus` 属性直接设定表单的状态。

1. `vtsValidateStatus`: 校验状态，可选 'success', 'warning', 'error', 'validating'。
2. `vtsHasFeedback`：用于给输入框添加反馈图标。
3. `vtsSuccessTip` `vtsWarningTip` `vtsErrorTip` `vtsValidatingTip`：设置不同状态校验文案。

## en-US

You can set the form status directly via the `vtsValidateStatus` on `vts-form-control`.

1. `vtsValidateStatus`: validate status of form components which could be 'success', 'warning', 'error', 'validating'.
2. `vtsHasFeedback`: display feed icon of input control
3. `vtsSuccessTip` `vtsWarningTip` `vtsErrorTip` `vtsValidatingTip`：display validate message。
