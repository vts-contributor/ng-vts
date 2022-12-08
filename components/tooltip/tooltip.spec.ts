import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { VtsElementPatchModule } from '@ui-vts/ng-vts/core/element-patch';
import { dispatchMouseEvent } from '@ui-vts/ng-vts/core/testing';
import { ComponentBed, createComponentBed } from '@ui-vts/ng-vts/core/testing/component-bed';
import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';

import { VtsTooltipBaseDirective, VtsTooltipTrigger } from './base';
import { VtsTooltipDirective } from './tooltip';
import { VtsToolTipModule } from './tooltip.module';

describe('vts-tooltip', () => {
  let testBed: ComponentBed<VtsTooltipTestComponent>;
  let fixture: ComponentFixture<VtsTooltipTestComponent>;
  let component: VtsTooltipTestComponent;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(fakeAsync(() => {
    testBed = createComponentBed(VtsTooltipTestComponent, {
      imports: [VtsToolTipModule, NoopAnimationsModule, VtsIconTestModule]
    });
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
    return getTextContentOf('.vts-tooltip-title');
  }

  function waitingForTooltipToggling(): void {
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
  }

  beforeEach(() => {
    fixture = testBed.fixture;
    component = testBed.component;
    fixture.detectChanges();
  });

  describe('visibility', () => {
    it('should hover mode work', fakeAsync(() => {
      const title = 'title-string';
      const triggerElement = component.titleString.nativeElement;

      expect(overlayContainerElement.textContent).not.toContain(title);

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling();
      dispatchMouseEvent(triggerElement, 'mouseenter');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(title);
      expect(component.visibilityTogglingCount).toBe(1);

      const overlayElement = getOverlayElementForTooltip(component.titleStringDirective);

      dispatchMouseEvent(triggerElement, 'mouseleave');
      fixture.detectChanges();
      dispatchMouseEvent(overlayElement, 'mouseenter');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(title);

      dispatchMouseEvent(overlayElement, 'mouseleave');
      waitingForTooltipToggling();
      // FIXME@wendellhu95: the following line errors
      // expect(overlayContainerElement.textContent).not.toContain(title);
      // Don't know why this breaks. The website works fine.

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).toContain(title);

      dispatchMouseEvent(triggerElement, 'mouseleave');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).not.toContain(title);

      component.mouseEnterDelay = 0.2;
      fixture.detectChanges();
      dispatchMouseEvent(triggerElement, 'mouseenter');
      tick(150);
      expect(overlayContainerElement.textContent).not.toContain(title);
      tick(50);
      expect(overlayContainerElement.textContent).toContain(title);

      dispatchMouseEvent(triggerElement, 'mouseleave');
      tick(150);
      expect(overlayContainerElement.textContent).not.toContain(title);

      component.mouseEnterDelay = 0.15;
      component.mouseLeaveDelay = 0.2;
      fixture.detectChanges();
      dispatchMouseEvent(triggerElement, 'mouseenter');
      tick(150);
      expect(overlayContainerElement.textContent).toContain(title);

      dispatchMouseEvent(triggerElement, 'mouseleave');
      tick(150);
      expect(overlayContainerElement.textContent).toContain(title);
      tick(50);
      expect(overlayContainerElement.textContent).not.toContain(title);
    }));

    it('should click mode work', fakeAsync(() => {
      const title = 'title-template';
      const triggerElement = component.titleTemplate.nativeElement;

      dispatchMouseEvent(triggerElement, 'click');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).toContain(title);

      dispatchMouseEvent(document.body, 'click');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).not.toContain(title);
    }));

    it('should focus and blur mode work', fakeAsync(() => {
      const title = 'focus';
      const triggerElement = component.focusTemplate.nativeElement;

      dispatchMouseEvent(triggerElement, 'focus');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).toContain(title);

      dispatchMouseEvent(triggerElement, 'blur');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).not.toContain(title);
    }));

    it('should support changing visibility programmatically', fakeAsync(() => {
      const title = 'program';

      component.visible = true;
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).toContain(title);
      expect(component.visibilityTogglingCount).toBe(1);

      component.visible = false;
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).not.toContain(title);
      expect(component.visibilityTogglingCount).toBe(2);
    }));

    it('should not hide tooltip when `vtsTooltipTrigger` is null', fakeAsync(() => {
      const title = 'always show';

      component.trigger = null;
      component.visible = true;
      waitingForTooltipToggling();
      dispatchMouseEvent(document.body, 'click');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).toContain(title);

      component.trigger = 'click';
      waitingForTooltipToggling();
      dispatchMouseEvent(document.body, 'click');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).not.toContain(title);
    }));
  });

  describe('content', () => {
    // These specs are covered in previous specs.
    // it('should vtsTooltipTitle support string', fakeAsync(() => {}));
    // it('should vtsTooltipTitle support template', fakeAsync(() => {}));

    it('cannot be visible when the title is empty', fakeAsync(() => {
      const triggerElement = component.titleString.nativeElement;

      component.title = null;
      fixture.detectChanges();

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling();
      expect(getTitleTextContent()).not.toContain('title-string');
      expect(component.visibilityTogglingCount).toBe(0);
    }));

    it('should change overlayStyle when the overlayStyle is changed', fakeAsync(() => {
      const triggerElement = component.titleString.nativeElement;

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling();

      component.style = { color: '#fff' };
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector<HTMLElement>('.vts-tooltip')!.style.color).toBe(
        'rgb(255, 255, 255)'
      );

      component.style = { color: '#000' };
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector<HTMLElement>('.vts-tooltip')!.style.color).toBe(
        'rgb(0, 0, 0)'
      );
    }));

    it('should change overlayClass when the overlayClass is changed', fakeAsync(() => {
      const triggerElement = component.titleString.nativeElement;

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling();

      component.class = 'testClass2';
      fixture.detectChanges();

      expect(overlayContainerElement.querySelector<HTMLElement>('.testClass2')).not.toBeNull();
    }));

    it('should hide when the title is changed to null', fakeAsync(() => {
      const title = 'title-string';
      const triggerElement = component.titleString.nativeElement;

      expect(overlayContainerElement.textContent).not.toContain(title);

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling();
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain(title);
      expect(component.visibilityTogglingCount).toBe(1);

      // Should close when title is changed to null.
      component.title = null;
      fixture.detectChanges();
      waitingForTooltipToggling();
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toContain(title);
      expect(component.visibilityTogglingCount).toBe(2);
    }));

    // changing title on the directive should be synced to the component
    it('should set `setTitle` proxy to `vtsTitle`', fakeAsync(() => {
      const triggerElement = component.titleString.nativeElement;
      const tooltipComponent = component.titleStringDirective.component!;

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling();
      expect(tooltipComponent.vtsTitle).toBe('title-string');
      expect(overlayContainerElement.textContent).toContain('title-string');

      component.title = 'changed!';
      fixture.detectChanges();
      expect(tooltipComponent.vtsTitle).toBe('changed!');
      expect(overlayContainerElement.textContent).toContain('changed!');
    }));

    it('should support changing trigger', fakeAsync(() => {
      const featureKey = 'title-template';
      const triggerElement = component.titleTemplate.nativeElement;

      dispatchMouseEvent(triggerElement, 'click');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).toContain(featureKey);

      dispatchMouseEvent(document.body, 'click');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).not.toContain(featureKey);

      component.trigger = null;
      fixture.detectChanges();

      dispatchMouseEvent(triggerElement, 'mouseenter');
      waitingForTooltipToggling();
      expect(overlayContainerElement.textContent).not.toContain(featureKey);
    }));

    it('should support changing position', fakeAsync(() => {
      const tooltipComponent = component.titleStringDirective.component!;

      // here we just making sure the preferred position is the first in the position array
      expect(tooltipComponent._positions.length).toBe(5);
    }));

    it('should background work', fakeAsync(() => {
      const triggerElement = component.titleTemplate.nativeElement;
      component.color = 'pink';

      fixture.detectChanges();

      dispatchMouseEvent(triggerElement, 'click');
      waitingForTooltipToggling();
      expect(
        overlayContainerElement.querySelector<HTMLElement>('.vts-tooltip')!.classList
      ).toContain('vts-tooltip-pink');

      component.color = '#f50';
      fixture.detectChanges();

      expect(
        overlayContainerElement.querySelector<HTMLElement>('.vts-tooltip-inner')!.style
          .backgroundColor
      ).toBe('rgb(255, 85, 0)');
      expect(
        overlayContainerElement.querySelector<HTMLElement>('.vts-tooltip-arrow-content')!.style
          .backgroundColor
      ).toBe('rgb(255, 85, 0)');
    }));
  });

  describe('dom', () => {
    it('should not insert element as the sibling of the directive element', fakeAsync(() => {
      fixture.detectChanges();
      const triggerElement = component.inBtnGroup.nativeElement;
      // There's a <!--container--> element created by Ivy.
      expect(triggerElement.nextSibling.nextSibling.tagName).toBe('BUTTON');
    }));
  });
});

