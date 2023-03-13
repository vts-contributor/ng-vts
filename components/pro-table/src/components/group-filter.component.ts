import { PropertyType } from './../pro-table.type';
import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  // ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  // QueryList,
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
            <vts-input-group class="filter-item" [vtsAddOnBefore]="filter.filterText" style="padding-left: 2px">
              <vts-select
                [vtsMaxTagCount]="1"
                [(ngModel)]="filter.selectedValues"
                vtsMode="multiple" vtsAllowClear="false"
                [vtsTokenSeparators]="[',']"
                [vtsCustomTemplate]="multipleTemplate"
                vtsBorderless
              >
                <vts-option *ngFor="let option of filter.filterValues" [vtsLabel]="option.label" [vtsValue]="option.value"></vts-option>
              </vts-select>
            </vts-input-group>
              <ng-template #multipleTemplate let-selected>
                <div class="vts-select-selection-item-content">
                  {{ renderSelectedItems(i) }}
                </div>
              </ng-template>
          </ng-container>
        </div>
        <div>
          <a vts-button class="btn-table-config" vts-dropdown vtsTrigger="click" [vtsDropdownMenu]="menuFilters" [vtsPlacement]="'bottomRight'">
            <i vts-icon vtsType="FilterFramesDoutone" ></i>
          </a>
          <vts-badge [vtsCount]="5" style="margin-bottom: 20px;">
            <a class="head-example"></a>
          </vts-badge>
          <vts-dropdown-menu #menuFilters="vtsDropdownMenu">
          <!-- <ul vts-menu>
            <vts-form-item>
            <vts-form-control>
              <ng-container *ngFor="let filter of filterGroupConfig; let i = index">
                <vts-option [vtsValue]="filter.filterText" [vtsLabel]="filter.filterText"></vts-option>
                <vts-option *ngFor="let option of filter.filterValues" [vtsLabel]="option.label" [vtsValue]="option.value"></vts-option>
              </ng-container>
            </vts-form-control>
            </vts-form-item>
          </ul> -->

            <ng-container *ngFor="let filter of filterGroupConfig; let i = index">
              <ul vts-menu>
                <li vts-menu-item>{{filter.filterText}}</li>
                <li vts-menu>
                  <ul *ngFor="let filterItem of filter.filterValues">
                    <li vts-menu-item>{{filterItem.label}}</li>
                  </ul>
                </li>
              </ul>
            </ng-container>
          </vts-dropdown-menu>
        </div>
      </div>

      <div vts-col class="btn-config-area" style="flex-basis: 20%">
        <a vts-button class="btn-table-config" vts-dropdown vtsTrigger="click" [vtsDropdownMenu]="menuSwapVert" [vtsPlacement]="'bottomRight'">
          <i vts-icon vtsType="HeightDoutone"></i>
        </a>
        <vts-dropdown-menu #menuSwapVert="vtsDropdownMenu">
          <ul vts-menu>
            <li vts-menu-item (click)="handleChangeRowHeight('normal')">Normal</li>
            <li vts-menu-item (click)="handleChangeRowHeight('expand')">Expand</li>
            <li vts-menu-item (click)="handleChangeRowHeight('narrow')">Narrow</li>
          </ul>
        </vts-dropdown-menu>
  
        <a vts-button vts-dropdown vtsTrigger="click" [vtsDropdownMenu]="menuSettings" class="btn-table-config">
          <i vts-icon vtsType="ReorderDoutone"></i>
        </a>
        <vts-dropdown-menu #menuSettings="vtsDropdownMenu" style="min-width: 200px;">
          <ul vts-menu cdkDropList (cdkDropListDropped)="drop($event)">
            <li vts-menu-item>
              <label vts-checkbox [(ngModel)]="allChecked" (ngModelChange)="updateAllChecked()"
                [vtsIndeterminate]="indeterminateConfig">Display all column</label>
            </li>
            <vts-divider style="margin: 0;"></vts-divider>
            <ng-container *ngFor="let property of properties">
              <ng-container *ngIf="property.headerTitle && property.headerTitle != null">
                <li vts-menu-item cdkDrag style="list-style-type: none;">
                  <i vts-icon vtsType="FullScreen"></i>
                  <label vts-checkbox [(ngModel)]="property.checked"
                    (ngModelChange)="updateSingleChecked()">{{property.headerTitle}}</label>
                </li>
              </ng-container>
            </ng-container>
            <vts-divider style="margin: 0;"></vts-divider>
            <div class="btn-config-area">
              <button class="btn-properties-config" vts-button [vtsSize]="'xs'" vtsType="primary" (click)="onSavePropsConfig()"
                >Save</button>
              <button class="btn-properties-config" vts-button [vtsSize]="'xs'" vtsType="default" (click)="onResetPropsConfig()"
                >Reset</button>
            </div>
          </ul>
        </vts-dropdown-menu>
        
        <button vts-button class="btn-table-config" vtsType="default" (click)="reloadTableData()">
          <i vts-icon vtsType="Sync"></i>
        </button>
      </div>
    </div>
    
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
        width: 100%;
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
      }

      .filter-item:first-child,
      .filter-item:last-child {
        margin-left: 0px;
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
        border: none !important;
        height: 36px !important;
      }

      .btn-config-area {
        display: flex;
        justify-content: right;
        padding-top: 4px
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
  @Input() headers: PropertyType[] = [];
  @Input() properties: PropertyType[] = [];
  @Input() vtsPageSize: number = 10;
  @Input() vtsPageIndex: number = 1;
  @Input() filterGroupConfig: { [key: string]: any }[] | undefined;

  @Output() putSearchData: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly rowHeightChanger = new EventEmitter<string>();
  @Output() reloadTable = new EventEmitter<boolean>();
  @Output() onChangeHeaders = new EventEmitter<PropertyType[]>();

  displayedProps: PropertyType[] = [];
  totalProps: PropertyType[] = [];
  vtsNoDisplayProperties: number = 0;
  vtsTotalProperties: number = 0;
  vtsOffsetButton = 0;
  searchString: string = '';
  vtsRowHeight: string | number = 54;
  allChecked = false;
  indeterminateConfig = true;
  listOfFilter = [];

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
}
