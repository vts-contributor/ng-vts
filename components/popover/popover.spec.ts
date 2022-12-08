import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from '@ui-vts/ng-vts/core/testing';
import { ComponentBed, createComponentBed } from '@ui-vts/ng-vts/core/testing/component-bed';
import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';

import { VtsPopoverDirective } from './popover';
import { VtsPopoverModule } from './popover.module';

describe('VtsPopover', () => {
  let testBed: ComponentBed<VtsPopoverTestComponent>;
  let fixture: ComponentFixture<VtsPopoverTestComponent>;
  let component: VtsPopoverTestComponent;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(fakeAsync(() => {
    testBed = createComponentBed(VtsPopoverTestComponent, {
      imports: [VtsPopoverModule, NoopAnimationsModule, VtsIconTestModule]
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

  function getTextContentOf(selector: string): string | null {
    const el = overlayContainerElement.querySelector(selector);
    return el && el.textContent ? el.textContent : null;
  }

  function getTitleTextContent(): string | null {
    return getTextContentOf('.vts-popover-title');
  }

  function getInnerTextContent(): string | null {
    return getTextContentOf('.vts-popover-inner-content');
  }

  function waitingForTooltipToggling(): void {
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }

  it('should support string', fakeAsync(() => {
    const triggerElement = component.stringPopover.nativeElement;

    expect(getTitleTextContent()).toBeNull();
    expect(getInnerTextContent()).toBeNull();

    dispatchMouseEvent(triggerElement, 'mouseenter');
    waitingForTooltipToggling();
    expect(getTitleTextContent()).toContain('title-string');
    expect(getInnerTextContent()).toContain('content-string');

    dispatchMouseEvent(triggerElement, 'mouseleave');
    waitingForTooltipToggling();
    expect(getTitleTextContent()).toBeNull();
    expect(getInnerTextContent()).toBeNull();
  }));

  it('should support template', fakeAsync(() => {
    const triggerElement = component.templatePopover.nativeElement;

    expect(getTitleTextContent()).toBeNull();
    expect(getInnerTextContent()).toBeNull();

    dispatchMouseEvent(triggerElement, 'mouseenter');
    waitingForTooltipToggling();
    expect(getTitleTextContent()).toContain('title-template');
    expect(getInnerTextContent()).toContain('content-template');

    dispatchMouseEvent(triggerElement, 'mouseleave');
    waitingForTooltipToggling();
    expect(getTitleTextContent()).toBeNull();
    expect(getInnerTextContent()).toBeNull();
  }));

  // changing content on the directive should be synced to the component
  it('should set `setContent` proxy to `vtsContent`', fakeAsync(() => {
    const triggerElement = component.changePopover.nativeElement;

    dispatchMouseEvent(triggerElement, 'mouseenter');
    waitingForTooltipToggling();
    expect(getInnerTextContent()).toContain('content');

    component.content = 'changed-content';
    fixture.detectChanges();
    expect(getInnerTextContent()).toContain('changed-content');
  }));

  it('should vtsPopoverBackdrop work', fakeAsync(() => {
    const triggerElement = component.backdropPopover.nativeElement;
    dispatchMouseEvent(triggerElement, 'click');
    waitingForTooltipToggling();
    expect(overlayContainerElement.children[0].classList).toContain('cdk-overlay-backdrop');
  }));
});

@Component({
  template: `
    <a #stringPopover vts-popover vtsPopoverTitle="title-string" vtsPopoverContent="content-string">
      Show
    </a>

    <a
      #templatePopover
      vts-popover
      [vtsPopoverTitle]="templateTitle"
      [vtsPopoverContent]="templateContent"
    >
      Show
    </a>

    <a #changePopover vts-popover vtsPopoverTitle="title-change" [vtsPopoverContent]="content"></a>

    <a
      #backdropPopover
      vts-popover
      vtsPopoverContent="content-string"
      vtsPopoverTrigger="click"
      [vtsPopoverBackdrop]="true"
    ></a>

    <ng-template #templateTitle>title-template</ng-template>

    <ng-template #templateContent>content-template</ng-template>
  `
})
export class VtsPopoverTestComponent {
  @ViewChild('stringPopover', { static: false }) stringPopover!: ElementRef;
  @ViewChild('stringPopover', { static: false, read: VtsPopoverDirective })
  stringPopoverVtsPopoverDirective!: VtsPopoverDirective;

  @ViewChild('templatePopover', { static: false }) templatePopover!: ElementRef;
  @ViewChild('templatePopover', { static: false, read: VtsPopoverDirective })
  templatePopoverVtsPopoverDirective!: VtsPopoverDirective;

  @ViewChild('changePopover', { static: true }) changePopover!: ElementRef;
  @ViewChild('changePopover', { static: true, read: VtsPopoverDirective })
  changePopoverVtsPopoverDirective!: VtsPopoverDirective;

  @ViewChild('backdropPopover', { static: true }) backdropPopover!: ElementRef;

  content = 'content';
  visible = false;
  visibilityTogglingCount = 0;

  onVisibleChange(): void {
    this.visibilityTogglingCount += 1;
  }
}
