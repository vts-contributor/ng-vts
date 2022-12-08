---
category: Components
type: Data Entry
title: Mention
cover: https://gw.alipayobjects.com/zos/alicdn/jPE-itMFM/Mentions.svg
---

Mention component.

## When To Use

When need to mention someone or something.

```ts
import { VtsMentionModule } from '@ui-vts/ng-vts/mention';
```

## API

```html
<vts-mention [vtsSuggestions]="suggestions">
 <textarea
    vts-input
    [(ngModel)]="value"
    vtsMentionTrigger>
  </textarea>
</vts-mention>
```

### vts-mention

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `[vtsMentionTrigger]` | Trigger element **(required)** | `HTMLTextAreaElement \| HTMLInputElement` | - |
| `[vtsMentionSuggestion]` | Customize the suggestion template | `TemplateRef<any>` | - |
| `[vtsLoading]` | Loading mode | `boolean` | `false` |
| `[vtsNoResult]` | Suggestion when suggestions empty | `string` | `'无匹配结果，轻敲空格完成输入'` |
| `[vtsPlacement]` | The position of the suggestion relative to the target, which can be one of top and bottom | `'button' \| 'top'` | `'bottom'` |
| `[vtsPrefix]` | Character which will trigger Mention to show mention list | `string \| string[]` | `'@'` |
| `[vtsSuggestions]` | Suggestion content | `any[]` | `[]` |
| `[vtsValueWith]` | Function that maps an suggestion's value  | `(any) => string \| (value: string) => string` |
| `(vtsOnSelect)` | Callback function called when select from suggestions | `EventEmitter<any>` | - |
| `(vtsOnSearchChange)` | Callback function called when search content changes| `EventEmitter<MentionOnSearchTypes>` | - |

#### Methods

| Name | Description |
| --- |--- |
| getMentions | Get the mentions array in the `input[vtsMentionTrigger]` |

### vtsMentionTrigger
Trigger element

```html
<vts-mention>
 <textarea vtsMentionTrigger></textarea>
</vts-mention>
```

```html
<vts-mention>
 <input vtsMentionTrigger>
</vts-mention>
```

### vtsMentionSuggestion
Customize the suggestion template

```html
  <vts-mention
    [vtsSuggestions]="items"
    [vtsValueWith]="valueWith">
    <input vts-input vtsMentionTrigger>
    <ng-container *vtsMentionSuggestion="let item">
        <span>{{ item.label }} - {{ item.value }}</span>
    </ng-container>
  </vts-mention>
```

### MentionOnSearchTypes

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| value | Search keyword | `string` | - |
| prefix | prefix | `string` | - |
