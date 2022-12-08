---
order: 10
title:
  zh-CN: 获得选项的对象
  en-US: Get option object of selected item
---

## zh-CN

`ngModel` 取到的值为选中 `vts-option` 的 `vtsValue` 值，当 `vtsValue` 传入为一个对象时，`ngModel` 获取的值也是一个对象，`vtsCustomCompareFn` 的用法参见 [这里](https://angular.io/api/forms/SelectControlValueAccessor#caveat-option-selection).

## en-US

The value of `ngModel` comes from the `vtsValue` of `vts-option`, when the `vtsValue` of `vts-option`  is an object, the `ngModel` will be an object too, the usage of `vtsCustomCompareFn` is the same as [SelectControlValueAccessor](https://angular.io/api/forms/SelectControlValueAccessor#caveat-option-selection).