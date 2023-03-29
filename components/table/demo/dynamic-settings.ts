import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import {
  VtsTableLayout,
  VtsTablePaginationPosition,
  VtsTablePaginationType,
  VtsTableSize
} from '@ui-vts/ng-vts/table';

interface ItemData {
  name: string;
  age: number | string;
  address: string;
  checked: boolean;
  expand: boolean;
  description: string;
  disabled?: boolean;
}

interface Setting {
  bordered: boolean;
  loading: boolean;
  pagination: boolean;
  title: boolean;
  header: boolean;
  footer: boolean;
  expandable: boolean;
  checkbox: boolean;
  fixHeader: boolean;
  noResult: boolean;
  ellipsis: boolean;
  size: VtsTableSize;
  tableScroll: string;
  tableLayout: VtsTableLayout;
  position: VtsTablePaginationPosition;
  paginationType: VtsTablePaginationType;
  stripe: boolean;

  rounded: boolean;
  outline: boolean;
  mini: boolean;
  simple: boolean;
  sizeChanger: boolean;
  quickJumper: boolean;
}

@Component({
  selector: 'vts-demo-table-dynamic-settings',
  template: `
    <div class="components-table-demo-control-bar">
      <form vts-form vtsLayout="inline" [formGroup]="settingForm!">
        <p class="section-title">Table Property:</p>
        <vts-form-item *ngFor="let radio of listOfTableRadio">
          <vts-form-label>{{ radio.name }}</vts-form-label>
          <vts-form-control>
            <vts-radio-group [formControlName]="radio.formControlName">
              <label *ngFor="let o of radio.listOfOption" vts-radio-button [vtsValue]="o.value">
                {{ o.label }}
              </label>
            </vts-radio-group>
          </vts-form-control>
        </vts-form-item>
        <p class="divided"></p>
        <vts-form-item *ngFor="let switch of listOfTableSwitch">
          <vts-form-label>{{ switch.name }}</vts-form-label>
          <vts-form-control>
            <vts-switch [formControlName]="switch.formControlName"></vts-switch>
          </vts-form-control>
        </vts-form-item>

        <p class="section-title">Pagination Property:</p>
        <vts-form-item *ngFor="let switch of listOfPaginationSwitch">
          <vts-form-label>{{ switch.name }}</vts-form-label>
          <vts-form-control>
            <vts-switch [formControlName]="switch.formControlName"></vts-switch>
          </vts-form-control>
        </vts-form-item>
      </form>
    </div>

    <vts-table
      #dynamicTable
      [vtsScroll]="{ x: scrollX, y: scrollY }"
      [vtsData]="listOfData"
      [vtsTableLayout]="settingValue.tableLayout"
      [vtsBordered]="settingValue.bordered"
      [vtsLoading]="settingValue.loading"
      [vtsPaginationPosition]="settingValue.position"
      [vtsClientPagination]="settingValue.pagination"
      [vtsShowPagination]="settingValue.pagination"
      [vtsFooter]="settingValue.footer ? 'Here is Footer' : null"
      [vtsTitle]="settingValue.title ? 'Here is Title' : null"
      [vtsSize]="settingValue.size"
      [vtsStripe]="settingValue.stripe"
      (vtsCurrentPageDataChange)="currentPageDataChange($event)"
      [vtsRounded]="settingValue.rounded"
      [vtsOutline]="settingValue.outline"
      [vtsMini]="settingValue.mini"
      [vtsMini]="settingValue.mini"
      [vtsSimple]="settingValue.simple"
      [vtsShowSizeChanger]="settingValue.sizeChanger"
      [vtsShowQuickJumper]="settingValue.quickJumper"
    >
      <thead>
        <tr *ngIf="settingValue.header">
          <th vtsWidth="40px" *ngIf="settingValue.expandable" [vtsLeft]="fixedColumn"></th>
          <th
            *ngIf="settingValue.checkbox"
            vtsWidth="40px"
            [(vtsChecked)]="allChecked"
            [vtsLeft]="fixedColumn"
            [vtsIndeterminate]="indeterminate"
            (vtsCheckedChange)="checkAll($event)"
          ></th>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
          <th vtsWidth="200px" [vtsRight]="fixedColumn">Action</th>
        </tr>
      </thead>
      <tbody>
        <ng-container *ngFor="let data of dynamicTable.data">
          <tr>
            <td
              [vtsLeft]="fixedColumn"
              *ngIf="settingValue.expandable"
              [(vtsExpand)]="data.expand"
            ></td>
            <td
              [vtsLeft]="fixedColumn"
              *ngIf="settingValue.checkbox"
              [(vtsChecked)]="data.checked"
              (vtsCheckedChange)="refreshStatus()"
            ></td>
            <td>{{ data.name }}</td>
            <td>{{ data.age }}</td>
            <td [vtsEllipsis]="settingValue.ellipsis">{{ data.address }}</td>
            <td [vtsRight]="fixedColumn" [vtsEllipsis]="settingValue.ellipsis">
              <a href="#">Delete</a>
              <vts-divider vtsType="vertical"></vts-divider>
              <a href="#">More action</a>
            </td>
          </tr>
          <tr *ngIf="settingValue.expandable" [vtsExpand]="data.expand">
            <span>{{ data.description }}</span>
          </tr>
        </ng-container>
      </tbody>
    </vts-table>
  `,
  styles: [
    `
      form vts-form-item {
        margin-right: 16px;
        margin-bottom: 8px;
      }

      .section-title {
        width: 100%;
        margin-bottom: 8px;
        margin-top: 16px;
      }
    `
  ]
})
export class VtsDemoTableDynamicSettingsComponent implements OnInit {
  settingForm?: UntypedFormGroup;
  listOfData: ReadonlyArray<ItemData> = [];
  displayData: ReadonlyArray<ItemData> = [];
  allChecked = false;
  indeterminate = false;
  fixedColumn = false;
  scrollX: string | null = null;
  scrollY: string | null = null;
  settingValue!: Setting;
  listOfTableSwitch = [
    { name: 'Bordered', formControlName: 'bordered' },
    { name: 'Loading', formControlName: 'loading' },
    { name: 'Show Pagination', formControlName: 'pagination' },
    { name: 'Title', formControlName: 'title' },
    { name: 'Column Header', formControlName: 'header' },
    { name: 'Footer', formControlName: 'footer' },
    { name: 'Expandable', formControlName: 'expandable' },
    { name: 'Checkbox', formControlName: 'checkbox' },
    { name: 'Fixed Header', formControlName: 'fixHeader' },
    { name: 'No Result', formControlName: 'noResult' },
    { name: 'Ellipsis', formControlName: 'ellipsis' },
    { name: 'Stripe', formControlName: 'stripe' }
  ];

