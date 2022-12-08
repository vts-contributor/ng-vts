---
category: Components
type: Feedback
title: Result
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/9nepwjaLa/Result.svg
---

Used to feed back the results of a series of operational tasks.

## When To Use

Use when important operations need to inform the user to process the results and the feedback is more complicated.

```ts
import { VtsResultModule } from '@ui-vts/ng-vts/result';
```

## API

### vts-result

| Property     | Description                             | Type                                                                              | Default  |
| ------------ | --------------------------------------- | --------------------------------------------------------------------------------- | -------- |
| `vtsTitle`    | title                                   | `TemplateRef<void>` \| `string`                                                   | -        |
| `vtsSubTitle` | subTitle                                | `TemplateRef<void>` \| `string`                                                   | -        |
| `vtsStatus`   | result status, decides icons and colors | `'success' \| 'error' \| 'info' \| 'warning'\| '404' \| '403' \| '500'` \| 'info' | `'info'` |
| `vtsIcon`     | custom icon                             | `TemplateRef<void>` \| `string`                                                   | -        |
| `vtsExtra`    | operating area                          | `TemplateRef<void>` \| `string`                                                   | -        |

### Counter Parts

You can use these directives as children of vts-result.

| Directive                                | Description                              |
| ---------------------------------------- | ---------------------------------------- |
| `i[vts-result-icon], div[vts-result-icon]` | custom icon                              |
| `div[vts-result-title]`                   | title                                    |
| `div[vts-result-subtitle]`                | subtitle                                 |
| `div[vts-result-content]`                 | contents, for detailed explanations      |
| `div[vts-result-extra]`                   | extra content, usually an operating area |
