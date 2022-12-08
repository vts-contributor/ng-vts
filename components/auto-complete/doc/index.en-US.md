---
category: Components
type: Data Entry
title: Autocomplete
cover: https://gw.alipayobjects.com/zos/alicdn/qtJm4yt45/AutoComplete.svg
---

Autocomplete function of input field.

## When To Use

When there is a need for autocomplete functionality.

```ts
import { VtsAutocompleteModule } from '@ui-vts/ng-vts/auto-complete';
```

## API

```html
<input vts-input [(ngModel)]="value" [vtsAutocomplete]="auto">
<vts-autocomplete [vtsDataSource]="['12345', '23456', '34567']" #auto></vts-autocomplete>
```

```html
<input vts-input [(ngModel)]="value" [vtsAutocomplete]="auto">
<vts-autocomplete #auto>
  <vts-auto-option [vtsValue]="'12345'">12345</vts-auto-option>
  <vts-auto-option [vtsValue]="'23456'">23456</vts-auto-option>
  <vts-auto-option [vtsValue]="'34567'">34567</vts-auto-option>
</vts-autocomplete>
```

### [vtsAutocomplete]

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `[vtsAutocomplete]` | used to bind `vtsAutocomplete` components | `VtsAutocompleteComponent` | - |

### vts-autocomplete

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `[vtsBackfill]` | backfill selected item the input when using keyboard | `boolean` | `false` |
| `[vtsDataSource]` | Data source for autocomplete | `AutocompleteDataSource` | - |
| `[vtsDefaultActiveFirstOption]` | Whether active first option by default | `boolean` | `true` |
| `[vtsWidth]` | Custom width, unit px | `number` | trigger element width |
| `[vtsOverlayClassName]` | Class name of the dropdown root element | `string` | - |
| `[vtsOverlayStyle]` | Style of the dropdown root element | `object` | - |
| `[vtsCustomCompareFn]` | Same as [SelectControlValueAccessor](https://angular.io/api/forms/SelectControlValueAccessor#caveat-option-selection) | `(o1: any, o2: any) => boolean` | `(o1: any, o2: any) => o1===o2` |

### vts-auto-option

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| `[vtsValue]` | bind ngModel of the trigger element  | `any` | - |
| `[vtsLabel]` | display value of the trigger element  | `string` | - |
| `[vtsDisabled]` | disabled option | `boolean` | `false` |