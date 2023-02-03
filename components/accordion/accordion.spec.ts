import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { VtsAccordionPanelComponent } from './accordion-panel.component';
import { VtsAccordionComponent } from './accordion.component';
import { VtsAccordionModule } from './accordion.module';

describe('collapse', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BidiModule, VtsAccordionModule, NoopAnimationsModule],
      declarations: [
        VtsTestCollapseBasicComponent,
        VtsTestCollapseTemplateComponent,
        VtsTestCollapseIconComponent,
        VtsTestCollapseRtlComponent
      ]
    });
    TestBed.compileComponents();
  }));
  describe('collapse basic', () => {
    let fixture: ComponentFixture<VtsTestCollapseBasicComponent>;
    let testComponent: VtsTestCollapseBasicComponent;
    let collapse: DebugElement;
    let panels: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestCollapseBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      collapse = fixture.debugElement.query(By.directive(VtsAccordionComponent));
      panels = fixture.debugElement.queryAll(By.directive(VtsAccordionPanelComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(collapse.nativeElement!.classList).toContain('vts-collapse');
      expect(
        panels.every(panel => panel.nativeElement.classList.contains('vts-collapse-item'))
      ).toBe(true);
    });
    it('should border work', () => {
      fixture.detectChanges();
      expect(collapse.nativeElement!.classList).not.toContain('vts-collapse-borderless');
      testComponent.bordered = false;
      fixture.detectChanges();
      expect(collapse.nativeElement!.classList).toContain('vts-collapse-borderless');
    });
    it('should showArrow work', () => {
      fixture.detectChanges();
      expect(
        panels[0].nativeElement.querySelector('.vts-collapse-arrow').firstElementChild
      ).toBeDefined();
      testComponent.showArrow = false;
      fixture.detectChanges();
      expect(panels[0].nativeElement.querySelector('.vts-collapse-arrow')).toBeNull();
    });
    it('should active work', () => {
      fixture.detectChanges();
      expect(panels[0].nativeElement.classList).not.toContain('vts-collapse-item-active');
      testComponent.active01 = true;
      fixture.detectChanges();
      expect(panels[0].nativeElement.classList).toContain('vts-collapse-item-active');
      expect(testComponent.active01Change).toHaveBeenCalledTimes(0);
    });
    it('should click work', () => {
      fixture.detectChanges();
      expect(panels[0].nativeElement.classList).not.toContain('vts-collapse-item-active');
      expect(testComponent.active01).toBe(false);
      panels[0].nativeElement.querySelector('.vts-collapse-header').click();
      fixture.detectChanges();
      expect(testComponent.active01).toBe(true);
      expect(panels[0].nativeElement.classList).toContain('vts-collapse-item-active');
      expect(testComponent.active01Change).toHaveBeenCalledTimes(1);
    });
    it('should disabled work', () => {
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(panels[1].nativeElement.classList).not.toContain('vts-collapse-item-active');
      expect(testComponent.active02).toBe(false);
      panels[1].nativeElement.querySelector('.vts-collapse-header').click();
      fixture.detectChanges();
      expect(testComponent.active02).toBe(false);
      expect(panels[1].nativeElement.classList).toContain('vts-collapse-item-disabled');
      expect(panels[1].nativeElement.classList).not.toContain('vts-collapse-item-active');
      expect(testComponent.active02Change).toHaveBeenCalledTimes(0);
    });
    it('should accordion work', () => {
      testComponent.accordion = true;
      fixture.detectChanges();
      expect(panels[0].nativeElement.classList).not.toContain('vts-collapse-item-active');
      expect(testComponent.active01).toBe(false);
      panels[0].nativeElement.querySelector('.vts-collapse-header').click();
      fixture.detectChanges();
      expect(testComponent.active01).toBe(true);
      expect(testComponent.active02).toBe(false);
      expect(panels[0].nativeElement.classList).toContain('vts-collapse-item-active');
      expect(panels[1].nativeElement.classList).not.toContain('vts-collapse-item-active');
      expect(testComponent.active01Change).toHaveBeenCalledTimes(1);
      expect(testComponent.active02Change).toHaveBeenCalledTimes(0);
      panels[1].nativeElement.querySelector('.vts-collapse-header').click();
      fixture.detectChanges();
      expect(testComponent.active01).toBe(false);
      expect(testComponent.active02).toBe(true);
      expect(panels[0].nativeElement.classList).not.toContain('vts-collapse-item-active');
      expect(panels[1].nativeElement.classList).toContain('vts-collapse-item-active');
      expect(testComponent.active01Change).toHaveBeenCalledTimes(2);
      expect(testComponent.active02Change).toHaveBeenCalledTimes(1);
    });
    it('should click to fold up work with accordion', () => {
      testComponent.accordion = true;
      fixture.detectChanges();
      expect(panels[0].nativeElement.classList).not.toContain('vts-collapse-item-active');
      expect(testComponent.active01).toBe(false);
      panels[0].nativeElement.querySelector('.vts-collapse-header').click();
      fixture.detectChanges();
      panels[1].nativeElement.querySelector('.vts-collapse-header').click();
      fixture.detectChanges();
      panels[0].nativeElement.querySelector('.vts-collapse-header').click();
      fixture.detectChanges();
      expect(testComponent.active01).toBe(true);
      expect(testComponent.active02).toBe(false);
      expect(panels[0].nativeElement.classList).toContain('vts-collapse-item-active');
      expect(panels[1].nativeElement.classList).not.toContain('vts-collapse-item-active');
      expect(testComponent.active01Change).toHaveBeenCalledTimes(3);
      expect(testComponent.active02Change).toHaveBeenCalledTimes(2);
      panels[0].nativeElement.querySelector('.vts-collapse-header').click();
      fixture.detectChanges();
      expect(testComponent.active01).toBe(false);
      expect(testComponent.active02).toBe(false);
      expect(panels[0].nativeElement.classList).not.toContain('vts-collapse-item-active');
      expect(panels[1].nativeElement.classList).not.toContain('vts-collapse-item-active');
      expect(testComponent.active01Change).toHaveBeenCalledTimes(4);
      expect(testComponent.active02Change).toHaveBeenCalledTimes(2);
    });
    it('should header work', () => {
      fixture.detectChanges();
      expect(panels[0].nativeElement.querySelector('.vts-collapse-header').innerText).toBe(
        'string'
      );
    });
    it('should extra work', () => {
      fixture.detectChanges();
      expect(panels[0].nativeElement.querySelector('.vts-collapse-extra')).toBeFalsy();

      testComponent.showExtra = 'Extra';
      fixture.detectChanges();
      const extraEl = panels[0].nativeElement.querySelector('.vts-collapse-extra');
      expect(extraEl!).not.toBeFalsy();
      expect(extraEl!.innerText).toBe('Extra');
    });
  });
  describe('collapse template', () => {
    let fixture: ComponentFixture<VtsTestCollapseTemplateComponent>;
    let panels: DebugElement[];
    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestCollapseTemplateComponent);
      fixture.detectChanges();
      panels = fixture.debugElement.queryAll(By.directive(VtsAccordionPanelComponent));
    });
    it('should header work', () => {
      fixture.detectChanges();
      expect(panels[0].nativeElement.querySelector('.vts-collapse-header').innerText).toBe(
        'template'
      );
    });
  });

  describe('collapse icon', () => {
    let fixture: ComponentFixture<VtsTestCollapseIconComponent>;
    let panels: DebugElement[];
    beforeEach(() => {
      fixture = TestBed.createComponent(VtsTestCollapseIconComponent);
      fixture.detectChanges();
      panels = fixture.debugElement.queryAll(By.directive(VtsAccordionPanelComponent));
    });
    it('should icon work', () => {
      fixture.detectChanges();
      expect(panels[0].nativeElement.querySelector('.vtsicon-right')).toBeDefined();
      expect(panels[1].nativeElement.querySelector('.vtsicon-double-right')).toBeDefined();
      expect(panels[2].nativeElement.querySelector('.vtsicon-caret-right')).toBeDefined();
    });
  });

  describe('RTL', () => {
    it('should className correct on dir change', () => {
      const fixture = TestBed.createComponent(VtsTestCollapseRtlComponent);
      const collapse = fixture.debugElement.query(By.directive(VtsAccordionComponent));
      fixture.detectChanges();
      expect(collapse.nativeElement!.classList).toContain('vts-collapse-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(collapse.nativeElement!.classList).not.toContain('vts-collapse-rtl');
    });
  });
});

