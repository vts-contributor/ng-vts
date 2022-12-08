import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from '@ui-vts/ng-vts/core/testing';
import { ComponentBed, createComponentBed } from '@ui-vts/ng-vts/core/testing/component-bed';
import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';

import { VtsPopconfirmModule } from './popconfirm.module';

describe('VtsPopconfirm', () => {
  let testBed: ComponentBed<VtsPopconfirmTestNewComponent>;
  let fixture: ComponentFixture<VtsPopconfirmTestNewComponent>;
  let component: VtsPopconfirmTestNewComponent;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(fakeAsync(() => {
    testBed = createComponentBed(VtsPopconfirmTestNewComponent, {
      imports: [VtsPopconfirmModule, NoopAnimationsModule, VtsIconTestModule]
    });
    fixture = testBed.fixture;
    component = testBed.component;
    fixture.detectChanges();
  }));

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  function getTitleText(): Element | null {
    return overlayContainerElement.querySelector('.vts-popover-message-title');
  }

  function getTooltipTrigger(index: number): Element {
    return overlayContainerElement.querySelectorAll('.vts-popover-buttons button')[index];
  }

  function waitingForTooltipToggling(): void {
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }

  it('should support custom icon', fakeAsync(() => {
    component.icon = 'question-circle';
    const triggerElement = component.iconTemplate.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');
    waitingForTooltipToggling();
    expect(overlayContainerElement.querySelector('.vtsicon-exclamation-circle')).toBeFalsy();
  }));

  it('should vtsOk work', () => {
    const triggerElement = component.stringTemplate.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();
    expect(getTooltipTrigger(0).textContent).toContain('cancel-text');
    expect(getTooltipTrigger(1).textContent).toContain('ok-text');
    expect(getTooltipTrigger(1).classList).not.toContain('vts-btn-primary');
  });

  it('should cancel work', fakeAsync(() => {
    const triggerElement = component.stringTemplate.nativeElement;

    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();
    expect(getTitleText()!.textContent).toContain('title-string');
    expect(component.confirm).toHaveBeenCalledTimes(0);
    expect(component.cancel).toHaveBeenCalledTimes(0);

    dispatchMouseEvent(getTooltipTrigger(0), 'click');
    waitingForTooltipToggling();
    expect(component.confirm).toHaveBeenCalledTimes(0);
    expect(component.cancel).toHaveBeenCalledTimes(1);
    expect(getTitleText()).toBeNull();
  }));

  it('should confirm work', fakeAsync(() => {
    const triggerElement = component.stringTemplate.nativeElement;

    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();
    expect(getTitleText()!.textContent).toContain('title-string');
    expect(component.confirm).toHaveBeenCalledTimes(0);
    expect(component.cancel).toHaveBeenCalledTimes(0);

    dispatchMouseEvent(getTooltipTrigger(1), 'click');
    waitingForTooltipToggling();
    expect(component.confirm).toHaveBeenCalledTimes(1);
    expect(component.cancel).toHaveBeenCalledTimes(0);
    expect(getTitleText()).toBeNull();
  }));

  it('should condition work', fakeAsync(() => {
    expect(component.confirm).toHaveBeenCalledTimes(0);
    expect(component.cancel).toHaveBeenCalledTimes(0);

    component.condition = true;
    fixture.detectChanges();
    const triggerElement = component.stringTemplate.nativeElement;

    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();
    expect(getTitleText()).toBeNull();
    expect(component.confirm).toHaveBeenCalledTimes(1);
    expect(component.cancel).toHaveBeenCalledTimes(0);
  }));

  it('should vtsPopconfirmShowArrow work', fakeAsync(() => {
    const triggerElement = component.stringTemplate.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');

    component.vtsPopconfirmShowArrow = false;
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.vts-popover-arrow')).toBeFalsy();

    component.vtsPopconfirmShowArrow = true;
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.vts-popover-arrow')).toBeTruthy();
  }));

  it('should vtsPopconfirmBackdrop work', fakeAsync(() => {
    component.vtsPopconfirmBackdrop = true;
    fixture.detectChanges();
    const triggerElement = component.stringTemplate.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');
    fixture.detectChanges();
    expect(overlayContainerElement.children[0].classList).toContain('cdk-overlay-backdrop');
  }));
});

@Component({
  template: `
    <a
      vts-popconfirm
      #stringTemplate
      vtsPopconfirmTitle="title-string"
      vtsOkText="ok-text"
      vtsOkType="default"
      vtsCancelText="cancel-text"
      [vtsCondition]="condition"
      [vtsPopconfirmShowArrow]="vtsPopconfirmShowArrow"
      [vtsPopconfirmBackdrop]="vtsPopconfirmBackdrop"
      (vtsOnConfirm)="confirm()"
      (vtsOnCancel)="cancel()"
    >
      Delete
    </a>
    <a
      vts-popconfirm
      #templateTemplate
      [vtsIcon]="icon"
      [vtsPopconfirmTitle]="titleTemplate"
      (vtsOnConfirm)="confirm()"
      (vtsOnCancel)="cancel()"
    >
      Delete
    </a>

    <a vts-popconfirm #iconTemplate [vtsIcon]="icon">Delete</a>

    <ng-template #titleTemplate>title-template</ng-template>
  `
})
export class VtsPopconfirmTestNewComponent {
  confirm = jasmine.createSpy('confirm');
  cancel = jasmine.createSpy('cancel');
  condition = false;
  vtsPopconfirmShowArrow = true;
  icon: string | undefined = undefined;
  vtsPopconfirmBackdrop = false;

  @ViewChild('stringTemplate', { static: false }) stringTemplate!: ElementRef;
  @ViewChild('templateTemplate', { static: false })
  templateTemplate!: ElementRef;
  @ViewChild('iconTemplate', { static: false }) iconTemplate!: ElementRef;

  visible = false;
  visibilityTogglingCount = 0;

  onVisibleChange(): void {
    this.visibilityTogglingCount += 1;
  }
}
