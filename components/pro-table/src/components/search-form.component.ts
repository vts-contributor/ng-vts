import { PropertyType, SearchConfig } from './../pro-table.type';
import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  Component,
  // ContentChildren,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  // QueryList,
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
  template: `
    <form vts-form vtsLayout="vertical" [formGroup]="validateForm" class="vts-advanced-search-form">
      <div vts-row [vtsGutter]="24">
        <div vts-col [vtsSpan]="6" *ngFor="let control of controlArray" [hidden]="!control.show">
          <vts-form-item>
            <vts-form-label [vtsFor]="'property' + control.index">
              Propertie {{ control.index }}
            </vts-form-label>
            <vts-form-control>
              <input vts-input placeholder="Input propertie name" [formControlName]="'property' + control.index"
                [attr.id]="'property' + control.index" />
            </vts-form-control>
          </vts-form-item>
        </div>
        <div vts-col [vtsSpan]="6" class="search-area">
          <button vts-button class="btn-search-item" [vtsType]="'primary'" [vtsSize]="'xs'" (click)="mockFn()">Search</button>
          <button vts-button class="btn-search-item" [vtsSize]="'xs'" (click)="resetForm()">Reset</button>
          <button vts-button class="btn-search-item" [vtsSize]="'xs'" (click)="toggleCollapse()">Collapse
            <i class="collapse-icon" vts-icon [vtsType]="vtsIsCollapse ? 'ArrowMiniDown' : 'ArrowMiniUp'"></i>
          </button>
        </div>
      </div>
    </form>
  `,
  styles: [`
    .vts-advanced-search-form {
      padding: 24px;
      background: #FFFFFF;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      margin-bottom: 16px;
    }

    [vts-form-label] {
      overflow: visible;
    }

    .btn-search-item {
      margin-left: 8px;
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
  controlArray: Array<{ index: number; show: boolean }> = [];
  @Input() vtsIsCollapse = true;
  @Input() vtsSearchConfig: SearchConfig[] = [];

  @Input() data: { [key: string]: any } = {};
  @Input() headers: PropertyType[] = [];
  displayedProps: PropertyType[] = [];
  totalProps: PropertyType[] = [];
  vtsNoDisplayProperties: number = 0;
  vtsTotalProperties: number = 0;
  constructor(private elementRef: ElementRef, @Optional() private directionality: Directionality, private fb: FormBuilder) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-search-form');
  }

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
    for (let i = 1; i <= this.vtsTotalProperties; i++) {
      this.controlArray.push({ index: i, show: i <= this.vtsNoDisplayProperties });
      this.validateForm.addControl(`Prop${i}`, new FormControl());
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.totalProps = changes.headers.currentValue;
    }
    this.displayedProps = this.totalProps.filter(prop => prop.checked == true);
    this.vtsNoDisplayProperties = this.displayedProps.length > 3 ? 3 : this.displayedProps.length;
    this.vtsTotalProperties = this.displayedProps.length;
    this.validateForm = this.fb.group({});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  mockFn() {
    alert('Mock function!');
  }

  toggleCollapse(): void {
    this.vtsIsCollapse = !this.vtsIsCollapse;
    this.controlArray.forEach((c, index) => {
      c.show = this.vtsIsCollapse ? index < this.vtsNoDisplayProperties : true;
    });
  }

  resetForm(): void {
    this.validateForm.reset();
  }
}
