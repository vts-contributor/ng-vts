---
type: Components
category: Components
subtitle:
col: 1
order: 20
title: Drawer
cover: https://gw.alipayobjects.com/zos/alicdn/7z8NJQhFb/Drawer.svg
---

A Drawer is a panel that is typically overlaid on top of a page and slides in from the side. It contains a set of information or actions. Since that user can interact with the Drawer without leaving the current page, tasks can be achieved more efficient within the same context.

## When To Use

* Use a Form to create or edit a set of information.
* Processing subtasks. When subtasks are too heavy for Popover and we still want to keep the subtasks in the context of the main task, Drawer comes very handy.
* When a same Form is needed in multiple places.

```ts
import { VtsDrawerModule } from '@ui-vts/ng-vts/drawer';
```

## API

### vts-drawer

| Props | Description | Type | Default | Global Config |
| --- | --- | --- | --- | --- |
| `[vtsClosable]` | Whether a close (x) button is visible on top right of the Drawer dialog or not. | `boolean` | `true` |
| `[vtsCloseIcon]` | Custom close icon | `string \| TemplateRef<void> \| null` | `'close'` |
| `[vtsMask]` | Whether to show mask or not. | `boolean` | `true` | ✅ |
| `[vtsMaskClosable]` | Clicking on the mask (area outside the Drawer) to close the Drawer or not. | `boolean` | `true` | ✅ |
| `[vtsCloseOnNavigation]` | Whether to close the drawer when the user goes backwards/forwards in history. Note that this usually doesn't include clicking on links (unless the user is using the HashLocationStrategy). | `boolean` | `true` | ✅ |
| `[vtsKeyboard]` | Whether support press esc to close | `boolean` | `true` |
| `[vtsMaskStyle]` | Style for Drawer's mask element. | `object` | `{}` |
| `[vtsBodyStyle]` | Body style for drawer body element. Such as height, padding etc. | `object` | `{}` |
| `[vtsTitle]` | The title for Drawer. | `string \| TemplateRef<void>` | - |
| `[vtsFooter]` | The footer for Drawer. | `string \| TemplateRef<void>` | - |
| `[vtsVisible]` | Whether the Drawer dialog is visible or not, you can use `[(vtsVisible)]` two-way binding | `boolean` | `false` |
| `[vtsPlacement]` | The placement of the Drawer. | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` |
| `[vtsWidth]` | Width of the Drawer dialog, only when placement is `'right'` or `'left'`.  | `number \| string` | `256` |
| `[vtsHeight]` | Height of the Drawer dialog, only when placement is `'top'` or `'bottom'`.  | `number \| string` | `256` |
| `[vtsOffsetX]` | The the X coordinate offset(px), only when placement is `'right'` or `'left'`. | `number` | `0` |
| `[vtsOffsetY]` | The the Y coordinate offset(px), only when placement is `'top'` or `'bottom'`. | `number` | `0` |
| `[vtsWrapClassName]` | The class name of the container of the Drawer dialog. | `string` | - |
| `[vtsZIndex]` | The `z-index` of the Drawer. | `number` | `1000` |
| `(vtsOnClose)` | Specify a callback that will be called when a user clicks mask, close button or Cancel button. | `EventEmitter<MouseEvent>` | - |

### VtsDrawerService

| Method | Description | Params | Return |
| --- | --- | --- | --- |
| create<T, D, R> | create and open an Drawer | `VtsDrawerOptions<T, D>`| `VtsDrawerRef<T, R>` |

### VtsDrawerOptions

| Params | Description | Type | Default | Global Config |
| --- | --- | --- | --- | --- |
| vtsContent |  The drawer body content. | `TemplateRef<{ $implicit: D, drawerRef: VtsDrawerRef }> \| Type<T>` | - |
| vtsContentParams | The component inputs the param / The Template context. | `D` | - |
| vtsClosable | Whether a close (x) button is visible on top right of the Drawer dialog or not. | `boolean` | `true` |
| vtsCloseIcon | Custom close icon | `string \| TemplateRef<void> \| null` | `'close'` |
| vtsOnCancel | Execute when click on the mask or the upper cancel button, This function returns a promise, which is automatically closed when the execution is complete or the promise ends (return false to prevent closing) | `() => Promise<any>` | - |
| vtsMaskClosable | Clicking on the mask (area outside the Drawer) to close the Drawer or not. | `boolean` | `true` | ✅ |
| vtsCloseOnNavigation    | Whether to close the drawer when the user goes backwards/forwards in history. Note that this usually doesn't include clicking on links (unless the user is using the HashLocationStrategy). | `boolean` | `true` | ✅ |
| vtsMask | Whether to show mask or not. | `boolean` | `true` | ✅ |
| vtsDirection        | Direction of the text in the modal | `'ltr' \| 'rtl'` | - | ✅ |
| vtsKeyboard | Whether support press esc to close | `boolean` | `true` |
| vtsMaskStyle | Style for Drawer's mask element. | `object` | `{}` |
| vtsBodyStyle | Body style for modal body element. Such as height, padding etc. | `object` | `{}` |
| vtsTitle | The title for Drawer. | `string \| TemplateRef<void>` | - |
| vtsFooter | The footer for Drawer. | `string \| TemplateRef<void>` | - |
| vtsWidth |  Width of the Drawer dialog.  | `number \| string` | `256` |
| vtsHeight | Height of the Drawer dialog, only when placement is `'top'` or `'bottom'`.  | `number \| string` | `256` |
| vtsWrapClassName | The class name of the container of the Drawer dialog. | `string` | - |
| vtsZIndex| The `z-index` of the Drawer. | `number` | `1000` |
| vtsPlacement | The placement of the Drawer. | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` |
| vtsOffsetX | The the X coordinate offset(px). | `number` | `0` |
| vtsOffsetY | The the Y coordinate offset(px), only when placement is `'top'` or `'bottom'`. | `number` | `0` |