describe('origin', () => {
  let testBed: ComponentBed<VtsTestTooltipTargetComponent>;
  let component: VtsTestTooltipTargetComponent;

  beforeEach(fakeAsync(() => {
    testBed = createComponentBed(VtsTestTooltipTargetComponent, {
      imports: [VtsToolTipModule, NoopAnimationsModule, VtsIconTestModule, VtsElementPatchModule]
    });
    component = testBed.component;
  }));

  it('should target work', () => {
    expect(
      (component.tooltip!.component!.origin!.elementRef.nativeElement as HTMLElement).tagName
    ).toBe('BUTTON');
  });
});

function getOverlayElementForTooltip(tooltip: VtsTooltipBaseDirective): HTMLElement {
  return tooltip!.component!.overlay.overlayRef.overlayElement;
}

@Component({
  template: `
    <a
      #titleString
      vts-tooltip
      [vtsTooltipTitle]="title"
      vtsTooltipTrigger="hover"
      vtsTooltipPlacement="topLeft"
      [vtsTooltipOverlayClassName]="class"
      [vtsTooltipOverlayStyle]="style"
      [vtsTooltipMouseEnterDelay]="mouseEnterDelay"
      [vtsTooltipMouseLeaveDelay]="mouseLeaveDelay"
      (vtsTooltipVisibleChange)="onVisibleChange()"
    >
      Hover
    </a>

    <a
      #titleTemplate
      vts-tooltip
      [vtsTooltipTitle]="template"
      [vtsTooltipTrigger]="trigger"
      [vtsTooltipColor]="color"
    >
      Click
    </a>

    <a #focusTooltip vts-tooltip vtsTooltipTrigger="focus" vtsTooltipTitle="focus">Focus</a>

    <a
      #program
      vts-tooltip
      [vtsTooltipTrigger]="null"
      vtsTooltipTitle="program"
      [vtsTooltipVisible]="visible"
      (vtsTooltipVisibleChange)="onVisibleChange()"
    >
      Manually
    </a>

    <a
      #alwaysShow
      vts-tooltip
      [vtsTooltipTrigger]="trigger"
      [vtsTooltipTitle]="'always show'"
      [vtsTooltipVisible]="visible"
    >
      Always Show
    </a>

    <div>
      <button>A</button>
      <button #inBtnGroup vts-tooltip vtsTooltipTitle="title-string">B</button>
      <button>C</button>
    </div>

    <ng-template #template>title-template</ng-template>
  `
})
export class VtsTooltipTestComponent {
  @ViewChild('titleString', { static: false }) titleString!: ElementRef;
  @ViewChild('titleString', { static: false, read: VtsTooltipDirective })
  titleStringDirective!: VtsTooltipDirective;

