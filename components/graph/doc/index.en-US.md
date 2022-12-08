---
category: Components
type: Data Display
title: Graph
cols: 1
experimental: true
---

<blockquote style="border-color: #faad14;">
<p>NG-ZORRO experiments are features that are released but not yet considered stable or production ready</p>
<p>Developers and users can opt-in into these features before they are fully released. But <strong>breaking changes</strong> may occur with any release.</p>
</blockquote>

## When To Use

When you want to use graph in Angular.

### Import Module

> Now, the graph depends on d3-drag d3-zoom d3-selection d3-transition d3-shape (may be removed in next major version)

```ts
import { VtsGraphModule } from '@ui-vts/ng-vts/graph';
```

### Import Style

```less
@import "node_modules/ng-zorro-antd/graph/style/entry.less";
```

## API

Dependencies:

```sh
npm install dagre-compound dagre d3-transition d3-zoom d3-selection d3-shape d3-drag @types/d3
```

### vts-graph
| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| `[vtsGraphData]` | Data source | `VtsGraphData(data: VtsGraphDataDef?)` | `` |
| `[vtsRankDirection]` | Graph Direction | `TB` \| `BT` \| `LR` \| `RL` | `LR` |
| `[vtsAutoSize]` | Whether to automatically adjust the height of the node, the default equal height | `boolean` | `false` |
| `[vtsGraphLayoutConfig]` | Global config of graph | `VtsGraphLayoutConfig` | `` |

#### Methods

| Method | Description |
| --- | --- |
| `fitCenter()` | Move graph to center(use `vts-graph-zoom` instead if zooming is enabled) |

### [vts-graph-zoom]

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| `[(vtsZoom)]` | Default zoom scale | `number` | `1` |
| `[vtsMinZoom]` | Minimum zoom scale | `number` | `0.1` |
| `[vtsMaxZoom]` | Maximum zoom scale | `number` | `10` |
| `(vtsTransformEvent)` | Event of zooming | `() => VtsZoomTransform` | `` |
| `(fitCenter)` | Move graph to center | `() => void` | `void` |
| `(focus)` | Move target node to center | `(e: SVGGElement, duration: number) => void` | `void` |

#### VtsGraphData

| Method | Description | Type |
| --- | --- | --- |
| `setData` | set data source | `(data: VtsGraphDataDef) => void` |
| `toggle` | toggle group node | `(nodeName: string) => void` |
| `expand` | expand group node | `(nodeName: string) => void` |
| `expandAll` | expand all group nodes | `(nodeName: string) => void` |
| `collapse` | collapse group node | `(nodeName: string) => void` |
| `isExpand` | get if expanded of node | `(nodeName: string) => boolean` |
| `expansionModel` | model of expanded nodes' info | `SelectionModel<string>` |

### VtsGraphLayoutConfig
| Method | Description | Type |
| --- | --- | --- |
| `layout` | graph layout config | `{ nodeSep: number; rankSep: number; edgeSep: number; }` |
| `subScene` | group node config | `{ paddingTop: number; paddingBottom: number; paddingLeft: number; paddingRight: number; labelHeight: number; }` |
| `defaultCompoundNode` | group node size | `{ width: number; height: number; maxLabelWidth: number; }` |
| `defaultNode` | default node size | `{ width: number; height: number; labelOffset: number; maxLabelWidth: number; }` |


#### VtsGraphDataDef

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| `nodes` | nodes | `Array<{ id: number\|string; label?: string; width?: number; height?: number; [key: string]: any; }>` | `[]` |
| `edges` | edges | `Array<{ v: number\|string; w: number\|string; [key: string]: any; }>` | `[]` |
| `compound` | group | `{ [parent: string]: string[]; }` | `null` |

#### VtsGraphNode

| Parameter | Description | Type |
| --- | --- | --- |
| `id` | id | `number\|string` |
| `label?` | node content | `string` |
| `name` | node name | `number\|string` |
| `type` | node type(group: 0, node: 1) | `number` |
| `parentNodeName` | parentNode name | `string` |
| `coreBox` | coreBox | `{ width: number;  height: number; }` |
| `x` | x-offset | `number` |
| `y` | y-offset | `number` |
| `width` | width | `number` |
| `height` | height | `number` |
| `[key: string]`| user inputs | `any` |


#### VtsGraphEdge

| Parameter | Description | Type |
| --- | --- | --- |
| `id` | id | `string` |
| `v` | source node | `number\|string` |
| `w` | target node | `number\|string` |
| `label?` | edge content | `string` |
| `points` | points | `Array<{ x: number; y: number; }>` |

#### VtsGraphGroupNode

| Parameter | Type |
| --- | --- |
| `expanded` | `boolean` |
| `nodes` | `Array<VtsGraphNode\|VtsGraphGroupNode>` |
| `edges` | `VtsGraphEdge[]` |

### [vtsGraphNode]
Customize the graph node template

```html
<vts-graph [vtsGraphData]="data">
  <ng-container *vtsGraphNode="let node">
    <span>{{ node.name }} - {{ node.label }}</span>
  </ng-container>
</vts-graph>
```

### [vtsGraphGroupNode]
Customize the graph group-node template

```html
<vts-graph [vtsGraphData]="data">
  <ng-container *vtsGraphGroupNode="let node">
    <span>{{ node.name }} - {{ node.label }}</span>
  </ng-container>
</vts-graph>
```

### [vtsGraphEdge]
Customize the graph edge template

```html
<vts-graph [vtsGraphData]="data">
  <ng-container *vtsGraphEdge="let edge">
    <svg:g>
      <path></path>
    </svg:g>
  </ng-container>
</vts-graph>
```

### Styling

The Component styles only contain the necessary positional properties and simple styles, you can customize the style by overriding the following class.

- `.vts-graph` `vts-graph` The `vts-graph` component namespace
- `.vts-graph-nodes` The class name of container covered all nodes
  * `.vts-graph-node` The class name of `vts-graph-node`
  * `.vts-graph-node-expanded` The class name of expanded node
  * `.vts-graph-group-node` The class name of group node
  * `.vts-graph-base-node` The class name of leaf(OP) node
- `.vts-graph-edges` The class name of container covered edges in the target node
  * `.vts-graph-edge` The class name of edge
    * `path.vts-graph-edge-line` The class name of svg:path element
    * `.vts-graph-edge-text` The class name of svg:text element

## More
- [dagre-compound](https://www.npmjs.com/package/dagre-compound): Dagre-based nested layout calculation library
- [SelectionModel](https://github.com/angular/components/blob/master/src/cdk/collections/selection-model.ts)