### VtsDrawerRef

#### Methods
| Name | Description | Type |
| --- | --- | --- |
| close | close the drawer. | `(result?: R) => void` |
| open | open the drawer. | `() => void` |
| getContentComponent| Returns the instance when `vtsContent` is the component. | `() => T \| null` |

#### Property
| Name | Description | Type |
| --- | --- | --- |
| afterOpen | Callback called after open. | `Observable<void>` |
| afterClose | Callback called after close. | `Observable<R>` |
| vtsCloseIcon | Custom close icon | `string \| TemplateRef<void> \| null` |
| vtsClosable | Whether a close (x) button is visible on top right of the Drawer dialog or not. | `boolean` |
| vtsMaskClosable | Clicking on the mask (area outside the Drawer) to close the Drawer or not. | `boolean` |
| vtsMask | Whether to show mask or not. | `boolean` |
| vtsKeyboard | Whether support press esc to close | `boolean` |
| vtsMaskStyle | Style for Drawer's mask element. | `object` |
| vtsBodyStyle | Body style for modal body element. Such as height, padding etc. | `object` |
| vtsTitle | The title for Drawer. | `string \| TemplateRef<void>` |
| vtsFooter | The footer for Drawer. | `string \| TemplateRef<void>` |
| vtsWidth |  Width of the Drawer dialog.  | `number \| string` |
| vtsHeight | Height of the Drawer dialog, only when placement is `'top'` or `'bottom'`.  | `number \| string` |
| vtsWrapClassName | The class name of the container of the Drawer dialog. | `string` |
| vtsZIndex| The `z-index` of the Drawer. | `number` |
| vtsPlacement | The placement of the Drawer. | `'top' \| 'right' \| 'bottom' \| 'left'` |
| vtsOffsetX | The the X coordinate offset(px). | `number` |
| vtsOffsetY | The the Y coordinate offset(px), only when placement is `'top'` or `'bottom'`. | `number` |
