---
order: 6
title:
  zh-CN: vtsSanitizer
  en-US: vtsSanitizer
---

## zh-CN

DomSanitizer 的 Pipe 实现

```html
<div [innerHTML]="html | vtsSanitizer: 'html'"></div>
<div [style]="style | vtsSanitizer: 'style'"></div>
<img [src]="url | vtsSanitizer: 'url'" />
<iframe [src]="resourceUrl | vtsSanitizer: 'resourceUrl'"></iframe>
```

## en-US

Pipe implementation of DomSanitizer


```html
<div [innerHTML]="html | vtsSanitizer: 'html'"></div>
<div [style]="style | vtsSanitizer: 'style'"></div>
<img [src]="url | vtsSanitizer: 'url'" />
<iframe [src]="resourceUrl | vtsSanitizer: 'resourceUrl'"></iframe>
```