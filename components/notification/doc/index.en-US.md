---
category: Components
type: Feedback
noinstant: true
title: Notification
cover: https://gw.alipayobjects.com/zos/alicdn/Jxm5nw61w/Notification.svg
---

Display a notification message globally.

## When To Use

To display a notification message at any of the four corners of the viewport. Typically it can be
used in the following cases:

- A notification with complex content.
- A notification providing a feedback based on the user interaction. Or it may show some details
  about upcoming steps the user may have to follow.
- A notification that is pushed by the application.

```ts
import { VtsNotificationModule } from '@ui-vts/ng-vts/notification';
```

## API

### VtsNotificationService

The component provides a number of service methods using the following methods and parameters:

- `VtsNotificationService.blank(title, content, [options])` // Notification without icon
- `VtsNotificationService.success(title, content, [options])`
- `VtsNotificationService.error(title, content, [options])`
- `VtsNotificationService.info(title, content, [options])`
- `VtsNotificationService.warning(title, content, [options])`

| Argument | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | `string` | - |
| content | Notification content | `string` | - |
| options | Support setting the parameters for the current notification box, see the table below | `object` | - |

The parameters that are set by the `options` support are as follows:

| Argument | Description | Type |
| --- | --- | --- |
| vtsKey | 	The unique identifier of the Notification | `string` |
| vtsDuration | Duration (milliseconds), does not disappear when set to 0 | `number` |
| vtsPauseOnHover | Do not remove automatically when mouse is over while setting to `true` | `boolean` |
| vtsAnimate | Whether to turn on animation | `boolean` |
| vtsStyle | Custom inline style | `object` |
| vtsClass | Custom CSS class | `object` |
| vtsData | Anything that would be used as template context | `any` |
| vtsCloseIcon | Custom close icon | `TemplateRef<void> \| string` |

Methods for destruction are also provided:

- `VtsNotificationService.remove(id)` // Remove the notification with the specified id. When the id is empty, remove all notifications (the notification id is returned by the above method)

### Global Configuration

You can use `VtsConfigService` to configure this component globally.

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| vtsDuration | Duration (milliseconds), does not disappear when set to 0 | `number` | 4500 |
| vtsMaxStack | The maximum number of notifications that can be displayed at the same time | `number` | 8 |
| vtsPauseOnHover | Do not remove automatically when mouse is over while setting to `true` | `boolean` | `true` |
| vtsAnimate | Whether to turn on animation | `boolean` | `true` |
| vtsTop | The top of the notification when it pops up from the top. | `string` | 24px |
| vtsBottom | The bottom of the notification when it pops up from the bottom. | `string` | 24px |
| vtsPlacement | Popup position, optional `topLeft` `topRight` `bottomLeft` `bottomRight` | `string` | `topRight` |
| vtsDirection | Direction of the text in the notification | `'ltr' \| 'rtl'` | - |

### VtsNotificationRef

It's the object that returned when you call `VtsNotificationService.success` and others.

```ts
export interface VtsNotificationRef {
  messageId: string;
  onClose: Subject<boolean>; // It would emit an event when the notification is closed, and emit a `true` if it's closed by user
  onClick: Subject<MouseEvent>;
}
```
