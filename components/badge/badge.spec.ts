import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgStyleInterface } from '@ui-vts/ng-vts/core/types';
import { VtsBadgeComponent } from './badge.component';
import { VtsBadgeModule } from './badge.module';

describe('badge', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [BidiModule, VtsBadgeModule, NoopAnimationsModule],
      declarations: [VtsTestBadgeBasicComponent, VtsTestBadgeRtlComponent]
    });
    TestBed.compileComponents();
  }));

  describe('basic badge', () => {
    let fixture: ComponentFixture<VtsTestBadgeBasicComponent>;
    let testComponent: VtsTestBadgeBasicComponent;
    let badgeElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestBadgeBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      badgeElement = fixture.debugElement.query(By.directive(VtsBadgeComponent));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(badgeElement.nativeElement.classList).toContain('vts-badge');
    });

    it('should count work', () => {
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('vts-badge-sup').classList).toContain(
        'vts-scroll-number'
      );
      expect(badgeElement.nativeElement.querySelector('vts-badge-sup').classList).toContain(
        'vts-badge-count'
      );
      expect(badgeElement.nativeElement.querySelector('vts-badge-sup').classList).not.toContain(
        'vts-badge-multiple-words'
      );
      expect(badgeElement.nativeElement.querySelector('.current').innerText).toBe('5');
      testComponent.count = 10;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('vts-badge-sup').classList).toContain(
        'vts-badge-multiple-words'
      );
      expect(badgeElement.nativeElement.querySelectorAll('.current')[0].innerText).toBe('1');
      expect(badgeElement.nativeElement.querySelectorAll('.current')[1].innerText).toBe('0');
    });

    it('should title work', () => {
      testComponent.overflow = 99;
      testComponent.count = 1000;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('vts-badge-sup').getAttribute('title')).toBe(
        '1000'
      );
      testComponent.title = 'test';
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('vts-badge-sup').getAttribute('title')).toBe(
        'test'
      );
    });

    it('should be no title attribute when `vtsTitle` is null', () => {
      testComponent.title = null;
      fixture.detectChanges();
      expect(
        badgeElement.nativeElement.querySelector('vts-badge-sup').getAttribute('title')
      ).toBeFalsy();
    });

    it('should offset work', () => {
      testComponent.offset = [10, 10];
      fixture.detectChanges();
      const style = getComputedStyle(badgeElement.nativeElement.querySelector('vts-badge-sup'));
      expect(style.right).toBe('-10px');
      expect(style.marginTop).toBe('10px');
    });

    it('should overflow work', () => {
      testComponent.overflow = 4;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('vts-badge-sup').innerText).toBe('4+');
      testComponent.overflow = 99;
      testComponent.count = 100;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('vts-badge-sup').innerText).toBe('99+');
      testComponent.overflow = 99;
      testComponent.count = 99;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('vts-badge-sup').innerText).not.toBe('99+');
    });

    it('should showZero work', fakeAsync(() => {
      testComponent.count = 0;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('vts-badge-sup')).toBeNull();
      testComponent.showZero = true;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('.current').innerText).toBe('0');
    }));

    it('should negative number not display', fakeAsync(() => {
      testComponent.count = -10;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('vts-badge-sup')).toBeNull();
      testComponent.showZero = true;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('.current').innerText).toBe('0');
    }));

    it('should dot work', () => {
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('vts-badge-sup').classList).not.toContain(
        'vts-badge-dot'
      );
      testComponent.dot = true;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('vts-badge-sup').classList).toContain(
        'vts-badge-dot'
      );
    });

    it('should no wrapper work', fakeAsync(() => {
      testComponent.inner = false;
      testComponent.style = { backgroundColor: '#52c41a' };
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      badgeElement = fixture.debugElement.query(By.directive(VtsBadgeComponent));
      expect(badgeElement.nativeElement.classList).toContain('vts-badge-not-a-wrapper');
      expect(badgeElement.nativeElement.querySelector('vts-badge-sup').style.backgroundColor).toBe(
        'rgb(82, 196, 26)'
      );
    }));

    it('should status work', () => {
      testComponent.inner = false;
      const statusList = ['success', 'processing', 'default', 'error', 'warning'];
      statusList.forEach(status => {
        testComponent.status = status;
        fixture.detectChanges();
        expect(
          badgeElement.nativeElement.querySelector('.vts-badge-status-dot').classList
        ).toContain(`vts-badge-status-${status}`);
      });
      testComponent.text = 'test';
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('.vts-badge-status-text').innerText).toBe(
        'test'
      );
    });
  });

  describe('RTL', () => {
    let fixture: ComponentFixture<VtsTestBadgeRtlComponent>;
    let badge: DebugElement;
    let badgeElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestBadgeRtlComponent);
      badge = fixture.debugElement.query(By.directive(VtsBadgeComponent));
      fixture.detectChanges();
      badgeElement = badge.nativeElement;
    });

    it('should pagination className correct on dir change', () => {
      fixture.detectChanges();
      expect(badgeElement.classList).toContain('vts-badge-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(badgeElement.classList).not.toContain('vts-badge-rtl');
    });
  });
});

@Component({
  template: `
    <vts-badge
      [vtsCount]="count"
      [vtsStatus]="status"
      [vtsText]="text"
      [vtsShowZero]="showZero"
      [vtsOverflowCount]="overflow"
      [vtsStyle]="style"
      [vtsDot]="dot"
      [vtsOffset]="offset"
      [vtsTitle]="title"
      [vtsStandalone]="!inner"
    >
      <a *ngIf="inner"></a>
    </vts-badge>
  `
})
export class VtsTestBadgeBasicComponent {
  count = 5;
  dot = false;
  inner = true;
  overflow = 20;
  showZero = false;
  status!: string;
  style!: NgStyleInterface;
  text!: string;
  title?: string | null;
  offset?: [number, number];
}

@Component({
  template: `
    <div [dir]="direction">
      <vts-badge [vtsCount]="count"></vts-badge>
    </div>
  `
})
export class VtsTestBadgeRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
  count = 5;
}
