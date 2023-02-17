import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';
import { VtsTableModule } from '../protable.module';
import { VtsTableComponent } from '../table/table.component';

describe('vts-thead', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [VtsTableModule, VtsIconTestModule],
      declarations: [VtsTheadTestVtsTableComponent]
    });
    TestBed.compileComponents();
  }));
  describe('vts-thead in vts-table', () => {
    let fixture: ComponentFixture<VtsTheadTestVtsTableComponent>;
    let testComponent: VtsTheadTestVtsTableComponent;
    let table: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTheadTestVtsTableComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      table = fixture.debugElement.query(By.directive(VtsTableComponent));
    });
    it('should sort change', () => {
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(0);
      const upButtons = table.nativeElement.querySelectorAll('.vts-table-column-sorters');
      upButtons[0].click();
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(1);
      expect(upButtons[0].querySelector('.vts-table-column-sorter-down').classList).toContain(
        'vtsicon-caret-down'
      );
      upButtons[1].click();
      fixture.detectChanges();
      expect(upButtons[0].querySelector('.vts-table-column-sorter-down').classList).toContain(
        'vtsicon-caret-down'
      );
      expect(upButtons[1].querySelector('.vts-table-column-sorter-down').classList).toContain(
        'vtsicon-caret-down'
      );
      expect(testComponent.sortChange).toHaveBeenCalledTimes(2);
    });

    // Test for #3603
    it('should support dynamic headers', () => {
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(0);
      let upButtons = table.nativeElement.querySelectorAll('.vts-table-column-sorters');
      upButtons[2].click();
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(1);
      upButtons[3].click();
      fixture.detectChanges();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(2);

      testComponent.columns = testComponent.columns.slice(0, 1);
      fixture.detectChanges();
      upButtons = table.nativeElement.querySelectorAll('.vts-table-column-sorters');
      expect(upButtons.length).toBe(3);
      upButtons[2].click();
      expect(testComponent.sortChange).toHaveBeenCalledTimes(3);
    });
  });
});

@Component({
  template: `
    <vts-table>
      <thead (vtsSortOrderChange)="sortChange($event)">
        <th vtsColumnKey="first" [vtsSortFn]="filterFn"></th>
        <th vtsColumnKey="second" [vtsSortFn]="filterFn">></th>
        <th *ngFor="let col of columns" [vtsColumnKey]="col" [vtsSortFn]="filterFn">></th>
      </thead>
    </vts-table>
  `
})
export class VtsTheadTestVtsTableComponent {
  sortChange = jasmine.createSpy('sort change');
  columns = ['third', 'fourth'];
  filterFn = () => -1;
}
