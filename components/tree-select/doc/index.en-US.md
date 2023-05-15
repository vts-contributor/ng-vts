---
category: Components
type: Data Entry
title: TreeSelect
cols: 1
order: 100
cover: ''
---

```ts
import { VtsTreeSelectModule } from '@ui-vts/ng-vts/tree-select';
```

## API

### vts-tree-select

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsId | Input id attribute inside the component | `string` | |
| vtsAllowClear | Whether to allow clear | `boolean` | `false` |
| vtsPlaceHolder | Placeholder of the select input | `string` | |
| vtsDisabled | Whether to disable control | `boolean` | `false` |
| vtsShowIcon | Shows the icon before a tree node's title | `boolean` | `false` |
| vtsShowSearch | Whether to allow search | `boolean` | `false` |
| vtsNoResult | Content for empty result | `string` | |
| vtsDropdownStyle | Style of the dropdown menu | `NgStyle` | |
| vtsDropdownClassName | Classname of dropdown menu | `string` | |
| vtsMultiple | Whether to use multiple selection | `boolean` | `false` |
| vtsCheckable | Whether to use multiple selection (checkbox mode) | `boolean` | `false` |
| vtsHideUnMatched | Whether to hide unmatched nodes while searching | `boolean` | `false` |
| vtsSize | Size of the select input | One of `xl` `lg` `md` `sm` | `md` |
| vtsCheckStrictly | Whether to use precisely check status; parent treeNode and children treeNodes are not associated | `boolean` | `false` |
| vtsShowExpand | Whether to show expand icon | `boolean` | `true` |
| vtsShowLine | Whether to show tree line | `boolean` | `false` |
| vtsAsyncData | Load data asynchronously (should be used with VtsTreeNode.addChildren(...)) | `boolean` | `false` |
| vtsNodes | Data of the tree nodes | `VtsTreeNodeOptions[]` | |
| vtsExpandAll | Whether to expand all treeNodes by default | `boolean` | `false` |
| vtsExpandedKeys | Default expanded treeNodes | `string[]` | |
| vtsDisplayWith | How to display the selected node value in the trigger | `(node: VtsTreeNode) => string` | `(node: VtsTreeNode) => node.title` |
| vtsMaxTagCount | Max tag count to show| `number` | |
| vtsMaxTagPlaceholder | Placeholder for not showing tags | `TemplateRef<{ $implicit: VtsTreeNode[] }>` | |
| vtsTreeTemplate | Custom Nodes | `TemplateRef<{ $implicit: VtsTreeNode }>` | |
| vtsVirtualHeight | Height of virtual scroll | `string` | |
| vtsBackdrop | whether the overlay should attach a backdrop | `boolean` | `false` |
| (vtsExpandChange) | Emit when a treeNode is expanded or collapsed |`EventEmitter<VtsFormatEmitEvent>` | |

#### Methods

| Property | Description | Type |
| -------- | ----------- | ---- |
| getTreeNodes | Get all nodes(VtsTreeNode) | `VtsTreeNode[]` |
| getTreeNodeByKey | Get VtsTreeNode with key | `VtsTreeNode` |
| getCheckedNodeList | Get checked nodes(merged) | `VtsTreeNode[]` |
| getSelectedNodeList | Get selected nodes | `VtsTreeNode[]` |
| getHalfCheckedNodeList | Get half checked nodes | `VtsTreeNode[]` |
| getExpandedNodeList | Get expanded nodes | `VtsTreeNode[]` |
| getMatchedNodeList | Get matched nodes (if vtsSearchValue is not null) | `VtsTreeNode[]` |
