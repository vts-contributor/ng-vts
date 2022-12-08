/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { VtsTreeNode } from './vts-tree-base-node';

export interface VtsFormatEmitEvent {
  eventName: string;
  node?: VtsTreeNode | null;
  event?: MouseEvent | DragEvent | null;
  dragNode?: VtsTreeNode;
  selectedKeys?: VtsTreeNode[];
  checkedKeys?: VtsTreeNode[];
  matchedKeys?: VtsTreeNode[];
  nodes?: VtsTreeNode[];
  keys?: string[];
}

export interface VtsFormatBeforeDropEvent {
  dragNode: VtsTreeNode;
  node: VtsTreeNode;
  pos: number;
}

export interface VtsTreeNodeBaseComponent {
  markForCheck(): void;
}
