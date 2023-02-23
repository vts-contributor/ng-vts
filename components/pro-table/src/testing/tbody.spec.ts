import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VtsTableModule } from '../table.module';
import { VtsTbodyComponent } from '../table/tbody.component';

describe('vts-tbody', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [VtsTableModule],
      declarations: [VtsTbodyTestTableComponent, VtsTbodyTestVtsTableComponent]
    });
    TestBed.compileComponents();
  }));
  describe('vts-tbody in table', () => {
    let fixture: ComponentFixture<VtsTbodyTestTableComponent>;
    let tbody: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTbodyTestTableComponent);
      fixture.detectChanges();
      tbody = fixture.debugElement.query(By.directive(VtsTbodyComponent));
    });

    it('should not add class', () => {
      fixture.detectChanges();
      expect(tbody.nativeElement.classList).not.toContain('vts-table-tbody');
    });
  });

  describe('vts-tbody in vts-table', () => {
    let fixture: ComponentFixture<VtsTbodyTestVtsTableComponent>;
    let tbody: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTbodyTestVtsTableComponent);
      fixture.detectChanges();
      tbody = fixture.debugElement.query(By.directive(VtsTbodyComponent));
    });
    it('should not add class', () => {
      fixture.detectChanges();
      expect(tbody.nativeElement.classList).toContain('vts-table-tbody');
    });
  });
});

@Component({
  template: `
    <table>
      <tbody></tbody>
    </table>
  `
})
export class VtsTbodyTestTableComponent {}

@Component({
  template: `
    <vts-table>
      <tbody></tbody>
    </vts-table>
  `
})
export class VtsTbodyTestVtsTableComponent {
  expand = false;
}
