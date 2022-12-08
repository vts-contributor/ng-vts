/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  HierarchyBaseEdgeInfo,
  HierarchyBaseNodeInfo,
  HierarchyGraphDef,
  HierarchyGraphEdgeDef,
  HierarchyGraphNodeDef,
  HierarchyGraphNodeInfo,
  HierarchyGraphOption,
  LayoutConfig
} from 'dagre-compound';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

export interface VtsGraphDataDef extends HierarchyGraphDef {
  nodes: VtsGraphNodeDef[];
  edges: VtsGraphEdgeDef[];
}

export interface VtsGraphNodeDef extends HierarchyGraphNodeDef {
  label?: string;
}

export interface VtsGraphEdgeDef extends HierarchyGraphEdgeDef {
  label?: string;
}

// tslint:disable-next-line:no-empty-interface
export interface VtsGraphOption extends HierarchyGraphOption {}
export declare type VtsRankDirection = 'TB' | 'BT' | 'LR' | 'RL';

export interface VtsGraphGroupNode extends HierarchyGraphNodeInfo {
  nodes: Array<VtsGraphNode | VtsGraphGroupNode>;
  edges: VtsGraphEdge[];
  [key: string]: VtsSafeAny;
}

export interface VtsGraphNode extends HierarchyBaseNodeInfo {
  id: VtsSafeAny;
  // TODO
  name: VtsSafeAny;
  label?: string;
  [key: string]: VtsSafeAny;
}

export interface VtsGraphEdge extends HierarchyBaseEdgeInfo {
  id: VtsSafeAny;
  v: VtsSafeAny;
  w: VtsSafeAny;
  label?: string;
}

// tslint:disable-next-line:no-empty-interface
export interface VtsLayoutSetting extends LayoutConfig {}

export interface VtsGraphBaseLayout {
  layout: {
    nodeSep: number;
    rankSep: number;
    edgeSep: number;
  };
  subScene: {
    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
    labelHeight: number;
  };
  defaultCompoundNode: {
    width: number;
    height: number;
    maxLabelWidth: number;
  };
  defaultNode: {
    width: number;
    height: number;
    labelOffset: number;
    maxLabelWidth: number;
  };
}

export function vtsTypeDefinition<T>(): (item: unknown) => T {
  return item => item as T;
}

// tslint:disable:no-shadowed-variable
export type VtsDeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<VtsDeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<VtsDeepPartial<U>>
    : VtsDeepPartial<T[P]>;
};

export type VtsGraphLayoutConfig = VtsDeepPartial<VtsGraphBaseLayout>;
export const VTS_GRAPH_LAYOUT_SETTING: VtsLayoutSetting = {
  graph: {
    meta: {
      nodeSep: 50,
      rankSep: 50,
      edgeSep: 5
    }
  },
  subScene: {
    meta: {
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 20,
      paddingRight: 20,
      labelHeight: 20
    }
  },
  nodeSize: {
    meta: {
      width: 50,
      maxLabelWidth: 0,
      height: 50
    },
    node: {
      width: 50,
      height: 50,
      labelOffset: 10,
      maxLabelWidth: 40
    },
    bridge: {
      width: 5,
      height: 5,
      radius: 2,
      labelOffset: 0
    }
  }
};

// Zoom interface

export interface VtsZoomTransform {
  x: number;
  y: number;
  k: number;
}

export interface RelativePositionInfo {
  topLeft: { x: number; y: number };
  bottomRight: { x: number; y: number };
}
