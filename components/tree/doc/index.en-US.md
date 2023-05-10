---
category: Components
type: Data Display
title: Tree
cols: 1
order: 100
cover: ''
---

```ts
import { VtsTreeModule } from '@ui-vts/ng-vts/tree';
```

## API

### vts-tree

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[vtsData]` | Tree data (Reference VtsTreeNode) | `VtsTreeNodeOptions[] \| VtsTreeNode[]` | `[]` |
| `[vtsBlockNode]` | Whether treeNode fill remaining horizontal space | `boolean` | `false` | ✅ |
| `[vtsCheckable]` | Adds a Checkbox before the treeNodes| `boolean` | `false` |
| `[vtsShowExpand]` | Show a Expand Icon before the treeNodes | `boolean` | `true` | |
| `[vtsShowLine]` | Shows a connecting line | `boolean` | `false` | |
| `[vtsExpandedIcon]` | Customize an expand icon | `TemplateRef<{ $implicit: VtsTreeNode }>` | - |
| `[vtsShowIcon]` | Shows the icon before a TreeNode's title. There is no default style | `boolean` | `false` | ✅ |
| `[vtsAsyncData]` | Load data asynchronously (should be used with VtsTreeNode.addChildren(...)) | `boolean` | `false` |
| `[vtsDraggable]` | Specifies whether this Tree is draggable (IE > 8) | `boolean` | `false` |
| `[vtsMultiple]` | Allows selecting multiple treeNodes | `boolean` | `false` |
| `[vtsHideUnMatched]` | Hide unmatched nodes while searching | `boolean` | `false` | ✅ |
| `[vtsCheckStrictly]` | Check treeNode precisely; parent treeNode and children treeNodes are not associated | `boolean` | `false` |
| `[vtsTreeTemplate]` | Custom Nodes | `TemplateRef<{ $implicit: VtsTreeNode }>` | - |
| `[vtsExpandAll]` | Whether to expand all treeNodes | `boolean` | `false` |
| `[vtsExpandedKeys]` | Specify the keys of the default expanded treeNodes | `string[]` | `[]` |
| `[vtsCheckedKeys]` | Specifies the keys of the default checked treeNodes | `string[]` | `[]` |
| `[vtsSelectedKeys]` | Specifies the keys of the default selected treeNodes | `string[]` | `[]` |
| `[vtsSearchValue]` | Filter (highlight) treeNodes (see demo `Searchable`), two-way binding | `string` | `null` |
| `[vtsSearchFunc]` | Custom matching method, used with vtsSearchValue | `(node: VtsTreeNodeOptions) => boolean` | `null` |
| `[vtsBeforeDrop]` | Drop before the second check, allowing the user to decide whether to allow placement | `(confirm: VtsFormatBeforeDropEvent) => Observable<boolean>` | - |
| `[vtsVirtualHeight]` | The height of virtual scroll | `string` | `-` |
| `[vtsVirtualItemSize]` | The size of the items in the list, same as [cdk itemSize](https://material.angular.io/cdk/scrolling/api) | `number` | `28` |
| `[vtsVirtualMaxBufferPx]` | The number of pixels worth of buffer to render for when rendering new items, same as [cdk maxBufferPx](https://material.angular.io/cdk/scrolling/api) | `number` | `500` |
| `[vtsVirtualMinBufferPx]` | The minimum amount of buffer rendered beyond the viewport (in pixels),same as [cdk minBufferPx](https://material.angular.io/cdk/scrolling/api) | `number` | `28` |
| `(vtsClick)` | Callback function for when the user clicks a treeNode | `EventEmitter<VtsFormatEmitEvent>` | - |
| `(vtsDblClick)` | Callback function for when the user double clicks a treeNode | `EventEmitter<VtsFormatEmitEvent>` | - |
| `(vtsContextMenu)` | Callback function for when the user right clicks a treeNode | `EventEmitter<VtsFormatEmitEvent>` | - |
| `(vtsCheckBoxChange)` | Callback function for when user clicks the Checkbox | `EventEmitter<VtsFormatEmitEvent>` | - |
| `(vtsExpandChange)` | Callback function for when a treeNode is expanded or collapsed |`EventEmitter<VtsFormatEmitEvent>` | - |
| `(vtsSearchValueChange)` | Callback function for when filter treeNodes(used with vtsSearchValue) | `EventEmitter<VtsFormatEmitEvent>` | - |
| `(vtsOnDragStart)` | Callback function for when the onDragStart event occurs | `EventEmitter<VtsFormatEmitEvent>` | - |
| `(vtsOnDragEnter)` | Callback function for when the onDragEnter event occurs | `EventEmitter<VtsFormatEmitEvent>` | - |
| `(vtsOnDragOver)` | Callback function for when the onDragOver event occurs | `EventEmitter<VtsFormatEmitEvent>` | - |
| `(vtsOnDragLeave)` | Callback function for when the onDragLeave event occurs | `EventEmitter<VtsFormatEmitEvent>` | - |
| `(vtsOnDrop)` | Callback function for when the onDrop event occurs | `EventEmitter<VtsFormatEmitEvent>` | - |
| `(vtsOnDragEnd)` | Callback function for when the onDragEnd event occurs | `EventEmitter<VtsFormatEmitEvent>` | - |

#### Methods

| Property | Description | Type |
| -------- | ----------- | ---- |
| getTreeNodes | get all nodes(VtsTreeNode) | `VtsTreeNode[]` |
| getTreeNodeByKey | get VtsTreeNode with key | `VtsTreeNode` |
| getCheckedNodeList | get checked nodes(merged) | `VtsTreeNode[]` |
| getSelectedNodeList | get selected nodes | `VtsTreeNode[]` |
| getHalfCheckedNodeList | get half checked nodes | `VtsTreeNode[]` |
| getExpandedNodeList | get expanded nodes | `VtsTreeNode[]` |
| getMatchedNodeList | get matched nodes(if vtsSearchValue is not null) | `VtsTreeNode[]` |

#### VtsTreeNodeOptions props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | `string` | `'---'` |
| key | Must be unique！| `string` | `null` |
| icon | icon before the treeNode，used with `vtsShowIcon` | `string` | `null` |
| children | TreeNode's children | `VtsTreeNodeOptions[]` | `[]` |
| isLeaf | Determines if this is a leaf node(can not be dropped to) | `boolean` | `false` |
| checked | Set the treeNode be checked | `boolean` | `false` |
| selected | Set the treeNode be selected | `boolean` | `false` |
| expanded | Set the treeNode be expanded () | `boolean` | `false` |
| selectable | Set whether the treeNode can be selected	 | `boolean` | `true` |
| disabled | Disables the treeNode | `boolean` | `false` |
| disableCheckbox | Disables the checkbox of the treeNode | `boolean` | `false` |
| [key: string] | Indexable Types, can be used with VtsTreeNode.origin | `any ` | - |

#### VtsFormatEmitEvent props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| eventName | Event Name | enum: `click` `dblclick` `contextmenu` `check` `expand` `search` & `dragstart` `dragenter` `dragover` `dragleave` `drop` `dragend` | - |
| node | The current operation node (such as the target node to drop while dragging) | `VtsTreeNode` | `null` |
| event | MouseEvent or DragEvent | `'MouseEvent' \| 'DragEvent'` | `null` |
| dragNode? | Current drag node (existing if dragged) | `VtsTreeNode` | `null` |
| selectedKeys? | Selected nodes list | `VtsTreeNode[]` | `[]` |
| checkedKeys? | Checked nodes list | `VtsTreeNode[]` | `[]` |
| matchedKeys? | Matched keys list while searching | `VtsTreeNode[]` | `[]` |
| keys? | All nodes's keys list related event(except drag events) | `string[]` | `[]` |
| nodes? | All nodes related event(except drag events) | `VtsTreeNode[]` | `[]` |

#### VtsFormatBeforeDropEvent props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| dragNode | Current drag node (existing when dragged) | `VtsTreeNode` | - |
| node | The current operation node (such as the target node to drop while dragging) | `VtsTreeNode` | - |
| pos | position to drop(-1: before the target node, 0: inside the target node, 1: behind the target node) | `number` | - |

#### VtsTreeNode props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| title | Title | `string` | VtsTreeNodeOptions.title |
| key | Key | `string` | VtsTreeNodeOptions.key |
| level | TreeNode's level relative to the root node | `number` | `number` |
| children | Children | VtsTreeNode[] | `[]` |
| origin | treeNode's raw data of VtsTreeNodeOptions(user provided to show more datas) | VtsTreeNodeOptions | - |
| getParentNode | Get parentNode | function | `null` |
| isLeaf | Whether treeNode is a Leaf Node | `boolean` | `false` |
| isExpanded | Whether treeNode is expanded | `boolean` | `false` |
| isDisabled | Whether treeNode is disabled | `boolean` | `false` |
| isDisableCheckbox | Whether treeNode's checkbox can not be clicked | `boolean` | `false` |
| isSelectable | Set whether the treeNode can be selected | `boolean` | `true` |
| isChecked | Whether treeNode is checked | `boolean` | `false` |
| isHalfChecked | Part of treeNode's children are checked  | `boolean` | `false` |
| isSelected | Whether treeNode is selected | `boolean` | `false` |
| isLoading | Whether treeNode is loading(when vtsAsyncData is true) | `boolean` | `false` |
| isMatched | Whether treeNode's title contains vtsSearchValue | `boolean` | `false` |
| setSyncChecked | set isChecked value and sync other nodes' state of checkBox | function | - |
| getChildren | Get all children | function | - |
| addChildren | Add child nodes, receive VtsTreeNode or VtsTreeNodeOptions array, the second parameter is the inserted index position | (children: array, index?: number )=>{} | - |
| clearChildren | Clear the treeNode's children | function | - |
| remove | Clear current node(not root node) | function | - |

## Note
* Please make sure `vtsData` is set before the above mentioned properties:
```typescript
// Demo
this.vtsExpandAll = false;
const nodes = []; // source data
this.vtsData = [...nodes];
// Reset the above mentioned properties if you have used after setting of vtsData
this.vtsExpandedKeys = [...this.vtsExpandedKeys];
// this.vtsExpandAll = true;
this.vtsCheckedKeys = [...this.vtsCheckedKeys];
this.vtsSelectedKeys = [...this.vtsSelectedKeys];
```
* `VtsTreeNodeOptions` accepts your customized properties，use VtsTreeNode.origin to get them.
* If Tree Methods used with ViewChild, should be used in ngAfterViewInit.
* Setting VtsData with VtsTreeNodeOptions[] is better，if you set vtsData with VtsTreeNode[], it will be deprecated in next major version(8.x).
