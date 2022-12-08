---
category: Components
type: Data Entry
title: TreeSelect
cover: https://gw.alipayobjects.com/zos/alicdn/Ax4DA0njr/TreeSelect.svg
---

Tree selection control.

## When To Use

`TreeSelect` is similar to `Select`, but the values are provided in a tree like structure.
Any data whose entries are defined in a hierarchical manner is fit to use this control. Examples of such case may include a corporate hierarchy, a directory structure, and so on.

```ts
import { VtsTreeSelectModule } from '@ui-vts/ng-vts/tree-select';
```

## API

### vts-tree-select

| Property | Description | Type | Default | Global Config |
| -------- | ----------- | ---- | ------- | ------------- |
| `[vtsId]` | input id attribute inside the component| `string` | - |
| `[vtsAllowClear]` | Whether allow clear | `boolean` | `false` |
| `[vtsPlaceHolder]` | Placeholder of the select input | `string` | - |
| `[vtsDisabled]` | Disabled or not | `boolean` | `false` |
| `[vtsShowIcon]` | Shows the icon before a TreeNode's title. There is no default style | `boolean` | `false` |
| `[vtsShowSearch]` | Whether to display a search input in the dropdown menu(valid only in the single mode) | `boolean` | `false` | ✅ |
| `[vtsNoResult]` | Specify content to show when no result matches. | `string` | - |
| `[vtsDropdownMatchSelectWidth]` | Determine whether the dropdown menu and the select input are the same width | `boolean` | `true` | ✅ |
| `[vtsDropdownStyle]` | To set the style of the dropdown menu | `object` | - |
| `[vtsDropdownClassName]` | classname of dropdown menu | `string` | - |
| `[vtsMultiple]` | Support multiple or not, will be `true` when enable `vtsCheckable`. | `boolean` | `false` |
| `[vtsHideUnMatched]` | Hide unmatched nodes while searching | `boolean` | `false` | ✅ |
| `[vtsSize]` | To set the size of the select input | `'large' \| 'small' \| 'default'` | `'default'` | ✅ |
| `[vtsCheckable]` | Whether to show checkbox on the treeNodes | `boolean` | `false` |
| `[vtsCheckStrictly]` | Check treeNode precisely; parent treeNode and children treeNodes are not associated | `boolean` | `false` |
| `[vtsShowExpand]` | Show a Expand Icon before the treeNodes | `boolean` | `true` | |
| `[vtsShowLine]` | Shows a connecting line | `boolean` | `false` | |
| `[vtsAsyncData]` | Load data asynchronously (should be used with VtsTreeNode.addChildren(...)) | `boolean` | `false` |
| `[vtsNodes]` | Data of the treeNodes | `VtsTreeNodeOptions[]` | `[]` |
| `[vtsDefaultExpandAll]` | Whether to expand all treeNodes by default | `boolean` | `false` |
| `[vtsExpandedKeys]` | Default expanded treeNodes | `string[]` | - |
| `[vtsDisplayWith]` | How to display the selected node value in the trigger | `(node: VtsTreeNode) => string` | `(node: VtsTreeNode) => node.title` |
| `[vtsMaxTagCount]` | Max tag count to show| number | - |
| `[vtsMaxTagPlaceholder]` | Placeholder for not showing tags | TemplateRef<{ $implicit: VtsTreeNode[] }> | - |
| `[vtsTreeTemplate]` | Custom Nodes | `TemplateRef<{ $implicit: VtsTreeNode }>` | - |
| `[vtsVirtualHeight]` | The height of virtual scroll | `string` | `-` |
| `[vtsVirtualItemSize]` | The size of the items in the list, same as [cdk itemSize](https://material.angular.io/cdk/scrolling/api) | `number` | `28` |
| `[vtsVirtualMaxBufferPx]` | The number of pixels worth of buffer to render for when rendering new items, same as [cdk maxBufferPx](https://material.angular.io/cdk/scrolling/api) | `number` | `500` |
| `[vtsVirtualMinBufferPx]` | The minimum amount of buffer rendered beyond the viewport (in pixels),same as [cdk minBufferPx](https://material.angular.io/cdk/scrolling/api) | `number` | `28` |
| `[vtsBackdrop]` | whether or not the overlay should attach a backdrop | `boolean` | `false` |
| `(vtsExpandChange)` | Callback function for when a treeNode is expanded or collapsed |`EventEmitter<VtsFormatEmitEvent>` | - |

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
