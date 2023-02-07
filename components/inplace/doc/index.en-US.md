---
category: Components
type: Components
title: Inplace
cols: 1
order: 18
cover: https://gw.alipayobjects.com/zos/alicdn/xS9YEJhfe/Input.svg
---

```ts
import { VtsInplaceModule } from '@ui-vts/ng-vts/inplace';
```
Inplace provides an easy to do editing and display at the same time where clicking the output displays the actual content.
## API


### vts-inplace

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsIcon | Icon of element | `string` | `null`
| active | Whether the content is displayed or not. | `boolean`  | `false`
| preventClick| When enabled, instead of click events, the component can be controlled full programmatic with activate() and deactivate() functions. | `boolean` | `false`
| disabled | When present, it specifies that the element should be disabled. | `boolean`  | `false`
| closable | Displays a button to switch back to display mode. | `boolean` | `false`


### vtsInplaceDisplay

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsInplaceDisplay | Show the display container when the content container is not activated | `TemplaleRef` |


### vtsInplaceContent

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsInplaceContent | Show the content container when the is activated | `TemplaleRef` |
