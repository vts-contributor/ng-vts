---
order: 10
title:
  en-US: Template-driven Forms Validation
---
## en-US

When using [template-driven forms](https://angular.io/guide/forms#template-driven-forms), the form could change its status via the template setting.

1. `vtsHasFeedback`: display feed icon of input control
2. `vtsSuccessTip` `vtsWarningTip` `vtsErrorTip` `vtsValidatingTip`：display validate message。
> When there are multiple tips in the same state, `vtsSuccessTip` `vtsWarningTip` `vtsErrorTip` `vtsValidatingTip` supports the passing `TemplateRef<{ $implicit: NgModel }` type, which can be used to switch tips after exporting `NgModel` via the [template syntax](https://angular.io/guide/template-syntax).