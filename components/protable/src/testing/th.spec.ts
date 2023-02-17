import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';
import { VtsThAddOnComponent } from '../cell/th-addon.component';
import { VtsTableModule } from '../protable.module';

describe('vts-th', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [VtsTableModule, VtsIconTestModule, NoopAnimationsModule],
      declarations: [VtsThTestVtsTableComponent, VtsThTestTableDefaultFilterComponent]
    });
    TestBed.compileComponents();
  }));
  describe('vts-th addon in vts-table', () => {
    let fixture: ComponentFixture<VtsThTestVtsTableComponent>;
    let testComponent: VtsThTestVtsTableComponent;
    let th: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(VtsThTestVtsTableComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      th = fixture.debugElement.query(By.directive(VtsThAddOnComponent));
    });
    it('should showSort work', () => {
      fixture.detectChanges();
      expect(th.nativeElement.classList).toContain('vts-table-column-has-sorters');
      expect(th.nativeElement.querySelector('.vts-table-column-sorter')).toBeDefined();
    });
    it('should sort change work', () => {
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.vts-table-column-sorter-up').classList).not.toContain(
        'active'
      );
      expect(
        th.nativeElement.querySelector('.vts-table-column-sorter-down').classList
      ).not.toContain('active');
      expect(th.nativeElement.classList).not.toContain('vts-table-column-sort');
      testComponent.sort = 'ascend';
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.vts-table-column-sorter-up').classList).toContain(
        'active'
      );
      expect(
        th.nativeElement.querySelector('.vts-table-column-sorter-down').classList
      ).not.toContain('active');
      expect(th.nativeElement.classList).toContain('vts-table-column-sort');
      testComponent.sort = 'descend';
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.vts-table-column-sorter-up').classList).not.toContain(
        'active'
      );
      expect(th.nativeElement.querySelector('.vts-table-column-sorter-down').classList).toContain(
        'active'
      );
      expect(th.nativeElement.classList).toContain('vts-table-column-sort');
      testComponent.sort = null;
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.vts-table-column-sorter-up').classList).not.toContain(
        'active'
      );
      expect(
        th.nativeElement.querySelector('.vts-table-column-sorter-down').classList
      ).not.toContain('active');
      expect(th.nativeElement.classList).not.toContain('vts-table-column-sort');
      expect(testComponent.sortChange).toHaveBeenCalledTimes(0);
    });
    it('should sort click work', () => {
      fixture.detectChanges();
      expect(th.nativeElement.querySelector('.vts-table-column-sorter-up').classList).not.toContain(
        'active'
      );
      expect(
        th.nativeElement.querySelector('.vts-table-column-sorter-down').classList
      ).not.toContain('active');
      th.nativeElement.querySelector('.vts-table-column-sorters').firstElementChild.click();
      fixture.detectChanges();
      expect(testComponent.sort).toBe('ascend');
      expect(testComponent.sortChange).toHaveBeenCalledTimes(1);
      expect(th.nativeElement.querySelector('.vts-table-column-sorter-up').classList).toContain(
        'active'
      );
      expect(
        th.nativeElement.querySelector('.vts-table-column-sorter-down').classList
      ).not.toContain('active');
      th.nativeElement.querySelector('.vts-table-column-sorters').firstElementChild.click();
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(2);
      expect(testComponent.sort).toBe('descend');
      expect(th.nativeElement.querySelector('.vts-table-column-sorter-up').classList).not.toContain(
        'active'
      );
      expect(th.nativeElement.querySelector('.vts-table-column-sorter-down').classList).toContain(
        'active'
      );
      th.nativeElement.querySelector('.vts-table-column-sorters').firstElementChild.click();
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(3);
      expect(testComponent.sort).toBe(null);
    });
    it('should left work', () => {
      testComponent.left = '20px';
      fixture.detectChanges();
      expect(th.nativeElement.classList).toContain('vts-table-cell-fix-left');
      expect(th.nativeElement.style.left).toBe('20px');
    });
    it('should right work', () => {
      testComponent.right = '20px';
      fixture.detectChanges();
      expect(th.nativeElement.classList).toContain('vts-table-cell-fix-right');
      expect(th.nativeElement.style.right).toBe('20px');
    });
    it('should be throw error when use specific class name', () => {
      expect(() => {
        TestBed.configureTestingModule({
          declarations: [VtsTestDisableThComponent]
        }).createComponent(VtsTestDisableThComponent);
      }).toThrow();
    });
  });
});

