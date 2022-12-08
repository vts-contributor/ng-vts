import { Component, TemplateRef, ViewChild } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent, dispatchTouchEvent } from '@ui-vts/ng-vts/core/testing';
import { ComponentBed, createComponentBed } from '@ui-vts/ng-vts/core/testing/component-bed';
import { VtsFormatEmitEvent, VtsTreeNode, VtsTreeNodeOptions } from '@ui-vts/ng-vts/core/tree';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';
import { Observable, of } from 'rxjs';
import { VtsTreeNodeBuiltinComponent } from './tree-node.component';

import { VtsTreeComponent } from './tree.component';
import { VtsTreeModule } from './tree.module';
import Spy = jasmine.Spy;

const prepareTest = (componentInstance?: VtsSafeAny): ComponentBed<VtsSafeAny> => {
  return createComponentBed(componentInstance, {
    declarations: [VtsTreeNodeBuiltinComponent],
    providers: [],
    imports: [
      VtsTreeModule,
      NoopAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      VtsIconTestModule
    ]
  });
};

describe('tree', () => {
  describe('VtsTestTreeBasicControlledComponent', () => {
    let testBed: ComponentBed<VtsTestTreeBasicControlledComponent>;

    beforeEach(() => {
      testBed = prepareTest(VtsTestTreeBasicControlledComponent);
      const { fixture } = testBed;
      fixture.detectChanges();
    });

    describe('basic tree under default value', () => {
      it('basic initial data', () => {
        const { nativeElement } = testBed;
        const shownNodes = nativeElement.querySelectorAll('vts-tree-node[builtin]');
        const enableCheckbox = nativeElement.querySelectorAll('.vts-tree-checkbox');
        expect(shownNodes.length).toEqual(3);
        expect(enableCheckbox.length).toEqual(3);
      });

      it('should initialize properly', () => {
        const { nativeElement } = testBed;
        const shownNodes = nativeElement.querySelectorAll('vts-tree-node[builtin]');
        const enableCheckbox = nativeElement.querySelectorAll('.vts-tree-checkbox');
        expect(shownNodes.length).toEqual(3);
        expect(enableCheckbox.length).toEqual(3);
      });

      it('should expand the specified node based on vtsExpandedKeys', fakeAsync(() => {
        const { component, fixture, nativeElement } = testBed;
        component.defaultExpandedKeys = ['0-1'];
        fixture.detectChanges();
        const shownNodes = nativeElement.querySelectorAll('vts-tree-node[builtin]');
        expect(shownNodes.length).toEqual(4);
        tick(300);
        fixture.detectChanges();
        // leaf node should not be included
        expect(component.treeComponent.getExpandedNodeList().length).toEqual(1);
      }));

      it('should expand all nodes while setting vtsExpandAll', fakeAsync(() => {
        const { component, fixture, nativeElement } = testBed;
        component.expandAll = true;
        fixture.detectChanges();
        const shownNodes = nativeElement.querySelectorAll('vts-tree-node[builtin]');
        expect(shownNodes.length).toEqual(7);
        tick(300);
        fixture.detectChanges();
        // leaf node should not be included
        expect(component.treeComponent.getExpandedNodeList().length).toEqual(4);
      }));

      it('should render checkbox state of nodes based on vtsCheckedKeys', fakeAsync(() => {
        const { component, fixture, nativeElement } = testBed;
        component.expandAll = true; // Just for testing the selected state
        component.defaultCheckedKeys = ['0-0-0', '0-0-1'];
        fixture.detectChanges();
        const checkedNodes = nativeElement.querySelectorAll('.vts-tree-checkbox-checked');
        const halfCheckedNodes = nativeElement.querySelectorAll('.vts-tree-checkbox-indeterminate');
        expect(checkedNodes.length).toEqual(2);
        expect(halfCheckedNodes.length).toEqual(1);
        tick(300);
        fixture.detectChanges();
        expect(component.treeComponent.getCheckedNodeList().length).toEqual(2);
        expect(component.treeComponent.getHalfCheckedNodeList().length).toEqual(1);
      }));

      it('node check should not affect other nodes based on vtsCheckStrictly', fakeAsync(() => {
        const { component, fixture, nativeElement } = testBed;
        component.expandAll = true;
        component.checkStrictly = true;
        component.defaultCheckedKeys = ['0-0-0', '0-0-1'];
        fixture.detectChanges();
        const checkedNodes = nativeElement.querySelectorAll('.vts-tree-checkbox-checked');
        const halfCheckedNodes = nativeElement.querySelectorAll('.vts-tree-checkbox-indeterminate');
        expect(checkedNodes.length).toEqual(2);
        expect(halfCheckedNodes.length).toEqual(0);
        tick(300);
        fixture.detectChanges();
        expect(component.treeComponent.getCheckedNodeList().length).toEqual(2);
        expect(component.treeComponent.getHalfCheckedNodeList().length).toEqual(0);
      }));

      it('should select nodes based on vtsSelectedKeys', fakeAsync(() => {
        const { component, fixture, nativeElement } = testBed;
        component.defaultSelectedKeys = ['0-0', '0-1'];
        fixture.detectChanges();
        // vtsMultiple is true
        const selectedNodes = nativeElement.querySelectorAll('.vts-tree-node-selected');
        expect(selectedNodes.length).toEqual(2);
        tick(300);
        fixture.detectChanges();
        expect(component.treeComponent.getSelectedNodeList().length).toEqual(2);
      }));

      it('should select only one nodes based on vtsMultiple:false', fakeAsync(() => {
        const { component, fixture, nativeElement } = testBed;
        component.multiple = false;
        component.defaultSelectedKeys = ['0-0', '0-1'];
        fixture.detectChanges();
        // vtsMultiple is false
        const selectedNodes = nativeElement.querySelectorAll('.vts-tree-node-selected');
        expect(selectedNodes.length).toEqual(1);
        tick(300);
        fixture.detectChanges();
        expect(component.treeComponent.getSelectedNodeList().length).toEqual(1);
      }));

      it('should match nodes based on vtsSearchValue', fakeAsync(() => {
        const { component, fixture, nativeElement } = testBed;
        component.searchValue = '0-0-1';
        fixture.detectChanges();
        // will expand 0-0 only
        const expandedNodes = nativeElement.querySelectorAll('.vts-tree-switcher_open');
        const matchedNodes = nativeElement.querySelectorAll('.font-highlight');
        expect(expandedNodes.length).toEqual(1);
        expect(matchedNodes.length).toEqual(1);
        tick(300);
        fixture.detectChanges();
        expect(component.treeComponent.getMatchedNodeList().length).toEqual(1);
      }));

      it('should match nodes based on vtsSearchFunc', fakeAsync(() => {
        const { component, fixture, nativeElement } = testBed;
        component.searchFunc = (data: VtsTreeNodeOptions): boolean => {
          return data.title === component.searchValue;
        };
        component.searchValue = '0-0';
        fixture.detectChanges();
        let expandedNodes = nativeElement.querySelectorAll('.vts-tree-switcher_open');
        let matchedNodes = nativeElement.querySelectorAll('.font-highlight');
        expect(expandedNodes.length).toEqual(0);
        expect(matchedNodes.length).toEqual(1);
        tick(300);
        fixture.detectChanges();
        expect(component.treeComponent.getMatchedNodeList().length).toEqual(1);

        component.searchValue = '0-0-';
        fixture.detectChanges();
        expandedNodes = nativeElement.querySelectorAll('.vts-tree-switcher_open');
        matchedNodes = nativeElement.querySelectorAll('.font-highlight');
        expect(expandedNodes.length).toEqual(0);
        expect(matchedNodes.length).toEqual(0);
      }));

      it('should keep parent expanded state of matched nodes based on vtsHideUnMatched', fakeAsync(() => {
        const { component, fixture, nativeElement } = testBed;
        component.hideUnMatched = true;
        fixture.detectChanges();
        component.searchValue = '0-0-1';
        fixture.detectChanges();
        // will expand 0-0 but not matched
        const node = nativeElement.querySelector('.vts-tree-switcher')!;
        dispatchMouseEvent(node, 'click');
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        // 0-1 0-2 hidden, others are not shown because not expanded
        const hiddenNodes = nativeElement.querySelectorAll(
          'vts-tree-node[builtin][style*="display: none;"]'
        );
        expect(hiddenNodes.length).toEqual(2);
      }));
    });

    describe('basic style of tree', () => {
      it('should render tree with line based on vtsShowLine', () => {
        const { component, fixture, nativeElement } = testBed;
        component.showLine = true;
        fixture.detectChanges();
        const lineTreeIcon = nativeElement.querySelectorAll('.vtsicon-plus-square');
        expect(lineTreeIcon.length).toEqual(2); // one is leaf node
      });

      it('should show custom icon based on vtsExpandedIcon', () => {
        const { fixture, nativeElement } = testBed;
        const button = nativeElement.querySelector('button')!;
        button.click();
        fixture.detectChanges();

        const customIconElement = nativeElement.querySelectorAll(
          '.vts-tree-switcher .vtsicon-smile'
        );
        // shown nodes are same with `basic initial data`
        expect(customIconElement.length).toEqual(2);
      });

      it('should not trigger checkbox if node is disabled ', () => {
        const { component, fixture, nativeElement } = testBed;
        const spy = spyOn(component, 'vtsEvent');
        component.nodes = [
          {
            title: '0-0',
            key: '0-0',
            disableCheckbox: true,
            disabled: true
          }
        ];
        fixture.detectChanges();
        const node = nativeElement.querySelector('.vts-tree-checkbox') as HTMLElement;
        dispatchMouseEvent(node, 'click');
        expect(spy).not.toHaveBeenCalled();
      });

      it('should should custom icon', () => {
        const { component, fixture, nativeElement } = testBed;
        component.nodes = [
          {
            title: '0-0',
            key: '0-0',
            icon: 'smile'
          }
        ];
        fixture.detectChanges();
        const node = nativeElement.querySelector(
          '.vts-tree-icon__customize .vtsicon-smile'
        ) as HTMLElement;
        expect(node).toBeDefined();
      });

      it('should should show loading icon', () => {
        const { component, fixture, nativeElement } = testBed;
        component.nodes = [
          {
            title: '0-0',
            key: '0-0'
          }
        ];
        component.asyncData = true;
        fixture.detectChanges();
        const targetNode = nativeElement.querySelector('.vts-tree-switcher') as HTMLElement;
        dispatchMouseEvent(targetNode, 'click');
        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('.vts-tree-treenode-loading').length).toEqual(1);
        expect(component.treeComponent.getExpandedNodeList().length).toEqual(1);

        component.treeComponent.getExpandedNodeList()[0].addChildren([
          {
            title: 'Child Node',
            key: `0-0`
          }
        ]);
        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('.vts-tree-treenode-loading').length).toEqual(0);
        expect(fixture.componentInstance.treeComponent.getExpandedNodeList().length).toEqual(1);
      });
    });

    describe('mouse event trigger', () => {
      it('should select node when clicking', fakeAsync(() => {
        const { component, fixture, nativeElement } = testBed;
        const spy = spyOn(component, 'vtsEvent');
        expect(spy).not.toHaveBeenCalled();

        // get first node 0-0
        const node = nativeElement.querySelector('.vts-tree-node-content-wrapper')!;
        dispatchMouseEvent(node, 'click');
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(
          nativeElement.querySelector('.vts-tree-node-content-wrapper.vts-tree-node-selected')
        ).toBeDefined();
        tick(300);
        fixture.detectChanges();
        expect(component.treeComponent.getSelectedNodeList().length).toEqual(1);
      }));

      it('should expand node when clicking switcher', fakeAsync(() => {
        const { component, fixture, nativeElement } = testBed;
        const spy = spyOn(component, 'vtsEvent');
        // get first node 0-0
        const node = nativeElement.querySelector('.vts-tree-switcher')!;
        dispatchMouseEvent(node, 'click');
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(
          nativeElement.querySelector('.vts-tree-switcher.vts-tree-switcher_open')
        ).toBeDefined();
        tick(300);
        fixture.detectChanges();
        expect(component.treeComponent.getExpandedNodeList().length).toEqual(1);
      }));

      it('should check node when clicking checkBox', fakeAsync(() => {
        const { component, fixture, nativeElement } = testBed;
        const spy = spyOn(component, 'vtsEvent');
        // get first node 0-0
        const node = nativeElement.querySelector('.vts-tree-checkbox')!;
        dispatchMouseEvent(node, 'click');
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(
          nativeElement.querySelector('.vts-tree-checkbox.vts-tree-checkbox-checked')
        ).toBeDefined();
        tick(300);
        fixture.detectChanges();
        expect(component.treeComponent.getCheckedNodeList().length).toEqual(1);
      }));

      it('should trigger contextmenu event', fakeAsync(() => {
        const { component, fixture, nativeElement } = testBed;
        const spy = spyOn(component, 'vtsEvent');
        // get first node 0-0
        const node = nativeElement.querySelector('.vts-tree-node-content-wrapper')!;
        dispatchMouseEvent(node, 'contextmenu');
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledTimes(1);
      }));

      it('should trigger dblclick event', fakeAsync(() => {
        const { component, fixture, nativeElement } = testBed;
        const spy = spyOn(component, 'vtsEvent');
        // get first node 0-0
        const node = nativeElement.querySelector('.vts-tree-node-content-wrapper')!;
        dispatchMouseEvent(node, 'dblclick');
        fixture.detectChanges();
        // Maybe needs to change
        // In actual user behavior, click event may be triggered twice
        expect(spy).toHaveBeenCalledTimes(1);
      }));
    });
  });

  describe('VtsTestTreeDraggableComponent', () => {
    let testBed: ComponentBed<VtsTestTreeDraggableComponent>;
    let dragStartSpy: Spy;
    let dragEnterSpy: Spy;
    let dragOverSpy: Spy;
    let dragLeaveSpy: Spy;
    let dropSpy: Spy;
    let dragEndSpy: Spy;
    beforeEach(() => {
      testBed = prepareTest(VtsTestTreeDraggableComponent);
      const { component, fixture } = testBed;
      dragStartSpy = spyOn(component, 'onDragStart').and.callThrough();
      dragEnterSpy = spyOn(component, 'onDragEnter').and.callThrough();
      dragOverSpy = spyOn(component, 'onDragOver').and.callThrough();
      dragLeaveSpy = spyOn(component, 'onDragLeave').and.callThrough();
      dropSpy = spyOn(component, 'onDrop').and.callThrough();
      dragEndSpy = spyOn(component, 'onDragEnd').and.callThrough();
      fixture.detectChanges();
    });

    describe('drag event trigger', () => {
      it('should trigger dragstart event', fakeAsync(() => {
        // dragstart needs to collapse expanded node
        const { component, fixture, nativeElement } = testBed;
        component.defaultExpandedKeys = ['0-1'];
        fixture.detectChanges();
        let expandedNodes = nativeElement.querySelectorAll('.vts-tree-switcher_open');
        expect(expandedNodes.length).toEqual(1);
        const dragNode = nativeElement.querySelector("[title='0-1']") as HTMLElement;
        dispatchMouseEvent(dragNode, 'dragstart');
        fixture.detectChanges();
        expandedNodes = nativeElement.querySelectorAll('.vts-tree-switcher_open');
        expect(expandedNodes.length).toEqual(0);
      }));

      // fixture.detectChanges() will stop event
      it('should trigger drag event', fakeAsync(() => {
        const { fixture, nativeElement } = testBed;
        const dragNode = nativeElement.querySelector("[title='0-2']") as HTMLElement;
        const dropNode = nativeElement.querySelector("[title='0-0']") as HTMLElement;
        const passedNode = nativeElement.querySelector("[title='0-1']") as HTMLElement;
        //  ============ dragstart ==============
        dispatchMouseEvent(dragNode, 'dragstart');
        fixture.detectChanges();
        expect(dragStartSpy).toHaveBeenCalledTimes(1);
        let shownNodes = nativeElement.querySelectorAll('vts-tree-node[builtin]');
        expect(shownNodes.length).toEqual(3);

        //  ============ dragenter ==============
        // DragNode enters one node, if it is not expanded, should expand it(0-1) and render tree again
        // Do not do `fixture.detectChanges()` after dragenter, because it will stop dragover
        dispatchMouseEvent(passedNode, 'dragenter');
        dispatchMouseEvent(passedNode, 'dragover');

        // ======= enter check, expand passing nodes ========
        expect(dragEnterSpy).toHaveBeenCalledTimes(1);
        expect(dragOverSpy).toHaveBeenCalledTimes(1);

        //  ============ dragleave ==============
        dispatchMouseEvent(passedNode, 'dragleave');
        expect(dragLeaveSpy).toHaveBeenCalledTimes(1);

        //  ============ drop ==============
        // drop 0-2 to 0-0
        dispatchMouseEvent(dropNode, 'dragenter');
        dispatchMouseEvent(dropNode, 'drop');
        dispatchMouseEvent(dropNode, 'dragend');

        expect(dropSpy).toHaveBeenCalledTimes(1);
        expect(dragEndSpy).toHaveBeenCalledTimes(1);
        fixture.detectChanges();

        // dragenter expands 0-1/0-1
        shownNodes = nativeElement.querySelectorAll('vts-tree-node[builtin]');
        expect(shownNodes.length).toEqual(7);
      }));

      it('should trigger drag over event', fakeAsync(() => {
        //  ============ over with different position in next test ==============
        // clientY, top, bottom, height, des;
        // pipeline: 353, 557, 573, 16, 4
        // I don't know how to test dragover in pipeline
        // locally top / bottom / des : 335, 357, 5.5
        // drag-over(0): 340.5 ~ 352.5 561~569
        // drag-over-gap-bottom(1): > 352.5 569
        // drag-over-gap-top(-1): < 340.5 561
        /**
         * vtsTreeService#calcDropPosition
         * if (clientY <= top + des) {
         *   return -1;
         * } else if (clientY >= bottom - des) {
         *   return 1;
         * }
         * return 0;
         */

        const { fixture, nativeElement } = testBed;
        let elementNode;
        const dragNode = nativeElement.querySelector("[title='0-2']") as HTMLElement;
        const passedNode = nativeElement.querySelector("[title='0-1']") as HTMLElement;
        //  ============ dragstart ==============
        dispatchMouseEvent(dragNode, 'dragstart');
        fixture.detectChanges();
        let shownNodes = nativeElement.querySelectorAll('vts-tree-node[builtin]');
        expect(shownNodes.length).toEqual(3);

        //  ============ dragenter ==============
        // DragNode enters one node, if it is not expanded, should expand it(0-1) and render tree again
        // Do not do `fixture.detectChanges()` after dragenter, because it will stop dragover
        dispatchMouseEvent(passedNode, 'dragenter');

        // =========== dragover with different position ===========
        // drag-over-gap-top
        dispatchMouseEvent(passedNode, 'dragover', 300, 340);
        elementNode = nativeElement.querySelector(
          'vts-tree-node[builtin]:nth-child(2)'
        ) as HTMLElement;
        expect(elementNode.classList).toContain('drag-over-gap-top');

        // drag-over
        dispatchMouseEvent(passedNode, 'dragover', 300, 566);
        // elementNode = nativeElement.querySelector('vts-tree-node:nth-child(2) .vts-tree-treenode') as HTMLElement;
        // expect(elementNode.classList).toContain('drag-over');

        // drag-over-gap-bottom
        dispatchMouseEvent(passedNode, 'dragover', 300, 570);
        elementNode = nativeElement.querySelector(
          'vts-tree-node[builtin]:nth-child(2)'
        ) as HTMLElement;
        expect(elementNode.classList).toContain('drag-over-gap-bottom');

        // ======= enter check, expand passing nodes ========
        expect(dragEnterSpy).toHaveBeenCalledTimes(1);
        expect(dragOverSpy).toHaveBeenCalledTimes(3);
        fixture.detectChanges();
        shownNodes = nativeElement.querySelectorAll('vts-tree-node[builtin]');
        expect(shownNodes.length).toEqual(4);
      }));

      it('should drop as vtsBeforeDrop', fakeAsync(() => {
        const { component, fixture, nativeElement } = testBed;
        const dragNode = nativeElement.querySelector("[title='0-2']") as HTMLElement;
        const dropNode = nativeElement.querySelector("[title='0-0']") as HTMLElement;
        component.beforeDrop = (): Observable<boolean> => {
          return of(true);
        };
        fixture.detectChanges();
        expect(
          (nativeElement.querySelector("[title='0-2']") as HTMLElement).querySelector(
            '.vts-tree-indent'
          )
        ).toBeNull();
        dispatchTouchEvent(dragNode, 'dragstart');
        dispatchTouchEvent(dropNode, 'dragenter');
        dispatchTouchEvent(dropNode, 'dragover');
        // drop 0-2 to 0-0
        dispatchTouchEvent(dropNode, 'drop');
        tick(300);
        fixture.detectChanges();
        expect(
          (nativeElement.querySelector("[title='0-2']") as HTMLElement).querySelector(
            '.vts-tree-indent'
          )
        ).toBeDefined();
      }));

      it('should vtsBlockNode work', fakeAsync(() => {
        const { fixture, nativeElement } = testBed;
        fixture.detectChanges();
        const treeElement = nativeElement.querySelector('.vts-tree') as HTMLElement;
        expect(treeElement.classList).toContain('vts-tree-block-node');
      }));
    });
  });

  describe('VtsTestTreeBasicSearchComponent', () => {
    let testBed: ComponentBed<VtsTestTreeBasicSearchComponent>;

    const getVisibleNodes = (title?: string) => {
      const isNodeVisible = (el: Element) => el.getClientRects().length !== 0;
      const selector = title ? `[title='${title}']` : '[title]';
      const nodes = testBed.nativeElement.querySelectorAll(selector);
      return Array.from(nodes).filter(isNodeVisible);
    };

    beforeEach(() => {
      testBed = prepareTest(VtsTestTreeBasicSearchComponent);
    });

    describe('search case-insensitive', () => {
      it('should list matches independent on casing', fakeAsync(() => {
        const { component, fixture } = testBed;
        fixture.detectChanges();
        expect(getVisibleNodes().length).toEqual(3);

        component.searchValue = 'foo';
        fixture.detectChanges();
        expect(getVisibleNodes().length).toEqual(2);
        expect(getVisibleNodes('Foo').length).toEqual(1);
        expect(getVisibleNodes('foo').length).toEqual(1);

        component.searchValue = 'Foo';
        fixture.detectChanges();
        expect(getVisibleNodes().length).toEqual(2);
        expect(getVisibleNodes('Foo').length).toEqual(1);
        expect(getVisibleNodes('foo').length).toEqual(1);

        component.searchValue = 'baz';
        fixture.detectChanges();
        expect(getVisibleNodes().length).toEqual(2);
        expect(getVisibleNodes('Foo').length).toEqual(1);
        expect(getVisibleNodes('Baz Bar').length).toEqual(1);
      }));
    });

    describe('highlight case-insensitive', () => {
      it('should highlight matched node', fakeAsync(() => {
        const { component, fixture } = testBed;
        fixture.detectChanges();
        expect(getVisibleNodes().length).toEqual(3);

        component.searchValue = 'baz';
        fixture.detectChanges();
        expect(getVisibleNodes().length).toEqual(2);
        expect(getVisibleNodes('Foo').length).toEqual(1);
        expect(getVisibleNodes('Baz Bar').length).toEqual(1);
        const highlightedNode = getVisibleNodes('Baz Bar')[0].querySelector('.font-highlight');
        expect(highlightedNode?.textContent).toEqual('Baz');
      }));
    });
  });
});

