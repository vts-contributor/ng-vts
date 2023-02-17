import { BidiModule, Dir } from '@angular/cdk/bidi';
import {
  Component,
  DebugElement,
  Injector,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import en_US from '../../../i18n/languages/en_US';
import { VtsI18nService } from '../../../i18n/vts-i18n.service';
import { VtsTableModule } from '../protable.module';
import { VtsTableComponent } from '../table/table.component';

describe('vts-table', () => {
  let injector: Injector;

  beforeEach(waitForAsync(() => {
    injector = TestBed.configureTestingModule({
      imports: [BidiModule, VtsTableModule],
      declarations: [
        VtsTestTableBasicComponent,
        VtsTestTableScrollComponent,
        VtsTableSpecCrashComponent,
        VtsTestTableRtlComponent
      ]
    });
    TestBed.compileComponents();
  }));

  describe('basic vts-table', () => {
    let fixture: ComponentFixture<VtsTestTableBasicComponent>;
    let testComponent: VtsTestTableBasicComponent;
    let table: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestTableBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      table = fixture.debugElement.query(By.directive(VtsTableComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(table.nativeElement.classList).toContain('vts-table-wrapper');
    });
    it('should pageIndex set work', () => {
      fixture.detectChanges();
      expect(testComponent.pageIndex).toBe(1);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      expect(table.nativeElement.querySelector('.vts-pagination-item-active').innerText).toBe('1');
      testComponent.pageIndex = 2;
      fixture.detectChanges();
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      expect(table.nativeElement.querySelector('.vts-pagination-item-active').innerText).toBe('2');
    });
    it('should pageIndex click work', () => {
      fixture.detectChanges();
      expect(testComponent.pageIndex).toBe(1);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      table.nativeElement.querySelectorAll('.vts-pagination-item')[1].click();
      fixture.detectChanges();
      expect(testComponent.pageIndex).toBe(2);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
      expect(table.nativeElement.querySelector('.vts-pagination-item-active').innerText).toBe('2');
    });
    it('should pageSize change work', () => {
      fixture.detectChanges();
      expect(testComponent.pageSize).toBe(10);
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      expect(table.nativeElement.querySelectorAll('.vts-pagination-item').length).toBe(2);
      testComponent.pageSize = 20;
      fixture.detectChanges();
      expect(table.nativeElement.querySelectorAll('.vts-pagination-item').length).toBe(1);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
    });
    it('should pageSize change check pageIndex bounding', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.pageSize).toBe(10);
      expect(testComponent.pageIndex).toBe(1);
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      testComponent.pageIndex = 2;
      fixture.detectChanges();
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      testComponent.pageSize = 5;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.pageIndex).toBe(2);
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      testComponent.vtsTableComponent.onPageIndexChange(1);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.pageIndex).toBe(1);
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
      testComponent.vtsTableComponent.ngOnDestroy();
    }));
    it('should vtsData change check pageIndex bounding', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.pageSize).toBe(10);
      expect(testComponent.pageIndex).toBe(1);
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      testComponent.pageIndex = 2;
      fixture.detectChanges();
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      testComponent.dataSet = [...testComponent.dataSet, ...testComponent.dataSet];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.pageIndex).toBe(2);
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
      testComponent.dataSet = testComponent.dataSet.slice(0, 10);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.pageIndex).toBe(1);
      expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(1);
      testComponent.vtsTableComponent.ngOnDestroy();
    }));
    it('should pagination simple work', () => {
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.vts-pagination-simple')).toBeNull();
      testComponent.simple = true;
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.vts-pagination-simple')).toBeDefined();
    });
    it('should pagination work', () => {
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.vts-pagination')).toBeDefined();
      expect(table.nativeElement.querySelectorAll('.vts-table-tbody tr').length).toBe(10);
      testComponent.pagination = false;
      testComponent.front = false;
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.vts-pagination')).toBeNull();
      expect(table.nativeElement.querySelectorAll('.vts-table-tbody tr').length).toBe(20);
    });
    it('should bordered work', () => {
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.vts-table').classList).not.toContain(
        'vts-table-bordered'
      );
      testComponent.bordered = true;
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.vts-table').classList).toContain(
        'vts-table-bordered'
      );
    });
    it('should emitPageSize work', () => {
      // fixture.detectChanges();
      // expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(0);
      // testComponent.vtsTableComponent.emitPageSizeOrIndex(100, 1);
      // expect(testComponent.pageSizeChange).toHaveBeenCalledTimes(1);
    });
    it('should size work', () => {
      fixture.detectChanges();
      expect(testComponent.size).toBe('small');
      expect(table.nativeElement.querySelector('.vts-table').classList).toContain(
        'vts-table-small'
      );
      testComponent.size = 'middle';
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.vts-table').classList).toContain(
        'vts-table-middle'
      );
      testComponent.size = 'default';
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.vts-table').classList).toContain('vts-table');
    });
    it('should footer & title work', () => {
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.vts-table-title').innerText).toBe('Here is Title');
      expect(table.nativeElement.querySelector('.vts-table-footer').innerText).toBe(
        'Here is Footer'
      );
      testComponent.footer = false;
      testComponent.title = false;
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.vts-table-title')).toBeNull();
      expect(table.nativeElement.querySelector('.vts-table-footer')).toBeNull();
    });
    it('should noResult work', () => {
      testComponent.dataSet = [];
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.vts-table-placeholder').innerText.trim()).toBe(
        '暂无数据'
      );
      testComponent.noResult = 'test';
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.vts-table-placeholder').innerText).toBe('test');
    });
    it('should fixed header work', () => {
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.vts-table-scroll')).toBe(null);
      testComponent.fixHeader = true;
      expect(table.nativeElement.querySelector('.vts-table-scroll')).toBeDefined();
    });
    it('should width config', () => {
      fixture.detectChanges();
      expect(table.nativeElement.querySelectorAll('col').length).toBe(4);
      testComponent.widthConfig = ['100px', '50px'];
      fixture.detectChanges();
      expect(table.nativeElement.querySelectorAll('col')[0].style.width).toBe('100px');
      expect(table.nativeElement.querySelectorAll('col')[1].style.width).toBe('50px');
    });
    it('should showQuickJumper & showSizeChanger work', () => {
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.vts-pagination-options-quick-jumper')).toBe(null);
      expect(table.nativeElement.querySelector('.vts-pagination-options-size-changer')).toBe(null);
      testComponent.showQuickJumper = true;
      testComponent.showSizeChanger = true;
      expect(
        table.nativeElement.querySelector('.vts-pagination-options-quick-jumper')
      ).toBeDefined();
      expect(
        table.nativeElement.querySelector('.vts-pagination-options-size-changer')
      ).toBeDefined();
    });
    it('should hideOnSinglePage work', () => {
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.vts-pagination').children.length).not.toBe(0);
      testComponent.hideOnSinglePage = true;
      testComponent.dataSet = [{}];
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.vts-pagination[hidden]')).not.toBeNull();
    });
    it('should showPagination work with vtsClientPagination and hideOnSinglePage', () => {
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.vts-pagination').children.length).not.toBe(0);
      testComponent.front = false;
      testComponent.hideOnSinglePage = true;
      testComponent.dataSet = [{}];
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.vts-pagination').children.length).not.toBe(0);
    });
    it('#18n', () => {
      testComponent.dataSet = [];
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.vts-table-placeholder').innerText.trim()).toBe(
        '暂无数据'
      );
      injector.get(VtsI18nService).setLocale(en_US);
      fixture.detectChanges();
      expect(table.nativeElement.querySelector('.vts-table-placeholder').innerText.trim()).toBe(
        'No Data'
      );
    });
  });
  describe('scroll vts-table', () => {
    let fixture: ComponentFixture<VtsTestTableScrollComponent>;
    let testComponent: VtsTestTableScrollComponent;
    let table: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestTableScrollComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      table = fixture.debugElement.query(By.directive(VtsTableComponent));
    });
    it('should change width affect scroll', () => {
      fixture.detectChanges();
      testComponent.width = 1000;
      window.dispatchEvent(new Event('resize'));
      fixture.detectChanges();
      const tableBody = table.nativeElement.querySelector('.vts-table-body');
      expect(tableBody.scrollWidth).toBe(tableBody.clientWidth);
    });
  });
  describe('double binding vts-table', () => {
    let fixture: ComponentFixture<VtsTableSpecCrashComponent>;
    let testComponent: VtsTableSpecCrashComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTableSpecCrashComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
    });

    it('should not crash when double binding pageSize and pageIndex', () => {
      fixture.detectChanges();
      expect(testComponent.pageIndexChange).toHaveBeenCalledTimes(0);
    });
  });

  describe('RTL', () => {
    let fixture: ComponentFixture<VtsTestTableRtlComponent>;
    let table: DebugElement;
    let tableElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestTableRtlComponent);
      table = fixture.debugElement.query(By.directive(VtsTableComponent));
      fixture.detectChanges();
      tableElement = table.nativeElement;
    });

    it('should table className correct on dir change', () => {
      fixture.detectChanges();
      expect(tableElement.classList).toContain('vts-table-wrapper-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(tableElement.classList).not.toContain('vts-table-wrapper-rtl');
    });
  });
});

