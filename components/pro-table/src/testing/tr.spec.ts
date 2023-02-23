import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VtsTableModule } from '../table.module';
import { VtsTrDirective } from '../table/tr.directive';

describe('vts-tr', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [VtsTableModule],
      declarations: [VtsTrTestTableComponent]
    });
    TestBed.compileComponents();
  }));

  describe('vts-tr in table', () => {
    let fixture: ComponentFixture<VtsTrTestTableComponent>;
    let tr: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTrTestTableComponent);
      fixture.detectChanges();
      tr = fixture.debugElement.query(By.directive(VtsTrDirective));
    });

    it('should not add class', () => {
      fixture.detectChanges();
      expect(tr.nativeElement.classList).not.toContain('vts-table-row');
    });
  });
});

@Component({
  template: `
    <table>
      <tr></tr>
    </table>
  `
})
export class VtsTrTestTableComponent {}
