---
category: Components
type: Components
noinstant: true
title: Toast
cols: 1
cover: ''
order: 100
---

## API

### VtsToastService

<b>Methods for creating toast:</b>

- `VtsToastService.success(title, content, [options])`
- `VtsToastService.error(title, content, [options])`
- `VtsToastService.info(title, content, [options])`
- `VtsToastService.warning(title, content, [options])`
- `VtsToastService.create(type, title, content, [options])`

| Argument | Description | Type | Default |
| --- | --- | --- | --- |
| type | Type of toast | `'success' \| 'info' \| 'warning' \| 'error'` |
| title | Title | `string` |
| content | Toast content | `string` |
| options | Support setting the parameters for the current toast box, see the table below | `object` |

<br />
<p>
The parameters that are set by the `options` support are as follows:  
</p>

| Argument | Description | Type | Default |
| --- | --- | --- | --- |
| vtsKey | 	The unique identifier of the Toast | `string` |
| vtsDuration | Duration (milliseconds), does not disappear when set to 0 | `number` | `5000`
| vtsPauseOnHover | Do not remove automatically when mouse is over while setting to `true` | `boolean` |
| vtsAnimate | Whether to turn on animation | `boolean` | `true`
| vtsStyle | Custom inline style | `object` |
| vtsClass | Custom CSS class | `object` |
| vtsData | Anything that would be used as template context | `any` |
| vtsPlacement | Placement of toast | `'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight'` |
| vtsTheme | Theme of Toast | `outline` or `fill` | `outline` |
| vtsShowIcon | Whether to show prefix icon | `boolean` | `true` |
| vtsCloseText | Customize close text or template to show | `string \| TemplateRef<void>` |
| vtsIconType | Prefix icon type, effective when `vtsShowIcon` is `true` | `string` |

<br/>
<b>Methods for destroying toast:</b>
<br/>

<p>
Remove the toast with the specified id. When the id is empty, remove all toasts (the toast id is returned by the above method).  
</p>

- `VtsToastService.remove(id)`

<b>VtsToastRef</b>
<br/>

This is the object that returned when you call `VtsToastService.success` and others.

| Field | Description | Type |
| --- | --- | --- |
| messageId | Id of created toast, used in service destruction function | `string` |
| onClose | Emit on toast instance closing | `Subject<boolean>` |
| onClick | Emit on toast instance clicked | `Subject<MouseEvent>` |