@Component({
  template: `
    <vts-table
      #dynamicTable
      [vtsScroll]="fixHeader ? { y: '240px' } : null"
      [(vtsPageIndex)]="pageIndex"
      (vtsPageIndexChange)="pageIndexChange($event)"
      [(vtsPageSize)]="pageSize"
      (vtsPageSizeChange)="pageSizeChange($event)"
      [vtsData]="dataSet"
      [vtsBordered]="bordered"
      [vtsLoading]="loading"
      [vtsShowSizeChanger]="showSizeChanger"
      [vtsSimple]="simple"
      [vtsShowQuickJumper]="showQuickJumper"
      [vtsHidePaginationOnSinglePage]="hideOnSinglePage"
      [vtsWidthConfig]="widthConfig"
      [vtsShowPagination]="pagination"
      [vtsClientPagination]="front"
      [vtsFooter]="footer ? 'Here is Footer' : null"
      [vtsNoResult]="noResult"
      [vtsTitle]="title ? 'Here is Title' : null"
      [vtsSize]="size"
    >
      <thead *ngIf="header">
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <ng-template ngFor let-data [ngForOf]="dynamicTable.data">
          <tr>
            <td>{{ data.name }}</td>
            <td>{{ data.age }}</td>
            <td>{{ data.address }}</td>
            <td>
              <a href="#">Action 一 {{ data.name }}</a>
              <a href="#">Delete</a>
            </td>
          </tr>
        </ng-template>
      </tbody>
    </vts-table>
  `
})
export class VtsTestTableBasicComponent implements OnInit {
  @ViewChild(VtsTableComponent, { static: false })
  vtsTableComponent!: VtsTableComponent;
  pageIndex = 1;
  pageIndexChange = jasmine.createSpy('pageIndex callback');
  pageSize = 10;
  pageSizeChange = jasmine.createSpy('pageSize callback');
  dataSet: Array<{
    name?: string;
    age?: string;
    address?: string;
    description?: string;
    checked?: boolean;
    expand?: boolean;
  }> = [];
  noResult = '';
  showSizeChanger = false;
  showQuickJumper = false;
  hideOnSinglePage = false;
  bordered = false;
  loading = false;
  pagination = true;
  header = true;
  title = true;
  footer = true;
  front = true;
  fixHeader = false;
  simple = false;
  size = 'small';
  widthConfig: string[] = [];

