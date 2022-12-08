import { Component, OnInit, ViewChild } from '@angular/core';
import {
  VtsGraphComponent,
  VtsGraphData,
  VtsGraphDataDef,
  VtsGraphZoomDirective,
  VtsRankDirection
} from '@ui-vts/ng-vts/graph';

@Component({
  selector: 'vts-demo-graph-customized',
  template: `
    <button vts-button vtsType="default" (click)="expandAll()">ExpandAll</button>
    <button vts-button vtsType="default" (click)="collapseAll()">CollapseAll</button>
    <button vts-button vtsType="primary" (click)="fit()">Fit</button>
    <vts-radio-group [(ngModel)]="rankDirection">
      <label vts-radio-button vtsValue="LR">LR</label>
      <label vts-radio-button vtsValue="RL">RL</label>
      <label vts-radio-button vtsValue="TB">TB</label>
      <label vts-radio-button vtsValue="BT">BT</label>
    </vts-radio-group>
    <vts-graph
      vts-graph-zoom
      [vtsGraphData]="graphData"
      [vtsAutoSize]="true"
      [vtsRankDirection]="rankDirection"
      (vtsGraphInitialized)="graphInitialized($event)"
    >
      <ng-container *vtsGraphNode="let node">
        <foreignObject x="0" y="0" [attr.width]="node.width" [attr.height]="node.height">
          <xhtml:div class="graph-node leaf-node" (click)="focusNode(node.id || node.name)">
            <div class="title">
              {{ node.name }}
            </div>
          </xhtml:div>
        </foreignObject>
      </ng-container>

      <ng-container *vtsGraphGroupNode="let node">
        <foreignObject x="0" y="0" [attr.width]="node.width" [attr.height]="node.height">
          <xhtml:div class="graph-node group-node" (click)="focusNode(node.id || node.name)">
            <div class="title">
              {{ node.name }}
            </div>
          </xhtml:div>
        </foreignObject>
      </ng-container>
    </vts-graph>
  `,
  styles: [
    `
      vts-radio-group {
        float: right;
      }

      button {
        margin-right: 12px;
      }

      vts-graph {
        height: 400px;
      }

      .graph-node {
        border: 1px solid #8cc8ff;
        cursor: pointer;
        font-size: 12px;
        height: 100%;
        line-height: 1.2;
        border-radius: 0;
        text-align: center;
        word-break: break-all;
        display: block;
      }

      .group-node {
        border-width: 4px;
      }

      .leaf-node {
        color: #1a90ff;
        background: rgba(26, 144, 255, 0.15);
        min-height: 30px;
        height: fit-content;
      }

      .title {
        padding: 4px;
        word-break: keep-all;
      }
    `
  ]
})
export class VtsDemoGraphCustomizedComponent implements OnInit {
  @ViewChild(VtsGraphComponent, { static: true })
  vtsGraphComponent!: VtsGraphComponent;
  @ViewChild(VtsGraphZoomDirective, { static: true })
  zoomController!: VtsGraphZoomDirective;
  zoom = 0.5;
  testDef: VtsGraphDataDef = {
    nodes: [
      {
        id: '0',
        label: '0'
      },
      {
        id: '1',
        label: '1'
      },
      {
        id: '2',
        label: '2'
      },
      {
        id: '3',
        label: '3'
      },
      {
        id: '4',
        label: '4'
      },
      {
        id: '5',
        label: '5'
      },
      {
        id: '6',
        label: '6'
      },
      {
        id: '7',
        label: '7'
      },
      {
        id: '8',
        label: '8'
      },
      {
        id: '9',
        label: '9'
      },
      {
        id: '10',
        label: '10'
      },
      {
        id: '11',
        label: '11'
      },
      {
        id: '12',
        label: '12'
      },
      {
        id: '13',
        label: '13'
      },
      {
        id: '14',
        label: '14'
      },
      {
        id: '15',
        label: '15'
      }
    ],
    edges: [
      {
        v: '0',
        w: '1'
      },
      {
        v: '0',
        w: '2'
      },
      {
        v: '0',
        w: '3'
      },
      {
        v: '0',
        w: '4'
      },
      {
        v: '0',
        w: '5'
      },
      {
        v: '0',
        w: '7'
      },
      {
        v: '0',
        w: '8'
      },
      {
        v: '0',
        w: '9'
      },
      {
        v: '0',
        w: '10'
      },
      {
        v: '0',
        w: '11'
      },
      {
        v: '0',
        w: '13'
      },
      {
        v: '0',
        w: '14'
      },
      {
        v: '0',
        w: '15'
      },
      {
        v: '2',
        w: '3'
      },
      {
        v: '4',
        w: '5'
      },
      {
        v: '4',
        w: '6'
      },
      {
        v: '5',
        w: '6'
      },
      {
        v: '7',
        w: '13'
      },
      {
        v: '8',
        w: '14'
      },
      {
        v: '9',
        w: '10'
      },
      {
        v: '10',
        w: '14'
      },
      {
        v: '10',
        w: '12'
      },
      {
        v: '11',
        w: '14'
      },
      {
        v: '12',
        w: '13'
      }
    ],
    compound: {
      G0: ['4', '5', '15']
    }
  };
  rankDirection: VtsRankDirection = 'TB';
  graphData = new VtsGraphData(this.testDef);

  constructor() {}

  ngOnInit(): void {}

  expand(name: string): void {
    this.graphData.expand(name);
  }

  collapse(name: string): void {
    this.graphData.collapse(name);
  }

  expandAll(): void {
    this.graphData.expandAll();
  }

  collapseAll(): void {
    this.graphData.collapseAll();
  }

  fit(): void {
    this.zoomController?.fitCenter();
  }

  focusNode(e: string | number): void {
    this.zoomController?.focus(e);
  }

  graphInitialized(_ele: VtsGraphComponent): void {
    // Only vts-graph-zoom enabled, you should run `fitCenter` manually
    this.zoomController?.fitCenter();
  }
}
