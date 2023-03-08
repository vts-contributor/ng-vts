import { VtsSafeAny } from './../../../core/types/any';
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
      <div style="flex-basis: 75%; display:flex; flex-direction: row; align-items: center">
        <div class="common-group-filter">
          <vts-input-group class="filter-item" [vtsSuffix]="suffixIconSearch">
            <input type="text" vts-input placeholder="Search all ..." />
          </vts-input-group>
          <ng-template #suffixIconSearch>
            <span vts-icon vtsType="SearchDoutone"></span>
          </ng-template>
    
          <ng-container *ngFor="let filter of filterGroupConfig">
            <vts-input-group class="filter-item" [vtsAddOnBefore]="filter.filterText">
              <vts-select [ngModel]="filter.defaultValue" class="filter-item-select">
                <ng-container *ngFor="let valueItem of filter.filterValues">
                  <vts-option [vtsLabel]="valueItem.label" [vtsValue]="valueItem.value"></vts-option>
                </ng-container>
              </vts-select>
            </vts-input-group>
          </ng-container>
        </div>
        <div>
          <button vts-button class="btn-table-config" vtsType="default" (click)="reloadTableData()">
            <i vts-icon vtsType="FilterFramesDoutone"></i>
          </button>
          <vts-badge [vtsCount]="5">
            <a class="head-example"></a>
          </vts-badge>
        </div>
      </div>

      <div vts-col class="btn-config-area" style="flex-basis: 25%">
        <a vts-button class="btn-table-config" vts-dropdown vtsTrigger="click" [vtsDropdownMenu]="menuSwapVert">
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
            <!-- <div class="btn-config-area">
              <button class="btn-properties-config" vts-button [vtsSize]="'xs'" vtsType="primary"
                (click)="onSaveCheckedPropertiesChange()">Save</button>
              <button class="btn-properties-config" vts-button [vtsSize]="'xs'" vtsType="default"
                (click)="onResetCheckedProperties()">Reset</button>
            </div> -->
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
      }

      .vts-select-selector {
        border: none !important; 
      }

      .btn-config-area {
        display: flex;
        justify-content: right;
      }

      .btn-table-config {
        margin-left: 8px;
        border: none;
        color: #73777A;
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
  controlArray: Array<{ index: number; show: boolean, title: string | undefined, controlKey: string }> = [];

  @Input() vtsIsCollapse = true;
  @Input() data: { [key: string]: any } = {};
  @Input() headers: PropertyType[] = [];
  @Input() properties: PropertyType[] = [];
  @Input() vtsPageSize: number = 10;
  @Input() vtsPageIndex: number = 1;
  @Input() filterGroupConfig: { [key: string]: any }[] | undefined;

  @Output() putSearchData: EventEmitter<VtsSafeAny> = new EventEmitter<VtsSafeAny>();
  @Output() readonly rowHeightChanger = new EventEmitter<string>();
  @Output() reloadTable = new EventEmitter<boolean>();
  @Output() onChangeHeaders = new EventEmitter<PropertyType[]>();

  displayedProps: PropertyType[] = [];
  totalProps: PropertyType[] = [];
  vtsNoDisplayProperties: number = 0;
  vtsTotalProperties: number = 0;
  vtsOffsetButton = 0;
  inputValue: string = 'my site';
  vtsRowHeight: string | number = 54;
  allChecked = false;
  indeterminateConfig = true;

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
      this.vtsNoDisplayProperties = this.displayedProps.length > 3 ? 3 : this.totalProps.length;
      this.vtsTotalProperties = this.totalProps.length;
      this.validateForm = this.fb.group({});
      for (let i = 1; i <= this.vtsTotalProperties; i++) {
        this.controlArray.push({ index: i, show: i <= this.vtsNoDisplayProperties, title: this.displayedProps[i - 1].headerTitle, controlKey: this.displayedProps[i - 1].propertyName });
        this.validateForm.addControl(`${this.displayedProps[i - 1].propertyName}`, new FormControl());
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleCollapse(): void {
    this.vtsIsCollapse = !this.vtsIsCollapse;
    this.controlArray.forEach((c, index) => {
      c.show = this.vtsIsCollapse ? index < this.vtsNoDisplayProperties : true;
    });
  }

  resetForm(): void {
    this.validateForm.reset();
    this.putSearchData.emit(this.validateForm.value);
  }

  onSearch() {
    this.putSearchData.emit(this.validateForm.value);
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.properties, event.previousIndex, event.currentIndex);
  }

  handleChangeRowHeight(value: string) {
    if (value) {
      let rowHeight: number = 0;
      switch (value) {
        case 'normal':
          rowHeight = 54;
          break;
        case 'expand':
          rowHeight = 80;
          break;
        case 'narrow':
          rowHeight = 35;
          break;
        default:
          rowHeight = 54;
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
    this.onChangeHeaders.emit(this.properties);
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
    this.onChangeHeaders.emit(this.properties);
    this.changeDetector.detectChanges();
  }
}
