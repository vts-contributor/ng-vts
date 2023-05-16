import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VtsSizeLMSType, VtsSizeXLMSType } from '@ui-vts/ng-vts/core/types';
import { VtsTreeNodeOptions } from '@ui-vts/ng-vts/tree';

@Component({
  selector: 'vts-demo-tree-select-checkable',
  template: `
    <p>Control size</p>
    <vts-radio-group [(ngModel)]="size" (ngModelChange)="setValue($event)">
      <label vts-radio-button vtsValue="xl">XL</label>
      <label vts-radio-button vtsValue="lg">LG</label>
      <label vts-radio-button vtsValue="md">MD</label>
      <label vts-radio-button vtsValue="sm">SM</label>
    </vts-radio-group>
    <br />
    <br />
    <p>Tree size</p>
    <vts-radio-group [(ngModel)]="treeSize">
      <label vts-radio-button vtsValue="lg">LG</label>
      <label vts-radio-button vtsValue="md">MD</label>
      <label vts-radio-button vtsValue="sm">SM</label>
    </vts-radio-group>
    <br />
    <br />
    <form [vtsSize]="size" [vtsLayout]="'vertical'" vts-form>
      <vts-form-item>
        <vts-form-label>Label Name</vts-form-label>
        <vts-form-control>
          <vts-tree-select
            [vtsSize]="size"
            [vtsTreeSize]="treeSize"
            [vtsNodes]="nodes"
            vtsCheckable
            vtsShowSearch
            vtsShowIcon
            vtsExpandAll
            [vtsPlaceHolder]="placeholder"
          ></vts-tree-select>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <vts-form-label>Label Name</vts-form-label>
        <vts-form-control>
          <vts-tree-select
            [vtsSize]="size"
            [vtsTreeSize]="treeSize"
            [vtsNodes]="nodes"
            vtsCheckable
            vtsShowSearch
            vtsShowIcon
            vtsExpandAll
            [vtsPlaceHolder]="placeholder"
            vtsDisabled
          ></vts-tree-select>
        </vts-form-control>
      </vts-form-item>
      <vts-form-item>
        <form [vtsSize]="size" [vtsLayout]="'vertical'" vts-form [formGroup]="formGroup">
          <vts-form-item>
            <vts-form-label>Label Name</vts-form-label>
            <vts-form-control vtsErrorTip="Error message">
              <vts-tree-select
                [vtsSize]="size"
                [vtsTreeSize]="treeSize"
                [vtsNodes]="nodes"
                vtsCheckable
                vtsShowSearch
                vtsShowIcon
                vtsExpandAll
                [vtsPlaceHolder]="placeholder"
                formControlName="inputValue"
              ></vts-tree-select>
            </vts-form-control>
          </vts-form-item>
        </form>
      </vts-form-item>
    </form>
  `
})
export class VtsDemoTreeSelectCheckableComponent implements OnInit {
  size: VtsSizeXLMSType = 'md';
  treeSize: VtsSizeLMSType = 'md';
  placeholder = '';
  formGroup = new FormGroup({
    inputValue: new FormControl([], [Validators.requiredTrue])
  });
  nodes: VtsTreeNodeOptions[] = [
    {
      title: 'Tree view item 1',
      key: '1',
      icon: 'FolderOpenDoutone:antd',
      children: [
        {
          title: 'Tree view item 2',
          key: '1-1',
          icon: 'FolderOpenDoutone:antd',
          children: [
            {
              title: 'Tree view item 3',
              key: '1-1-1',
              icon: 'FolderOpenDoutone:antd',
              children: [
                {
                  title: 'Tree view item 4',
                  key: '1-1-1-1',
                  icon: 'FileText:antd',
                  isLeaf: true
                },
                {
                  title: 'Tree view item 5',
                  key: '1-1-1-2',
                  icon: 'FileText:antd',
                  isLeaf: true
                }
              ]
            },
            {
              title: 'Tree view item 6',
              key: '1-1-2',
              icon: 'FileText:antd',
              isLeaf: true
            }
          ]
        },
        {
          title: 'Tree view item 7',
          key: '1-2',
          icon: 'FolderOpenDoutone:antd',
          disabled: true,
          children: [
            {
              title: 'Tree view item 8',
              key: '1-2-1',
              icon: 'FileText:antd',
              isLeaf: true
            }
          ]
        }
      ]
    }
  ];

  ngOnInit(): void {
    this.setValue(this.size);
  }

  setValue(e: string) {
    switch (e) {
      case 'sm':
        this.placeholder = 'Small Input';
        break;
      case 'md':
        this.placeholder = 'Medium Input';
        break;
      case 'lg':
        this.placeholder = 'Large Input';
        break;
      case 'xl':
        this.placeholder = 'XLarge Input';
        break;
    }

    this.formGroup.get('inputValue')?.setValue([]);
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
  }
}
