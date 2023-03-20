import { VtsSafeAny } from './../../../core/types/any';
import { VtsPropertyType } from './../pro-table.type';
import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
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

@Component({
  selector: 'vts-search-form',
  exportAs: 'vtsProTableSearchForm',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  templateUrl: './search-form.component.html',
  styles: [`
    .vts-advanced-search-form {
      padding: 24px;
      background: #FFFFFF;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      margin-bottom: 16px;
      padding-bottom: 0px;
    }

    [vts-form-label] {
      overflow: visible;
    }

    .btn-search-item {
      margin-left: 8px;
      border-radius: 3px;
    }

    .collapse-icon {
      margin-left: 0px !important;
    }

    .search-area {
      text-align: left;
      padding: 0 0 0 4px !important;
      margin-top: -4px;
    }
  `],
  host: {
    '[class.vts-search-form-rtl]': `dir === 'rtl'`,
  }
})
export class VtsProTableSearchFormComponent implements OnDestroy, OnInit, OnChanges {
  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();
  validateForm!: FormGroup;
  controlArray: Array<{ index: number; show: boolean, title: string | undefined, controlKey: string }> = [];

  @Input() vtsIsCollapse = true;
  @Input() data: { [key: string]: any } = {};
  @Input() headers: VtsPropertyType[] = [];
  @Output() putSearchData: EventEmitter<VtsSafeAny> = new EventEmitter<VtsSafeAny>();

  displayedProps: VtsPropertyType[] = [];
  totalProps: VtsPropertyType[] = [];
  vtsNoDisplayProperties: number = 0;
  vtsTotalProperties: number = 0;
  vtsOffsetButton = 0;

  constructor(private elementRef: ElementRef, @Optional() private directionality: Directionality, private fb: FormBuilder) {
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
}
