---
category: Components
type: Data Display
title: Tree
order: 100
cover: ''
---

```ts
import { VtsTreeModule } from '@ui-vts/ng-vts/tree';
```

## API

### vts-tree

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsData | Tree data | `VtsTreeNodeOptions[] \| VtsTreeNode[]` | |
| vtsCheckable | Whether tree node is checkabled | `boolean` | `false` |
| vtsSelectable | Whether tree node is selectable | `boolean` | `false` |
| vtsCheckStrictly | Whether to use precisely check status; parent treeNode and children treeNodes are not associated | `boolean` | `false` |
| vtsMultiple | Whether to allow multiple select | `boolean` | `false` |
| vtsShowExpand | Whether to show expand icon | `boolean` | `true` |
| vtsShowLine | Whether to show tree line | `boolean` | `false` |
| vtsShowIcon | Whether to show tree node's icon | `boolean` | `true` |
| vtsExpandedIcon | Customize template for expand icon | `TemplateRef<{ $implicit: VtsTreeNode }>` | |
| vtsAsyncData | Load data asynchronously (should be used with VtsTreeNode.addChildren(...)) | `boolean` | `false` |
| vtsDraggable | Whether tree node is draggable | `boolean` | `false` |
| vtsHideUnMatched | Whether to hide unmatched nodes while searching | `boolean` | `false` |
| vtsTreeTemplate | Custom template for tree node | `TemplateRef<{ $implicit: VtsTreeNode }>` | |
| vtsExpandAll | Whether to expand all | `boolean` | `false` |
| vtsExpandedKeys | Specify the keys of the default expanded treeNodes | `string[]` | |
| vtsCheckedKeys | Specifies the keys of the default checked treeNodes | `string[]` | |
| vtsSelectedKeys | Specifies the keys of the default selected treeNodes | `string[]` | |
| vtsVirtualHeight | Height of virtual scroll | `string` | |
| [(vtsSearchValue)] | Filter (highlight) treeNodes, two-way binding | `string` | |
| vtsSearchFunc | Custom matching method, used with `vtsSearchValue` | `(node: VtsTreeNodeOptions) => boolean` | |
| vtsBeforeDrop | Before drop check, allowing user to decide whether to allow placement | `(confirm: VtsFormatBeforeDropEvent) => Observable<boolean>` | |
| `(vtsClick)` | Emit when the user clicks a treeNode | `EventEmitter<VtsFormatEmitEvent>` | |
| `(vtsDblClick)` | Emit when the user double clicks a treeNode | `EventEmitter<VtsFormatEmitEvent>` | |
| `(vtsContextMenu)` | Emit when the user right clicks a treeNode | `EventEmitter<VtsFormatEmitEvent>` | |
| `(vtsCheckBoxChange)` | Emit when user clicks the Checkbox | `EventEmitter<VtsFormatEmitEvent>` | |
| `(vtsExpandChange)` | Emit when a treeNode is expanded or collapsed |`EventEmitter<VtsFormatEmitEvent>` | |
| `(vtsSearchValueChange)` | Emit when filter treeNodes(used with vtsSearchValue) | `EventEmitter<VtsFormatEmitEvent>` | |
| `(vtsOnDragStart)` | Emit when the onDragStart event occurs | `EventEmitter<VtsFormatEmitEvent>` | |
| `(vtsOnDragEnter)` | Emit when the onDragEnter event occurs | `EventEmitter<VtsFormatEmitEvent>` | |
| `(vtsOnDragOver)` | Emit when the onDragOver event occurs | `EventEmitter<VtsFormatEmitEvent>` | |
| `(vtsOnDragLeave)` | Emit when the onDragLeave event occurs | `EventEmitter<VtsFormatEmitEvent>` | |
| `(vtsOnDrop)` | Emit when the onDrop event occurs | `EventEmitter<VtsFormatEmitEvent>` | |
| `(vtsOnDragEnd)` | Emit when the onDragEnd event occurs | `EventEmitter<VtsFormatEmitEvent>` | |

#### Methods

