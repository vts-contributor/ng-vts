---
category: Components
type: Layout
title: Resizable
cols: 1
experimental: true
---

<blockquote style="border-color: #faad14;">
<p>NG-ZORRO experiments are features that are released but not yet considered stable or production ready</p>
<p>Developers and users can opt-in into these features before they are fully released. But <strong>breaking changes</strong> may occur with any release.</p>
</blockquote>

Resize element.

- Support preview
- Support Grids System
- Support for custom handles and preview styles

## When To Use

When you want to resize elements.

### Import Module

```ts
import { VtsResizableModule } from '@ui-vts/ng-vts/resizable';
```

### Import Style

```less
@import "node_modules/ng-zorro-antd/resizable/style/entry.less"
```



## API

### [vts-resizable]

Resizable element the `position` attribute  must be one of `'relative' | 'absolute' | 'fixed' |'sticky'`，default is `'relative'`.

```ts
interface VtsResizeEvent {
  width?: number;
  height?: number;
  col?: number;
  mouseEvent?: MouseEvent
}
```

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| [vtsBounds] | Specifies resize boundaries. | `'window' \| 'parent' \| ElementRef<HTMLElement>` | `parent` |
| [vtsMaxHeight] | Maximum height of resizable element | `number` | - |
| [vtsMaxWidth] | Maximum width of resizable element | `number` | - |
| [vtsMinHeight] | Minimum height of resizable element | `number` | `40` |
| [vtsMinWidth] | Minimum width of resizable element | `number` | `40` |
| [vtsGridColumnCount] | Number of columns(-1 is not grid) | `number` | `-1` |
| [vtsMaxColumn] | Maximum Column | `number` | - |
| [vtsMinColumn] | Minimum Column | `number` | - |
| [vtsLockAspectRatio] | Lock the aspect ratio based on the initial size | `boolean` | `false` |
| [vtsPreview] | Enable preview when resizing | `boolean` | `false` |
| [vtsDisabled] | Disable resize | `boolean` | `false` |
| (vtsResize) | Calls when Resizing | `EventEmitter<VtsResizeEvent>` | - |
| (vtsResizeStart) | Calls when resize start | `EventEmitter<VtsResizeEvent>` | - |
| (vtsResizeEnd) | Calls when resize end | `EventEmitter<VtsResizeEvent>` | - |

### vts-resize-handle

Define handles and directions.

```ts
type VtsResizeDirection = 'top' | 'right' | 'bottom' | 'left' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft';
```

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| [vtsDirection] | Set the direction of resizable | `VtsResizeDirection` | `'bottomRight'` |

### vts-resize-handles

Simpler way to define handles.

```ts
const DEFAULT_RESIZE_DIRECTION: VtsResizeDirection[] = ['bottomRight', 'topRight', 'bottomLeft', 'topLeft', 'bottom', 'right', 'top', 'left'];
```

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| [vtsDirections] | Allow directions of resizable | `VtsResizeDirection[]` | `DEFAULT_RESIZE_DIRECTION` |

### Styling

The Component styles only contain the necessary positional properties and simple styles, you can customize the style by overriding the following class.

- `.vts-resizable` The `vts-resizable` component namespace
- `.vts-resizable-resizing` This class name that is added to `vts-resizable` while resizing
- `.vts-resizable-preview` The ghost element's class name when enable preview
- `.vts-resizable-handle-box-hover` This class name that is added to `vts-resize-handle` while mouse hover on  `vts-resizable`
- `.vts-resizable-handle` The `vts-resize-handle` component namespace and directions class name
    * `.vts-resizable-handle-top`
    * `.vts-resizable-handle-left`
    * `.vts-resizable-handle-bottom`
    * `.vts-resizable-handle-right`
    * `.vts-resizable-handle-topRight`
    * `.vts-resizable-handle-topLeft`
    * `.vts-resizable-handle-bottomRight`
    * `.vts-resizable-handle-bottomLeft`