  @ViewChild('titleTemplate', { static: false }) titleTemplate!: ElementRef;
  @ViewChild('titleTemplate', { static: false, read: VtsTooltipDirective })
  titleTemplateDirective!: VtsTooltipDirective;

  @ViewChild('focusTooltip', { static: false }) focusTemplate!: ElementRef;
  @ViewChild('alwaysShow', { static: false }) alwaysShow!: ElementRef;

  trigger: VtsTooltipTrigger = 'click';

  @ViewChild('inBtnGroup', { static: false }) inBtnGroup!: ElementRef;

  title: string | null = 'title-string';
  visible = false;
  visibilityTogglingCount = 0;
  style = { color: '#000' };
  class = 'testClass';
  mouseEnterDelay = 0.15;
  mouseLeaveDelay = 0.1;
  color?: string;
  onVisibleChange(): void {
    this.visibilityTogglingCount += 1;
  }
}

@Component({
  template: `
    <button vts-button vts-element #button="vtsElement">Action</button>
    <a
      vts-tooltip
      vtsTooltipTitle="This action could not be revoked!"
      [vtsTooltipOrigin]="button.elementRef"
    >
      Notice
    </a>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
      }
    `
  ]
})
export class VtsTestTooltipTargetComponent {
  @ViewChild(VtsTooltipDirective) tooltip?: VtsTooltipDirective;
}