@Component({
  // tslint:disable-next-line:no-selector
  selector: 'vts-test-basic-collapse',
  template: `
    <ng-template #headerTemplate>template</ng-template>
    <vts-collapse [vtsAccordion]="accordion" [vtsBordered]="bordered">
      <vts-accordion-panel
        [(vtsActive)]="active01"
        (vtsActiveChange)="active01Change($event)"
        [vtsHeader]="header"
        [vtsShowArrow]="showArrow"
        [vtsExtra]="showExtra"
      >
        <p>Panel01</p>
      </vts-accordion-panel>
      <vts-accordion-panel
        [(vtsActive)]="active02"
        (vtsActiveChange)="active02Change($event)"
        [vtsDisabled]="disabled"
      >
        <p>Panel02</p>
      </vts-accordion-panel>
    </vts-collapse>
  `
})
export class VtsTestCollapseBasicComponent {
  @ViewChild('headerTemplate', { static: false })
  headerTemplate!: TemplateRef<void>;
  accordion = false;
  bordered = true;
  disabled = false;
  active01 = false;
  active02 = false;
  showArrow = true;
  showExtra = '';
  header = 'string';
  active01Change = jasmine.createSpy('active01 callback');
  active02Change = jasmine.createSpy('active02 callback');
}

@Component({
  template: `
    <ng-template #headerTemplate>template</ng-template>
    <vts-collapse>
      <vts-accordion-panel [vtsHeader]="headerTemplate">
        <p>Panel01</p>
      </vts-accordion-panel>
    </vts-collapse>
  `
})
export class VtsTestCollapseTemplateComponent {}

@Component({
  template: `
    <vts-collapse>
      <vts-accordion-panel>
        <p>Panel01</p>
      </vts-accordion-panel>
      <vts-accordion-panel [vtsExpandedIcon]="'double-right'">
        <p>Panel02</p>
      </vts-accordion-panel>
      <vts-accordion-panel [vtsExpandedIcon]="expandedIcon">
        <p>Panel01</p>
      </vts-accordion-panel>
      <ng-template #expandedIcon>
        <i vts-icon vtsType="caret-right" class="vts-collapse-arrow"></i>
      </ng-template>
    </vts-collapse>
  `
})
export class VtsTestCollapseIconComponent {}

@Component({
  template: `
    <div [dir]="direction">
      <vts-test-basic-collapse></vts-test-basic-collapse>
    </div>
  `
})
export class VtsTestCollapseRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
