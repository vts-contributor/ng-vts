import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl, TreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component } from '@angular/core';

import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

interface FlatNode {
  expandable: boolean;
  id: number;
  label: string;
  level: number;
  loading?: boolean;
}

const TREE_DATA: FlatNode[] = [
  {
    id: 0,
    label: 'Expand to load',
    level: 0,
    expandable: true
  },
  {
    id: 1,
    label: 'Expand to load',
    level: 0,
    expandable: true
  }
];

function getChildren(node: FlatNode): Observable<FlatNode[]> {
  return of([
    {
      id: Date.now(),
      label: `Child Node (level-${node.level + 1})`,
      level: node.level + 1,
      expandable: true
    },
    {
      id: Date.now(),
      label: `Child Node (level-${node.level + 1})`,
      level: node.level + 1,
      expandable: true
    },
    {
      id: Date.now(),
      label: `Leaf Node (level-${node.level + 1})`,
      level: node.level + 1,
      expandable: false
    }
  ]).pipe(delay(500));
}

class DynamicDatasource implements DataSource<FlatNode> {
  private flattenedData: BehaviorSubject<FlatNode[]>;
  private childrenLoadedSet = new Set<FlatNode>();

  constructor(private treeControl: TreeControl<FlatNode>, initData: FlatNode[]) {
    this.flattenedData = new BehaviorSubject<FlatNode[]>(initData);
    treeControl.dataNodes = initData;
  }

  connect(collectionViewer: CollectionViewer): Observable<FlatNode[]> {
    const changes = [
      collectionViewer.viewChange,
      this.treeControl.expansionModel.changed.pipe(
        tap(change => this.handleExpansionChange(change))
      ),
      this.flattenedData
    ];
    return merge(...changes).pipe(
      map(() => {
        return this.expandFlattenedNodes(this.flattenedData.getValue());
      })
    );
  }

  expandFlattenedNodes(nodes: FlatNode[]): FlatNode[] {
    const treeControl = this.treeControl;
    const results: FlatNode[] = [];
    const currentExpand: boolean[] = [];
    currentExpand[0] = true;

    nodes.forEach(node => {
      let expand = true;
      for (let i = 0; i <= treeControl.getLevel(node); i++) {
        expand = expand && currentExpand[i];
      }
      if (expand) {
        results.push(node);
      }
      if (treeControl.isExpandable(node)) {
        currentExpand[treeControl.getLevel(node) + 1] = treeControl.isExpanded(node);
      }
    });
    return results;
  }

  handleExpansionChange(change: SelectionChange<FlatNode>): void {
    if (change.added) {
      change.added.forEach(node => this.loadChildren(node));
    }
  }

  loadChildren(node: FlatNode): void {
    if (this.childrenLoadedSet.has(node)) {
      return;
    }
    node.loading = true;
    getChildren(node).subscribe(children => {
      node.loading = false;
      const flattenedData = this.flattenedData.getValue();
      const index = flattenedData.indexOf(node);
      if (index !== -1) {
        flattenedData.splice(index + 1, 0, ...children);
        this.childrenLoadedSet.add(node);
      }
      this.flattenedData.next(flattenedData);
    });
  }

  disconnect(): void {
    this.flattenedData.complete();
  }
}

@Component({
  selector: 'vts-demo-tree-view-dynamic',
  template: `
    <vts-tree-view [vtsTreeControl]="treeControl" [vtsDataSource]="dataSource">
      <vts-tree-node *vtsTreeNodeDef="let node">
        <vts-tree-node-toggle vtsNoop></vts-tree-node-toggle>
        <vts-tree-node-option>
          {{ node.label }}
        </vts-tree-node-option>
      </vts-tree-node>
      <vts-tree-node *vtsTreeNodeDef="let node; when: hasChild">
        <vts-tree-node-toggle *ngIf="!node.loading" vtsCaret vtsRecursive></vts-tree-node-toggle>
        <vts-tree-node-toggle *ngIf="node.loading" vtsLoading></vts-tree-node-toggle>
        <vts-tree-node-option>
          {{ node.label }}
        </vts-tree-node-option>
      </vts-tree-node>
    </vts-tree-view>
  `
})
export class VtsDemoTreeViewDynamicComponent implements AfterViewInit {
  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  dataSource = new DynamicDatasource(this.treeControl, TREE_DATA);

  constructor() {}

  hasChild = (_: number, node: FlatNode) => node.expandable;

  ngAfterViewInit(): void {}
}