  ngOnInit(): void {
    for (let i = 1; i <= 20; i++) {
      this.dataSet.push({
        name: 'John Brown',
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
        checked: false,
        expand: false
      });
    }
  }
}

@Component({
  template: `
    <div style="display: block;" [style.width.px]="width">
      <vts-table
        #vtsTable
        [vtsData]="dataSet"
        [vtsPageSize]="10"
        [vtsScroll]="{ x: '600px', y: '240px' }"
      >
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Age</th>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
            <th>Column 5</th>
            <th>Column 6</th>
            <th>Column 7</th>
            <th>Column 8</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let data of vtsTable.data">
            <td>{{ data.name }}</td>
            <td>{{ data.age }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>{{ data.address }}</td>
            <td>
              <a>action</a>
            </td>
          </tr>
        </tbody>
      </vts-table>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../style/entry.less']
})
export class VtsTestTableScrollComponent implements OnInit {
  @ViewChild(VtsTableComponent, { static: false })
  vtsTableComponent!: VtsTableComponent;
  dataSet: Array<{ name: string; age: number; address: string }> = [];
  width = 300;

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.dataSet.push({
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`
      });
    }
  }
}

/** https://github.com/NG-ZORRO/ng-zorro-antd/issues/3004 **/
@Component({
  template: `
    <vts-table
      #vtsTable
      [vtsData]="data"
      [(vtsPageIndex)]="pageIndex"
      [(vtsPageSize)]="pageSize"
      (vtsPageIndexChange)="(pageIndexChange)"
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
        </tr>
      </thead>
      <tbody>
        <ng-container *ngFor="let item of vtsTable.data">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
          </tr>
        </ng-container>
      </tbody>
    </vts-table>
  `
})
export class VtsTableSpecCrashComponent {
  data: Array<{ id: number; name: string }> = [];
  pageIndex = 1;
  pageSize = 10;
  pageIndexChange = jasmine.createSpy('pageSize callback');

  constructor() {
    setTimeout(() => {
      this.data = new Array(100).fill(1).map((_, i) => ({
        id: i + 1,
        name: `name ${i + 1}`
      }));
    }, 1000);
  }
}

@Component({
  template: `
    <div [dir]="direction">
      <vts-table #dynamicTable [vtsData]="dataSet" [vtsSimple]="simple">
        <thead *ngIf="header">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <ng-template ngFor let-data [ngForOf]="dynamicTable.data">
            <tr>
              <td>{{ data.name }}</td>
              <td>{{ data.age }}</td>
              <td>{{ data.address }}</td>
              <td>
                <a href="#">Action 一 {{ data.name }}</a>
                <a href="#">Delete</a>
              </td>
            </tr>
          </ng-template>
        </tbody>
      </vts-table>
    </div>
  `
})
export class VtsTestTableRtlComponent implements OnInit {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';

  @ViewChild(VtsTableComponent, { static: false })
  vtsTableComponent!: VtsTableComponent;
  pageIndex = 1;
  pageSize = 10;
  dataSet: Array<{
    name?: string;
    age?: string;
    address?: string;
    description?: string;
    checked?: boolean;
    expand?: boolean;
  }> = [];
  header = true;
  simple = false;

  ngOnInit(): void {
    for (let i = 1; i <= 20; i++) {
      this.dataSet.push({
        name: 'John Brown',
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
        checked: false,
        expand: false
      });
    }
  }
}
