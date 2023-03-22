import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { VtsPropertyType } from './../pro-table.type';
import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'vts-group-filter',
  exportAs: 'vtsGroupFilter',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <div class="flex-s">
      <div style="display:flex; flex-direction: row; align-items: center; flex-basis: 80%">
        <div class="common-group-filter">
          <vts-input-group class="filter-item" [vtsSuffix]="suffixIconSearch">
            <input type="text" [(ngModel)]="searchString" vts-input placeholder="Search all ..." (keyup.enter)="onSearch()"/>
          </vts-input-group>
          <ng-template #suffixIconSearch>
            <span vts-icon vtsType="SearchDoutone"></span>
          </ng-template>
    
          <ng-container *ngFor="let filter of filterGroupConfig; let i = index">
            <ng-container *ngIf="i<2">
              <vts-input-group class="filter-item" [vtsAddOnBefore]="filter.filterText" style="padding-left: 2px">
                <vts-select
                  [vtsMaxTagCount]="1"
                  [(ngModel)]="filter.selectedValues"
                  vtsMode="multiple" vtsAllowClear="false"
                  [vtsTokenSeparators]="[',']"
                  [vtsCustomTemplate]="multipleTemplate"
                  [vtsDropdownStyle]="{'width':'18vw', 
                    'margin-left':'-90px',
                    'box-shadow': '0px 4px 10px rgba(0, 0, 0, 0.1), 0px 0px 3px rgba(0, 0, 0, 0.5)',
                    'border-radius': '6px',
                    'padding':'12px 0px'
                  }"
                  vtsBorderless
                  style="width: 100%;"
                >
                  <vts-option *ngFor="let option of filter.filterValues" [vtsLabel]="option.label" [vtsValue]="option.value"></vts-option>
                </vts-select>
              </vts-input-group>
            </ng-container>
            <ng-template #multipleTemplate let-selected>
              <div class="vts-select-selection-item-content">
                {{ renderSelectedItems(i) }}
              </div>
            </ng-template>
          </ng-container>
        </div>
        <div>
          <a vts-button class="btn-table-config" vtsType="text" (click)="openFilterModal()">
            <i class="fa fa-filter fa-2x" aria-hidden="true"></i>
          </a>
          <vts-badge [vtsCount]="filterGroupConfig?.length" [vtsStyle]="{'background': '#EE0033'}" style="margin-bottom: 16px">
            <a class="head-example"></a>
          </vts-badge>
        </div>
      </div>

      <div vts-col class="btn-config-area" style="flex-basis: 20%">
        <a vts-button class="btn-table-config" vts-dropdown vtsType="text" 
          vtsTrigger="click" [vtsDropdownMenu]="menuSwapVert" [vtsPlacement]="'bottomRight'">
          <i vts-icon vtsType="HeightDoutone"></i>
        </a>
        <vts-dropdown-menu #menuSwapVert="vtsDropdownMenu">
          <div class="triangle-up"></div>
          <ul vts-menu class="drag-area">
            <li vts-menu-item class="height-dropdown-item" (click)="handleChangeRowHeight('normal')">Normal</li>
            <li vts-menu-item class="height-dropdown-item" (click)="handleChangeRowHeight('expand')">Expand</li>
            <li vts-menu-item class="height-dropdown-item" (click)="handleChangeRowHeight('narrow')">Narrow</li>
          </ul>
        </vts-dropdown-menu>
        <a vts-button vts-dropdown vtsTrigger="click" vtsType="text" [vtsDropdownMenu]="menuSettings" class="btn-table-config" [vtsPlacement]="'bottomRight'">
          <i vts-icon vtsType="ReorderDoutone"></i>
        </a>
        <vts-dropdown-menu #menuSettings="vtsDropdownMenu" style="min-width: 12vw;">
          <div class="triangle-up"></div>
          <ul vts-menu cdkDropList (cdkDropListDropped)="drop($event)" class="drag-area">
            <li vts-menu-item>
              <label vts-checkbox [(ngModel)]="allChecked" (ngModelChange)="updateAllChecked()"
                [vtsIndeterminate]="indeterminateConfig">Display all column</label>
            </li>
            <vts-divider style="margin: 0; padding: 4px 0px; width: 220px"></vts-divider>

            <ng-container *ngFor="let property of properties">
              <ng-container *ngIf="property.headerTitle && property.headerTitle != null">
                <li vts-menu-item cdkDrag style="list-style-type: none; width: 100%">
                  <label vts-checkbox [(ngModel)]="property.checked"
                    (ngModelChange)="updateSingleChecked()">{{property.headerTitle}}</label>
                </li>
              </ng-container>
            </ng-container>
            <vts-divider style="margin: 0; padding: 4px 0px"></vts-divider>
            <div class="btn-config-area">
              <button class="btn-config-item" vts-button [vtsSize]="'xs'" vtsType="primary" (click)="onSavePropsConfig()"
                ><i vts-icon vtsType="SaveOutline"></i>Save</button>
              <button class="btn-config-item" style="margin-left: 8px" vts-button [vtsSize]="'xs'" vtsType="default" (click)="onResetPropsConfig()"
                ><i vts-icon vtsType="RestoreOutline"></i>Reset</button>
            </div>
          </ul>
        </vts-dropdown-menu>
        
        <a vts-button class="btn-table-config" vtsType="text" (click)="reloadTableData()">
          <i vts-icon vtsType="Sync"></i>
        </a>
      </div>
    </div>

    <!-- filters modal -->
    <filter-drawer 
      [filterGroupConfig]="filterGroupConfig" 
      [isVisibleModal]="isVisibleModal"
      (submit)="handleOkModal($event)"
      (cancel)="handleCancelModal()"
    ></filter-drawer>
  `,
  styles: [`
      .flex-s {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      .common-group-filter {
        display: flex;
        flex-direction: row;
        padding: 12px 0;
      }

      .text-format {
        font-family: 'Sarabun';
        font-style: normal;
        font-size: 14px;
        line-height: 24px;
        color: #000000;
      }

      .bold-text {
        font-weight: 700 !important;
      }

      .normarl-text {
        font-weight: 400 !important;
      }

      .filter-item {
        background: #FFFFFF;
        border: 1px solid #8F9294;
        border-radius: 6px;
        color: #8F9294;
        margin: 0px 4px;
        width: 18vw;
      }

      .filter-item:first-child,
      .filter-item:last-child {
        margin-left: 0px;
        margin-right: 0px;
      }
      
      .filter-item-select {
        width: 100%;
      }

      .vts-input-group-addon {
        border: 1px solid #FFFFFF;
        background: #FFFFFF;
        font-family: 'Sarabun';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
      }

      .vts-select-selector {
        height: 36px !important;
      }

      .btn-config-area {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .btn-table-config {
        margin-left: 8px;
        border: none;
        color: #73777A;
      }

      .vts-select-multiple .vts-select-selector {
        flex-wrap: unset;
      }

      .vts-dropdown {
        position: inherit;
      }

      .height-dropdown-item {
        width: 10vw;
      }

      .drag-area {
        display: flex;
        flex-direction: column;
        border-radius: 6px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 10px, rgba(0, 0, 0, 0.5) 0px 0px 3px;
        padding: 12px 0;
      }

      .btn-config-item {
        border-radius: 6px;
      }
  `],
  host: {
    '[class.vts-search-form-rtl]': `dir === 'rtl'`,
  }
})
export class VtsProTableGroupFilterComponent implements OnDestroy, OnInit, OnChanges {
  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();
  validateForm!: FormGroup;
  filterForm!: FormGroup;
  controlArray: Array<{ index: number; show: boolean, title: string | undefined, controlKey: string }> = [];

  @Input() vtsIsCollapse = true;
  @Input() data: { [key: string]: any } = {};
  @Input() headers: VtsPropertyType[] = [];
  @Input() properties: VtsPropertyType[] = [];
  @Input() vtsPageSize: number = 10;
  @Input() vtsPageIndex: number = 1;
  @Input() filterGroupConfig: { [key: string]: any }[] | undefined;

  @Output() putSearchData: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly rowHeightChanger = new EventEmitter<string>();
  @Output() reloadTable = new EventEmitter<boolean>();
  @Output() onChangeHeaders = new EventEmitter<VtsPropertyType[]>();

  displayedProps: VtsPropertyType[] = [];
  totalProps: VtsPropertyType[] = [];
  vtsNoDisplayProperties: number = 0;
  vtsTotalProperties: number = 0;
  vtsOffsetButton = 0;
  searchString: string = '';
  vtsRowHeight: string | number = 54;
  allChecked = false;
  indeterminateConfig = true;
  listOfFilter = [];
  isVisibleModal = false;

  constructor(
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality,
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-search-form');
  }

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.headers) {
      this.totalProps = changes.headers.currentValue;
      this.totalProps = this.totalProps.filter(prop => prop.headerTitle && prop.headerTitle != null);
      this.displayedProps = this.totalProps;
    }

    if (changes.filterGroupConfig) {
      let currentFilterGroupConfig = changes.filterGroupConfig.currentValue;
      this.filterForm = this.fb.group({});
      for (let i = 0; i < currentFilterGroupConfig.length; i++) {
        this.filterForm.addControl(`${currentFilterGroupConfig[i].filterText}`, new FormControl());
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch() {
    this.putSearchData.emit(this.searchString);
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.properties, event.previousIndex, event.currentIndex);
  }

  handleChangeRowHeight(value: string) {
    if (value) {
      let rowHeight: number = 0;
      switch (value) {
        case 'normal':
          rowHeight = 48;
          break;
        case 'expand':
          rowHeight = 72;
          break;
        case 'narrow':
          rowHeight = 40;
          break;
        default:
          rowHeight = 48;
          break;
      }
      this.vtsRowHeight = rowHeight;
      this.rowHeightChanger.emit(rowHeight + 'px');
    }
  }

  reloadTableData() {
    this.vtsPageIndex = 1;
    this.reloadTable.emit(true);
  }

  updateSingleChecked(): void {
    if (this.properties.every(item => !item.checked)) {
      this.allChecked = false;
      this.indeterminateConfig = false;
    } else if (this.properties.every(item => item.checked)) {
      this.allChecked = true;
      this.indeterminateConfig = false;
    } else {
      this.indeterminateConfig = true;
    }
  }

  updateAllChecked(): void {
    this.indeterminateConfig = false;
    if (this.allChecked) {
      this.properties = this.properties.map(item => ({
        ...item,
        checked: true
      }));
    } else {
      this.properties = this.properties.map(item => ({
        ...item,
        checked: false
      }));
    }
    this.changeDetector.detectChanges();
  }

  renderSelectedItems(index: number) {
    let output = "";
    if (typeof this.filterGroupConfig != "undefined") {
      let currentFilter = {
        ...this.filterGroupConfig[index]
      };
      // get label of selected values for current filter
      let selectedLabels = [...currentFilter.filterValues.filter((x: any) => currentFilter.selectedValues.indexOf(x.value) >= 0).map((x: any) => x.label)];
      output = selectedLabels[0];
    }
    return output;
  }

  onSavePropsConfig() {
    localStorage.setItem('properties', this.properties.toString());
    this.onChangeHeaders.emit(this.properties);
  }

  onResetPropsConfig() {
    this.properties.forEach(prop => {
      prop.checked = true;
    })
    localStorage.setItem('properties', this.properties.toString());
    this.onChangeHeaders.emit(this.properties);
  }

  openFilterModal() {
    this.isVisibleModal = true;
  }

  handleOkModal(event: any): void {
    if (event) {
      this.putSearchData.emit(event);
    }
    this.isVisibleModal = false;
  }

  handleCancelModal(): void {
    this.isVisibleModal = false;
  }

  handleChangeModal(event: VtsSafeAny) {
    console.log(event);
  }
}
