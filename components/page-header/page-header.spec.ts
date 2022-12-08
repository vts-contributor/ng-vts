import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Location } from '@angular/common';
import { Component, DebugElement, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { VtsDropDownModule } from '@ui-vts/ng-vts/dropdown';
import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';

import { VtsDemoPageHeaderActionsComponent } from './demo/actions';
import { VtsDemoPageHeaderBasicComponent } from './demo/basic';
import { VtsDemoPageHeaderBreadcrumbComponent } from './demo/breadcrumb';
import { VtsDemoPageHeaderContentComponent } from './demo/content';
import { VtsDemoPageHeaderGhostComponent } from './demo/ghost';
import { VtsDemoPageHeaderResponsiveComponent } from './demo/responsive';

import { VtsPageHeaderComponent } from './page-header.component';
import { VtsPageHeaderModule } from './page-header.module';

describe('VtsPageHeaderComponent', () => {
  let location: Location;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          BidiModule,
          VtsPageHeaderModule,
          VtsDropDownModule,
          VtsIconTestModule,
          RouterTestingModule
        ],
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [
          VtsDemoPageHeaderBasicComponent,
          VtsDemoPageHeaderBreadcrumbComponent,
          VtsDemoPageHeaderContentComponent,
          VtsDemoPageHeaderActionsComponent,
          VtsDemoPageHeaderResponsiveComponent,
          VtsDemoPageHeaderGhostComponent,
          VtsDemoPageHeaderRtlComponent
        ]
      }).compileComponents();
      location = TestBed.inject(Location);
    })
  );

  it('should basic work', () => {
    const fixture = TestBed.createComponent(VtsDemoPageHeaderBasicComponent);
    const pageHeader = fixture.debugElement.query(By.directive(VtsPageHeaderComponent));
    fixture.detectChanges();
    expect(pageHeader.nativeElement.classList).toContain('vts-page-header');
    expect(pageHeader.nativeElement.classList).toContain('vts-page-header-ghost');
    expect(pageHeader.nativeElement.querySelector('.vts-page-header-heading-title')).toBeTruthy();
    expect(
      pageHeader.nativeElement.querySelector('.vts-page-header-heading-sub-title')
    ).toBeTruthy();
  });

  it('should ghost work', () => {
    const fixture = TestBed.createComponent(VtsDemoPageHeaderGhostComponent);
    const pageHeader = fixture.debugElement.query(By.directive(VtsPageHeaderComponent));
    fixture.detectChanges();
    expect(pageHeader.nativeElement.classList).toContain('vts-page-header');
    expect(pageHeader.nativeElement.classList).not.toContain('vts-page-header-ghost');
  });

  it('should breadcrumb work', () => {
    const fixture = TestBed.createComponent(VtsDemoPageHeaderBreadcrumbComponent);
    const pageHeader = fixture.debugElement.query(By.directive(VtsPageHeaderComponent));
    fixture.detectChanges();
    expect(pageHeader.nativeElement.classList).toContain('has-breadcrumb');
    expect(
      pageHeader.nativeElement.querySelector('vts-breadcrumb[vts-page-header-breadcrumb]')
    ).toBeTruthy();
  });

  it('should default call location back when vtsBack not has observers', () => {
    const fixture = TestBed.createComponent(VtsDemoPageHeaderResponsiveComponent);
    const pageHeader = fixture.debugElement.query(By.directive(VtsPageHeaderComponent));
    spyOn(location, 'back');
    fixture.detectChanges();
    expect(location.back).not.toHaveBeenCalled();
    const back = pageHeader.nativeElement.querySelector('.vts-page-header-back');
    (back as HTMLElement).click();
    fixture.detectChanges();
    expect(location.back).toHaveBeenCalled();
  });

  it('should content work', () => {
    const fixture = TestBed.createComponent(VtsDemoPageHeaderContentComponent);
    const pageHeader = fixture.debugElement.query(By.directive(VtsPageHeaderComponent));
    fixture.detectChanges();
    const content = pageHeader.nativeElement.querySelector(
      'vts-page-header-content.vts-page-header-content'
    );
    expect(content).toBeTruthy();
    expect((content as HTMLElement).children.length > 0).toBe(true);
  });

  it('should actions work', () => {
    const fixture = TestBed.createComponent(VtsDemoPageHeaderContentComponent);
    const pageHeader = fixture.debugElement.query(By.directive(VtsPageHeaderComponent));
    fixture.detectChanges();
    expect(
      pageHeader.nativeElement.querySelector('vts-page-header-extra.vts-page-header-heading-extra')
    ).toBeTruthy();
    expect(
      pageHeader.nativeElement.querySelector('vts-page-header-tags.vts-page-header-heading-tags')
    ).toBeTruthy();
  });

  it('should footer work', () => {
    const fixture = TestBed.createComponent(VtsDemoPageHeaderResponsiveComponent);
    const pageHeader = fixture.debugElement.query(By.directive(VtsPageHeaderComponent));
    fixture.detectChanges();
    expect(pageHeader.nativeElement.classList).toContain('has-footer');
    expect(
      pageHeader.nativeElement.querySelector('vts-page-header-footer.vts-page-header-footer')
    ).toBeTruthy();
  });

  it('should avatar work', () => {
    const fixture = TestBed.createComponent(VtsDemoPageHeaderContentComponent);
    const pageHeader = fixture.debugElement.query(By.directive(VtsPageHeaderComponent));
    fixture.detectChanges();
    expect(
      pageHeader.nativeElement.querySelector('vts-avatar[vts-page-header-avatar]')
    ).toBeTruthy();
  });

  it('should have an default back icon', () => {
    const fixture = TestBed.createComponent(VtsDemoPageHeaderBasicComponent);
    const pageHeader = fixture.debugElement.query(By.directive(VtsPageHeaderComponent));
    fixture.detectChanges();
    expect(
      pageHeader.nativeElement.querySelector('.vts-page-header-back i.vtsicon-arrow-left')
    ).toBeTruthy();
  });

  it('should does not have an default back icon', () => {
    const fixture = TestBed.createComponent(VtsDemoPageHeaderContentComponent);
    const pageHeader = fixture.debugElement.query(By.directive(VtsPageHeaderComponent));
    fixture.detectChanges();
    expect(pageHeader.nativeElement.querySelector('.vts-page-header-back')).toBeFalsy();
  });

  it('should vtsBack work', () => {
    const fixture = TestBed.createComponent(VtsDemoPageHeaderBasicComponent);
    const pageHeader = fixture.debugElement.query(By.directive(VtsPageHeaderComponent));
    const context = fixture.componentInstance;
    spyOn(context, 'onBack');
    fixture.detectChanges();
    expect(context.onBack).not.toHaveBeenCalled();
    const back = pageHeader.nativeElement.querySelector('.vts-page-header-back');
    (back as HTMLElement).click();
    fixture.detectChanges();
    expect(context.onBack).toHaveBeenCalled();
  });

  describe('RTL', () => {
    let fixture: ComponentFixture<VtsDemoPageHeaderRtlComponent>;
    let pageHeader: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsDemoPageHeaderRtlComponent);
      pageHeader = fixture.debugElement.query(By.directive(VtsPageHeaderComponent));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(pageHeader.nativeElement.classList).toContain('vts-page-header-rtl');
    });

    it('should className correct after change Dir', () => {
      fixture.detectChanges();
      expect(pageHeader.nativeElement.classList).toContain('vts-page-header-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();

      expect(pageHeader.nativeElement.classList).not.toContain('vts-page-header-rtl');
    });

    it('should have an default back icon', () => {
      fixture.detectChanges();
      expect(
        pageHeader.nativeElement.querySelector('.vts-page-header-back i.vtsicon-arrow-right')
      ).toBeTruthy();
    });
  });
});

@Component({
  template: `
    <div [dir]="direction">
      <vts-demo-page-header-basic></vts-demo-page-header-basic>
    </div>
  `
})
export class VtsDemoPageHeaderRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