/**
 * Basic controlled tree
 */
@Component({
  template: `
    <button (click)="changeIcon(expandedIconTpl)">Custom expand icon</button>
    <vts-tree
      #treeComponent
      [vtsData]="nodes"
      vtsShowIcon
      [vtsCheckable]="true"
      [vtsShowLine]="showLine"
      [vtsCheckStrictly]="checkStrictly"
      [vtsCheckedKeys]="defaultCheckedKeys"
      [vtsExpandedKeys]="defaultExpandedKeys"
      [vtsSelectedKeys]="defaultSelectedKeys"
      [vtsMultiple]="multiple"
      [vtsSearchValue]="searchValue"
      [vtsSearchFunc]="searchFunc"
      [vtsHideUnMatched]="hideUnMatched"
      [vtsExpandAll]="expandAll"
      [vtsExpandedIcon]="expandedIcon"
      [vtsAsyncData]="asyncData"
      (vtsSearchValueChange)="vtsEvent($event)"
      (vtsClick)="vtsEvent($event)"
      (vtsDblClick)="vtsEvent($event)"
      (vtsContextMenu)="vtsEvent($event)"
      (vtsExpandChange)="vtsEvent($event)"
      (vtsCheckBoxChange)="vtsEvent($event)"
    ></vts-tree>
    <ng-template #expandedIconTpl let-node>
      <i vts-icon vtsType="Face" class="vts-tree-switcher-icon"></i>
    </ng-template>
  `
})
export class VtsTestTreeBasicControlledComponent {
  @ViewChild('treeComponent', { static: true })
  treeComponent!: VtsTreeComponent;
  searchValue?: string;
  multiple = true;
  expandAll = false;
  asyncData = false;
  checkStrictly = false;
  showLine = false;
  defaultCheckedKeys: string[] = [];
  defaultSelectedKeys: string[] = [];
  defaultExpandedKeys: string[] = [];
  expandedIcon?: TemplateRef<{
    $implicit: VtsTreeNode;
    origin: VtsTreeNodeOptions;
  }>;
  searchFunc?: (node: VtsTreeNodeOptions) => boolean;
  hideUnMatched = false;
  nodes: VtsTreeNodeOptions[] | VtsTreeNode[] = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0'
        },
        {
          title: '0-0-1',
          key: '0-0-1'
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          isLeaf: true
        }
      ]
    },
    {
      title: '0-1',
      key: '0-1',
      children: [{ title: '0-1-0-0', key: '0-1-0-0', isLeaf: true }]
    },
    {
      title: '0-2',
      key: '0-2',
      disabled: true,
      isLeaf: true
    }
  ];

  vtsEvent(_data: VtsFormatEmitEvent): void {}

  // Just for testing
  changeIcon(
    template: TemplateRef<{
      $implicit: VtsTreeNode;
      origin: VtsTreeNodeOptions;
    }>
  ): void {
    this.expandedIcon = template;
  }
}

