import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  Component,
  // ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  // QueryList,
  ViewEncapsulation
} from '@angular/core';
import { VtsDrawerPlacement } from '@ui-vts/ng-vts/drawer';
import { VtsUploadChangeParam } from '@ui-vts/ng-vts/upload';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import _ from 'lodash';

interface Item {
  id: string;
  content1: string;
  content2: string;
  content3: string;
  content4: string;
  content5: string;
}

@Component({
  selector: 'vts-table-config',
  exportAs: 'vtsProTable',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  templateUrl: './table-config.component.html',
  styles: [`
		.vts-protable-configuration {
			padding: 16px;
			background: #FFFFFF;
			border: 1px solid rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			margin-bottom: 16px;
		}

		.select-label {
			background: #FCE5EA;
			border: 0.5px solid #CB002B;
			border-radius: 10px;
		}

		.btn-area {
			display: flex;
			justify-content: space-between;
			margin-bottom: 16px;
		}

		.btn-table-config {
			margin-left: 8px;
		}

		.btn-control-area {
			display: flex !important;
			text-align: left;
		}

		.config-area>button {
			border: none;
		}

    td, th {
      border: 1px solid #D1D1D1;
    }

    .btn-properties-config {
      margin-left: 8px;
    }
	`],
  host: {
    '[class.vts-table-config-rtl]': `dir === 'rtl'`,
  }
})
export class VtsProTableConfigComponent implements OnDestroy, OnInit {
  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();

  @Input() checkedItemsAmount: number = 0;
  @Input() isVisibleModal = false;
  @Input() isOkLoadingModal = false;
  @Input() modalData = {
    title: "Delete Popup",
    content: "Do you want to delete all selected items?",
  };

  @Input() isVisibleDelete = false;
  @Input() isOkLoadingDelete = false;
  private itemIdToDelete: string = '';
  @Input() modalDeleteData = {
    title: "Delete Popup",
    content: "Do you want to delete this items?",
  };

  @Input() isVisibleUpload = false;
  @Input() uploadData = {
    url: 'http://mock.com/castlemock/mock/rest/project/lxGcaI/application/iWIW1z/',
    okText: "Upload"
  }

  @Input() visibleDrawer = false;
  @Input() placementDrawer: VtsDrawerPlacement = 'right';
  @Input() drawerData = {
    title: "Edit item detail"
  };

  vtsRowHeight: string | number = 54;
  @Output() readonly rowHeightChanger = new EventEmitter<string>();
  @Output() readonly clearAllCheckedItems = new EventEmitter<boolean>();

  pageSize = 10;
  pageIndex = 1;
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<string>();
  searchTerms: any = {};
  vtsIsCollapse: boolean = true;

  constructor(private elementRef: ElementRef, @Optional() private directionality: Directionality) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('vts-table-config');
  }

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  listOfData: Item[] = [
    ...Array.from({ length: 10 }).map((_, i) => {
      return {
        id: `${i + 1}`,
        content1: `Table row ${i + 1}`,
        content2: `Table row ${i + 1}`,
        content3: `Table row ${i + 1} (center)`,
        content4: '0.' + '5'.padStart(Math.round(Math.random() * 7), '0'),
        content5: '0.' + '5'.padStart(Math.round(Math.random() * 7), '0')
      };
    })
  ];

  filteredList = [...this.listOfData];

  mockFn() {
    alert('Mock function!');
    this.visibleDrawer = false;
  }

  showDeleteModal(): void {
    this.isVisibleModal = true;
  }

  showDeleteItemModal(itemId: string): void {
    this.isVisibleDelete = true;
    this.itemIdToDelete = itemId;
  }
  showUploadModal(): void {
    this.isVisibleUpload = true;
  }

  handleOkModal(): void {
    this.isOkLoadingModal = true;
    this.checkedItemsAmount = 0;
    // this.clearAllCheckedItems.emit(this.checkedItemsAmount === 0);
    this.onAllChecked(false);
    this.isOkLoadingModal = false;
    this.isVisibleModal = false;
  }
  handleCancelModal(): void {
    this.isVisibleModal = false;
  }

  handleOkDelete(): void {
    this.isOkLoadingDelete = true;  
    if (this.itemIdToDelete) {
      _.remove(this.listOfData, item => item.id == this.itemIdToDelete);
    }
    this.isOkLoadingDelete = false;
    this.isVisibleDelete = false;
  }
  handleCancelDelete(): void {
    this.isVisibleDelete = false;
  }

  handleOkUpload(): void {
    this.isVisibleUpload = false;
  }
  handleCancelUpload(): void {
    this.isVisibleUpload = false;
  }

  openDrawer(): void {
    this.visibleDrawer = true;
  }

  closeDrawer(): void {
    this.visibleDrawer = false;
  }

  handleChangeUpload({ file }: VtsUploadChangeParam): void {
    console.log(file);
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

  onAllChecked(checked: any): void {
    this.filteredList.forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
    this.checkedItemsAmount = this.setOfCheckedId.size;
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.filteredList;
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate =
      listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
    this.checkedItemsAmount = this.setOfCheckedId.size;
  }

  sortDirections = ['ascend', 'descend', null];
  sortFn = (item1: any, item2: any) => (item1.content4 < item2.content4 ? 1 : -1);

  onEditDataItem(itemId?: number | string) {
    this.openDrawer();
    console.log(itemId);
  }
}