  listOfPaginationSwitch = [
    { name: 'Rounded', formControlName: 'rounded' },
    { name: 'Outline', formControlName: 'outline' },
    { name: 'Mini Mode', formControlName: 'mini' },
    { name: 'Simple Mode', formControlName: 'simple' },
    { name: 'Show size changer', formControlName: 'sizeChanger' },
    { name: 'Show quick jumper', formControlName: 'quickJumper' }
  ];

  listOfTableRadio = [
    {
      name: 'Size',
      formControlName: 'size',
      listOfOption: [
        { value: 'sm', label: 'SM' },
        { value: 'md', label: 'MD' },
        { value: 'lg', label: 'LG' }
      ]
    },
    {
      name: 'Table Scroll',
      formControlName: 'tableScroll',
      listOfOption: [
        { value: 'unset', label: 'Unset' },
        { value: 'scroll', label: 'Scroll' },
        { value: 'fixed', label: 'Fixed' }
      ]
    },
    {
      name: 'Table Layout',
      formControlName: 'tableLayout',
      listOfOption: [
        { value: 'auto', label: 'Auto' },
        { value: 'fixed', label: 'Fixed' }
      ]
    },
    {
      name: 'Pagination Position',
      formControlName: 'position',
      listOfOption: [
        { value: 'top', label: 'Top' },
        { value: 'bottom', label: 'Bottom' },
        { value: 'both', label: 'Both' }
      ]
    }
  ];

  currentPageDataChange($event: ReadonlyArray<ItemData>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const validData = this.displayData.filter(value => !value.disabled);
    const allChecked = validData.length > 0 && validData.every(value => value.checked === true);
    const allUnChecked = validData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  generateData(): ReadonlyArray<ItemData> {
    const data = [];
    for (let i = 1; i <= 100; i++) {
      data.push({
        name: 'John Brown',
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
        checked: false,
        expand: false
      });
    }
    return data;
  }

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.settingForm = this.formBuilder.group({
      bordered: false,
      loading: false,
      pagination: true,
      title: false,
      header: true,
      footer: false,
      expandable: true,
      checkbox: true,
      fixHeader: false,
      noResult: false,
      ellipsis: false,
      size: 'sm',
      tableScroll: 'unset',
      tableLayout: 'auto',
      position: 'bottom',
      stripe: false,

      rounded: false,
      outline: false,
      mini: false,
      simple: false,
      sizeChanger: false,
      quickJumper: false
    });
    this.settingValue = this.settingForm.value;
    this.settingForm.valueChanges.subscribe(value => (this.settingValue = value));
    this.settingForm.get('tableScroll')!.valueChanges.subscribe(scroll => {
      this.fixedColumn = scroll === 'fixed';
      this.scrollX = scroll === 'scroll' || scroll === 'fixed' ? '100vw' : null;
    });
    this.settingForm.get('fixHeader')!.valueChanges.subscribe(fixed => {
      this.scrollY = fixed ? '240px' : null;
    });
    this.settingForm.get('noResult')!.valueChanges.subscribe(empty => {
      if (empty) {
        this.listOfData = [];
      } else {
        this.listOfData = this.generateData();
      }
    });
    this.listOfData = this.generateData();
  }
}
