---
category: Components
type: Feedback
noinstant: true
title: Toast
cover: ''
---

Display a toast message globally.

## When To Use

To display a toast message at any of the four corners of the viewport. Typically it can be
used in the following cases:

- A toast with complex content.
- A toast that is pushed by the application.
- A toast that is in a form.

```ts
import { VtsToastModule } from '@ui-vts/ng-vts/toast';
```

## API

### VtsToastService

The component provides a number of service methods using the following methods and parameters:

- `VtsToastService.blank(title, content, [options])` // Toast without icon
- `VtsToastService.success(title, content, [options])`
- `VtsToastService.error(title, content, [options])`
- `VtsToastService.info(title, content, [options])`
- `VtsToastService.warning(title, content, [options])`
- `VtsToastService.create(type, title, content, showIcon, form,  [options])`

| Argument | Description | Type | Default |
| --- | --- | --- | --- |
| type | Type of toast (`'success' \| 'info' \| 'warning' \| 'error' \| 'blank'`) | `string` | `'blank'` |
| title | Title | `string` | - |
| content | Toast content | `string` | - |
| showIcon | Whether to turn on animation | `boolean` | false |
| form | Whether to turn on animation | `boolean` | false |
| options | Support setting the parameters for the current toast box, see the table below | `object` | - |

The parameters that are set by the `options` support are as follows:

| Argument | Description | Type |
| --- | --- | --- |
| vtsKey | 	The unique identifier of the Toast | `string` |
| vtsDuration | Duration (milliseconds), does not disappear when set to 0 | `number` |
| vtsPauseOnHover | Do not remove automatically when mouse is over while setting to `true` | `boolean` |
| vtsAnimate | Whether to turn on animation | `boolean` |
| vtsStyle | Custom inline style | `object` |
| vtsClass | Custom CSS class | `object` |
| vtsData | Anything that would be used as template context | `any` |

Methods for destruction are also provided:

- `VtsToastService.remove(id)` // Remove the toast with the specified id. When the id is empty, remove all toasts (the toast id is returned by the above method)

### Global Configuration

You can use `VtsConfigService` to configure this component globally.

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| vtsDuration | Duration (milliseconds), does not disappear when set to 0 | `number` | 4500 |
| vtsMaxStack | The maximum number of toasts that can be displayed at the same time | `number` | 8 |
| vtsPauseOnHover | Do not remove automatically when mouse is over while setting to `true` | `boolean` | `true` |
| vtsAnimate | Whether to turn on animation | `boolean` | `true` |
| vtsTop | The top of the toast when it pops up from the top. | `string` | 24px |
| vtsBottom | The bottom of the toast when it pops up from the bottom. | `string` | 24px |
| vtsPlacement | Popup position, optional `topLeft` `topRight` `bottomLeft` `bottomRight` | `string` | `topRight` |
| vtsDirection | Direction of the text in the toast | `'ltr' \| 'rtl'` | - |

### VtsToastRef

It's the object that returned when you call `VtsToastService.success` and others.

```ts
export interface VtsToastRef {
  messageId: string;
  onClose: Subject<boolean>; // It would emit an event when the toast is closed, and emit a `true` if it's closed by user
  onClick: Subject<MouseEvent>;
}
```
