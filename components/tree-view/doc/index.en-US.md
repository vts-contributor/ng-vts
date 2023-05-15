---
category: Components
type: Data Display
title: Tree (CDK)
order: 100
cover: ''
---

## API

### vts-tree-view

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| vtsTreeControl | The tree controller | `TreeControl`<br />[Angular Guide](https://material.angular.io/cdk/tree/api#TreeControl) | |
| vtsDataSource | The data array to render | `DataSource<T>`<br />[Angular Guide](https://material.angular.io/cdk/tree/overview#data-source) | |
| vtsSize | Size of tree nodes | One of `sm` `md` `lg` | `md` |
| vtsIndent | Indent between levels (0 if `vtsShowLine` enabled) | `number` | `24` |
| vtsInitialIndent | Fixed padding of nodes | `number` | `8` |
| vtsShowLine | Whether to show tree line | `boolean` | `false` |

### vts-tree-virtual-scroll-view

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| vtsTreeControl | The tree controller | `TreeControl`<br />[Angular Guide](https://material.angular.io/cdk/tree/api#TreeControl) | |
| vtsDataSource | The data array to render | `DataSource<T>`<br />[Angular Guide](https://material.angular.io/cdk/tree/overview#data-source) | |
| vtsSize | Size of tree nodes | One of `sm` `md` `lg` | `md` |
| vtsIndent | Indent between levels (0 if `vtsShowLine` enabled) | `number` | `24` |
| vtsInitialIndent | Fixed padding of nodes | `number` | `8` |
| vtsShowLine | Whether to show tree line | `boolean` | `false` |

### vts-tree-node

Tree node items of tree, define conditional template using `vtsTreeNodeDef`.

```html
<vts-tree-node *vtsTreeNodeDef="let node; when: <condition>">
    // Toggle (Optional)
    <vts-tree-node-toggle ...></vts-tree-node>

    // Checkbox (Optional)
    <vts-tree-node-checkbox ...></vts-tree-node-checkbox>

    // Node Content
    <vts-tree-node-option ...></vts-tree-option>
</vts-tree-node>
```

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| vtsSelected | Whether node is selected | `boolean` | `false`
| vtsDisabled | Whether node is disabled | `boolean` | `false`
| (vtsClick) | Emit on node clicked | `EventEmitter<MouseEvent>` | |

### [vtsTreeNodeDef]

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| [vtsTreeNodeDefWhen] | Conditional filter function for conditional template | `(index: number, nodeData: T) => boolean`<br />[Angular Guide](https://material.angular.io/cdk/tree/overview#conditional-template) | |


### vts-tree-node-toggle

Either use pre-defined template or `ng-content` template

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| vtsNoop | Pre-defined empty template | `boolean` | `false` |
| vtsCaret | Pre-defined caret template | `boolean` | `false` |
| vtsLoading | Pre-defined loading template | `boolean` | `false` |
| vtsDisabled | Whether toggle is disabled | `boolean` | `false` |
| vtsRecursive | Whether to expand recursively | `boolean` | `false` |

### vts-tree-node-checkbox

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| vtsChecked | Whether checkbox is checked | `boolean` | `false` |
| vtsIndeterminate | Whether checkbox is indeterminate | `boolean` | `false` |
| vtsDisabled | Whether checkbox is disabled | `boolean` | `false` |
| (vtsClick) | Emit on checkbox clicked | `EventEmitter<MouseEvent>` | |

### vts-tree-node-option

Template of node content

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| (vtsClick) | Emit on node clicked | `EventEmitter<MouseEvent>` | |

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
