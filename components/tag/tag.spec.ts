import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VtsTagComponent } from './tag.component';
import { VtsTagModule } from './tag.module';

describe('tag', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BidiModule, VtsTagModule, NoopAnimationsModule],
      declarations: [VtsTestTagBasicComponent, VtsTestTagPreventComponent, VtsTestTagRtlComponent]
    });
    TestBed.compileComponents();
  }));
  describe('basic tag', () => {
    let fixture: ComponentFixture<VtsTestTagBasicComponent>;
    let testComponent: VtsTestTagBasicComponent;
    let tag: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestTagBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      tag = fixture.debugElement.query(By.directive(VtsTagComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(tag.nativeElement.classList).toContain('vts-tag');
    });
    it('should checkable work', () => {
      fixture.detectChanges();
      expect(tag.nativeElement.classList).not.toContain('vts-tag-checkable');
      testComponent.mode = 'checkable';
      fixture.detectChanges();
      expect(testComponent.checked).toBe(false);
      expect(testComponent.checkedChange).toHaveBeenCalledTimes(0);
      expect(tag.nativeElement.classList).toContain('vts-tag-checkable');
      expect(tag.nativeElement.classList).not.toContain('vts-tag-checkable-checked');
      tag.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.checked).toBe(true);
      expect(testComponent.checkedChange).toHaveBeenCalledTimes(1);
      expect(tag.nativeElement.classList).toContain('vts-tag-checkable');
      expect(tag.nativeElement.classList).toContain('vts-tag-checkable-checked');
    });
    it('should closeable work', fakeAsync(() => {
      fixture.detectChanges();
      expect(tag.nativeElement.querySelector('.vtsicon-close')).toBeNull();
      testComponent.mode = 'closeable';
      fixture.detectChanges();
      expect(tag.nativeElement.querySelector('.vtsicon-close')).toBeDefined();
      tag.nativeElement.querySelector('.vtsicon-close').click();
      fixture.detectChanges();
      expect(testComponent.onClose).toHaveBeenCalledTimes(1);
      tick(1000);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('vts-tag')).toBeFalsy();
    }));
    it('should color work', () => {
      fixture.detectChanges();
      expect(tag.nativeElement.classList).not.toContain('vts-tag-has-color');
      testComponent.color = 'green';
      fixture.detectChanges();
      expect(tag.nativeElement.classList).toContain('vts-tag-green');
      testComponent.color = '#f50';
      fixture.detectChanges();
      expect(tag.nativeElement.classList).not.toContain('vts-tag-green');
      expect(tag.nativeElement.style.backgroundColor).toBe('rgb(255, 85, 0)');
      testComponent.color = 'green';
      fixture.detectChanges();
      expect(tag.nativeElement.classList).toContain('vts-tag-green');
      expect(tag.nativeElement.style.backgroundColor).toBe('');
    });

    it('should status color work', () => {
      fixture.detectChanges();
      testComponent.color = 'success';
      fixture.detectChanges();
      expect(tag.nativeElement.classList).toContain('vts-tag-success');
      testComponent.color = 'processing';
      fixture.detectChanges();
      expect(tag.nativeElement.classList).toContain('vts-tag-processing');
      testComponent.color = 'invalid';
      fixture.detectChanges();
      expect(tag.nativeElement.classList).not.toContain('vts-tag-invalid');
    });
    it('issues #1176', () => {
      testComponent.color = 'green';
      fixture.detectChanges();
      expect(tag.nativeElement.classList).toContain('vts-tag-green');
      testComponent.color = '';
      fixture.detectChanges();
      expect(tag.nativeElement.classList).not.toContain('vts-tag-has-color');
      testComponent.color = undefined;
      fixture.detectChanges();
      expect(tag.nativeElement.classList).not.toContain('vts-tag-has-color');
    });
  });
  describe('prevent tag', () => {
    let fixture: ComponentFixture<VtsTestTagPreventComponent>;
    let tag: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestTagPreventComponent);
      fixture.detectChanges();
      tag = fixture.debugElement.query(By.directive(VtsTagComponent));
    });
    it('should close prevent default', fakeAsync(() => {
      fixture.detectChanges();
      expect(tag.nativeElement.querySelector('.vtsicon-close')).toBeDefined();
      tag.nativeElement.querySelector('.vtsicon-close').click();
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(tag.nativeElement.querySelector('.vtsicon-close')).toBeDefined();
    }));
  });
  describe('RTL', () => {
    it('should className correct on dir change', () => {
      const fixture = TestBed.createComponent(VtsTestTagRtlComponent);
      const tag = fixture.debugElement.query(By.directive(VtsTagComponent));
      fixture.detectChanges();
      expect(tag.nativeElement.className).toContain('vts-tag-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(tag.nativeElement.className).not.toContain('vts-tag-rtl');
    });
  });
});

@Component({
  // tslint:disable-next-line:no-selector
  selector: 'vts-test-basic-tag',
  template: `
    <vts-tag
      [vtsMode]="mode"
      [(vtsChecked)]="checked"
      [vtsColor]="color"
      (vtsCheckedChange)="checkedChange($event)"
      (vtsOnClose)="onClose()"
    >
      Tag 1
    </vts-tag>
  `
})
export class VtsTestTagBasicComponent {
  mode = 'default';
  color: string | undefined;
  checked = false;
  onClose = jasmine.createSpy('on close');
  afterClose = jasmine.createSpy('after close');
  checkedChange = jasmine.createSpy('after close');
}

@Component({
  template: `
    <vts-tag vtsMode="closeable" (vtsOnClose)="onClose($event)">Tag 1</vts-tag>
  `
})
export class VtsTestTagPreventComponent {
  onClose(e: MouseEvent): void {
    e.preventDefault();
  }
}

@Component({
  template: `
    <div [dir]="direction">
      <vts-test-basic-tag></vts-test-basic-tag>
    </div>
  `
})
export class VtsTestTagRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
