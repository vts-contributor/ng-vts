import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentBed, createComponentBed } from '@ui-vts/ng-vts/core/testing/component-bed';

import { VtsIconModule } from '@ui-vts/ng-vts/icon';

import { VtsResultComponent } from './result.component';
import { VtsResultModule } from './result.module';

@Component({
  // tslint:disable-next-line:no-selector
  selector: 'vts-test-basic-result',
  template: `
    <vts-result
      [vtsIcon]="icon"
      [vtsStatus]="status"
      [vtsTitle]="title"
      [vtsSubTitle]="subtitle"
      [vtsExtra]="extra"
    >
      <i vts-icon vts-result-icon vtsType="up"></i>
      <div vts-result-title>Content Title</div>
      <div vts-result-subtitle>Content SubTitle</div>
      <div vts-result-content>Content</div>
      <div vts-result-extra>Content Extra</div>
    </vts-result>
  `
})
export class VtsTestResultBasicComponent {
  icon?: string = 'success';
  title?: string = 'Title';
  status?: string = 'error';
  subtitle?: string = 'SubTitle';
  extra?: string = 'Extra';
}

@Component({
  template: `
    <div [dir]="direction">
      <vts-test-basic-result></vts-test-basic-result>
    </div>
  `
})
export class VtsTestResultRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}

describe('vts-result', () => {
  describe('basic', () => {
    let testBed: ComponentBed<VtsTestResultBasicComponent>;
    let fixture: ComponentFixture<VtsTestResultBasicComponent>;
    let testComponent: VtsTestResultBasicComponent;
    let resultEl: DebugElement;

    beforeEach(() => {
      testBed = createComponentBed(VtsTestResultBasicComponent, {
        imports: [VtsResultModule, VtsIconModule]
      });
      fixture = testBed.fixture;
      testComponent = testBed.component;
      resultEl = fixture.debugElement.query(By.directive(VtsResultComponent));
    });

    it('should props work and overlap contents', () => {
      fixture.detectChanges();

      const iconView = resultEl.nativeElement.querySelector('.vts-result-icon');
      const titleView = resultEl.nativeElement.querySelector('.vts-result-title');
      const subTitleView = resultEl.nativeElement.querySelector('.vts-result-subtitle');
      const extraView = resultEl.nativeElement.querySelector('.vts-result-extra');

      expect(resultEl.nativeElement.classList).toContain('vts-result');
      expect(resultEl.nativeElement.classList).toContain('vts-result-error'); // should status work
      expect(iconView.firstElementChild.classList).toContain('vtsicon-check-circle'); // icon overlap status
      expect(titleView.innerText).toBe('Title');
      expect(subTitleView.innerText).toBe('SubTitle');
      expect(extraView.innerText).toBe('Extra');
    });

    it('should content work', () => {
      testComponent.icon =
        testComponent.title =
        testComponent.subtitle =
        testComponent.status =
        testComponent.extra =
          undefined;
      fixture.detectChanges();

      const iconView = resultEl.nativeElement.querySelector('.vts-result-icon');
      const titleView = resultEl.nativeElement.querySelector('.vts-result-title');
      const subTitleView = resultEl.nativeElement.querySelector('.vts-result-subtitle');
      const contentView = resultEl.nativeElement.querySelector('.vts-result-content');
      const extraView = resultEl.nativeElement.querySelector('.vts-result-extra');

      expect(resultEl.nativeElement.classList).toContain('vts-result');
      expect(iconView.firstElementChild.classList).toContain('vtsicon-up');
      expect(titleView.innerText).toBe('Content Title');
      expect(subTitleView.innerText).toBe('Content SubTitle');
      expect(contentView.innerText).toBe('Content');
      expect(extraView.innerText).toBe('Content Extra');
    });

    it('should icon overlap status', () => {
      testComponent.icon = undefined;
      fixture.detectChanges();

      const iconView = resultEl.nativeElement.querySelector('.vts-result-icon');

      expect(resultEl.nativeElement.classList).toContain('vts-result');
      expect(resultEl.nativeElement.classList).toContain('vts-result-error'); // should status work
      expect(iconView.firstElementChild.classList).toContain('vtsicon-Close');
    });
  });

  describe('RTL', () => {
    let testBed: ComponentBed<VtsTestResultRtlComponent>;
    let fixture: ComponentFixture<VtsTestResultRtlComponent>;
    let resultEl: DebugElement;

    beforeEach(() => {
      testBed = createComponentBed(VtsTestResultRtlComponent, {
        imports: [BidiModule, VtsResultModule, VtsIconModule],
        declarations: [VtsTestResultBasicComponent]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();
      resultEl = fixture.debugElement.query(By.directive(VtsResultComponent));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(resultEl.nativeElement.classList).toContain('vts-result-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(resultEl.nativeElement.className).not.toContain('vts-result-rtl');
    });
  });
});
