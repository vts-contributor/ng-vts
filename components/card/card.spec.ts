import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { VtsCardComponent } from './card.component';
import { VtsCardModule } from './card.module';

import { VtsDemoCardBasicComponent } from './demo/basic';
import { VtsDemoCardBorderLessComponent } from './demo/border-less';
import { VtsDemoCardFlexibleContentComponent } from './demo/flexible-content';
import { VtsDemoCardGridCardComponent } from './demo/grid-card';
import { VtsDemoCardInColumnComponent } from './demo/in-column';
import { VtsDemoCardInnerComponent } from './demo/inner';
import { VtsDemoCardLoadingComponent } from './demo/loading';
import { VtsDemoCardMetaComponent } from './demo/meta';
import { VtsDemoCardSimpleComponent } from './demo/simple';
import { VtsDemoCardTabsComponent } from './demo/tabs';

describe('card', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BidiModule, VtsCardModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        VtsDemoCardBasicComponent,
        VtsDemoCardBorderLessComponent,
        VtsDemoCardFlexibleContentComponent,
        VtsDemoCardGridCardComponent,
        VtsDemoCardInColumnComponent,
        VtsDemoCardInnerComponent,
        VtsDemoCardLoadingComponent,
        VtsDemoCardMetaComponent,
        VtsDemoCardSimpleComponent,
        VtsDemoCardTabsComponent,
        TestCardSizeComponent,
        VtsTestCardRtlComponent
      ]
    });
    TestBed.compileComponents();
  }));
  it('should basic work', () => {
    const fixture = TestBed.createComponent(VtsDemoCardBasicComponent);
    const card = fixture.debugElement.query(By.directive(VtsCardComponent));
    fixture.detectChanges();
    expect(card.nativeElement.classList).toContain('vts-card');
    expect(card.nativeElement.classList).toContain('vts-card-bordered');
    expect(card.nativeElement.querySelector('.vts-card-head-title').innerText).toBe('Card title');
    expect(card.nativeElement.querySelector('.vts-card-extra').innerText).toBe('More');
  });
  it('should border-less work', () => {
    const fixture = TestBed.createComponent(VtsDemoCardBorderLessComponent);
    const card = fixture.debugElement.query(By.directive(VtsCardComponent));
    fixture.detectChanges();
    expect(card.nativeElement.classList).toContain('vts-card');
    expect(card.nativeElement.classList).not.toContain('vts-card-bordered');
  });
  it('should simple work', () => {
    const fixture = TestBed.createComponent(VtsDemoCardSimpleComponent);
    const card = fixture.debugElement.query(By.directive(VtsCardComponent));
    fixture.detectChanges();
    expect(card.nativeElement.firstElementChild!.classList).toContain('vts-card-body');
  });
  it('should flexible content work', () => {
    const fixture = TestBed.createComponent(VtsDemoCardFlexibleContentComponent);
    const card = fixture.debugElement.query(By.directive(VtsCardComponent));
    fixture.detectChanges();
    expect(card.nativeElement.classList).toContain('vts-card-hoverable');
    expect(card.nativeElement.firstElementChild!.classList).toContain('vts-card-cover');
    expect(card.nativeElement.querySelector('.vts-card-meta-title').innerText).toBe(
      'Europe Street beat'
    );
    expect(card.nativeElement.querySelector('.vts-card-meta-description').innerText).toBe(
      'www.instagram.com'
    );
  });
  it('should in column work', () => {
    const fixture = TestBed.createComponent(VtsDemoCardInColumnComponent);
    const card = fixture.debugElement.query(By.directive(VtsCardComponent));
    fixture.detectChanges();
    expect(card.nativeElement.classList).toContain('vts-card');
  });
  it('should loading work', () => {
    const fixture = TestBed.createComponent(VtsDemoCardLoadingComponent);
    const card = fixture.debugElement.query(By.directive(VtsCardComponent));
    fixture.detectChanges();
    expect(card.nativeElement.classList).toContain('vts-card-loading');
    expect(card.nativeElement.querySelector('vts-card-loading').classList).toContain(
      'vts-card-loading-content'
    );
  });
  it('should grid work', () => {
    const fixture = TestBed.createComponent(VtsDemoCardGridCardComponent);
    const card = fixture.debugElement.query(By.directive(VtsCardComponent));
    fixture.detectChanges();
    expect(card.nativeElement.classList).toContain('vts-card-contain-grid');
    expect(
      card.nativeElement.querySelector('.vts-card-body').firstElementChild!.classList
    ).toContain('vts-card-grid');
  });
  it('should inner work', () => {
    const fixture = TestBed.createComponent(VtsDemoCardInnerComponent);
    const card = fixture.debugElement.query(By.directive(VtsCardComponent));
    fixture.detectChanges();
    expect(card.nativeElement.classList).not.toContain('vts-card-type-inner');
    expect(card.nativeElement.querySelectorAll('.vts-card-type-inner').length).toBe(2);
  });
  it('should card work', () => {
    const fixture = TestBed.createComponent(VtsDemoCardTabsComponent);
    const cards = fixture.debugElement.queryAll(By.directive(VtsCardComponent));
    fixture.detectChanges();
    expect(cards[0].nativeElement.classList).toContain('vts-card-contain-tabs');
    expect(cards[0].nativeElement.firstElementChild.firstElementChild!.classList).toContain(
      'vts-card-head-wrapper'
    );
    expect(cards[1].nativeElement.classList).toContain('vts-card-contain-tabs');
    expect(cards[1].nativeElement.firstElementChild.firstElementChild!.classList).toContain(
      'vts-card-head-wrapper'
    );
  });
  it('should meta work', () => {
    const fixture = TestBed.createComponent(VtsDemoCardMetaComponent);
    const card = fixture.debugElement.query(By.directive(VtsCardComponent));
    fixture.detectChanges();
    expect(card.nativeElement.querySelector('.vts-card-actions').children.length).toBe(3);
  });
  it('should size work', () => {
    const fixture = TestBed.createComponent(TestCardSizeComponent);
    const card = fixture.debugElement.query(By.directive(VtsCardComponent));
    fixture.detectChanges();
    expect(card.nativeElement.classList).not.toContain('vts-card-small');
    fixture.componentInstance.size = 'small';
    fixture.detectChanges();
    expect(card.nativeElement.classList).toContain('vts-card-small');
  });

  describe('RTL', () => {
    it('should card className correct on dir change', () => {
      const fixture = TestBed.createComponent(VtsTestCardRtlComponent);
      const card = fixture.debugElement.query(By.directive(VtsCardComponent));
      fixture.detectChanges();
      expect(card.nativeElement.classList).toContain('vts-card-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(card.nativeElement.classList).not.toContain('vts-card-rtl');
    });
  });
});

@Component({
  template: `
    <vts-card [vtsSize]="size">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </vts-card>
  `
})
class TestCardSizeComponent {
  size = 'default';
}

@Component({
  template: `
    <div [dir]="direction">
      <vts-card>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </vts-card>
    </div>
  `
})
export class VtsTestCardRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
