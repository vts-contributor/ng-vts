/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { VtsTreeNode } from './vts-tree-base-node';
import { VtsTreeBaseService } from './vts-tree-base.service';

export class VtsTreeBase {
  constructor(public vtsTreeService: VtsTreeBaseService) {}

  /**
   * Coerces a value({@link any[]}) to a TreeNodes({@link VtsTreeNode[]})
   */
  coerceTreeNodes(value: VtsSafeAny[]): VtsTreeNode[] {
    let nodes: VtsTreeNode[] = [];
    if (!this.vtsTreeService.isArrayOfVtsTreeNode(value)) {
      // has not been new VtsTreeNode
      nodes = value.map(item => new VtsTreeNode(item, null, this.vtsTreeService));
    } else {
      nodes = value.map((item: VtsTreeNode) => {
        item.service = this.vtsTreeService;
        return item;
      });
    }
    return nodes;
  }

  /**
   * Get all nodes({@link VtsTreeNode})
   */
  getTreeNodes(): VtsTreeNode[] {
    return this.vtsTreeService.rootNodes;
  }

  /**
   * Get {@link VtsTreeNode} with key
   */
  getTreeNodeByKey(key: string): VtsTreeNode | null {
    // flat tree nodes
    const nodes: VtsTreeNode[] = [];
    const getNode = (node: VtsTreeNode): void => {
      nodes.push(node);
      node.getChildren().forEach(n => {
        getNode(n);
      });
    };
    this.getTreeNodes().forEach(n => {
      getNode(n);
    });
    return nodes.find(n => n.key === key) || null;
  }

  /**
   * Get checked nodes(merged)
   */
  getCheckedNodeList(): VtsTreeNode[] {
    return this.vtsTreeService.getCheckedNodeList();
  }

  /**
   * Get selected nodes
   */
  getSelectedNodeList(): VtsTreeNode[] {
    return this.vtsTreeService.getSelectedNodeList();
  }

  /**
   * Get half checked nodes
   */
  getHalfCheckedNodeList(): VtsTreeNode[] {
    return this.vtsTreeService.getHalfCheckedNodeList();
  }

  /**
   * Get expanded nodes
   */
  getExpandedNodeList(): VtsTreeNode[] {
    return this.vtsTreeService.getExpandedNodeList();
  }

  /**
   * Get matched nodes(if vtsSearchValue is not null)
   */
  getMatchedNodeList(): VtsTreeNode[] {
    return this.vtsTreeService.getMatchedNodeList();
  }
}