| Property | Description | Type |
| -------- | ----------- | ---- |
| getTreeNodes | Get all nodes(VtsTreeNode) | `VtsTreeNode[]` |
| getTreeNodeByKey | Get VtsTreeNode with key | `VtsTreeNode` |
| getCheckedNodeList | Get checked nodes(merged) | `VtsTreeNode[]` |
| getSelectedNodeList | Get selected nodes | `VtsTreeNode[]` |
| getHalfCheckedNodeList | Get half checked nodes | `VtsTreeNode[]` |
| getExpandedNodeList | Get expanded nodes | `VtsTreeNode[]` |
| getMatchedNodeList | Get matched nodes(if vtsSearchValue is not null) | `VtsTreeNode[]` |

#### VtsTreeNodeOptions

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | `string` | |
| key | Unique key| `string` | |
| icon | Icon before the tree node，used with `vtsShowIcon` | `string` | |
| children | Tree node's children | `VtsTreeNodeOptions[]` | `[]` |
| isLeaf | Determines if this is a leaf node(can not be dropped to) | `boolean` | `false` |
| checked | Set the tree node be checked | `boolean` | `false` |
| selected | Set the tree node be selected | `boolean` | `false` |
| expanded | Set the tree node be expanded | `boolean` | `false` |
| selectable | Set whether the tree node can be selected | `boolean` | `true` |
| disabled | Disables the tree node | `boolean` | `false` |
| disableCheckbox | Disables the checkbox of the tree node | `boolean` | `false` |
| disableExpand | Disables the expand function of the tree node | `boolean` | `false` |
| [key: string] | Extra props, can be used with `VtsTreeNode.origin` | `any ` | |

#### VtsFormatEmitEvent

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| eventName | Event Name | One of `click` `dblclick` `contextmenu` `check` `expand` `search` & `dragstart` `dragenter` `dragover` `dragleave` `drop` `dragend` | |
| node | The current operation node  | `VtsTreeNode` | |
| event | MouseEvent or DragEvent | `'MouseEvent' \| 'DragEvent'` | |
| dragNode? | Current drag node (existing if dragged) | `VtsTreeNode` | |
| selectedKeys? | Selected nodes list | `VtsTreeNode[]` | `[]` |
| checkedKeys? | Checked nodes list | `VtsTreeNode[]` | `[]` |
| matchedKeys? | Matched keys list while searching | `VtsTreeNode[]` | `[]` |
| keys? | All nodes's keys list related event(except drag events) | `string[]` | `[]` |
| nodes? | All nodes related event(except drag events) | `VtsTreeNode[]` | `[]` |

#### VtsFormatBeforeDropEvent

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| dragNode | Current drag node (existing when dragged) | `VtsTreeNode` | |
| node | The current operation node (such as the target node to drop while dragging) | `VtsTreeNode` | |
| pos | position to drop(-1: before the target node, 0: inside the target node, 1: behind the target node) | `number` | |

#### VtsTreeNode

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | `string` | `VtsTreeNodeOptions.title` |
| key | Key | `string` | `VtsTreeNodeOptions.key` |
| level | Tree node's level relative to the root node | `number` | |
| children | Children | `VtsTreeNode[]` | `[]` |
| origin | Tree node's raw data | `VtsTreeNodeOptions` | |
| getParentNode | Get parentNode | `() => VtsTreeNode` | |
| isLeaf | Whether tree node is a leaf Node | `boolean` | `false` |
| isExpanded | Whether tree node is expanded | `boolean` | `false` |
| isDisabled | Whether tree node is disabled | `boolean` | `false` |
| isDisableCheckbox | Whether tree node's checkbox can not be clicked | `boolean` | `false` |
| isDisableExpand | Whether tree node's expand icon can not be clicked | `boolean` | `false` |
| isSelectable | Whether the tree node can be selected | `boolean` | `true` |
| isChecked | Whether tree node is checked | `boolean` | `false` |
| isHalfChecked | Whether part of tree node's children are checked  | `boolean` | `false` |
| isSelected | Whether tree node is selected | `boolean` | `false` |
| isLoading | Whether tree node is loading(when `vtsAsyncData` is true) | `boolean` | `false` |
| isMatched | Whether tree node's title contains `vtsSearchValue` | `boolean` | `false` |
| setSyncChecked | Set isChecked value and sync other nodes' state of checkBox | `Function<{checked: boolean, halfChecked: boolean}>` | |
| getChildren | Get all children | `() => VtsTreeNode[]` | |
| addChildren | Add child nodes | `Function<{children: [], childPos: number}>` | |
| clearChildren | Clear the tree node's children | `Function<>` | |
| remove | Clear current node (not root node) | `Function<>` | |