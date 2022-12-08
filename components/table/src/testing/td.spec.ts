import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { VtsTdAddOnComponent } from '../cell/td-addon.component';
import { VtsTableModule } from '../table.module';

describe('vts-td', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [VtsTableModule, FormsModule],
      declarations: [VtsTestTdComponent]
    });
    TestBed.compileComponents();
  }));
  describe('basic vts-td', () => {
    let fixture: ComponentFixture<VtsTestTdComponent>;
    let testComponent: VtsTestTdComponent;
    let td: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestTdComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      td = fixture.debugElement.query(By.directive(VtsTdAddOnComponent));
    });
    it('should checkbox work', () => {
      fixture.detectChanges();
      expect(td.nativeElement.querySelector('.vts-checkbox-wrapper')).toBeDefined();
      expect(td.nativeElement.classList).toContain('vts-table-selection-column');
    });
    it('should checked work', fakeAsync(() => {
      fixture.detectChanges();
      expect(
        td.nativeElement.querySelector('.vts-checkbox-wrapper').firstElementChild!.classList
      ).not.toContain('vts-checkbox-checked');
      testComponent.checked = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.checked).toBe(true);
      expect(
        td.nativeElement.querySelector('.vts-checkbox-wrapper').firstElementChild!.classList
      ).toContain('vts-checkbox-checked');
      expect(testComponent.checkedChange).toHaveBeenCalledTimes(0);
    }));
    it('should disabled work', () => {
      fixture.detectChanges();
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(testComponent.checked).toBe(false);
      expect(
        td.nativeElement
          .querySelector('.vts-checkbox-wrapper')
          .firstElementChild!.classList.contains('vts-checkbox-checked')
      ).toBe(false);
      expect(testComponent.checkedChange).toHaveBeenCalledTimes(0);
      td.nativeElement.querySelector('.vts-checkbox-wrapper').click();
      fixture.detectChanges();
      expect(testComponent.checked).toBe(false);
      expect(
        td.nativeElement
          .querySelector('.vts-checkbox-wrapper')
          .firstElementChild!.classList.contains('vts-checkbox-checked')
      ).toBe(false);
      expect(testComponent.checkedChange).toHaveBeenCalledTimes(0);
    });
    it('should indeterminate work', () => {
      fixture.detectChanges();
      fixture.detectChanges();
      testComponent.indeterminate = true;
      fixture.detectChanges();
      expect(
        td.nativeElement
          .querySelector('.vts-checkbox-wrapper')
          .firstElementChild!.classList.contains('vts-checkbox-indeterminate')
      ).toBe(true);
      testComponent.checked = true;
      fixture.detectChanges();
      expect(
        td.nativeElement
          .querySelector('.vts-checkbox-wrapper')
          .firstElementChild!.classList.contains('vts-checkbox-indeterminate')
      ).toBe(true);
    });
    it('should expand work', () => {
      fixture.detectChanges();
      expect(td.nativeElement.querySelector('.vts-table-row-expand-icon').classList).toContain(
        'vts-table-row-expand-icon-collapsed'
      );
      testComponent.expand = true;
      fixture.detectChanges();
      expect(td.nativeElement.querySelector('.vts-table-row-expand-icon').classList).toContain(
        'vts-table-row-expand-icon-expanded'
      );
      expect(testComponent.expandChange).toHaveBeenCalledTimes(0);
    });
    it('should click expand work', () => {
      fixture.detectChanges();
      expect(td.nativeElement.querySelector('.vts-table-row-expand-icon').classList).toContain(
        'vts-table-row-expand-icon-collapsed'
      );
      td.nativeElement.querySelector('.vts-table-row-expand-icon').click();
      fixture.detectChanges();
      expect(testComponent.expand).toBe(true);
      expect(td.nativeElement.querySelector('.vts-table-row-expand-icon').classList).toContain(
        'vts-table-row-expand-icon-expanded'
      );
      expect(testComponent.expandChange).toHaveBeenCalledTimes(1);
    });
    it('should be row index when index-size is 0', () => {
      testComponent.indentSize = 0;
      fixture.detectChanges();
      expect(td.nativeElement.querySelector('.vts-table-row-indent')).not.toBeNull();
    });
    it('should indentSize work', () => {
      testComponent.indentSize = 20;
      fixture.detectChanges();
      expect(td.nativeElement.querySelector('.vts-table-row-indent').style.paddingLeft).toBe(
        '20px'
      );
    });
    it('should left work', () => {
      testComponent.left = '20px';
      fixture.detectChanges();
      expect(td.nativeElement.classList).toContain('vts-table-cell-fix-left');
      expect(td.nativeElement.style.left).toBe('20px');
    });
    it('should right work', () => {
      testComponent.right = '20px';
      fixture.detectChanges();
      expect(td.nativeElement.classList).toContain('vts-table-cell-fix-right');
      expect(td.nativeElement.style.right).toBe('20px');
    });
    it('should be throw error when use specific class name', () => {
      expect(() => {
        TestBed.configureTestingModule({
          declarations: [VtsTestDisableTdComponent]
        }).createComponent(VtsTestDisableTdComponent);
      }).toThrow();
    });
  });
});

@Component({
  template: `
    <td
      [(vtsChecked)]="checked"
      [vtsIndeterminate]="indeterminate"
      (vtsCheckedChange)="checkedChange($event)"
      [vtsDisabled]="disabled"
      [(vtsExpand)]="expand"
      (vtsExpandChange)="expandChange($event)"
      [vtsIndentSize]="indentSize"
      [vtsLeft]="left"
      [vtsRight]="right"
    ></td>
  `
})
export class VtsTestTdComponent {
  checked = false;
  checkedChange = jasmine.createSpy('show change');
  indeterminate = false;
  disabled = false;
  expand = false;
  expandChange = jasmine.createSpy('expand change');
  indentSize?: number;
  left?: string | number;
  right?: string | number;
}

@Component({
  template: `
    <td class="vts-disable-td" [vtsChecked]="true"></td>
  `
})
export class VtsTestDisableTdComponent {}