@Component({
  template: `
    <vts-table *ngIf="!destroy">
      <th
        [vtsLeft]="left"
        [vtsRight]="right"
        [vtsWidth]="width"
        [(vtsSortOrder)]="sort"
        (vtsSortOrderChange)="sortChange($event)"
        [vtsFilters]="filters"
        (vtsFilterChange)="filterChange($event)"
        [vtsFilterMultiple]="filterMultiple"
      ></th>
    </vts-table>
  `
})
export class VtsThTestVtsTableComponent {
  @ViewChild(VtsThAddOnComponent, { static: false })
  vtsThComponent!: VtsThAddOnComponent;
  destroy = false;
  left?: string | number;
  right?: string | number;
  width?: string | number;
  sort: string | null = null;
  sortChange = jasmine.createSpy('sort change');
  filters = [
    { text: 'filter1', value: '1' },
    { text: 'filter2', value: '2' }
  ];
  filterChange = jasmine.createSpy('filter change');
  filterMultiple = true;
}

interface DataItem {
  name: string;
  age: number;
  address: string;
}

@Component({
  template: `
    <vts-table #filterTable [vtsData]="displayData">
      <thead (vtsSortOrderChange)="sort($event)">
        <tr>
          <th
            vtsColumnKey="name"
            [vtsFilters]="nameList"
            (vtsFilterChange)="filter($event, searchAddress)"
          >
            Name
          </th>
          <th vtsColumnKey="age">Age</th>
          <th
            vtsColumnKey="address"
            [vtsFilterMultiple]="false"
            [vtsFilters]="addressList"
            (vtsFilterChange)="filter(listOfSearchName, $event)"
          >
            Address
          </th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of filterTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.age }}</td>
          <td>{{ data.address }}</td>
        </tr>
      </tbody>
    </vts-table>
  `
})
export class VtsThTestTableDefaultFilterComponent {
  nameList = [
    { text: 'Joe', value: 'Joe', byDefault: true },
    { text: 'Jim', value: 'Jim' }
  ];
  addressList = [
    { text: 'London', value: 'London', byDefault: true },
    { text: 'Sidney', value: 'Sidney' }
  ];
  sortName: keyof DataItem | null = null;
  sortValue: string | null = null;
  listOfSearchName = ['Joe', 'London'];
  searchAddress!: string;
  data: DataItem[] = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    }
  ];
  displayData: DataItem[] = [];

  @ViewChild(VtsThAddOnComponent, { static: false })
  vtsThComponent!: VtsThAddOnComponent;

  sort(sort: { key: keyof DataItem; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  filter(listOfSearchName: string[], searchAddress: string): void {
    this.listOfSearchName = listOfSearchName;
    this.searchAddress = searchAddress;
    this.search();
  }

  search(): void {
    /** filter data **/
    const filterFunc = (item: { name: string; address: string; age: number }) =>
      (this.searchAddress ? item.address.indexOf(this.searchAddress) !== -1 : true) &&
      (this.listOfSearchName.length
        ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1)
        : true);
    const data = this.data.filter(item => filterFunc(item));
    /** sort data **/
    if (this.sortName && this.sortValue) {
      this.displayData = data.sort((a: DataItem, b: DataItem) =>
        this.sortValue === 'ascend'
          ? a[this.sortName!] > b[this.sortName!]
            ? 1
            : -1
          : b[this.sortName!] > a[this.sortName!]
          ? 1
          : -1
      );
    } else {
      this.displayData = data;
    }
  }
}

@Component({
  template: `
    <th class="vts-disable-th"></th>
  `
})
export class VtsTestDisableThComponent {}
