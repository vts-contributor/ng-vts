---
order: 11
title:
  zh-CN: 自动提示
  en-US: Auto tips
---

## zh-CN

让提示变得更简单。  
需要预先自定义 `Validators` 和提供 `vtsAutoTips`，它们优先级如下：

- `Validators` > `vtsAutoTips`
- 通过 `@Input` 设置 `vtsAutoTips`
- 通过全局配置设置 `vtsAutoTips`

另外，你可以使用 `vtsDisableAutoTips` 去禁用它。

> 使用当前的语言环境(`zh-cn`,`en`...)作为 `vtsAutoTips` 的 `key` 去查找提示，如果没找到会再用 `default` 查找一次。

## en-US

Make tips to be easy.  
Need to customize `Validators` and provide `vtsAutoTips` in advance, the priority is as follows:

- `Validators` > `vtsAutoTips`
- Via `@Input` set `vtsAutoTips`
- Via global config set `vtsAutoTips`

In addition, you can use `vtsDisableAutoTips` to disable it.

> Via the current locale (`zh-cn`, `en`...) is used as the `key` of `vtsAutoTips` to search for tips. If it is not found, it will be searched again with `default`.