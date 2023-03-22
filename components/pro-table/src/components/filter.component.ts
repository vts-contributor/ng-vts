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
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { arraysEqual } from '@ui-vts/ng-vts/core/util';
import { VtsI18nService, VtsTableI18nInterface } from '@ui-vts/ng-vts/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VtsTableFilterList } from '../pro-table.type';

interface VtsThItemInterface {
  text: string;
  value: VtsSafeAny;
  checked: boolean;
}

@Component({
  selector: 'vts-protable-filter',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <span class="vts-protable-filter-column-title">
      <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
    </span>
    <ng-container *ngIf="!customFilter; else extraTemplate">
      <vts-filter-trigger
        [vtsVisible]="isVisible"
        [vtsActive]="isChecked"
        [vtsDropdownMenu]="filterMenu"
        (vtsVisibleChange)="onVisibleChange($event)"
      >
        <i vts-icon vtsType="filter"></i>
      </vts-filter-trigger>
      <vts-dropdown-menu #filterMenu="vtsDropdownMenu">
        <div class="vts-protable-filter-dropdown">
          <ul vts-menu>
            <li
              vts-menu-item
              [vtsSelected]="f.checked"
              *ngFor="let f of listOfParsedFilter; trackBy: trackByValue"
              (click)="check(f)"
            >
              <label
                vts-radio
                *ngIf="!filterMultiple"
                [ngModel]="f.checked"
                (ngModelChange)="check(f)"
              ></label>
              <label
                vts-checkbox
                *ngIf="filterMultiple"
                [ngModel]="f.checked"
                (ngModelChange)="check(f)"
              ></label>
              <span>{{ f.text }}</span>
            </li>
          </ul>
          <div class="vts-protable-filter-dropdown-btns">
            <button
              vts-button
              vtsType="link"
              vtsSize="sm"
              (click)="reset()"
              [disabled]="!isChecked"
            >
              {{ locale.filterReset }}
            </button>
            <button vts-button vtsType="primary" vtsSize="sm" (click)="confirm()">
              {{ locale.filterConfirm }}
            </button>
          </div>
        </div>
      </vts-dropdown-menu>
    </ng-container>
  `
})
export class VtsProTableFilterComponent implements OnChanges, OnDestroy, OnInit {
  @Input() contentTemplate: TemplateRef<VtsSafeAny> | null = null;
  @Input() customFilter = false;
  @Input() extraTemplate: TemplateRef<VtsSafeAny> | null = null;
  @Input() filterMultiple = true;
  @Input() listOfFilter: VtsTableFilterList = [];
  @Output() readonly filterChange = new EventEmitter<VtsSafeAny[] | VtsSafeAny>();
  private destroy$ = new Subject();
  locale!: VtsTableI18nInterface;
  isChecked = false;
  isVisible = false;
  listOfParsedFilter: VtsThItemInterface[] = [];
  listOfChecked: VtsSafeAny[] = [];

  trackByValue(_: number, item: VtsThItemInterface): VtsSafeAny {
    return item.value;
  }

  check(filter: VtsThItemInterface): void {
    if (this.filterMultiple) {
      this.listOfParsedFilter = this.listOfParsedFilter.map(item => {
        if (item === filter) {
          return { ...item, checked: !filter.checked };
        } else {
          return item;
        }
      });
      filter.checked = !filter.checked;
    } else {
      this.listOfParsedFilter = this.listOfParsedFilter.map(item => {
        return { ...item, checked: item === filter };
      });
    }
    this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
  }

  confirm(): void {
    this.isVisible = false;
    this.emitFilterData();
  }

  reset(): void {
    this.isVisible = false;
    this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter, true);
    this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
    this.emitFilterData();
  }

  onVisibleChange(value: boolean): void {
    this.isVisible = value;
    if (!value) {
      this.emitFilterData();
    } else {
      this.listOfChecked = this.listOfParsedFilter
        .filter(item => item.checked)
        .map(item => item.value);
    }
  }

  emitFilterData(): void {
    const listOfChecked = this.listOfParsedFilter
      .filter(item => item.checked)
      .map(item => item.value);
    if (!arraysEqual(this.listOfChecked, listOfChecked)) {
      if (this.filterMultiple) {
        this.filterChange.emit(listOfChecked);
      } else {
        this.filterChange.emit(listOfChecked.length > 0 ? listOfChecked[0] : null);
      }
    }
  }

  parseListOfFilter(listOfFilter: VtsTableFilterList, reset?: boolean): VtsThItemInterface[] {
    return listOfFilter.map(item => {
      const checked = reset ? false : !!item.byDefault;
      return { text: item.text, value: item.value, checked };
    });
  }

  getCheckedStatus(listOfParsedFilter: VtsThItemInterface[]): boolean {
    return listOfParsedFilter.some(item => item.checked);
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private i18n: VtsI18nService,
    private elementRef: ElementRef
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-protable-filter-column');
  }

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Table');
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { listOfFilter } = changes;
    if (listOfFilter && this.listOfFilter && this.listOfFilter.length) {
      this.listOfParsedFilter = this.parseListOfFilter(this.listOfFilter);
      this.isChecked = this.getCheckedStatus(this.listOfParsedFilter);
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
