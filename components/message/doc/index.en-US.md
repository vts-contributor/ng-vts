---
category: Components
type: Feedback
noinstant: true
title: Message
cover: https://gw.alipayobjects.com/zos/alicdn/hAkKTIW0K/Message.svg
---

Display global messages as feedback in response to user operations.

## When To Use

- To provide feedback such as success, warning, error etc.
- A message is displayed at top and center and will be dismissed automatically, as a non-interrupting light-weighted prompt.

```ts
import { VtsMessageModule } from '@ui-vts/ng-vts/message';
```

## API

### VtsMessageService

This components provides some service methods, with usage and arguments as following:

- `VtsMessageService.success(content, [options])`
- `VtsMessageService.error(content, [options])`
- `VtsMessageService.info(content, [options])`
- `VtsMessageService.warning(content, [options])`
- `VtsMessageService.loading(content, [options])`

| Argument | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| content | The content of message | `string \| TemplateRef<void>` | - |
| options | Support setting the parameters for the current message box, see the table below | `object` | - |

The parameters that are set by the `options` support are as follows:

| Argument | Description | Type |
| --- | --- | --- |
| vtsDuration | Duration (milliseconds), does not disappear when set to 0 | `number` |
| vtsPauseOnHover | Do not remove automatically when mouse is over while setting to `true`  | `boolean` |
| vtsAnimate | Whether to turn on animation | `boolean` |

Methods for destruction are also provided:

- `message.remove(id)` // Remove the message with the specified id. When the id is empty, remove all messages (the message id is returned by the above method)

### Global Configuration

You can use `VtsConfigService` to configure this component globally. Please check the Global Configuration chapter for more information.

| Argument | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsDuration | Duration (milliseconds), does not disappear when set to 0 | `number` | `3000` |
| vtsMaxStack | The maximum number of messages that can be displayed at the same time | `number` | `7` |
| vtsPauseOnHover | Do not remove automatically when mouse is over while setting to `true` | `boolean` | `true` |
| vtsAnimate | Whether to turn on animation | `boolean` | `true` |
| vtsTop | Distance from top | `number \| string` | `24` |
| vtsDirection | Direction of the text in the messages | `'ltr' \| 'rtl'` | - |

### VtsMessageRef

It's the object that returned when you call `VtsMessageService.success` and others.

```ts
export interface VtsMessageRef {
  messageId: string;
  onClose: Subject<false>; // It would emit an event when the message is closed
}
```
