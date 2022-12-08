---
category: Components
type: Data Display
title: Tree View
cover: https://gw.alipayobjects.com/zos/alicdn/Xh-oWqg9k/Tree.svg
---

## When To Use

More basic Tree component, allowing each of its parts to be defined in the template, and state to be managed manually.
With better performance and customizability.

```ts
import { VtsTreeViewModule } from '@ui-vts/ng-vts/tree-view';
```

## API

### vts-tree-view

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| [vtsTreeControl] | The tree controller | [TreeControl](https://material.angular.io/cdk/tree/api#TreeControl) | - |
| [vtsDataSource] | The data array to render | [DataSource](https://material.angular.io/cdk/tree/overview#data-source)&lt;T&gt; \| Observable<T[]> \| T[] | - |
| [vtsDirectoryTree] | Whether nodes are displayed as directory style | `boolean` | `false` |
| [vtsBlockNode] | Whether tree nodes fill remaining horizontal space| `boolean` | `false` |

### vts-tree-virtual-scroll-view

The virtual scroll tree view, which can be accessed from
the [CdkVirtualScrollViewport](https://material.angular.io/cdk/scrolling/api#CdkVirtualScrollViewport) instance through
the `virtualScrollViewport` member of the component instance.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| [vtsTreeControl] | The tree controller | [TreeControl](https://material.angular.io/cdk/tree/api#TreeControl) | - |
| [vtsDataSource] | The data array to render | [DataSource](https://material.angular.io/cdk/tree/overview#data-source)&lt;T&gt; \| Observable<T[]> \| T[] | - |
| [vtsDirectoryTree] | Whether nodes are displayed as directory style | `boolean` | `false` |
| [vtsBlockNode] | Whether tree nodes fill remaining horizontal space| `boolean` | `false` |
| [vtsItemSize] | The size of nodes in the tree (in pixels) | `number` | `28` |
| [vtsMinBufferPx] | The minimum amount of buffer rendered allowed outside the viewport (in pixels) | `number` | `28 * 5` |
| [vtsMaxBufferPx] |  The amount of buffer required for rendering new nodes (in pixels) | `number` | `28 * 10` |

### [vtsTreeNodeDef]

Directive to define `vts-tree-node`.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| [vtsTreeNodeDefWhen] |  A matching function which indicates whether inputted node should be used. It matches the very first node that makes this function return `true`. If no nodes that makes this function return `true`, the node which does not define this function would be matched instead. | `(index: number, nodeData: T) => boolean` | - |

### vts-tree-node

The tree node container component, which needs to be defined by the `vtsTreeNodeDef` directive.

### [vtsTreeNodePadding]

```html

<vts-tree-node vtsTreeNodePadding></vts-tree-node>
```

Show node indentation by adding `padding` **Best Performance**.

### vtsTreeNodeIndentLine

```html

<vts-tree-node vtsTreeNodeIndentLine></vts-tree-node>
```

Show node indentation by adding indent lines.

### vts-tree-node-toggle

A toggle which is used to expand / collapse the node.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| [vtsTreeNodeToggleRecursive] | Is it recursively expand / collapse | `boolean` | `false` |

### vts-tree-node-toggle[vtsTreeNodeNoopToggle]

A toggle that does no actions. This can be used for placeholders or displays icons.

### [vts-icon][vtsTreeNodeToggleRotateIcon]

Define an icon in the toggle, which it will automatically rotate depending on the collapse/expand state.

### [vts-icon][vtsTreeNodeToggleActiveIcon]

Define an icon in the toggle for an active style, which it can be used for the loading state.

### vts-tree-node-option

Define the selectable feature of a node.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| [vtsSelected] | Whether the option is selected | `boolean` | `false` |
| [vtsDisabled] | Whether the option is disabled | `boolean` | `false` |
| (vtsClick) | Event on click | `EventEmitter<MouseEvent>` | - |

### vts-tree-node-checkbox

Define the checkbox feature of a node.

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| [vtsChecked] | Whether the checkbox is checked | `boolean` | `false` |
| [vtsDisabled] | Whether the checkbox is disabled | `boolean` | `false` |
| [vtsIndeterminate] | Whether the checkbox is indeterminate | `boolean` | `false` |
| (vtsClick) | Event on click | `EventEmitter<MouseEvent>` | - |

## Classes

### __VtsTreeFlatDataSource extends DataSource__

### Construction Parameters

| Name | Description |
| --- | --- |
| `treeControl: FlatTreeControl<F, K>` | The tree controller. |
| `treeFlattener: VtsTreeFlattener<T, F, K>` | Flattener for convert nested nodes `T` into flattened nodes `F`. |
| `initialData: T[] = []` | Initialized data. |

### Methods

| Name | Description |
| --- | --- |
| `connect(collectionViewer: CollectionViewer): Observable<F[]>` | Call from the TreeView component to listen for data updates. |
| `disconnect(): void` | Call when TreeView component is destroyed. |
| `setData(value: T[]): void` | Set the origin data |
| `getData(): T[]` | Get the origin data |

### __VtsTreeFlattener__

Convert nested data with child nodes into node data with level information.

### Construction Parameters

| Name | Description |
| --- | --- |
| `transformFunction: (node: T, level: number) => F` | Receive a nested node and return a flattened node |
| `getLevel: (node: F) => number` | Define the method to get the `level` property |
| `isExpandable: (node: F) => boolean` | Methods for defining whether a node is expandable |
| `getChildren: (node: T) => Observable<T[]> \| T[] \| undefined \| null` | Define methods to get children nodes from nested node |

### Methods

| Name | Description |
| --- | --- |
| `flattenNodes(structuredData: T[]): F[]` | Receive nested data and return flattened data |
| `expandFlattenedNodes(nodes: F[], treeControl: TreeControl<F, K>): F[]` | Get flattened node data based on expansion status |