// -------------------------------------------
// | Testing Draggable Components
// -------------------------------------------

@Component({
  template: `
    <vts-tree
      vtsBlockNode
      [vtsData]="nodes"
      vtsDraggable
      [vtsExpandedKeys]="defaultExpandedKeys"
      [vtsBeforeDrop]="beforeDrop"
      (vtsOnDragStart)="onDragStart()"
      (vtsOnDragEnter)="onDragEnter()"
      (vtsOnDragLeave)="onDragLeave()"
      (vtsOnDragOver)="onDragOver()"
      (vtsOnDrop)="onDrop()"
      (vtsOnDragEnd)="onDragEnd()"
    ></vts-tree>
  `
})
export class VtsTestTreeDraggableComponent {
  @ViewChild(VtsTreeComponent, { static: true })
  treeComponent!: VtsTreeComponent;
  defaultExpandedKeys: string[] = [];
  nodes: VtsTreeNodeOptions[] | VtsTreeNode[] = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0'
        },
        {
          title: '0-0-1',
          key: '0-0-1'
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          isLeaf: true
        }
      ]
    },
    {
      title: '0-1',
      key: '0-1',
      children: [{ title: '0-1-0-0', key: '0-1-0-0', isLeaf: true }]
    },
    {
      title: '0-2',
      key: '0-2',
      disabled: true,
      isLeaf: true
    }
  ];
  beforeDrop?: () => Observable<boolean>;

  onDragStart(): void {}

  onDragEnter(): void {}

  onDragOver(): void {}

  onDragLeave(): void {}

  onDrop(): void {}

  onDragEnd(): void {}
}

/**
 * Basic searchable tree
 */
@Component({
  template: `
    <vts-tree
      [vtsData]="nodes"
      [vtsSearchValue]="searchValue"
      [vtsExpandAll]="expandAll"
      [vtsAsyncData]="asyncData"
      [vtsHideUnMatched]="hideUnMatched"
    ></vts-tree>
  `
})
export class VtsTestTreeBasicSearchComponent {
  @ViewChild(VtsTreeComponent, { static: true })
  treeComponent!: VtsTreeComponent;
  searchValue!: string;
  expandAll = true;
  asyncData = false;
  hideUnMatched = true;
  nodes: VtsTreeNodeOptions[] | VtsTreeNode[] = [
    {
      title: 'Foo',
      key: '0-1',
      children: [{ title: 'Baz Bar', key: '0-1-0', isLeaf: true }]
    },
    {
      title: 'foo',
      key: '0-2',
      isLeaf: true
    }
  ];
}
