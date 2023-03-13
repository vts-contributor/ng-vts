import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
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
  // Output,
  // SimpleChanges,
  // QueryList,
  ViewEncapsulation
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vts-selected-label-config',
  exportAs: 'vtsSelectedLabelConfig',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <div class="selected-label">
      <span>
        <span class="text-format bold-text">{{ selectedItemsAmount }}</span><span class="text-format normal-text"> items is selected</span>
        <ng-container *ngIf="selectedItemsAmount>0">
          <span class="divider-s">|</span>
          <span>
            <a class="text-format bold-text lable-btn" (click)="onClearAll()"><i vts-icon class="pr-4" vtsType="ClearDoutone"></i>Clear Selected</a>
          </span>
        </ng-container>
      </span>

      <ng-container *ngIf="selectedItemsAmount>0">
        <span>
          <span>
            <a class="text-format bold-text lable-btn" (click)="onDeleteSelectedItems()"><i vts-icon class="pr-4" vtsType="DeleteOutlineDoutone"></i>Delete Selected</a>
          </span>
          <span>
            <a class="text-format bold-text lable-btn" style="padding: 0 16px" (click)="onExportSelectedItems()"><i vts-icon class="pr-4" vtsType="CloudUploadDoutone"></i>Export Selected</a>
          </span>
          <span>
            <a class="text-format bold-text lable-btn"><i vts-icon class="pr-4" vtsType="ArrowDownOutline"></i>More action</a>
          </span>
        </span>
      </ng-container>
    </div>
  `,
  styles: [`
    .selected-label {
      border: 1px solid #7FB7F2;
      border-radius: 6px;
      height: 48px;
      display: flex;
      align-items: center;
      background: #EDF6FF;
      padding: 8px 12px;
      gap: 12px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .divider-s {
      color: #7FB7F2; 
      height: 18px; 
      padding: 0 12px;
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

    .lable-btn {
      color: #0663C7;
    }

    .pr-4 {
      padding-right: 4px !important;
    }
  `],
  host: {
    '[class.vts-search-form-rtl]': `dir === 'rtl'`,
  }
})
export class VtsProTableSelectedLabelConfigComponent implements OnDestroy, OnInit, OnChanges {
  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();
  validateForm!: FormGroup;
  controlArray: Array<{ index: number; show: boolean, title: string | undefined, controlKey: string }> = [];

  @Input() selectedItemsAmount = 0;
  @Input() moreActions = [];

  @Output() clearAllSelectedItems = new EventEmitter<boolean>();
  @Output() deleteSelectedItems = new EventEmitter<boolean>();
  @Output() exportSelectedItems = new EventEmitter<boolean>();
  @Output() moreActionEvents = new EventEmitter<boolean[]>();

  constructor(private elementRef: ElementRef, @Optional() private directionality: Directionality) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-search-form');
  }
  
  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedItemsAmount) {
      console.log(changes.selectedItemsAmount);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClearAll() {
    this.clearAllSelectedItems.emit(true);
  }

  onDeleteSelectedItems() {
    this.deleteSelectedItems.emit(true);
  }

  onExportSelectedItems() {
    this.exportSelectedItems.emit(true);
  }

  onMoreActionEvent() {
    this.moreActionEvents.emit([]);
  }
}
