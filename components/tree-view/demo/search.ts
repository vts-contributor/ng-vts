import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';

import { VtsTreeFlatDataSource, VtsTreeFlattener } from '@ui-vts/ng-vts/tree-view';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { auditTime, map } from 'rxjs/operators';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'Folder 1',
    children: [
      {
        name: 'Folder 1-1',
        children: [
          {
            name: 'Folder 1-1-1',
            children: [
              {
                name: 'File 1'
              },
              {
                name: 'File 2'
              }
            ]
          },
          {
            name: 'File 3'
          }
        ]
      },
      {
        name: 'Folder 1-2',
        children: [
          {
            name: 'File 4'
          }
        ]
      }
    ]
  }
];

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

class FilteredTreeResult {
  constructor(public treeData: TreeNode[], public needsToExpanded: TreeNode[] = []) {}
}

function filterTreeData(data: TreeNode[], value: string): FilteredTreeResult {
  const needsToExpanded = new Set<TreeNode>();
  const _filter = (node: TreeNode, result: TreeNode[]) => {
    if (node.name.search(value) !== -1) {
      result.push(node);
      return result;
    }
    if (Array.isArray(node.children)) {
      const nodes = node.children.reduce((a, b) => _filter(b, a), [] as TreeNode[]);
      if (nodes.length) {
        const parentNode = { ...node, children: nodes };
        needsToExpanded.add(parentNode);
        result.push(parentNode);
      }
    }
    return result;
  };
  const treeData = data.reduce((a, b) => _filter(b, a), [] as TreeNode[]);
  return new FilteredTreeResult(treeData, [...needsToExpanded]);
}

@Component({
  selector: 'vts-demo-tree-view-search',
  template: `
    <vts-input-group [vtsSuffix]="suffixIcon">
      <input
        type="text"
        vts-input
        placeholder="Search"
        ngModel
        (ngModelChange)="searchValue$.next($event)"
      />
    </vts-input-group>
    <ng-template #suffixIcon>
      <i vts-icon vtsType="Search"></i>
    </ng-template>

    <vts-tree-view [vtsTreeControl]="treeControl" [vtsDataSource]="dataSource">
      <vts-tree-node *vtsTreeNodeDef="let node">
        <vts-tree-node-toggle vtsNoop></vts-tree-node-toggle>
        <vts-tree-node-option>
          <span [innerHTML]="node.name | vtsHighlight : searchValue : 'i' : 'highlight'"></span>
        </vts-tree-node-option>
      </vts-tree-node>

      <vts-tree-node *vtsTreeNodeDef="let node; when: hasChild">
        <vts-tree-node-toggle vtsCaret></vts-tree-node-toggle>
        <vts-tree-node-option>
          <span [innerHTML]="node.name | vtsHighlight : searchValue : 'i' : 'highlight'"></span>
        </vts-tree-node-option>
      </vts-tree-node>
    </vts-tree-view>
  `,
  styles: [
    `
      vts-input-group {
        margin-bottom: 8px;
      }

      ::ng-deep .highlight {
        color: red;
      }
    `
  ]
})
export class VtsDemoTreeViewSearchComponent {
  flatNodeMap = new Map<FlatNode, TreeNode>();
  nestedNodeMap = new Map<TreeNode, FlatNode>();
  expandedNodes: TreeNode[] = [];
  searchValue = '';
  originData$ = new BehaviorSubject(TREE_DATA);
  searchValue$ = new BehaviorSubject<string>('');

  transformer = (node: TreeNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.name === node.name
        ? existingNode
        : {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level
          };
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  treeControl = new FlatTreeControl<FlatNode, TreeNode>(
    node => node.level,
    node => node.expandable,
    {
      trackBy: flatNode => this.flatNodeMap.get(flatNode)!
    }
  );

  treeFlattener = new VtsTreeFlattener<TreeNode, FlatNode, TreeNode>(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new VtsTreeFlatDataSource(this.treeControl, this.treeFlattener);

  filteredData$ = combineLatest([
    this.originData$,
    this.searchValue$.pipe(
      auditTime(300),
      map(value => (this.searchValue = value))
    )
  ]).pipe(
    map(([data, value]) => (value ? filterTreeData(data, value) : new FilteredTreeResult(data)))
  );

  constructor() {
    this.filteredData$.subscribe(result => {
      this.dataSource.setData(result.treeData);

      const hasSearchValue = !!this.searchValue;
      if (hasSearchValue) {
        if (this.expandedNodes.length === 0) {
          this.expandedNodes = this.treeControl.expansionModel.selected;
          this.treeControl.expansionModel.clear();
        }
        this.treeControl.expansionModel.select(...result.needsToExpanded);
      } else {
        if (this.expandedNodes.length) {
          this.treeControl.expansionModel.clear();
          this.treeControl.expansionModel.select(...this.expandedNodes);
          this.expandedNodes = [];
        }
      }
      this.treeControl.expandAll();
    });
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;
}
