---
order: 11
title:
  en-US: Auto tips
---
## en-US

Make tips to be easy.  
Need to customize `Validators` and provide `vtsAutoTips` in advance, the priority is as follows:

- `Validators` > `vtsAutoTips`
- Via `@Input` set `vtsAutoTips`
- Via global config set `vtsAutoTips`

In addition, you can use `vtsDisableAutoTips` to disable it.

> Via the current locale (`zh-cn`, `en`...) is used as the `key` of `vtsAutoTips` to search for tips. If it is not found, it will be searched again with `default`.